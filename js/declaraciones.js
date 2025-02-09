/**
 * Created by USER on 27/05/2016.
 */

const colorPygmo =
    {
        azul:"#179BD3",
        magenta:"#E41C6A",
        amarillo:  "#FDCC5A",
        rojo:"#D62D1B",
        verde:"#61AE24"
    };

var Pintor = {};

Pintor.HEIGHT = 400;
Pintor.WIDTH = 400;


Pintor.MAX_BLOCKS = [20, // Level 0.
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 100][BlocklyGames.LEVEL];

/**
 * PID of animation task currently executing.
 * @type !Array.<number>
 */
Pintor.pidList = [];

/**
 * Number of milliseconds that execution should delay.
 * @type number
 */
Pintor.pause = 0;

/**
 * JavaScript interpreter for executing program.
 * @type Interpreter
 */
Pintor.interpreter = null;

/**
 * Should the Pintor be drawn?
 * @type boolean
 */
Pintor.visible = true;

/**
 * Is the drawing ready to be submitted to Reddit?
 * @type boolean
 */
Pintor.canSubmit = false;

