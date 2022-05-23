
let n = 5000
let sleep_time = 50
let starting_number = Complex(-0.650, 0.347)
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
            c = c.add(step);

            image(mandelbrot_background, 0, 0);
            num_iterations = trace_escape(c, max_iterations, zoom_level);

        })
        
    }
}

function mouseClicked() {
  var grid_coordinates = from_pixels(mouseX, mouseY, 1)
  c = Complex(grid_coordinates.x, grid_coordinates.y)
}

function draw() {}