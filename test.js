function mein() {
	var o = new Object( "obj" );
	o.i = 1;
	o.name = "hello world";
	document.getElementById( "obj" ).innerHTML = o.i + o.name;
}
