var x_center = 200;
var y_center = 100;
var x_focal = 280;
var focal_length = 25;
var eye_power = 40;
var recommend_sphere = 0;

function draw_eye_with_light()
{
	// Sphere 
	clear_canvas(2);
	calculate_values();
	draw_eye(2);
	draw_light(2);
	draw_focal_point(2);
	draw_converge_light(2);
	clearOutput(2);
	fill_output2();
	
	// Cylinder
	clear_canvas(3);
	//calculate_values();
	draw_eye(3);
	draw_light(3);
	draw_focal_point(3);
	draw_converge_light(3);
	clearOutput(3);
	//fill_output2();
}

function clear_canvas(canvas_id)
{
	writeStatus("clear_canvas("+canvas_id+")")
	var canvas = document.getElementById("canvas"+canvas_id);
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function draw_eye(canvas_id)
{
	writeStatus("draw_eye")
	try {
		var canvas = document.getElementById("canvas"+canvas_id);
		var ctx = canvas.getContext("2d");
		
		ctx.beginPath();
		ctx.strokeStyle="#0000ff";  //Blue
		//ctx.moveTo(380, 200);
		ctx.arc(x_center,y_center,85,10,2*Math.PI-10);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.ellipse(x_center-70, y_center, 20, 45, Math.PI/180, 0, 2 * Math.PI);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.ellipse(x_center-70, y_center, 10, 25, Math.PI/180, 0, 2 * Math.PI);
		ctx.stroke();
		
	
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}

function draw_light(canvas_id)
{
	writeStatus("draw_light")
	try {
		var canvas = document.getElementById("canvas"+canvas_id);
		var ctx = canvas.getContext("2d");
		
		ctx.beginPath();
		ctx.strokeStyle="#FFA500";  //Orange

		var x1 = x_center-170;
		var x2 = x_center-70;

		draw_light_line(ctx, x1, y_center-20, x2, y_center-20);
		draw_light_line(ctx, x1, y_center-10, x2, y_center-10);
		draw_light_line(ctx, x1, y_center, x2, y_center);
		draw_light_line(ctx, x1, y_center+10, x2, y_center+10);
		draw_light_line(ctx, x1, y_center+20, x2, y_center+20);
	
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}

function draw_converge_light(canvas_id)
{
	writeStatus("draw_light")
	try {
		var canvas = document.getElementById("canvas"+canvas_id);
		var ctx = canvas.getContext("2d");
		
		ctx.beginPath();
		ctx.strokeStyle="#FFA500";  //Orange
		
		var x1 = x_center-70;
		
		draw_light_line(ctx, x1, y_center-20, x_focal, y_center);
		draw_light_line(ctx, x1, y_center-10, x_focal, y_center);	
		draw_light_line(ctx, x1, y_center, x_focal, y_center);
		draw_light_line(ctx, x1, y_center+10, x_focal, y_center);
		draw_light_line(ctx, x1, y_center+20, x_focal, y_center);		
	
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}

function draw_light_line(ctx, x1, y1, x2, y2)
{
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2)
		ctx.stroke();
}


function draw_focal_point(canvas_id)
{
	writeStatus("draw_focal_point")
	try {
		var canvas = document.getElementById("canvas"+canvas_id)
		var ctx = canvas.getContext("2d")
		
		ctx.beginPath();
		ctx.arc(x_focal, y_center, 4, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#003300';
		ctx.stroke();
	
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}

function calculate_values()
{
	writeStatus("calculate_values")
	try {
		// Our iris is at 130
		// Our retina surface is at 280
		// 280 - 130 = 150px 
		// Our scale is 150px = 25mm
		
		var focal_length_in_pixels = x_focal - 130
		
		focal_length = 25*(focal_length_in_pixels/150)
		eye_power = 1/(focal_length/1000)
		recommend_sphere = 40-eye_power;
		
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}

function fill_output2()
{
	writeStatus("fill_output2")
	try
	{
		writeOutput2("Eye power is "+eye_power.toFixed(2)+"d");
		writeOutput2("Focal length is "+focal_length.toFixed(2)+"mm");
		writeOutput2("Recommended sphere is "+recommend_sphere.toFixed(2)+"D");
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}			
}

function writeOutput2(sValue)
{
	//alert(sValue)
	divOutput2.innerHTML = divOutput2.innerHTML + sValue + "<br>"
}

function clearOutput(output_id)
{
	writeStatus("clearOutput("+output_id+")")
	try
	{
		//alert(sValue)
		div = document.getElementById("divOutput"+output_id)
		div.innerHTML = ""
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}	
}


function canvas2_mousedown()
{
	writeStatus("canvas2_mousedown")
	try {
		x_focal = event.offsetX 
		draw_eye_with_light();
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}