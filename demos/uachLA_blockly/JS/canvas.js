/*=============================================
ANIMACION REQUEST ANIMATION FRAME
=============================================*/

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#lienzo");
var ctx = canvas.getContext("2d");

/*=============================================
PROPIEDADES DEL OBJETO JUGADOR
=============================================*/

var jugador = {
	x: 35,
	y: 85,
	ancho: 30,
	alto: 30,
	color: "red",
	movimiento_x: 0,
	movimiento_y: 0,
	velocidad: 3,
	x1: null,
	x2: null,
	y1: null,
	y2: null
}

/*=============================================
PROPIEDADES DEL OBJETO BLOQUES
=============================================*/

var bloques = [{x:0, y:0, ancho: 400, alto: 10, x1:null, x2:null, y1:null, y2:null, color: "black"},
               {x:0, y:0, ancho: 10, alto: 400, x1:null, x2:null, y1:null, y2:null},
               {x:0, y:390, ancho: 400, alto: 10, x1:null, x2:null, y1:null, y2:null},
               {x:390, y:0, ancho: 10, alto: 400, x1:null, x2:null, y1:null, y2:null},

               {x:60, y:50, ancho:280, alto:10, x1:null, x2:null, y1:null, y2:null},
			   {x:60, y:140, ancho:100, alto:10, x1:null, x2:null, y1:null, y2:null},
			   {x:240, y:140, ancho:100, alto:10, x1:null, x2:null, y1:null, y2:null},
			   {x:150, y:140, ancho:10, alto:170, x1:null, x2:null, y1:null, y2:null},
			   {x:150, y:300, ancho:190, alto:10, x1:null, x2:null, y1:null, y2:null},
			   {x:240, y:220, ancho:100, alto:10, x1:null, x2:null, y1:null, y2:null},
			   {x:240, y:140, ancho:10, alto:80, x1:null, x2:null, y1:null, y2:null}
			   ];

/*=============================================
PROPIEDADES DEL OBJETO DATOS
=============================================*/	
var datos = {
	izquierda: false,
	derecha: false,
	arriba: false,
	abajo: false,
}

/*=======================================
=            metodos eventos            =
=======================================*/
function Arriba(){
	// for (var i = 0; i <= 75; i++) {
		jugador.y -= 75;
	// }
}
function Abajo(){
	jugador.y += 75;
}
function Derecha(){
	// for (var i = 0; i <= 75; i++) {
		jugador.x += 75;
	// }
}
function Izquierda(){
	jugador.x -= 75;
}




/*=============================================
METODOS DEL OBJETO JUEGO
=============================================*/			   

var juego = {

	 teclado: function(){

	 	/*=============================================
		EVENTOS TECLADO
		=============================================*/

		document.addEventListener("keydown", juego.oprimir)
		document.addEventListener("keyup", juego.soltar)

	 },

	 oprimir: function(tecla){

	 	/*=============================================
		OPRIMIR TECLADO
		=============================================*/
	 	
	 	// tecla.preventDefault();
	 	switch(tecla.keyCode){
	 		case 37: datos.izquierda = true; break;
	 		case 38: datos.arriba = true; break;
	 		case 39: datos.derecha = true; break;
	 		case 40: datos.abajo = true; break;
	 	}

	 },

	 soltar: function(tecla){

	 	/*=============================================
		SOLTAR TECLADO
		=============================================*/

	 	// tecla.preventDefault();
	 	switch(tecla.keyCode){
	 		case 37: datos.izquierda = false; break;
	 		case 38: datos.arriba = false; break;
	 		case 39: datos.derecha = false; break;
	 		case 40: datos.abajo = false; break;
	 	}

	 },

	 tiempo: function(){

	 	/*=============================================
		MOVIMIENTO HORIZONTAL JUGADOR
		=============================================*/

	 	jugador.x += jugador.movimiento_x;
	 	
	 	if(datos.izquierda){jugador.movimiento_x = -jugador.velocidad; jugador.movimiento_y = 0}
	 	if(datos.derecha){jugador.movimiento_x = jugador.velocidad; jugador.movimiento_y = 0}
	 	if(!datos.izquierda && !datos.derecha){jugador.movimiento_x = 0}

	 	/*=============================================
		MOVIMIENTO VERTICAL JUGADOR
		=============================================*/

	 	jugador.y += jugador.movimiento_y;
	 	
	 	if(datos.arriba){jugador.movimiento_y = -jugador.velocidad; jugador.movimiento_x = 0}
	 	if(datos.abajo){jugador.movimiento_y = jugador.velocidad; jugador.movimiento_x = 0}
	 	if(!datos.arriba && !datos.abajo){jugador.movimiento_y = 0}

	 	/*=============================================
		COLISIONES
		=============================================*/
		for(var i = 0; i < bloques.length; i++){

			jugador.x1 = jugador.x;
			jugador.x2 = jugador.x + jugador.ancho;
			jugador.y1 = jugador.y;
			jugador.y2 = jugador.y + jugador.alto;

			bloques[i].x1 = bloques[i].x;
			bloques[i].x2 = bloques[i].x + bloques[i].ancho;
			bloques[i].y1 = bloques[i].y;
			bloques[i].y2 = bloques[i].y + bloques[i].alto; 

			function colisiones(){

				//NO COLISIÓN DE IZQ A DER
				if(jugador.x2 < bloques[i].x1){return false}
				//NO COLISIÓN DE DER A IZQ
				if(jugador.x1 > bloques[i].x2){return false}
				//NO COLISIÓN DE ARRIBA HACIA ABAJO
				if(jugador.y2 < bloques[i].y1){return false}
				//NO COLISIÓN DE ABAJO HACIA ARRIBA
				if(jugador.y1 > bloques[i].y2){return false}

				return true;
			}

			colisiones();

			//COLISIÓN DE IZQ A DER
			if(colisiones() && jugador.x2 < bloques[i].x1 + jugador.movimiento_x){

				jugador.x = 35;
				jugador.y = 85;
				jugador.movimiento_x = 0;
			}

			//COLISIÓN DE DER A IZQ
			if(colisiones() && jugador.x1 - jugador.movimiento_x > bloques[i].x2){
						
				jugador.x = 35;
				jugador.y = 85;
				jugador.movimiento_x = 0;
			}

			//COLISIÓN DE ARRIBA HACIA ABAJO
			if(colisiones() && jugador.y2 < bloques[i].y1 + jugador.movimiento_y){
				
				jugador.x = 35;
				jugador.y = 85;
				jugador.movimiento_y = 0;
			}

			//COLISIÓN DE ABAJO HACIA ARRIBA
			if(colisiones() && jugador.y1 - jugador.movimiento_y > bloques[i].y2){
						
				jugador.x = 35;
				jugador.y = 85;
				jugador.movimiento_y = 0;
			}

		}

		

	 	/*=============================================
		CANVAS
		=============================================*/

	 	juego.canvas();

	 	/*=============================================
		ACTIVAR LINEA DE TIEMPO PARA EL METODO TIEMPO
		=============================================*/

		frame(juego.tiempo)
	},

	canvas: function(){

		/*=============================================
		CANVAS
		=============================================*/

		//BORRAMOS LIENZO

		ctx.clearRect(0,0,canvas.width,canvas.height);

		//DIBUJAR JUGADOR

		ctx.fillStyle=jugador.color;
		ctx.fillRect(jugador.x,jugador.y,jugador.ancho,jugador.alto);

		//DIBUJAR BLOQUES

		ctx.fillStyle=bloques[0].color;

		for(var i = 0; i < bloques.length; i ++){

			ctx.fillRect(bloques[i].x, bloques[i].y, bloques[i].ancho, bloques[i].alto);	
		}
	}
}
	
// juego.teclado();
juego.tiempo();