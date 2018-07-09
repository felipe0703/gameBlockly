var intentos_Totales = 0;

var aciertos_Bloques = 0;
var aciertos_CuadroTexto = 0;
var aciertos_Totales = 0;

var desacierto_Bloques = 0; // llego a otro resultado
var desaciertos_CuadroTexto = 0; //resultado errado
var desaciertos_CaminoErrado = 0; // lo intento y choco con una pared  o  se fue a un camino donde no habia nada
var desacierto_Totales = 0;

var respuestas[8];

function Respuesta(){
  var res_numerador = document.getElementById("Numerador").value;
  var res_Denominador = document.getElementById("Denominador").value;

  if(res_numerador > 0 && res_Denominador > 0 && res_numerador == 11 && res_Denominador== 2){
    alert("correcto");
    aciertos_CuadroTexto++;
    aciertos_Totales++;
  }else{
    alert("no es correcto");
    desaciertos_CuadroTexto++;
    desacierto_Totales++;
  }
  intentos_Totales++;
  respuestas[0] = intentos_Totales;
  respuestas[1] = aciertos_CuadroTexto;
  respuestas[2] = desaciertos_CuadroTexto;
  /*respuestas[3] = aciertos_Bloques;
  respuestas[4] = desacierto_Bloques;
  respuestas[5] = desaciertos_CaminoErrado;
  respuestas[6] = aciertos_Totales;
  respuestas[7] = desacierto_Totales;*/

  console.log("aciertos cuadro de txt ==>"+aciertos_CuadroTexto);
  console.log("desaciertos cuadro de txt ==>"+desaciertos_CuadroTexto);
  console.log("aciertos totales ==>"+aciertos_Totales);
  console.log("desaciertos totales ==> "+desacierto_Totales);
  
  return respuestas;
}

function Enviar() {
  
 //en esta funcion deberia enviar los datos a la BD
}