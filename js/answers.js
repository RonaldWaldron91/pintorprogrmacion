/**
 * Blockly Games: Pintor Graphics Answers
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Sample answers for Pintor levels. Used for prompts and marking.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';


/**
 * Sample solutions for each level.
 * To create an answer, just solve the level in Blockly, then paste the
 * resulting JavaScript here, moving any functions to the beginning of
 * this function.
 */
Pintor.answer = function() {
  // Helper functions.  
  function drawStar(length) {
    for (var count = 0; count < 5; count++) {
      Pintor.move(length);
      Pintor.turn(144);
    }
  }

  function drawCircle(radio){
    for (var count = 0; count < 360; count++) {
      Pintor.move(radio);
      Pintor.move(-1*radio);
      Pintor.turn(1);
    }
  }

  function drawSquare(length){
    for (var count = 0; count < 4; count++) {
      Pintor.move(length);
      Pintor.turn(90);
    }
  }

  switch (BlocklyGames.LEVEL) {
    case 1:
      // Square.
      for (var count = 0; count < 4; count++) {
        Pintor.move(100);
        Pintor.turn(90);
      }
      break;
    case 2:
      // Pentagon.
      for (var count = 0; count < 5; count++) {
        Pintor.move(100);
        Pintor.turn(72);
      }
      break;
    case 3:
      Pintor.penColour('#ff00ff');
      for (var count = 0; count < 8; count++) {
        Pintor.move(50);
        Pintor.turn(45);
      }
       break;
    case 4:
      // Star.
      Pintor.penColour('#00ff00');
      drawStar(100);
      break;

    case 5:
      Pintor.penColour('#ff00ff');
      for (var count = 0; count < 6; count++) {
          Pintor.turn(60);
          for(var i = 0; i < 3; i++){
            Pintor.move(100);
            Pintor.turn(120)
          }
      }
      break;

    case 6:
      Pintor.penColour('#ff00ff');
      for (var count = 0; count < 4; count++) {
        for(var i = 0; i < 2; i++){
          Pintor.move(50);
          Pintor.turn(60);
          Pintor.move(50);
          Pintor.turn(120);
        }
        Pintor.turn(90);
      }
        break;

    case 7:
      Pintor.penColour('#196F3D');
      for (var count = 0; count < 4; count++) {
        Pintor.move(50);
        Pintor.turn(90);
      }
      Pintor.penDown(false);
      Pintor.move(100);
      Pintor.penDown(true);
      for (var count = 0; count < 4; count++) {
        Pintor.move(50);
        Pintor.turn(90);
      }
      break;
    case 8:
      Pintor.penColour('#FF8C00');
      for (var count = 0; count < 4; count++) {
        Pintor.move(100);
        Pintor.turn(-90);
      }
      Pintor.penDown(false);
      Pintor.turn(90);
      Pintor.move(100);
      Pintor.penDown(true);
      for (var count = 0; count < 360; count++) {
        Pintor.move(50);
        Pintor.move(-50);
        Pintor.turn(1);
      }
      break;

    case 9:
      Pintor.penColour('#ff0000');
      for (var count = 0; count < 4; count++) {
        Pintor.penDown(false);
        Pintor.move(150);
        Pintor.turn(90);
        Pintor.penDown(true);
        drawStar(50);
      }
      break;

    case 10:
      Pintor.penColour('#ff0000');
      Pintor.penDown(false);
      Pintor.move(50);
      Pintor.penDown(true);
      for(var i = 0 ; i < 3 ; i++){
          for(var k = 0 ; k < 360 ; k++){
            Pintor.move(50);
            Pintor.move(-50);
            Pintor.turn(1);
          }
        Pintor.turn(-120);
        Pintor.penDown(false);
        Pintor.move(150);
        Pintor.penDown(true);
      }
          break;
    case 11:
      Pintor.penColour('#0098DA');
      drawStar(50);
      Pintor.turn(120);
      Pintor.penDown(false);
      Pintor.move(100);
      Pintor.penDown(true);
      drawSquare(50);
      Pintor.turn(120);
      Pintor.penDown(false);
      Pintor.move(100);
      Pintor.penDown(true);
      drawCircle(50);
      break;
    case 12:
      // Dibujar Luna
      Pintor.penColour('#ff0000');
      drawCircle(50);
      Pintor.turn(-90);
      Pintor.move(20);
      Pintor.penColour('#ffffff');
      drawCircle(50);
      break;    
  }
};

/**
 * Validate whether the user's answer is correct.
 * @param {number} pixelErrors Number of pixels that are wrong.
 * @return {boolean} True if the level is solved, false otherwise.
 */
Pintor.isCorrect = function(pixelErrors) {
  if (BlocklyGames.LEVEL == BlocklyGames.MAX_LEVEL) {
    // Any non-null answer is correct.
    return BlocklyGames.workspace.getAllBlocks().length > 1;
  }
  console.log('Pixel errors: ' + pixelErrors);
  if (pixelErrors > 100) {
    // Too many errors.
    return false;
  }
  return true;
};
