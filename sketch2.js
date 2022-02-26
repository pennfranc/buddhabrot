
function setup() {
    createCanvas(500, 500); 
    background(0, 0, 0);
    draw_mandelbrot(255, 1, 5);
    mandelbrot_background = get();
    stroke(0, 255, 255);


    // max iterations input
    max_it_input = createInput(max_iterations_inital_val);
    max_it_input.position(width + 50, slider_spacing * 7);
    var p = createP('max escape iterations')
    p.position(width + 50, slider_spacing * 5.5)
}

function draw() {}

function mouseMoved() {
    image(mandelbrot_background, 0, 0);
    var grid_coordinates = from_pixels(mouseX, mouseY, 1)
    c = Complex(grid_coordinates.x, grid_coordinates.y)
    num_iterations = trace_escape(c, max_iterations, 1)

    fill(255, 255, 255)
    text(num_iterations.toString(), 10, 15)
}

function keyReleased() {
    max_iterations = parseInt(max_it_input.value())
}