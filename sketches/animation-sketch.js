
let n = 5000
let sleep_time = 50
let starting_number = Complex(-0.650, 0.347)

let step_x = -0.000005
let step_y = 0
let step = Complex(-0.000005, 0)
let zoom_level = 1
let c

function sleep(millisecondsDuration) {
  // from https://editor.p5js.org/RemyDekor/sketches/9jcxFGdHS
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function setup() {
    max_iterations = 3000
    createCanvas(500, 500); 
    background(0, 0, 0);
    draw_mandelbrot(255, 1, 5);
    mandelbrot_background = get();
    stroke(100, 255, 255);

    c = starting_number
    for (var i = 0; i < n; i++) {
        sleep(i * sleep_time).then(function() {
            background(0, 0, 0);
            c = c.add(Complex(step_x, step_y));

            image(mandelbrot_background, 0, 0);
            num_iterations = trace_escape(c, max_iterations, zoom_level);

        })
        
    }

    // step x input
    step_x_input = createInput(step_x);
    step_x_input.position(width + 50, slider_spacing * 4);
    var p = createP('step_x')
    p.position(width + 50, slider_spacing * 2.5)

    // step y input
    step_y_input = createInput(step_y);
    step_y_input.position(width + 50, slider_spacing * 6.5);
    var p = createP('step_y')
    p.position(width + 50, slider_spacing * 5)
}

function keyReleased() {
  step_x = parseFloat(step_x_input.value())
  step_y = parseFloat(step_y_input.value())
}

function mouseClicked() {
  if ((mouseX < width) && (mouseY < height)) {
    var grid_coordinates = from_pixels(mouseX, mouseY, 1)
    c = Complex(grid_coordinates.x, grid_coordinates.y)
  }
}

function draw() {}