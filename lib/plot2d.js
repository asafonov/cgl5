var legend_border=20;
var axis_color='#ffffff';
var bgcolor='#333333';

function drawAxis(canvas_id) {
    if (legend_border>0) {
	var cvs = document.getElementById(canvas_id);
	var ctx = cvs.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = axis_color;
	ctx.moveTo(legend_border-2, 0);
	ctx.lineTo(legend_border-2, cvs.height-legend_border+2);
	ctx.lineTo(cvs.width, cvs.height-legend_border+2);
	ctx.stroke()
    }
}

function plot2D(canvas_id, data, stroke_style, filled) {
    drawAxis(canvas_id);
    if (typeof filled == 'undefined') filled = 0;
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);
    cvs.style.backgroundColor = bgcolor;
    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length, legend_border);
    var spam = scr.calcScreenXY(0, data[0]);
    var ctx = cvs.getContext('2d');
    if (filled>0) {
	ctx.fillStyle = stroke_style;
    } else {
	ctx.strokeStyle = stroke_style;
    }
    ctx.beginPath();
    ctx.moveTo(spam.x, spam.y);
    for (i=1; i<data.length; i++) {
	spam = scr.calcScreenXY(i, data[i]);
	ctx.lineTo(spam.x, spam.y);
    }
    if (filled>0) {
	ctx.lineTo(cvs.width, cvs.height-legend_border);
	ctx.lineTo(legend_border, cvs.height-legend_border);
	ctx.fill();
    } else {
	ctx.stroke();
    }
}

function bar2D(canvas_id, data, fill_style) {
    drawAxis(canvas_id);
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);
    cvs.style.backgroundColor = bgcolor;
    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length, legend_border);
    var ctx = cvs.getContext('2d');
    ctx.fillStyle = fill_style;
    width = parseInt(cvs.width/data.length*2/3);
    for (i=0; i<data.length; i++) {
	spam = scr.calcScreenXY(i, data[i]);
	ctx.fillRect(parseInt(i*(cvs.width-legend_border)/data.length)+legend_border, spam.y, width, cvs.height-spam.y-legend_border);
    }
}

function filledPlot2D(canvas_id, data, fill_style) {
    plot2D(canvas_id, data, fill_style, 1);
}