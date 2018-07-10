/*=============================================
ANIMACION REQUEST ANIMATION FRAME
=============================================*/

/*  son las versiones para navegadores antiguos
	window.mozRequestAnimationFrame, 
	window.webkitRequestAnimationFrame 
	window.msRequestAnimationFrame;*/

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#lienzo");
var ctx = canvas.getContext("2d");

var sprite =  new Image();
sprite.src = "IMG/opcion1.png";

var movimiento_Sprite = false;
var ubicacioneX = 0;
var numero = 0;
var animacion;
var jugador_posX_final;
var jugador_posY_final;
var indiceArreglo = 0;
var sumaPos = true;
var numBloques = 0;
var evaluaBloques = false;

/*=============================================
			PROPIEDADES DE LOS DATOS
=============================================*/
var intentos_Totales = 0;
var aciertos_Bloques = 0;
var aciertos_CuadroTexto = 0;
var aciertos_Totales = 0;
var desacierto_Bloques = 0; // llego a otro resultado
var desaciertos_CuadroTexto = 0; //resultado errado
var desaciertos_CaminoErrado = 0; // lo intento y choco con una pared  o  se fue a un camino donde no habia nada
var desacierto_Totales = 0;

// var respuestas = [] ;



/*=============================================
		PROPIEDADES DEL OBJETO JUGADOR
=============================================*/

var jugador = {
	x: 35,
	y: 75,
	ancho: 50,
	alto: 50,
	color: "red",
	movimiento_x: 0,
	movimiento_y: 0,
	velocidad: 1,
	x1: null,
	x2: null,
	y1: null,
	y2: null
};

/*=============================================
PROPIEDADES DE LOS NIVELES
=============================================*/

var nivel_1 = {
	posX_respuesta_correcta: 335,
	posY_respuesta_correcta: 225,
	posX_respuesta_incorrecta_1: 225,
	posY_respuesta_incorrecta_1: 75
};

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
			   {x:240, y:210, ancho:100, alto:10, x1:null, x2:null, y1:null, y2:null},
			   {x:240, y:140, ancho:10, alto:80, x1:null, x2:null, y1:null, y2:null}
			   ];

/*=======================================
=          INGRESO DE BLOQUES           =
=======================================*/ 
var arreglo_bloques = [];
var borrarArreglo = false;

function Arriba(){
	arreglo_bloques.push("arriba");
	numBloques++;
}
function Abajo(){
	arreglo_bloques.push("abajo");
	numBloques++;
}
function Derecha(){
	arreglo_bloques.push("derecha");
	numBloques++;
}
function Izquierda(){
	arreglo_bloques.push("izquierda");
	numBloques++;
}


/*===========================================================
=               RESETIANDO VALORES DEL JUEGO                =
===========================================================*/
function reset(){
	jugador.x = 35;
	jugador.y = 75;
	jugador.movimiento_x = 0;
	borrarArreglo = true;
	permitir = false;
	indiceArreglo = 0;
	sumaPos = true;
	movimiento_Sprite = false;
	numBloques = 0;
}


/*=============================================
			METODOS DEL OBJETO JUEGO
=============================================*/			   

var juego = {

	 tiempo: function(){
	 	/*=============================================
				BORRA EL ARREGLO DE BLOQUES
		=============================================*/
	 	if(borrarArreglo){
	 		if(arreglo_bloques.length != 0){
				arreglo_bloques.pop()
			}else{

				borrarArreglo = false;
			}
	 	}

	 	/*=============================================
					MOVIMIENTOS JUGADOR
		=============================================*/
	 	if(arreglo_bloques.length != 0 && permitir == true){

	 		/*=============================================
			MOVIMIENTO HORIZONTAL JUGADOR
			=============================================*/

			if(arreglo_bloques[indiceArreglo] == "derecha" && indiceArreglo < arreglo_bloques.length){
				movimiento_Sprite = true;
				if(sumaPos){
					jugador_posX_final = jugador.x + 75;
					sumaPos =false;
				}

				jugador.movimiento_x = jugador.velocidad;

				if(jugador.x != jugador_posX_final){
					jugador.x += jugador.movimiento_x;
				}else{
					indiceArreglo++;
					sumaPos=true;
					movimiento_Sprite = false;
				}
			}


			if(arreglo_bloques[indiceArreglo] == "izquierda" && indiceArreglo < arreglo_bloques.length){
				movimiento_Sprite = true;
				if(sumaPos){
					jugador_posX_final = jugador.x - 75;
					sumaPos =false;
				}

				jugador.movimiento_x = -jugador.velocidad;

				if(jugador.x != jugador_posX_final){
					jugador.x += jugador.movimiento_x;
				}else{
					indiceArreglo++;
					sumaPos=true;
					movimiento_Sprite = false;
				}
			}	
			/*=============================================
			MOVIMIENTO VERTICAL JUGADOR
			=============================================*/

			if(arreglo_bloques[indiceArreglo] == "arriba" && indiceArreglo < arreglo_bloques.length){
				movimiento_Sprite = true;
				if(sumaPos){
					jugador_posY_final = jugador.y - 75;
					sumaPos =false;
				}

				jugador.movimiento_y = -jugador.velocidad;

				if(jugador.y != jugador_posY_final){
					jugador.y += jugador.movimiento_y;
				}else{
					indiceArreglo++;	
					sumaPos=true;
					movimiento_Sprite = false;
				}
			}

			if(arreglo_bloques[indiceArreglo] == "abajo" && indiceArreglo < arreglo_bloques.length){
				movimiento_Sprite = true;
				if(sumaPos){
					jugador_posY_final = jugador.y + 75;
					sumaPos =false;
				}

				jugador.movimiento_y = jugador.velocidad;

				if(jugador.y != jugador_posY_final){
					jugador.y += jugador.movimiento_y;
				}else{
					indiceArreglo++;
					sumaPos=true;
					movimiento_Sprite = false;
				}
			}

		 	if(indiceArreglo == arreglo_bloques.length){
		 		permitir = false;
		 		evaluaBloques = true;
		 	}
	 	}

	 	/*=============================================
			 TAMA DE DATOS CUANDO NO INGRESA BLOQUES
			=============================================*/
	 	if(permitir && arreglo_bloques.length == 0){
	 		// console.log("respuesta bloques incorrecta")
	 		intentos_Totales++;
	 		desacierto_Bloques++;
	 		desacierto_Totales++;
	 		permitir = false;
		 	Respuesta()
	 		RespuestaBloques();
	 	}
	 	/*=============================================
			TOMA DE DATOS AL FINAL DEL RECORRIDO
			=============================================*/
	 	if(evaluaBloques){
		 	
		 	if(jugador.x == nivel_1.posX_respuesta_correcta && jugador.y == nivel_1.posY_respuesta_correcta){
		 		// console.log("respuesta bloques correcta")
		 		intentos_Totales++;
		 		aciertos_Bloques++;
		 		aciertos_Totales++;
		 	}else{
		 		// console.log("respuesta bloques incorrecta")
		 		intentos_Totales++;
		 		desacierto_Bloques++;
		 		desacierto_Totales++;
		 	}	
		 	Respuesta()
		 	RespuestaBloques()
		 	evaluaBloques = false;
		}


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
				jugador.y = 75;
				jugador.movimiento_x = 0;
			}

			//COLISIÓN DE DER A IZQ
			if(colisiones() && jugador.x1 - jugador.movimiento_x > bloques[i].x2){
						
				jugador.x = 35;
				jugador.y = 75;
				jugador.movimiento_x = 0;
			}

			//COLISIÓN DE ARRIBA HACIA ABAJO
			if(colisiones() && jugador.y2 < bloques[i].y1 + jugador.movimiento_y){
				
				jugador.x = 35;
				jugador.y = 75;
				jugador.movimiento_y = 0;
			}

			//COLISIÓN DE ABAJO HACIA ARRIBA
			if(colisiones() && jugador.y1 - jugador.movimiento_y > bloques[i].y2){
						
				jugador.x = 35;
				jugador.y = 75;
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

		animacion = frame(juego.tiempo)
	},

	canvas: function(){

		/*=============================================
		CANVAS
		=============================================*/

		if(numero >= 600){numero = 0}else{numero+=10}

		for(var i = 0; i <= numero; i+=100){

			if(numero >= i){ubicacionX = i}
		}
		//BORRAMOS LIENZO

		ctx.clearRect(0,0,canvas.width,canvas.height);

		//DIBUJAR JUGADOR

		ctx.clearRect(0,0,canvas.width,canvas.height);

		if (movimiento_Sprite) {
			ctx.drawImage(sprite, ubicacionX, 0, 100, 100, jugador.x, jugador.y,jugador.ancho,jugador.alto);
		}else{
			ctx.drawImage(sprite, 0, 0, 100, 100, jugador.x, jugador.y,jugador.ancho,jugador.alto);
		}

		//DIBUJAR BLOQUES
		ctx.fillStyle = bloques[0].color;

		for(var i = 0; i < bloques.length; i ++){

			ctx.fillRect(bloques[i].x, bloques[i].y, bloques[i].ancho, bloques[i].alto);	
		}
	}
}
	
juego.tiempo();


/*======================================
=        Respuesta Caja Txt            =
======================================*/
function Respuesta(){
	var res_numerador = document.getElementById("Numerador").value;
	var res_Denominador = document.getElementById("Denominador").value;

	if(res_numerador > 0 && res_Denominador > 0 && res_numerador == 11 && res_Denominador== 2){
		// console.log("respuesta caja de txt correcta")
	    aciertos_CuadroTexto++;
	    aciertos_Totales++;
	}else{
	    // console.log("respuesta caja de txt incorrecta")
	    desaciertos_CuadroTexto++;
	    desacierto_Totales++;
	}
}

function RespuestaBloques(){
	console.log("intentos ==> "+intentos_Totales)
	console.log("aciertos bloques ==> "+aciertos_Bloques)
	console.log("aciertos texto == >"+aciertos_CuadroTexto)
	console.log("aciertos totales ==> "+aciertos_Totales)
	console.log("desaciertos bloques ==> "+desacierto_Bloques)
	console.log("desaciertos texto ==> "+desaciertos_CuadroTexto)
	console.log("desaciertos camino errado ==> "+desaciertos_CaminoErrado)
	console.log("desaciertos totales ==> "+desacierto_Totales)
}