function from_pixels(i, j, zoom) {
    var y_val = ((i - float(width) / 2) / width * 2 - 0.5) / zoom 
    var x_val = ((j - float(height) / 2) / height * 2) / zoom
    return {x: x_val, y: y_val}
}

function to_pixels(x, y, zoom) {
    var v_val = (x * zoom + 0.5) * height / 2 + float(height) / 2
    var u_val = y * zoom * width / 2 + float(width) / 2
    return {u: parseInt(u_val), v: parseInt(v_val)}
}
    
function iteration(z, c) {
    return z.mul(z).add(c)
}

function num_iterations(c, max_iterations) {
    var z = Complex(0, 0)
    for (var n = 0; n < max_iterations; n++) {
        if (z.abs() > 2) {break}
        z = this.iteration(z, c)
    }
    return parseFloat(n)
}

function trace_escape(arr, c, max_iterations, zoom, color_num) {
    var z = Complex(0, 0)
    for (var n = 0; n < max_iterations; n++) {
        if (z.abs() > 2) {break}
        z = this.iteration(z, c)
        var pixels = this.to_pixels(z.re, z.im, zoom)
        if (pixels.u >= 1 && pixels.u < width - 1 && pixels.v >= 1 && pixels.v < height - 1) {
            //arr[pixels.u][pixels.v][color_num] += 1
            //arr[pixels.u][pixels.v] += 1
            stroke(color(0, 0, 0, 50))
            point(pixels.u, pixels.v)
        }
    }
    return arr
}

function draw_mandelbrot(max_iterations, zoom) {
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var x = ((i - parseFloat(width) / 2) / width * 2 - 0.5) / zoom 
            var y = ((j - parseFloat(height) / 2) / height * 2) / zoom
            var c = Complex(x, y)
            
            var iterations = this.num_iterations(c, max_iterations)
            stroke(255 - (iterations / max_iterations) * 255, 0, 0)
            point(i, j)
        }
    }
}

function buddhabrot_iteration(arr, max_iterations, zoom, color_num) {

    var iterations = max_iterations - 1
    while (iterations == max_iterations - 1) {
        var x = Math.random() * 2 - 1.5
        var y = Math.random() * 2 - 1

        var c = Complex(x, y)
        var t = c.arg()
        var cardiod_point = Complex((2 * Math.cos(t) - Math.cos(2*t)) / 4, (2 * Math.sin(t) - Math.sin(2*t)) / 4)

        // skip points within main cardiod and within circle with center (-1, 0)
        if (!(c.abs() > cardiod_point.abs() && c.add(1).abs() > 0.25)) {continue}
        
        var iterations = num_iterations(c, max_iterations)
        
        if (iterations < max_iterations - 1) {
            arr = this.trace_escape(arr, c, max_iterations, zoom, color_num)
        }

        //return arr, parseInt(iterations)
    }
}

