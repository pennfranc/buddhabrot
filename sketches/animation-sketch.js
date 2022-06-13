
let n = 5000
let sleep_time = 50
let starting_number = Complex(-0.650, 0.347)

let step_magnitude = 0.000005
let steps = []
let zoom_level = 1
let cs = []

let first_click_done = false
first_click_x = 0
first_click_y = 0

function sleep(millisecondsDuration) {
  // from https://editor.p5js.org/RemyDekor/sketches/9jcxFGdHS
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function screen_to_complex(x, y) {
    var grid_coordinates = from_pixels(x, y, 1)
    return Complex(grid_coordinates.x, grid_coordinates.y)
}

function setup() {
    createCanvas(500, 500); 
    background(0, 0, 0);
    draw_mandelbrot(255, 1, 5);
    mandelbrot_background = get();
    stroke(100, 255, 255);

    for (var i = 0; i < n; i++) {
        sleep(i * sleep_time).then(function() {
            background(0, 0, 0);
            image(mandelbrot_background, 0, 0);

            if (first_click_done) {
              line(first_click_x, first_click_y, mouseX, mouseY)
            }

            for (var j = 0; j < cs.length; j++) {
              cs[j] = cs[j].add(steps[j]);
              num_iterations = trace_escape(cs[j], max_iterations, zoom_level);
            }

        })
        
    }
}


function mouseClicked() {
  if ((!first_click_done) && (mouseX < width) && (mouseY < height)) {  // first click
    first_click_done = true
    first_click_x = mouseX
    first_click_y = mouseY
  } else {  // second click
    if ((mouseX < width) && (mouseY < height)) {
      first_click_done = false
      step_start = screen_to_complex(first_click_x, first_click_y)
      step_end = screen_to_complex(mouseX, mouseY)
      cs.push(step_start)
      var step = (step_end.sub(step_start))
      step = step.div(step.abs()).mul(step_magnitude)
      steps.push(step)
    }
    
  }

}

function draw() {}