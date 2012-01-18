function getMaxArrayValue(data) {
    return Math.max.apply(Math, data);
}

function getMinArrayValue(data) {
    return Math.min.apply(Math, data);
}

var screen2D = function (screen_width, screen_height, max_value, min_value, step_counts) {
    var sw = screen_width;
    var sh = screen_height;
    var maxv = max_value;
    var minv = min_value;
    var sc = step_counts;

    this.calcScreenXY = function(x,y) {
	var val_x = parseInt(x*(sw/(step_counts-1)));
	var val_y = parseInt(y*sh/(max_value-min_value)-min_value*sh/(max_value-min_value));
	return {x:val_x, y:val_y}
    }
}