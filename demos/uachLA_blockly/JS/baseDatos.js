
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

function pushFirebase(id_usuario,acierto,intentos,accion,coordenada) {
  // body...
  firebase.database().ref('datos/').push({
      timestamp: Date.now(),
      usuario: id_usuario,
      acierto: acierto,
      numIntentos: intentos,
      accion: accion,
      posicion: coordenada
    });
}
pushFirebase(1,'NULL','NULL','CARGAR NIVEL','NULL');

