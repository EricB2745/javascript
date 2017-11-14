var prescription = new Object()
var trans_prescription = new Object()

prescription.sphere = 0;
prescription.cylinder = 0;
prescription.axis = 0;

const radianPerDegree = Math.PI/180;
 

function validate_page()
{
	return false
}

function page_onload()
{
	draw_optical_cross();
	draw_eye_with_light();

}

function recalculate_page()
{
	writeStatus("recalculate_page")
	try {
		clear_canvas(1)
		clearOutput(1);
		calc_values()
		transpose()
		set_output()

		draw_optical_cross()
		draw_prescription()
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}	
}

function template()
{
	writeStatus("template")
	try {
		
	
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}

function sphere_keypress()
{
	writeStatus("sphere_keypress")
	try {
		//alert(event.target.value)
		prescription.sphere = Number(event.target.value)	
		recalculate_page()
	}	
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}	
	
function cylinder_keypress()
{
	writeStatus("cylinder_keypress")
	try {
		prescription.cylinder = Number(event.target.value)
		recalculate_page()
	}	
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}	
function axis_keypress()
{
	writeStatus("axis_keypress")
	try {
		prescription.axis = Number(event.target.value)
		recalculate_page()
	}	
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}	
function calc_values()
{
	writeStatus("calc_values")
	try {
		
		prescription.sphere_x_offset = Math.cos(prescription.axis*radianPerDegree) * 180
		prescription.sphere_y_offset = Math.sin(prescription.axis*radianPerDegree) * 180
		
		if (prescription.axis < 90)
		{
			prescription.axis_to_90 = prescription.axis + 90
		} else {
			prescription.axis_to_90 = prescription.axis - 90
		}
		prescription.power_at_axis_plus_90 = prescription.sphere + prescription.cylinder
		prescription.power_range = prescription.cylinder
		prescription.power_change_per_degree = prescription.power_range/90
		//prescription.power_at_zero = prescription.sphere+(prescription.axis*prescription.power_change_per_degree)
		prescription.offset_from_180 = 180-prescription.axis;
		prescription.offset_from_90 = Math.abs(prescription.axis-90)
		prescription.power_at_zero = prescription.sphere + (prescription.cylinder * Math.pow(Math.sin(prescription.offset_from_180*radianPerDegree),2))
		prescription.power_at_90 = prescription.sphere + (prescription.cylinder * Math.pow(Math.sin(prescription.offset_from_90*radianPerDegree),2))
		//m = s+c*sin()
		
	}	
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}	
	
function set_output()
{
	writeStatus("set_output")
	try {
		
		writeOutput("Transposes to "+ format_sphere(trans_prescription.sphere) + ", " + format_cylinder(trans_prescription.cylinder) + ", " + format_axis(trans_prescription.axis))
		writeOutput("")
		
		writeOutput("Power at "+prescription.axis + " is " + prescription.sphere)
		writeOutput("Power at "+prescription.axis_to_90+" is " + prescription.power_at_axis_plus_90.toFixed(2) + "D")
		writeOutput("")
		
		writeOutput("<b>Meridians</b>")
		writeOutput("90 " + prescription.power_at_90.toFixed(2) + "D")
		writeOutput("180 " + prescription.power_at_zero.toFixed(2) + "D")
		
		writeOutput("")
		writeOutput("---------------------------------------------")
		writeOutput("Offset from 180 is " + prescription.offset_from_180.toFixed(2))
		writeOutput("Offset x Radian="+prescription.offset_from_180*radianPerDegree)
		writeOutput("sin(Offset x Radian)="+Math.sin(prescription.offset_from_180*radianPerDegree))
		writeOutput("sin^2(Offset x Radian)="+Math.pow(Math.sin(prescription.offset_from_180*radianPerDegree),2))
		writeOutput("PI="+Math.PI)
		writeOutput("Radian="+radianPerDegree)
	}	
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}
		
function transpose()
{
	writeStatus("transpose")	
	try {
		trans_prescription.sphere = prescription.sphere + prescription.cylinder
		trans_prescription.cylinder = -prescription.cylinder

		if(prescription.axis>90)
		{
			trans_prescription.axis = prescription.axis-90
		}
		else
		{
			trans_prescription.axis = prescription.axis+90
		}
	
	}
	catch(err) {
		writeStatus("ERROR: " + err.message)
	}		
}

function format_sphere(sphere)
{
	writeStatus("format_sphere")
	try {
		var sReturn = "";
		if (sphere >0) {sReturn = "+"}
		return sReturn + sphere.toFixed(2)
	}	
	catch(err) {
		writeStatus(err.message)
	}		
}

function format_cylinder(cylinder)
{
	writeStatus("format_cylinder")
	try {
		var sReturn = "";
		if (cylinder >0) {sReturn = "+"}
		return sReturn + cylinder.toFixed(2)
	}	
	catch(err) {
		writeStatus(err.message)
	}		
}

function format_axis(axis)
{
	writeStatus("format_axis")
	try {

		return axis
	}	
	catch(err) {
		writeStatus(err.message)
	}		
}

function writeOutput(sValue)
{
	//alert(sValue)
	divOutput1.innerHTML = divOutput1.innerHTML + sValue + "<br>"
}

function writeStatus(sValue)
{
	//alert(sValue)
	divStatus.innerHTML = divStatus.innerHTML + sValue + "<br>"
}

function draw_optical_cross()
{
	writeStatus("draw_optical_cross")
	try {
		var canvas = document.getElementById("canvas1");
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.strokeStyle="#17202A";
		ctx.moveTo(10,200);
		ctx.lineTo(390,200);
		ctx.stroke();	

		ctx.moveTo(200, 10);
		ctx.lineTo(200, 390);
		ctx.stroke();	


		ctx.font = ".65em Veranda";
		ctx.strokeStyle="#BA4A00";
		ctx.fillText("0",10,210);
		ctx.fillText("180",375,210);
		ctx.fillText("90",203,18);

		// Draw the cornea
		ctx.beginPath();
		ctx.strokeStyle="#0000ff";  //Blue
		ctx.moveTo(380, 200);
		ctx.arc(200,200,85,0,2*Math.PI);
		ctx.stroke();			
		
		
	}
	catch(err) {
		writeStatus(err.message)
	}		
}

function draw_prescription()
{
	writeStatus("draw_prescription")
	try {
		var canvas = document.getElementById("canvas1");
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.strokeStyle="#ff0000"  //Red
		// x-axis
		ctx.moveTo(200-prescription.sphere_x_offset,200-prescription.sphere_y_offset);
		ctx.lineTo(200+prescription.sphere_x_offset,200+prescription.sphere_y_offset);
		// y-axis
		ctx.moveTo(200-prescription.sphere_y_offset,200+prescription.sphere_x_offset);
		ctx.lineTo(200+prescription.sphere_y_offset,200-prescription.sphere_x_offset);
		
		ctx.stroke();	
		
		
		// Draw circle or eclipse representing astigmatism
		ctx.beginPath();
		ctx.strokeStyle="#ff0000 ";  //Red
		x_radius = 80 
		y_radius = x_radius - (prescription.cylinder * 10)
		x_decrement = x_radius / 10
		y_decrement = y_radius / 10
		for (n=1; n<11; n++ )
		{
			ctx.ellipse(200, 200, x_radius, y_radius, (prescription.axis+90) * Math.PI/180, 0, 2 * Math.PI);
			ctx.stroke();
			x_radius = x_radius - x_decrement
			y_radius = y_radius - x_decrement
		}
	}
	catch(err) {
		writeStatus(err.message)
	}		
}

function checkVal()
{
	writeStatus("checkVal")
	try {
		var x = Number(txtValue.value)
		txtResult.value = Math.sin(x)
	
	}
	catch(err) {
		writeStatus(err.message)
	}		
}