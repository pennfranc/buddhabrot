
let n = 2000
let sleep_time = 50
let starting_number = Complex(-0.650, 0.347)
let step = Complex(-0.000005, 0)
let zoom_level = 1.8

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
    stroke(100, 255, 255);

    c = starting_number
    for (var i = 0; i < n; i++) {
        sleep(i * sleep_time).then(function() {
            background(0, 0, 0);
            c = c.add(step);
            num_iterations = trace_escape(c, max_iterations, zoom_level);
        })
        
    }
}

function draw() {}