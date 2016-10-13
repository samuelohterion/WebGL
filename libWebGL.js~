/*============ Creating a canvas =================*/

function createGLForCanvas( canvasID ) {

	var cv = document.getElementById( 'canvasID' );
	return cv.getContext( 'experimental-webgl' );

}

function createVectorArrayF32( datas ) {
	
	var buffer = gl.createBuffer( );
	gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( datas ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ARRAY_BUFFER, null );
	return buffer;
}

function createIndexArrayUI16( datas ) {
	
	var buffer = gl.createBuffer( );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( datas ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
	return buffer;
}

function createShader( shaderScript, shaderType ) {

	var shader = gl.createShader( shaderType );
	gl.shaderSource( shader, shaderScript );
	gl.compileShader( shader );
	return shader;
}

function createShaderProgram( vShader, fShader ) {
	
	var shaderProgram = gl.createProgram( );
	gl.attachShader( shaderProgram, vShader );
	gl.attachShader( shaderProgram, fShader );
	gl.linkProgram( shaderProgram );
	gl.useProgram( shaderProgram );
	return shaderProgram;
}


/*========== Datas =========*/

var vertices = [

	-.95, -.95, +.0,
	+.95, -.95, +.0,
	+.95, +.95, +.0,
	-.95, +.95, +.0 
];

var colors = [

	1.0, 0.0, 0.0,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0,
	0.3, 0.3, 0.3
];

indices = [

	0, 1, 2,
	2, 3, 0
];



/*========== Defining and storing the geometry =========*/


var vertexBuffer = createVectorArrayF32( vertices );

var indexBuffer = createIndexArrayUI16( indices );

var colorBuffer =  createVectorArrayF32( colors );
			

/*====================== Shaders =======================*/

var vertShader = createShader( " \
	attribute vec3 coordinates; \
	attribute vec3 color; \
	varying   vec3 vColor; \
	void main( void ) { \
	    gl_Position = vec4( coordinates, 1. ); \

	    vColor = color; \
	}",
	 gl.VERTEX_SHADER );


var fragShader = createShader( 
	"precision mediump float;" +
	"varying vec3 vColor;" +
	"void main( void ) {" +
	"	gl_FragColor = vec4( vColor, 1. );" +
	"}",
	 gl.FRAGMENT_SHADER );

// Create a shader program object to
// store the combined shader program
var shaderProgram = createShaderProgram( vertShader, fragShader );


/* ======= Associating shaders to buffer objects =======*/

// Bind vertex buffer object
gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );

// Bind index buffer object
gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBuffer ); 

// Get the attribute location
var coord = gl.getAttribLocation( shaderProgram, "coordinates" );

// Point an attribute to the currently bound VBO
gl.vertexAttribPointer( coord, 3, gl.FLOAT, false, 0, 0 );

// Enable the attribute
gl.enableVertexAttribArray( coord ) ;


// bind the color buffer
gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer ); 

var color = gl.getAttribLocation( shaderProgram, "color" );

gl.vertexAttribPointer( color, 3, gl.FLOAT, false, 0, 0 );

gl.enableVertexAttribArray( color );

/*============= Drawing the Quad ================*/

// Clear the canvas
gl.clearColor( .5, .5, .5, .9 );

// Enable the depth test
gl.enable( gl.DEPTH_TEST );

// Clear the color buffer bit
gl.clear( gl.COLOR_BUFFER_BIT );

// Set the view port
gl.viewport( 0, 0, cv.width, cv.height );

// Draw the triangle
gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );

