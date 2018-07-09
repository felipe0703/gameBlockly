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
var posX_respuesta_correcta;
var posY_respuesta_correcta;

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
=            resetieando la posiscion del jugador           =
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
	 	// console.log(numBloques)
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
		 	}
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
		


		/*var img = document.getElementById("pj1");
		ctx.drawImage(img, jugador.x, jugador.y,jugador.ancho,jugador.alto);*/		
		//ctx.fillStyle = jugador.color;
		//ctx.fillRect(jugador.x,jugador.y,jugador.ancho,jugador.alto);

		//DIBUJAR BLOQUES
		ctx.fillStyle = bloques[0].color;

		for(var i = 0; i < bloques.length; i ++){

			ctx.fillRect(bloques[i].x, bloques[i].y, bloques[i].ancho, bloques[i].alto);	
		}
	}
}
	
juego.tiempo();


