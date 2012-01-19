var spam = [];
for (var i=0; i<40; i++) {
    spam.push(Math.sin(2*31415/10000*i/40));
}

function plot2DExample(canvas_id, stroke_style) {
    plot2D(canvas_id, spam, stroke_style);
}

function filledPlot2DExample(canvas_id, stroke_style) {
    filledPlot2D(canvas_id, spam, stroke_style);
}

function printData() {
    document.write('<p>Data: '+spam[0]);
    for (var i=1; i<spam.length; i++) {
	document.write(', '+spam[i]);
    }
}

function bar2DExample(canvas_id, stroke_style) {
    bar2D(canvas_id, spam, stroke_style);
}