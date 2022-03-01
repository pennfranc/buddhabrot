

function setup() {
    let cnv = createCanvas(500, 500); 
    background(0, 0, 0);

    // create color sliders
    for (var i = 0; i < colors.length; i++) {

        // slider
        var color_slider = createSlider(0, 255, color_inital_values[i]);
        color_slider.position(width + 50, 10 + i * slider_spacing)
        color_slider.style('width', '80px');
        color_sliders.push(color_slider);

        // label
        var p = createP(colors[i]);
        p.style('font-size', '16px');
        p.position(width + color_slider.width + 70, i * slider_spacing);
    }

    // max iterations input
    max_it_input = createInput(max_iterations_inital_val);
    max_it_input.position(width + 50, slider_spacing * 7);
    var p = createP('max escape iterations')
    p.position(width + 50, slider_spacing * 5.5)

    // min iterations input
    min_it_input = createInput(min_iterations_initial_val);
    min_it_input.position(width + 50, slider_spacing * 9);
    var p = createP('min escape iterations')
    p.position(width + 50, slider_spacing * 7.5)

    mouseReleased()
}
  

function draw() {
    buddhabrot_iteration(max_iterations, min_iterations, 1);
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
    min_iterations = parseInt(min_it_input.value())
}

function draw_color_square(color) {
    fill(0, 0, 0);
    rect(width - color_square_width, 0, color_square_width, color_square_width);
    fill(color);
    rect(width - color_square_width, 0, color_square_width, color_square_width);
}