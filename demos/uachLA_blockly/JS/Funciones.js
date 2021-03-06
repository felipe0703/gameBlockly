var code;
var permitir;
/*=========================================
=            funciones botones            =
=========================================*/

Blockly.JavaScript['direction_up'] = function(block) {
  var code = 'Arriba();\n';
  return code;
};
Blockly.JavaScript['direction_down'] = function(block) {
  var code = 'Abajo();\n';
  return code;
};
Blockly.JavaScript['direction_right'] = function(block) {
  var code = 'Derecha();\n';
  return code;
};
Blockly.JavaScript['direction_left'] = function(block) {
  var code = 'Izquierda();\n';
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
        pushFirebase_bloques(1,1,"BLOCK_MOVE",event.newCoordinate);
    }
    if (event.type == Blockly.Events.BLOCK_DELETE) {
    	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    	pushFirebase_bloques(1,1,"BLOCK_DELETE",'NULL');
    }
    if (event.type == Blockly.Events.BLOCK_CREATE) {
    	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    	pushFirebase_bloques(1,1,"BLOCK_CREATE",'NULL');
    }
    if (event.type == Blockly.Events.BLOCK_CHANGE) {
    	code = Blockly.JavaScript.workspaceToCode(workspacePlayground);
    	pushFirebase_bloques(1,1,"BLOCK_CHANGE",'NULL');
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

function Ejecutar() {
	
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  workspacePlayground.traceOn(true);
  permitir = true;
  
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}

function Reset(){
  var runButton = document.getElementById('runButton');
  runButton.style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  workspacePlayground.traceOn(false);
  reset();
}
