
Blockly.Blocks['direction_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Arriba")
        // .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/png/512/0/3.png", 50, 50, "Arriba"));        
        .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/svg/959/959139.svg", 50, 50, "Arriba"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("arriba");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['direction_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Abajo")
        .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/png/512/959/959141.png", 50, 50, "Abajo"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(170);
 this.setTooltip("Abajo");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['direction_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Izquierda")
        .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/svg/959/959142.svg", 50, 50, "Izquierda"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
 this.setTooltip("Izquierda");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['direction_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Derecha")
        .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/png/512/959/959140.png", 50, 50, "Derecha"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
 this.setTooltip("Derecha");
 this.setHelpUrl("");
  }
};



/*{
  "type": "direction_up",
  "message0": "Arriba %1",
  "args0": [
    {
      "type": "field_image",
      "src": "https://image.flaticon.com/icons/png/512/0/3.png",
      "width": 50,
      "height": 50,
      "alt": "Arriba"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "arriba",
  "helpUrl": ""
}*/