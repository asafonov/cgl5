function plot2D(canvas_id, data, stroke_style) {
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);

    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length);
    var spam = scr.calcScreenXY(0, data[0]);
    var ctx = cvs.getContext('2d');
    ctx.strokeStyle = stroke_style;
    ctx.beginPath();
    ctx.moveTo(spam.x, spam.y);
    for (i=1; i<data.length; i++) {
	spam = scr.calcScreenXY(i, data[i]);
	ctx.lineTo(spam.x, spam.y);
    }
    ctx.stroke();
}

function bar2D(canvas_id, data, fill_style) {
    var min_value = getMinArrayValue(data);
    var max_value = getMaxArrayValue(data);
    var cvs = document.getElementById(canvas_id);

    var scr = new screen2D(parseInt(cvs.width), parseInt(cvs.height), max_value, min_value, data.length);
    var ctx = cvs.getContext('2d');
    ctx.fillStyle = fill_style;
    width = parseInt(cvs.width/data.length*2/3);
    for (i=0; i<data.length; i++) {
	spam = scr.calcScreenXY(i, data[i]);
	ctx.fillRect(parseInt(i*cvs.width/data.length), spam.y, width, cvs.height-spam.y);
    }
}