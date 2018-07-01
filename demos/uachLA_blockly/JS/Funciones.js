var code;

/*=========================================
=            funciones botones            =
=========================================*/

Blockly.JavaScript['direction_up'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'arriba();\n';
  return code;
};
Blockly.JavaScript['direction_down'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'abajo();\n';
  return code;
};
Blockly.JavaScript['direction_right'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'derecha();\n';
  return code;
};
Blockly.JavaScript['direction_left'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'izquierda();\n';
  return code;
};


/*=====  End of funciones botones  ======*/

/*===========================================
=            generador de codigo            =
===========================================*/

function generarCodigo(event) {
    if (event.type == Blockly.Events.BLOCK_MOVE) {
        code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
        // document.getElementById('codigo').innerHTML = code;
        /*console.log(event.oldParentId)
        console.log(event.oldInputName)
		console.log(event.oldCoordinate)
		console.log(event.newParentId)
		console.log(event.newInputName)  
        console.log(event.newCoordinate)*/
        // console.log(code)
        pushFirebase(1,1,5,"BLOCK_MOVE",event.newCoordinate);
    }
    if (event.type == Blockly.Events.BLOCK_DELETE) {
    	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    	pushFirebase(1,1,5,"BLOCK_DELETE",'NULL');
    }
    if (event.type == Blockly.Events.BLOCK_CREATE) {
    	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    	pushFirebase(1,1,5,"BLOCK_CREATE",'NULL');
    }
    if (event.type == Blockly.Events.BLOCK_CHANGE) {
    	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    	pushFirebase(1,1,5,"BLOCK_CHANGE",'NULL');
    }
}
workspacePlayground.addChangeListener(generarCodigo);


/*=====  End of generador de codigo  ======*/

/*======================================
=            limite bloques            =
======================================*/

function onchange(event) {
      document.getElementById('capacity').textContent =
          workspacePlayground.remainingCapacity();
    }
workspacePlayground.addChangeListener(onchange);
onchange();


/*=====  End of limite bloques  ======*/

function arriba(){
	Arriba();
}
function abajo(){
	Abajo();
}
function derecha(){
	Derecha();
}
function izquierda(){
	Izquierda();
}

function Ejecutar() {
	// body...
	try {
	  eval(code);
	} catch (e) {
	  alert(e);
	}
}



