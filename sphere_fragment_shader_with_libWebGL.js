var

gl1 = gtglcntnt( cnvs( "cv1" ),
gl2 = gtglcntnt( cnvs( "cv2" ),

vertexBuffer = createVectorArrayF32( vertices ),

indexBuffer = createIndexArrayUI16( indices ),

colorBuffer = createVectorArrayF32( colors ),


/*========== Datas =========*/

vertices = [
	
	-1.0, -1.0, +0.0,
	+1.0, -1.0, +0.0,
	+1.0, +1.0, +0.0,
	-1.0, +1.0, +0.0
],

colors = [
	0.0, 0.0, 1.0,
	1.0, 0.0, 0.0,
	0.0, 1.0, 0.0,
	0.3, 0.3, 0.3
],

indices = [

	0, 1, 2,
	2, 3, 0
];

/*========== Defining and storing the geometry =========*/
vertexBuffer = createVectorArrayF32( vertices ),

indexBuffer = createIndexArrayUI16( indices ),

colorBuffer = createVectorArrayF32( colors ),

vertShader = createShader('\
	attribute vec3 coordinates;\
	attribute vec3 color;\
	varying   vec3 vColor;\
	varying   vec3 vPosition;\
	void main( void ) {\
	\
		gl_Position = vec4( coordinates, 1. );\
		vColor = color;\
		vPosition = coordinates; \
   }', gl.VERTEX_SHADER),
   
fragShader = createShader(' \
   precision mediump float; \
   varying vec3 vColor; \
   varying vec3 vPosition; \
   void main( void ) { \
		if( dot( vPosition, vPosition ) < 1. ) { \
			gl_FragColor = vec4( sqrt( 1. - dot( vPosition, vPosition ) ) * vColor, 1. ); \
		} \
		else { \
			gl_FragColor = vec4( vPosition, 1. ); \
		}\
   }', gl.FRAGMENT_SHADER),

	
// Create a shader program object to
// store the combined shader program
shaderProgram = createShaderProgram(vertShader, fragShader);


/* ======= Associating shaders to buffer objects =======*/

// Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Bind index buffer object
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

// Get the attribute location
var coord = gl.getAttribLocation(shaderProgram, "coordinates");

// Point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

// Enable the attribute
gl.enableVertexAttribArray(coord);

// bind the color buffer
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

var color = gl.getAttribLocation(shaderProgram, "color");

gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(color);


/*============= Drawing the Quad ================*/

// Clear the canvas
gl.clearColor(.95, .95, .95, 1.);

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

// Clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// Set the view port
gl.viewport(0, 0, cv.width, cv.height);

// Draw the triangle
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
