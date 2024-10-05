// note: 'fireworks' here refers to the animation resulting from displaying trajectories of ajacent points c in quick succession

// array of fireworks, i.e. an array of sequences of complex numbers to be animated
let waypoints_arr_x = []  // screen x coordinates
let waypoints_arr_y = []  // screen y coordinates
let waypoints_arr_c = []  // complex numbers

// boolean indicating whether the user is currently adding waypoints to the last element in 'waypoints_arr'
// if false, a new waypoints_arr element should be created
let starting_new_waypoint = true

// whether the user has started the fireworks show
let animation_started = false

let saveFireworkButton


function setup() {
  // setup canvas
  let cnv = createCanvas(500, 500); 
  background(0, 0, 0);
  draw_mandelbrot(255, 1, 5);
  mandelbrot_background = get();
  stroke(0, 255, 255);

  const margin_top = 150;
  cnv.position(10, margin_top + 10);

  // max iterations input
  max_it_input = createInput(max_iterations_inital_val);
  max_it_input.position(width + 50, slider_spacing * 7);
  var p = createP('max escape iterations')
  p.position(width + 50, slider_spacing * 5.5)

  // setup save fireworks button
  saveFireworkButton = createButton('Save Firework');
  saveFireworkButton.position(width + 50, slider_spacing * 8);
  saveFireworkButton.mousePressed(saveFirework);
  saveFireworkButton.hide(); // Initially hide the button
}

function draw() {}

// Function to save the firework (you can implement the saving logic here)
function saveFirework() {
  setStartingNewWayPoint(true)
  drawBackground()
  updateFireworkRouteDisplays()
}

function mouseMoved() {
  
  drawBackground()
  updateFireworkRouteDisplays()
}

function drawBackground() {
  image(mandelbrot_background, 0, 0);
  var grid_coordinates = from_pixels(mouseX, mouseY, 1)
  c = Complex(grid_coordinates.x, grid_coordinates.y)
  num_iterations = trace_escape(c, max_iterations, 1)

  fill(255, 255, 255)
  text("n = " + num_iterations.toString(), 10, 15)
}

function updateFireworkRouteDisplays() {
  // display current firework route
  if (!starting_new_waypoint) {
    displayFireworkRoute(
      waypoints_arr_x[waypoints_arr_x.length - 1],
      waypoints_arr_y[waypoints_arr_y.length - 1],
      'rgb(0, 255, 255)'
    );
  }
}

function displayFireworkRoute(waypoints_x, waypoints_y, fillColor, dot_width=5) {
  fill(fillColor);
  ellipse(waypoints_x[0], waypoints_y[0], dot_width, dot_width);
  for (let i = 0; i < waypoints_x.length - 1; i++) {
    line(
      waypoints_x[i], waypoints_y[i],
      waypoints_x[i + 1], waypoints_y[i + 1]
    );
    ellipse(waypoints_x[i + 1], waypoints_y[i + 1], dot_width, dot_width);
  }
}

function keyReleased() {
  max_iterations = parseInt(max_it_input.value())
}

function updateWaypointsArrays(x, y) {
  /**
   * Updates the last elements of the waypoint arrays by adding a next point in the fireworks sequence.
   * This function is called when a new point is added to the current firework sequence.
   * It updates the x, y, and complex number arrays that represent the waypoints of the firework.
   * 
   * @param {number} x - The x-coordinate of the new point in the firework sequence.
   * @param {number} y - The y-coordinate of the new point in the firework sequence.
   */
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
  console.log(waypoints_arr_x)
  if (!animation_started) {

    if (starting_new_waypoint && (mouseX < width) && (mouseY < height)) {  // first point in new firework
      setStartingNewWayPoint(false)
      waypoints_arr_x.push([])
      waypoints_arr_y.push([])
      waypoints_arr_c.push([])
      updateWaypointsArrays(mouseX, mouseY)
    } else {  // adding point to firework in progress
      if ((mouseX < width) && (mouseY < height)) {
        updateWaypointsArrays(mouseX, mouseY)
      }
      
    }
  }
}