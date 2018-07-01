var workspacePlayground = Blockly.inject('blocklyDiv',
          {
            horizontalLayout:true,
            toolbox: document.getElementById('toolbox'),
            maxBlocks:6,
            toolboxPosition:"end",
            trashcan: true,/*
            zoom:
              {controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2},*/
            grid:
               {spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true}

            // rtl:true
          }
        );

