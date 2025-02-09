/**
 * Created by USER on 31/05/2016.
 */

Blockly.Blocks['inicio'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Inicio del Programa");
        this.setNextStatement(true, null);
        this.setColour(colorPygmo.verde);
        this.setTooltip('');
    }
};

Blockly.JavaScript['inicio'] = function(block) {
    return '';
};

Blockly.Blocks['draw_start_function'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Funcion dibujar estrella",'name');
        this.setNextStatement(true, null);
        this.setColour(colorPygmo.verde);
        this.setTooltip('');
    }
};

Blockly.JavaScript['draw_start_function'] = function(block) {
    return '';
};

Blockly.Blocks['draw_start_implement'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Dibujar Estrella",'name');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPygmo.verde);
        this.setTooltip('');
    }
};

Blockly.JavaScript['draw_start_implement'] = function(block) {
    var code = getcodeTree(getBlock(BlocklyGames.workspace,"draw_start_function"));
    return code.replace(/count/gi,"i");
};

