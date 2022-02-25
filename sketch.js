
let max_iterations = 500;
let color_sliders = [];
let slider_spacing = 30;
let color_square_width = 20;
let colors = ['red', 'green', 'blue', 'alpha'];
let max_it_input;

function setup() {
    createCanvas(500, 500); 
    background(0, 0, 0);

    // create color sliders
    for (var i = 0; i < colors.length; i++) {

        // slider
        var color_slider = createSlider(0, 255, 100);
        color_slider.position(width + 50, 10 + i * slider_spacing)
        color_slider.style('width', '80px');
        color_sliders.push(color_slider);

        // label
        var p = createP(colors[i]);
        p.style('font-size', '16px');
        p.position(width + color_slider.width + 70, i * slider_spacing);
    }

    // max iterations input
    max_it_input = createInput('500');
    max_it_input.position(width + 50, slider_spacing * 7);
    var p = createP('max iterations')
    p.position(width + 50, slider_spacing * 5.5)

    mouseReleased()
}
  

function draw() {
    buddhabrot_iteration(max_iterations, 1);
}


function mouseReleased() {
    new_color = color(color_sliders[0].value(),
                      color_sliders[1].value(),
                      color_sliders[2].value(),
                      color_sliders[3].value())
    stroke(new_color);

    fill(new_color);
    draw_color_square(new_color)
}

function keyReleased() {
    max_iterations = parseInt(max_it_input.value())
}

function draw_color_square(color) {
    fill(0, 0, 0);
    rect(width - color_square_width, 0, color_square_width, color_square_width);
    fill(color);
    rect(width - color_square_width, 0, color_square_width, color_square_width);
}