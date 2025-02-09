/**
 * Created by USER on 27/05/2016.
 */

'use strict';

BlocklyInterface.nextLevel = function() {
    if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL && !checkLevelStorage(BlocklyGames.MAX_LEVEL)) {
        window.location = window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1);
    } else if(getLevelStorage().length == BlocklyGames.MAX_LEVEL) {
        createDialog({
            titulo: "Felicitaciones",
            text: "Felicitaciones\nTodos los niveles han sido realizados con exitos",
            src:"img/edi_feliz.png"
        });
    }else{
        for(var i = 0; i < BlocklyGames.MAX_LEVEL ; i++){
            if(!checkLevelStorage(i+1)){
                window.location = window.location.protocol + '//' +
                    window.location.host + window.location.pathname +
                    '?lang=' + BlocklyGames.LANG + '&level=' + (i + 1);
                break;
            }
        }
    }
};


Pintor.init = function () {
    loadBlockly();

    // Prevent collisions with user-defined functions or variables.
    Blockly.JavaScript.addReservedWords('moveForward,moveBackward,' +
        'turnRight,turnLeft,penUp,penDown,penWidth,penColour,' +
        'hidePintor,showPintor,print,font');

    // Initialize the slider. Variacion de velocidad
    var sliderSvg = document.getElementById('slider');
    Pintor.speedSlider = new Slider(10, 35, 130, sliderSvg);

    Pintor.ctxDisplay = document.getElementById('display').getContext('2d');
    Pintor.ctxAnswer = document.getElementById('answer').getContext('2d');
    Pintor.ctxScratch = document.getElementById('scratch').getContext('2d');
    Pintor.drawAnswer();
    Pintor.reset();

    BlocklyGames.bindClick('runButton', Pintor.runButtonClick);
    BlocklyGames.bindClick('resetButton', Pintor.resetButtonClick);    
};

/*Dibujar la respuesta esperada en el answer canvas*/
Pintor.drawAnswer = function() {
    Pintor.reset();
    Pintor.answer();
    Pintor.ctxAnswer.globalCompositeOperation = 'copy';
    Pintor.ctxAnswer.drawImage(Pintor.ctxScratch.canvas, 0, 0);
    Pintor.ctxAnswer.globalCompositeOperation = 'source-over';
};

/**
 * Copy the scratch canvas to the display canvas. Add a Pintor marker.
 */
Pintor.display = function() {
    // Clear the display with black.
    Pintor.ctxDisplay.beginPath();
    Pintor.ctxDisplay.rect(0, 0,
        Pintor.ctxDisplay.canvas.width, Pintor.ctxDisplay.canvas.height);
    Pintor.ctxDisplay.fillStyle = '#ffffff';
    Pintor.ctxDisplay.fill();

    // Draw the answer layer.
    Pintor.ctxDisplay.globalCompositeOperation = 'source-over';
    Pintor.ctxDisplay.globalAlpha = 0.2;
    Pintor.ctxDisplay.drawImage(Pintor.ctxAnswer.canvas, 0, 0);
    Pintor.ctxDisplay.globalAlpha = 1;

    // Draw the user layer.
    Pintor.ctxDisplay.globalCompositeOperation = 'source-over';
    Pintor.ctxDisplay.drawImage(Pintor.ctxScratch.canvas, 0, 0);

    // Draw the Pintor.
    if (Pintor.visible) {
        // Make the Pintor the colour of the pen.
        Pintor.ctxDisplay.strokeStyle = Pintor.ctxScratch.strokeStyle;
        Pintor.ctxDisplay.fillStyle = Pintor.ctxScratch.fillStyle;

        // Draw the Pintor body.
        var radius = Pintor.ctxScratch.lineWidth / 2 + 10;
        Pintor.ctxDisplay.beginPath();
        Pintor.ctxDisplay.arc(Pintor.x, Pintor.y, radius, 0, 2 * Math.PI, false);
        Pintor.ctxDisplay.lineWidth = 3;
        Pintor.ctxDisplay.stroke();

        // Draw the Pintor head.
        var WIDTH = 0.3;
        var HEAD_TIP = 10;
        var ARROW_TIP = 4;
        var BEND = 6;
        var radians = 2 * Math.PI * Pintor.heading / 360;
        var tipX = Pintor.x + (radius + HEAD_TIP) * Math.sin(radians);
        var tipY = Pintor.y - (radius + HEAD_TIP) * Math.cos(radians);
        radians -= WIDTH;
        var leftX = Pintor.x + (radius + ARROW_TIP) * Math.sin(radians);
        var leftY = Pintor.y - (radius + ARROW_TIP) * Math.cos(radians);
        radians += WIDTH / 2;
        var leftControlX = Pintor.x + (radius + BEND) * Math.sin(radians);
        var leftControlY = Pintor.y - (radius + BEND) * Math.cos(radians);
        radians += WIDTH;
        var rightControlX = Pintor.x + (radius + BEND) * Math.sin(radians);
        var rightControlY = Pintor.y - (radius + BEND) * Math.cos(radians);
        radians += WIDTH / 2;
        var rightX = Pintor.x + (radius + ARROW_TIP) * Math.sin(radians);
        var rightY = Pintor.y - (radius + ARROW_TIP) * Math.cos(radians);
        Pintor.ctxDisplay.beginPath();
        Pintor.ctxDisplay.moveTo(tipX, tipY);
        Pintor.ctxDisplay.lineTo(leftX, leftY);
        Pintor.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
            rightControlX, rightControlY, rightX, rightY);
        Pintor.ctxDisplay.closePath();
        Pintor.ctxDisplay.fill();
    }
};
/**
 * Reset the Pintor to the start position, clear the display, and kill any
 * pending tasks.
 */
Pintor.reset = function() {
    // Starting location and heading of the Pintor.
    Pintor.x = Pintor.HEIGHT / 2;
    Pintor.y = Pintor.WIDTH / 2;
    Pintor.heading = 0;
    Pintor.penDownValue = true;
    Pintor.visible = true;

    // Clear the canvas.
    Pintor.ctxScratch.canvas.width = Pintor.ctxScratch.canvas.width;
    Pintor.ctxScratch.strokeStyle = '#000';
    Pintor.ctxScratch.fillStyle = '#000';
    Pintor.ctxScratch.lineWidth = 5;
    Pintor.ctxScratch.lineCap = 'round';
    Pintor.ctxScratch.font = 'normal 18pt Arial';
    Pintor.display();

    // Kill all tasks.
    for (var x = 0; x < Pintor.pidList.length; x++) {
        window.clearTimeout(Pintor.pidList[x]);
    }
    Pintor.pidList.length = 0;
    Pintor.interpreter = null;
};

/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
Pintor.runButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }
    var runButton = document.getElementById('runButton');
    var resetButton = document.getElementById('resetButton');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    resetButton.style.display = 'inline';
    BlocklyGames.workspace.traceOn(true);
    Pintor.execute();
};

/**
 * Click the reset button.  Reset the Pintor.
 * @param {!Event} e Mouse or touch event.
 */
Pintor.resetButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }
    var runButton = document.getElementById('runButton');
    runButton.style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    BlocklyGames.workspace.traceOn(false);
    Pintor.reset();

    // Image cleared; prevent user from submitting to Reddit.
    Pintor.canSubmit = false;
};

/**
 * Inject the Pintor API into a JavaScript interpreter.
 * @param {!Object} scope Global scope.
 * @param {!Interpreter} interpreter The JS interpreter.
 */
Pintor.initInterpreter = function(interpreter, scope) {
    // API
    var wrapper;
    wrapper = function(distance, id) {
        Pintor.move(distance.valueOf(), id.toString());
    };
    interpreter.setProperty(scope, 'moveForward',
        interpreter.createNativeFunction(wrapper));
    wrapper = function(distance, id) {
        Pintor.move(-distance.valueOf(), id.toString());
    };
    interpreter.setProperty(scope, 'moveBackward',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(angle, id) {
        Pintor.turn(angle.valueOf(), id.toString());
    };
    interpreter.setProperty(scope, 'turnRight',
        interpreter.createNativeFunction(wrapper));
    wrapper = function(angle, id) {
        Pintor.turn(-angle.valueOf(), id.toString());
    };
    interpreter.setProperty(scope, 'turnLeft',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Pintor.penDown(false, id.toString());
    };
    interpreter.setProperty(scope, 'penUp',
        interpreter.createNativeFunction(wrapper));
    wrapper = function(id) {
        Pintor.penDown(true, id.toString());
    };
    interpreter.setProperty(scope, 'penDown',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(width, id) {
        Pintor.penWidth(width.valueOf(), id.toString());
    };
    interpreter.setProperty(scope, 'penWidth',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(colour, id) {
        Pintor.penColour(colour.toString(), id.toString());
    };
    interpreter.setProperty(scope, 'penColour',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        Pintor.isVisible(false, id.toString());
    };
    interpreter.setProperty(scope, 'hidePintor',
        interpreter.createNativeFunction(wrapper));
    wrapper = function(id) {
        Pintor.isVisible(true, id.toString());
    };
    interpreter.setProperty(scope, 'showPintor',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(text, id) {
        Pintor.drawPrint(text.toString(), id.toString());
    };
    interpreter.setProperty(scope, 'print',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(font, size, style, id) {
        Pintor.drawFont(font.toString(), size.valueOf(), style.toString(),
            id.toString());
    };
    interpreter.setProperty(scope, 'font',
        interpreter.createNativeFunction(wrapper));
};

/**
 * Execute the user's code.  Heaven help us...
 */
Pintor.execute = function() {
    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        setTimeout(Pintor.execute, 250);
        return;
    }

    Pintor.reset();
    var code = getcodeTree(getBlock(BlocklyGames.workspace,"inicio")); //Capturar el codigo generado unicamente en la rama de inicio
    //var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    Pintor.interpreter = new Interpreter(code, Pintor.initInterpreter);
    Pintor.pidList.push(setTimeout(Pintor.executeChunk_, 100));
};

/**
 * Execute a bite-sized chunk of the user's code.
 * @private
 */
Pintor.executeChunk_ = function() {
    // All tasks should be complete now.  Clean up the PID list.
    Pintor.pidList.length = 0;
    Pintor.pause = 0;
    var go;
    do {
        try {
            go = Pintor.interpreter.step();
        } catch (e) {
            // User error, terminate in shame.
            alert(e);
            go = false;
        }
        if (go && Pintor.pause) {
            // The last executed command requested a pause.
            go = false;
            Pintor.pidList.push(
                setTimeout(Pintor.executeChunk_, Pintor.pause));
        }
    } while (go);
    // Wrap up if complete.
    if (!Pintor.pause) {
        BlocklyGames.workspace.highlightBlock(null);
        Pintor.checkAnswer();
        // Image complete; allow the user to submit this image to Reddit.
        Pintor.canSubmit = true;
    }
};
/**
* Highlight a block and pause.
* @param {?string} id ID of block.
*/
Pintor.animate = function(id) {
    Pintor.display();
    if (id) {
        BlocklyInterface.highlight(id);
        // Scale the speed non-linearly, to give better precision at the fast end.
        var stepSpeed = 1000 * Math.pow(1 - Pintor.speedSlider.getValue(), 2);
        Pintor.pause = Math.max(1, stepSpeed);
    }
};

/**
 * Move the Pintor forward or backward.
 * @param {number} distance Pixels to move.
 * @param {?string} id ID of block.
 */
Pintor.move = function(distance, id) {

    if (Pintor.penDownValue) {
        Pintor.ctxScratch.beginPath();
        Pintor.ctxScratch.moveTo(Pintor.x, Pintor.y);
    }
    if (distance) {
        Pintor.x += distance * Math.sin(2 * Math.PI * Pintor.heading / 360);
        Pintor.y -= distance * Math.cos(2 * Math.PI * Pintor.heading / 360);
        var bump = 0;
    } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
    }
    if (Pintor.penDownValue) {
        Pintor.ctxScratch.lineTo(Pintor.x, Pintor.y + bump);
        Pintor.ctxScratch.stroke();
    }
    Pintor.animate(id);
};

/**
 * Turn the Pintor left or right.
 * @param {number} angle Degrees to turn clockwise.
 * @param {?string} id ID of block.
 */
Pintor.turn = function(angle, id) {
    Pintor.heading += angle;
    Pintor.heading %= 360;
    if (Pintor.heading < 0) {
        Pintor.heading += 360;
    }
    Pintor.animate(id);
};

/**
 * Lift or lower the pen.
 * @param {boolean} down True if down, false if up.
 * @param {?string} id ID of block.
 */
Pintor.penDown = function(down, id) {
    Pintor.penDownValue = down;
    Pintor.animate(id);
};

/**
 * Change the thickness of lines.
 * @param {number} width New thickness in pixels.
 * @param {?string} id ID of block.
 */
Pintor.penWidth = function(width, id) {
    Pintor.ctxScratch.lineWidth = width;
    Pintor.animate(id);
};

/**
 * Change the colour of the pen.
 * @param {string} colour Hexadecimal #rrggbb colour string.
 * @param {?string} id ID of block.
 */
Pintor.penColour = function(colour, id) {
    Pintor.ctxScratch.strokeStyle = colour;
    Pintor.ctxScratch.fillStyle = colour;
    Pintor.animate(id);
};

/**
 * Make the Pintor visible or invisible.
 * @param {boolean} visible True if visible, false if invisible.
 * @param {?string} id ID of block.
 */
Pintor.isVisible = function(visible, id) {
    Pintor.visible = visible;
    Pintor.animate(id);
};

/**
 * Print some text.
 * @param {string} text Text to print.
 * @param {?string} id ID of block.
 */
Pintor.drawPrint = function(text, id) {
    Pintor.ctxScratch.save();
    Pintor.ctxScratch.translate(Pintor.x, Pintor.y);
    Pintor.ctxScratch.rotate(2 * Math.PI * (Pintor.heading - 90) / 360);
    Pintor.ctxScratch.fillText(text, 0, 0);
    Pintor.ctxScratch.restore();
    Pintor.animate(id);
};

/**
 * Change the typeface of printed text.
 * @param {string} font Font name (e.g. 'Arial').
 * @param {number} size Font size (e.g. 18).
 * @param {string} style Font style (e.g. 'italic').
 * @param {?string} id ID of block.
 */
Pintor.drawFont = function(font, size, style, id) {
    Pintor.ctxScratch.font = style + ' ' + size + 'pt ' + font;
    Pintor.animate(id);
};

/**
 * Verify if the answer is correct.
 * If so, move on to next level.
 */
Pintor.checkAnswer = function() {
    // Compare the Alpha (opacity) byte of each pixel in the user's image and
    // the sample answer image.
    var userImage =
        Pintor.ctxScratch.getImageData(0, 0, Pintor.WIDTH, Pintor.HEIGHT);
    var answerImage =
        Pintor.ctxAnswer.getImageData(0, 0, Pintor.WIDTH, Pintor.HEIGHT);
    var len = Math.min(userImage.data.length, answerImage.data.length);
    var delta = 0;
    // Pixels are in RGBA format.  Only check the Alpha bytes.
    for (var i = 3; i < len; i += 4) {
        // Check the Alpha byte.
        if (Math.abs(userImage.data[i] - answerImage.data[i]) > 64) {
            delta++;
        }
    }
    if (Pintor.isCorrect(delta)) {
        if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
            // No congrats for last level, it is open ended.
            BlocklyGames.workspace.playAudio('win', 0.5);
            storageLevel(BlocklyGames.LEVEL);
            setTimeout(function () {
                createDialog({
                    titulo: "Felicitaciones",
                    text: "Felicitaciones\nHas resuelto este desafio.",
                    src:"img/pintoralegre.png",
                    eventHidden:BlocklyInterface.nextLevel
                });
            },200);             
        }
    } else {
        Pintor.penColour('#ff0000');
        setTimeout(function () {
            createDialog({
                titulo: "Intentalo de nuevo",
                text: "Nos ha faltado poco. \nPresiona \"Reiniciar\" he intentesmolo de nuevo.",
                src:"img/pintortriste.png"
            });
        },400);
    }
};

/**
 * Send an image of the canvas to Reddit.
 */
Pintor.submitToReddit = function() {
    if (!Pintor.canSubmit) {
        alert(BlocklyGames.getMsg('Pintor_submitDisabled'));
        return;
    }
    // Encode the thumbnail.
    var thumbnail = document.getElementById('thumbnail');
    var ctxThumb = thumbnail.getContext('2d');
    ctxThumb.globalCompositeOperation = 'copy';
    ctxThumb.drawImage(Pintor.ctxDisplay.canvas, 0, 0, 100, 100);
    var thumbData = thumbnail.toDataURL('image/png');
    document.getElementById('t2r_thumb').value = thumbData;

    // Encode the XML.
    var xml = Blockly.Xml.workspaceToDom(BlocklyGames.workspace);
    var xmlData = Blockly.Xml.domToText(xml);
    document.getElementById('t2r_xml').value = xmlData;

    // Submit the form.
    document.getElementById('t2r_form').submit();
};

window.addEventListener('load', Pintor.init);