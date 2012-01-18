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