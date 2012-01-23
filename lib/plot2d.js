var legend_border=20;
var axis_color='#ffffff';
var bgcolor='#333333';
var zero_color = '#ffff00';
var text_color = '#ffffff';
var ctx_font = 'normal 12px courier';

function drawAxis(canvas_id, zero_point) {
    if (legend_border>0) {
	var cvs = document.getElementById(canvas_id);
	var ctx = cvs.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = axis_color;
	ctx.moveTo(legend_border-2, 0);
	ctx.lineTo(legend_border-2, cvs.height-legend_border+2);
	ctx.lineTo(cvs.width, cvs.height-legend_border+2);
	ctx.stroke();
	ctx.closePath()
	if (zero_point>0) {
	    ctx.beginPath();
	    ctx.strokeStyle = zero_color;
	    ctx.moveTo(legend_border-1, zero_point);
	    ctx.lineTo(cvs.width, zero_point);
	    ctx.stroke();
	}
    }
}

function drawValues(canvas_id, data, zero_point) {
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);
    cvs.style.backgroundColor = bgcolor;
    var ctx = cvs.getContext('2d');
    ctx.font=ctx_font;
    ctx.strokeStyle = text_color;
    ctx.strokeText(Math.round(max_value*100)/100, 1, 10);
    ctx.strokeText(Math.round(min_value*100)/100, 1, cvs.height-legend_border);
    if (zero_point>0) {
        ctx.strokeText('0', 1, zero_point+5);
    }
}

function plot2D(canvas_id, data, stroke_style, filled) {
    if (typeof filled == 'undefined') filled = 0;
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);
    cvs.style.backgroundColor = bgcolor;
    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length, legend_border);
    var zero_point = 0;
    if (min_value<0&&max_value>0) {
    	var zero_point = scr.calcScreenXY(0, 0).y;
    }
    drawAxis(canvas_id, zero_point);
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
    drawValues(canvas_id, data, zero_point);
}

function bar2D(canvas_id, data, fill_style) {
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);
    cvs.style.backgroundColor = bgcolor;
    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length, legend_border);
    var zero_point = 0;
    if (min_value<0&&max_value>0) {
    	var zero_point = scr.calcScreenXY(0, 0).y;
    }
    drawAxis(canvas_id, zero_point);
    var ctx = cvs.getContext('2d');
    ctx.fillStyle = fill_style;
    width = parseInt(cvs.width/data.length*2/3);
    for (i=0; i<data.length; i++) {
    	spam = scr.calcScreenXY(i, data[i]);
    	ctx.fillRect(parseInt(i*(cvs.width-legend_border)/data.length)+legend_border, spam.y, width, cvs.height-spam.y-legend_border);
    }
    drawValues(canvas_id, data, zero_point);
}

function filledPlot2D(canvas_id, data, fill_style) {
    plot2D(canvas_id, data, fill_style, 1);
}
