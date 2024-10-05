function from_pixels(i, j, zoom) {
    var y_val = (i / width * 2 - 1) / zoom 
    var x_val = (j / height * 2 - 1.5) / zoom
    return {x: x_val, y: y_val}
}

function to_pixels(x, y, zoom) {
    var v_val = (x * zoom + 0.5) * height / 2 + float(height) / 2
    var u_val = y * zoom * width / 2 + float(width) / 2
    return {u: parseInt(u_val), v: parseInt(v_val)}
}
    
function iteration(z, c) {
    return z.mul(z).add(c);
}

function complex_to_string(z) {
    // for hashing purposes
    combined_string = concat(z.re.toString(), '-', z.im.toString())
    return combined_string
}

function screen_to_complex(x, y) {
    var grid_coordinates = from_pixels(x, y, 1)
    return Complex(grid_coordinates.x, grid_coordinates.y)
}

function num_iterations(c, max_iterations) {
    var z = Complex(0, 0);
    var visited_points = new Set();
    for (var n = 0; n < max_iterations; n++) {
        z = this.iteration(z, c)

        // orbit has escaped and is going to be drawn
        if (z.abs() > 2) {break}

        // cycle detected and orbit should not be drawn (Brent's algorithm)
        if (visited_points.has(complex_to_string(z))) {
            n = max_iterations - 1;
            break;
        }

        visited_points.add(complex_to_string(z))
    }
    return parseFloat(n)
}

function trace_escape(c, max_iterations, zoom) {
    var z = Complex(0, 0)
    for (var n = 0; n < max_iterations; n++) {
        if (z.abs() > 2) {break}
        z = this.iteration(z, c)
        var pixels = this.to_pixels(z.re, z.im, zoom)
        if (pixels.u >= 1 && pixels.u < width - 1 && pixels.v >= 1 && pixels.v < height - 1) {
            point(pixels.u, pixels.v)
        }
    }
    return n
}

function buddhabrot_iteration(max_iterations, min_iterations, zoom) {

    /**
     * Computes mandelbrot orbits of random complex numbers until it finds one that is certain to escape
     * within `max_iterations` iterations. The escaping orbit is drawn upon the canvas.
     * 
     * @param  {Integer} max_iterations  The maximal number of iterations of the Mandelbrot function tried
     *                                   to see if a random orbit escapes. If it escapes before
     *                                   max_iterations, then it is kept and drawn onto the canvas.
     *                                   The higher the value, the bigger the impact of orbits that spend
     *                                   a long time in a 'confined space'.
     *                                   A lower number leads to missing a lot of 'late-escapers'.
     *                                   Generally speaking, setting this number higher will reveal more
     *                                   intricate patterns.
     * 
     * @param  {Integer} min_iterations  The minimum number of iterations before certain escape of an orbit
     *                                   required for the trace to be drawn onto the canvas. 
     *                                   Increasing this number will filter out orbits that escape fast.
     * 
     * @param  {Float} zoom              How much we zoom into buddhabrot. TODO: needs to be tested.
     */

    var iterations = max_iterations - 1
    while (iterations == max_iterations - 1) {

        // choose a random starting point for the mandelbrot iterations
        var x = Math.random() * 2 - 1.5
        var y = Math.random() * 2 - 1
        var c = Complex(x, y)

        // skip points within main cardiod and within circle with center (-1, 0)
        var t = c.arg()
        var cardiod_point = Complex((2 * Math.cos(t) - Math.cos(2*t)) / 4, (2 * Math.sin(t) - Math.sin(2*t)) / 4)
        if (!(c.abs() > cardiod_point.abs() && c.add(1).abs() > 0.25)) {continue}
        
        // compute the number of iterations, up to `max_iterations`, that could be performed
        // without being certain that the orbit escapes
        var iterations = num_iterations(c, max_iterations)
        
        // fewer than `max_iterations` steps could be performed, then the orbit escaped and is
        // part of buddhabrot
        if (iterations < max_iterations - 1 && iterations >= min_iterations) {
            this.trace_escape(c, max_iterations, zoom)
        }

    }
}

function draw_mandelbrot(max_iterations, zoom, stride) {
    for (var i = 0; i < width; i+=stride) {
        for (var j = 0; j < height; j+=stride) {
            coords = from_pixels(i, j, zoom)
            var c = Complex(coords.x, coords.y)
            var iterations = this.num_iterations(c, max_iterations)
            stroke(min(iterations, 255), 0, 0)
            point(i, j)
        }
    }
}