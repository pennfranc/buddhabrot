// note: 'fireworks' here refers to the animation resulting from displaying trajectories of ajacent points c in quick succession
let sleep_time = 50
const max_num_fireworks = 10 // how many separate fireworks can be lit during the show
const num_iterations_firework = 1000 // how many iterations the show is run for

// array of fireworks, i.e. an array of sequences of complex numbers to be animated
let waypoints_arr_x = []  // screen x coordinates
let waypoints_arr_y = []  // screen y coordinates
let waypoints_arr_c = []  // complex numbers

// boolean indicating whether the user is currently adding waypoints to the last element in 'waypoints_arr'
// if false, a new waypoints_arr element should be created
let starting_new_waypoint = true

// whether the user has started the fireworks show
let animation_started = false

const saved_fireworks_color = 'rgb(139, 69, 19)'
const default_color = 'rgb(0, 255, 255)'
const buttons_y_offset = 400
const button_height = 50

let saveFireworkButton
let startShowButton

function sleep(millisecondsDuration) {
  // from https://editor.p5js.org/RemyDekor/sketches/9jcxFGdHS
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}


function setup() {
  // setup canvas
  let cnv = createCanvas(500, 500); 
  background(0, 0, 0);
  draw_mandelbrot(255, 1, 5);
  mandelbrot_background = get();
  stroke(default_color);

  const margin_top = 150;
  cnv.position(10, margin_top + 10);

  // max iterations input
  max_it_input = createInput(max_iterations_inital_val);
  max_it_input.position(width + 50, slider_spacing * 7);
  var p = createP('max escape iterations')
  p.position(width + 50, slider_spacing * 5.5)

  // setup save fireworks button
  saveFireworkButton = createButton('Save Firework');
  saveFireworkButton.style('font-size', '18px');
  saveFireworkButton.position(width + 50, buttons_y_offset);
  saveFireworkButton.mousePressed(saveFirework);
  saveFireworkButton.size(150, button_height); // Make the button bigger
  saveFireworkButton.hide(); // Initially hide the button

  // setup start show button
  startShowButton = createButton('Start Show');
  startShowButton.style('font-size', '18px');
  startShowButton.position(width + 50, buttons_y_offset + button_height);
  startShowButton.mousePressed(startFireworksShow);
  startShowButton.size(150, button_height); // Make the button bigger
  startShowButton.hide();
}

function draw() {}

function saveFirework() {
  starting_new_waypoint = true
  drawBackground()
  drawTrajectory()
  updateFireworkRouteDisplays()
  saveFireworkButton.hide()
  startShowButton.show()
}

function computeDistances() {
  distances_arr = []
  for (let i = 0; i < waypoints_arr_c.length; i++) {
    let d_array = [];
    for (let j = 0; j < waypoints_arr_c[i].length - 1; j++) {
      let distance = waypoints_arr_c[i][j].sub(waypoints_arr_c[i][j + 1]).abs();
      d_array.push(distance);
    }
    distances_arr.push(d_array);
  }
  return distances_arr
}

function computeFractions(distances_arr) {
  fractions_arr = []
  for (let i = 0; i < distances_arr.length; i++) {
    let totalDistance = distances_arr[i].reduce((a, b) => a + b, 0);
    let cumulative_distances = distances_arr[i].map((curr, index) => distances_arr[i].slice(0, index + 1).reduce((acc, curr) => acc + curr, 0));
    let fractions = cumulative_distances.map(cum_distance => cum_distance / totalDistance);
    fractions.unshift(0);
    fractions_arr.push(fractions);
  }
  return fractions_arr
}

function computeSteps(distances_arr, fractions_arr) {
  steps_arr = []
  for (let i = 0; i < distances_arr.length; i++) {
    steps = []
    for (let j = 0; j < num_iterations_firework; j++) {
      var trajectory_frac = j / num_iterations_firework;
      let last_waypoint_idx = fractions_arr[i].findLastIndex(fraction => trajectory_frac >= fraction);
      let num_steps_between_waypoints = Math.floor(
        (fractions_arr[i][last_waypoint_idx + 1] - fractions_arr[i][last_waypoint_idx]) * num_iterations_firework
      )
      let vec_between_waypoints = waypoints_arr_c[i][last_waypoint_idx + 1].sub(waypoints_arr_c[i][last_waypoint_idx])

      steps.push(vec_between_waypoints.div(num_steps_between_waypoints))
      
    }
    steps_arr.push(steps)
  }
  return steps_arr
}

function startFireworksShow() {
  startShowButton.hide()
  animation_started = true
  distances_arr = computeDistances()  // array of distance arrays between subsequent c in a waypoint array
  fractions_arr = computeFractions(distances_arr)
  steps_arr = computeSteps(distances_arr, fractions_arr)
  cs = waypoints_arr_c.map(waypoint => waypoint[0])
  for (var i = 0; i < num_iterations_firework; i++) {
    sleep(i * sleep_time).then((function(i) {
        return function() {
            drawBackground()

            for (var j = 0; j < cs.length; j++) {
              num_iterations = trace_escape(cs[j], max_iterations, 1)
              cs[j] = cs[j].add(steps_arr[j][i]);
            }
            if (i == num_iterations_firework - 1) {
              // reset everything
            }
        }
      })(i));
}
}

function mouseMoved() {
  if (!animation_started) {
    drawBackground()
    drawTrajectory()
    updateFireworkRouteDisplays()
  }
}

function drawBackground() {
  image(mandelbrot_background, 0, 0);
  

  stroke(default_color)
  fill(255, 255, 255)

  stroke(saved_fireworks_color);
  let num_saved_fireworks = max(
    waypoints_arr_x.length - (starting_new_waypoint ? 0 : 1), 0
  )
  text(
    `Number of saved fireworks: ${num_saved_fireworks} / ${max_num_fireworks}`,
    width - 200, 15,
  );
  stroke(default_color)
}

function drawTrajectory() {
  var grid_coordinates = from_pixels(mouseX, mouseY, 1)
  c = Complex(grid_coordinates.x, grid_coordinates.y)
  stroke(default_color)
  num_iterations = trace_escape(c, max_iterations, 1)
  text("n = " + num_iterations.toString(), 10, 15)
}

function updateFireworkRouteDisplays() {
  // display saved firework routs
  for (let i = 0; i < waypoints_arr_x.length - (starting_new_waypoint ? 0 : 1); i++) {
    displayFireworkRoute(
      waypoints_arr_x[i],
      waypoints_arr_y[i],
      saved_fireworks_color
    );
  }

  // display current firework route
  if (!starting_new_waypoint) {
    displayFireworkRoute(
      waypoints_arr_x[waypoints_arr_x.length - 1],
      waypoints_arr_y[waypoints_arr_y.length - 1],
      default_color
    );
  }
}

function displayFireworkRoute(waypoints_x, waypoints_y, color, dot_width=5) {
  fill(color)
  stroke(color)
  ellipse(waypoints_x[0], waypoints_y[0], dot_width, dot_width);
  for (let i = 0; i < waypoints_x.length - 1; i++) {
    line(
      waypoints_x[i], waypoints_y[i],
      waypoints_x[i + 1], waypoints_y[i + 1]
    );
    ellipse(waypoints_x[i + 1], waypoints_y[i + 1], dot_width, dot_width);
  }
  fill(default_color)
  stroke(default_color)
}

function keyReleased() {
  max_iterations = parseInt(max_it_input.value())
}

function updateWaypointsArrays(x, y) {
  waypoints_arr_x[waypoints_arr_x.length - 1].push(x)
  waypoints_arr_y[waypoints_arr_y.length - 1].push(y)
  waypoints_arr_c[waypoints_arr_c.length - 1].push(screen_to_complex(x, y))
}

function setStartingNewWayPoint(starting_new_waypoint_new) {
    starting_new_waypoint = starting_new_waypoint_new
    if (starting_new_waypoint_new) {
      saveFireworkButton.hide()
    } else {
      saveFireworkButton.show()
    }
}

function mouseClicked() {
  if (!animation_started) {

    if (starting_new_waypoint && (mouseX < width) && (mouseY < height)) {  // first point in new firework
      starting_new_waypoint = false
      startShowButton.hide()
      waypoints_arr_x.push([])
      waypoints_arr_y.push([])
      waypoints_arr_c.push([])
      updateWaypointsArrays(mouseX, mouseY)
    } else {  // adding point to firework in progress
      if ((mouseX < width) && (mouseY < height)) {
        updateWaypointsArrays(mouseX, mouseY)

        // display save firework button if there are at least 2 waypoints in the current firework
        if (waypoints_arr_x[waypoints_arr_x.length - 1].length > 1) {
          saveFireworkButton.show()
        }
      }
      
    }
  }
}