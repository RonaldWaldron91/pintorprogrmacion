/**
 * Blockly Games: Pintor Graphics Blocks
 *
 * Copyright 2012 Google Inc.
 * https://github.com/google/blockly-games
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Pintor Graphics application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Pintor.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('Blockly.Blocks.colour');
goog.require('Blockly.JavaScript.colour');
goog.require('Blockly.Blocks.lists');
goog.require('Blockly.JavaScript.lists');
goog.require('Blockly.Blocks.logic');
goog.require('Blockly.JavaScript.logic');
goog.require('Blockly.Blocks.loops');
goog.require('Blockly.JavaScript.loops');
goog.require('Blockly.Blocks.math');
goog.require('Blockly.JavaScript.math');
goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.JavaScript.procedures');
goog.require('Blockly.Blocks.texts');
goog.require('Blockly.JavaScript.texts');
goog.require('Blockly.Blocks.variables');
goog.require('Blockly.JavaScript.variables');
goog.require('BlocklyGames');

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['pintor_move'] = {
  /**
   * Block for moving forward or backwards.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Pintor_moveForward'), 'moveForward'],
         [BlocklyGames.getMsg('Pintor_moveBackward'), 'moveBackward']];
    this.setColour(colorPygmo.azul);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_moveTooltip'));
  }
};

Blockly.JavaScript['pintor_move'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return block.getFieldValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['pintor_move_internal'] = {
  /**
   * Block for moving forward or backwards.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Pintor_moveForward'), 'moveForward'],
         [BlocklyGames.getMsg('Pintor_moveBackward'), 'moveBackward']];
    var VALUES =
        [['20', '20'],
         ['50', '50'],
         ['100', '100'],
         ['150', '150']];
    this.setColour(colorPygmo.azul);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR')
        .appendField(new Blockly.FieldDropdown(VALUES), 'VALUE')
        .appendField(" pixeles");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_moveTooltip'));
  }
};

Blockly.JavaScript['pintor_move_internal'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['pintor_turn'] = {
  /**
   * Block for turning left or right.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Pintor_turnRight'), 'turnRight'],
         [BlocklyGames.getMsg('Pintor_turnLeft'), 'turnLeft']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += ' \u21BB';
    DIRECTIONS[1][0] += ' \u21BA';
    this.setColour(colorPygmo.azul);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR')
        .appendField(" pixeles");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_turnTooltip'));
  }
};

Blockly.JavaScript['pintor_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return block.getFieldValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['pintor_turn_internal'] = {
  /**
   * Block for turning left or right.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Pintor_turnRight'), 'turnRight'],
         [BlocklyGames.getMsg('Pintor_turnLeft'), 'turnLeft']];
    var VALUES =
        [['1\u00B0', '1'],
         ['45\u00B0', '45'],
         ['60\u00B0', '60'],
         ['72\u00B0', '72'],   
         ['90\u00B0', '90'],
         ['120\u00B0', '120'],
         ['144\u00B0', '144']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += ' \u21BB';
    DIRECTIONS[1][0] += ' \u21BA';
    this.setColour(colorPygmo.azul);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR')
        .appendField(new Blockly.FieldDropdown(VALUES), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_turnTooltip'));
  }
};

Blockly.JavaScript['pintor_turn_internal'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['pintor_width'] = {
  /**
   * Block for setting the width.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(colorPygmo.azul);
    this.appendValueInput('WIDTH')
        .setCheck('Number')
        .appendField(BlocklyGames.getMsg('Pintor_setWidth'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_widthTooltip'));
  }
};

Blockly.JavaScript['pintor_width'] = function(block) {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'penWidth(' + width + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['pintor_pen'] = {
  /**
   * Block for pen up/down.
   * @this Blockly.Block
   */
  init: function() {
    var STATE =
        [[BlocklyGames.getMsg('Pintor_penUp'), 'penUp'],
         [BlocklyGames.getMsg('Pintor_penDown'), 'penDown']];
    this.setColour(colorPygmo.azul);
    this.appendDummyInput()
        .appendField("Pincel ")
        .appendField(new Blockly.FieldDropdown(STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_penTooltip'));
  }
};

Blockly.JavaScript['pintor_pen'] = function(block) {
  // Generate JavaScript for pen up/down.
  return block.getFieldValue('PEN') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['pintor_colour'] = {
  /**
   * Block for setting the colour.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(colorPygmo.magenta);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendField(BlocklyGames.getMsg('Pintor_setColour'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_colourTooltip'));
  }
};

Blockly.JavaScript['pintor_colour'] = function(block) {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'penColour(' + colour + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['pintor_colour_internal'] = {
  /**
   * Block for setting the colour.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(colorPygmo.magenta);
    this.appendDummyInput()
        .appendField(BlocklyGames.getMsg('Pintor_setColour'))
        .appendField(new Blockly.FieldColour("#0000ff"), "COLOUR");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_colourTooltip'));
  }
};

Blockly.JavaScript['pintor_colour_internal'] = function(block) {
  // Generate JavaScript for setting the colour.
  var colour = '\'' + block.getFieldValue('COLOUR') + '\'';
  return 'penColour(' + colour + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['pintor_visibility'] = {
  /**
   * Block for changing Pintor visiblity.
   * @this Blockly.Block
   */
  init: function() {
    var STATE =
        [[BlocklyGames.getMsg('Pintor_hidePintor'), 'hidePintor'],
         [BlocklyGames.getMsg('Pintor_showPintor'), 'showPintor']];
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(STATE), 'VISIBILITY');
    this.setTooltip(BlocklyGames.getMsg('Pintor_PintorVisibilityTooltip'));
  }
};

Blockly.JavaScript['pintor_visibility'] = function(block) {
  // Generate JavaScript for changing Pintor visibility.
  return block.getFieldValue('VISIBILITY') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['pintor_print'] = {
  /**
   * Block for printing text.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendField(BlocklyGames.getMsg('Pintor_print'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_printTooltip'));
  }
};

Blockly.JavaScript['pintor_print'] = function(block) {
  // Generate JavaScript for printing text.
  var argument0 = String(Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'print(' + argument0 + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['pintor_font'] = {
  /**
   * Block for setting the font.
   * @this Blockly.Block
   */
  init: function() {
    var FONTLIST =
        // Common font names (intentionally not localized)
        [['Arial', 'Arial'], ['Courier New', 'Courier New'], ['Georgia', 'Georgia'],
         ['Impact', 'Impact'], ['Times New Roman', 'Times New Roman'],
         ['Trebuchet MS', 'Trebuchet MS'], ['Verdana', 'Verdana']];
    var STYLE =
        [[BlocklyGames.getMsg('Pintor_fontNormal'), 'normal'],
         [BlocklyGames.getMsg('Pintor_fontItalic'), 'italic'],
         [BlocklyGames.getMsg('Pintor_fontBold'), 'bold']];
    this.setColour(160);
    this.appendDummyInput()
        .appendField(BlocklyGames.getMsg('Pintor_font'))
        .appendField(new Blockly.FieldDropdown(FONTLIST), 'FONT');
    this.appendDummyInput()
        .appendField(BlocklyGames.getMsg('Pintor_fontSize'))
        .appendField(new Blockly.FieldTextInput('18',
                     Blockly.FieldTextInput.nonnegativeIntegerValidator),
                     'FONTSIZE');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(STYLE), 'FONTSTYLE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Pintor_fontTooltip'));
  }
};

Blockly.JavaScript['pintor_font'] = function(block) {
  // Generate JavaScript for setting the font.
  return 'font(\'' + block.getFieldValue('FONT') + '\',' +
      Number(block.getFieldValue('FONTSIZE')) + ',\'' +
      block.getFieldValue('FONTSTYLE') + '\', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['pintor_repeat_internal'] = {
  /**
   * Block for repeat n times (internal number).
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROLS_REPEAT_TITLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TIMES",
          "options": [
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
            ['6', '6'],
            ['8', '8'],
            ['360', '360']
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": colorPygmo.amarillo,
      "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
    });
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
  }
};

Blockly.JavaScript['pintor_repeat_internal'] =
    Blockly.JavaScript['controls_repeat'];
