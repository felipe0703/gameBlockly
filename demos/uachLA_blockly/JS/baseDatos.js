
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDHNQ8IdKrRXgeB4n3e3cpZZ8o2Tnjj5L8",
    authDomain: "laberinto-blockly.firebaseapp.com",
    databaseURL: "https://laberinto-blockly.firebaseio.com",
    projectId: "laberinto-blockly",
    storageBucket: "",
    messagingSenderId: "921421773825"
  };
  firebase.initializeApp(config);

function pushFirebase_bloques(id_usuario,nivel,accion,coordenada) {
  // body...
  firebase.database().ref('bloques/').push({
      Tiempo: Date.now(),
      Usuario: id_usuario,
      Nivel: nivel,
      Accion_Bloques: accion,
      Posicion_Bloques: coordenada
    });
}
pushFirebase_bloques(1,1,'CARGAR NIVEL','NULL');

function pushFirebase_datos(id_usuario,nivel, intentos_Totales, aciertos_Bloques, aciertos_CuadroTexto, aciertos_Totales, desacierto_Bloques, desaciertos_CuadroTexto, desaciertos_CaminoErrado, desacierto_Totales, numBloques) {
  // body...
  firebase.database().ref('datos/').push({
      Usuario: id_usuario,
      Nivel: nivel,
      Intentos: intentos_Totales,
      Aciertos_con_Bloques: aciertos_Bloques,
      Aciertos_con_Cuadro_Txt: aciertos_CuadroTexto,
      Aciertos_Totales: aciertos_Totales,
      Desaciertos_con_Bloques: desacierto_Bloques,
      Desaciertos_con_Cuadro_txt: desaciertos_CuadroTexto,
      Desaciertos_Camino_Errado: desaciertos_CaminoErrado,
      Desaciertos_Totales: desacierto_Totales,
      Numeros_de_Bloques: numBloques
    });
}

