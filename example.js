function plot2DExample(canvas_id, stroke_style) {
    var spam = [];
    for (var i=0; i<50; i++) {
	spam.push(Math.random());
    }
    plot2D(canvas_id, spam, stroke_style);
}