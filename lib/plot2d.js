var settings = {
"legend_border": 20,
"axis_color": "#ffffff",
"bgcolor": "#333333",
"zero_color": "#ffff00",
"text_color": "#ffffff",
"ctx_font": "normal 12px courier"
}

function drawAxis(ctx, ch, cw, zero_point) {
    if (settings.legend_border>0) {
    	ctx.beginPath();
    	ctx.strokeStyle = settings.axis_color;
    	ctx.moveTo(settings.legend_border-2, 0);
    	ctx.lineTo(settings.legend_border-2, ch-settings.legend_border+2);
    	ctx.lineTo(cw, ch-settings.legend_border+2);
    	ctx.stroke();
    	ctx.closePath()
    	if (zero_point>0) {
    	    ctx.beginPath();
    	    ctx.strokeStyle = settings.zero_color;
    	    ctx.moveTo(settings.legend_border-1, zero_point);
    	    ctx.lineTo(cw, zero_point);
    	    ctx.stroke();
    	}
    }
}

function drawValues(ctx, ch, data, zero_point) {
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    ctx.font=settings.ctx_font;
    ctx.strokeStyle = settings.text_color;
    ctx.strokeText(Math.round(max_value*100)/100, 1, 10);
    ctx.strokeText(Math.round(min_value*100)/100, 1, ch-settings.legend_border);
    if (zero_point>0) {
        ctx.strokeText('0', 1, zero_point+5);
    }
}

function plot2D(canvas_id, data, stroke_style, filled) {
    if (typeof filled == 'undefined') filled = 0;
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);
    cvs.style.backgroundColor = settings.bgcolor;
    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length, settings.legend_border);
    var zero_point = 0;
    if (min_value<0&&max_value>0) {
    	var zero_point = scr.calcScreenXY(0, 0).y;
    }
    var spam = scr.calcScreenXY(0, data[0]);
    var ctx = cvs.getContext('2d');
    drawAxis(ctx, cvs.height, cvs.width, zero_point);
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
	    ctx.lineTo(cvs.width, cvs.height-settings.legend_border);
        ctx.lineTo(settings.legend_border, cvs.height-settings.legend_border);
	    ctx.fill();
    } else {
    	ctx.stroke();
    }
    drawValues(ctx, cvs.height, data, zero_point);
}

function bar2D(canvas_id, data, fill_style) {
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);
    cvs.style.backgroundColor = settings.bgcolor;
    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length, settings.legend_border);
    var zero_point = 0;
    if (min_value<0&&max_value>0) {
    	var zero_point = scr.calcScreenXY(0, 0).y;
    }
    var ctx = cvs.getContext('2d');
    drawAxis(ctx, cvs.height, cvs.width, zero_point);
    ctx.fillStyle = fill_style;
    width = parseInt(cvs.width/data.length*2/3);
    for (i=0; i<data.length; i++) {
    	spam = scr.calcScreenXY(i, data[i]);
    	ctx.fillRect(parseInt(i*(cvs.width-settings.legend_border)/data.length)+settings.legend_border, spam.y, width, cvs.height-spam.y-settings.legend_border);
    }
    drawValues(ctx, cvs.height, data, zero_point);
}

function filledPlot2D(canvas_id, data, fill_style) {
    plot2D(canvas_id, data, fill_style, 1);
}

function clearCanvas(cvs) {
    var ctx = cvs.getContext('2d');
    ctx.clearRect(0,0,cvs.width,cvs.height);
}