/**
 * Created by USER on 31/05/2016.
 */

var loadBlockly = function () {
    var textFunction = "Dibujar estrella";
    const levelrootFunction = 9;
    var rtl = false;
    var blocklyDiv = document.getElementById('container-blockly');

    var onresize = function(e) {
        var children = $("#container-game").children('div'); // Cantidad de div's en el container
        var containerWidth = parseInt($("#container-game").css('width').replace("px",""));
        var canvasWidth = parseInt($("#container-canvas").css('width').replace("px",""));
        var marginCanvas = parseInt($(children[0]).css('margin-right').replace("px",""));
        blocklyDiv.style.top = $("#container-canvas").position().top + "px";
        blocklyDiv.style.width = (containerWidth - canvasWidth - marginCanvas *children.length) + 'px';
        $("#blockly").css('top',$("#blockly-bar").height());

        if(BlocklyGames.workspace){
            if(BlocklyGames.workspace.flyout_){
                $("#bar-bloques").css('width',BlocklyGames.workspace.flyout_.width_);
            }else if(BlocklyGames.workspace.toolbox_){
                $("#bar-bloques").css('width',BlocklyGames.workspace.toolbox_.width);
            }
            var width = parseInt(blocklyDiv.style.width.replace("px","")) - parseInt($("#bar-bloques").css('width').replace("px","")) -5;
            $("#bar-workspace").css('width',width);
        }
    };

    var setrootBlocks = function (){
        var inicioBlock = BlocklyGames.workspace.newBlock('inicio');
        inicioBlock.initSvg();
        inicioBlock.moveBy(15,10);
        inicioBlock.render();
        inicioBlock.setMovable(false);
        inicioBlock.setDeletable(false);

        if(BlocklyGames.LEVEL == 5 || BlocklyGames.LEVEL == 6){
            var colorBlock = BlocklyGames.workspace.newBlock('pintor_colour_internal');
            colorBlock.initSvg();
            colorBlock.render();
            inicioBlock.nextConnection.connect(colorBlock.previousConnection);
            colorBlock.setMovable(false);
            colorBlock.setDeletable(false);
        }

    };

    var setrootFunction = function () {
        var inicioBlock = BlocklyGames.workspace.newBlock('draw_start_function');
        inicioBlock.initSvg();
        inicioBlock.moveBy(300,10);
        inicioBlock.render();
        inicioBlock.setMovable(true);
        inicioBlock.setDeletable(false);

        if(BlocklyGames.LEVEL == 9 || BlocklyGames.LEVEL == 10){
            var repeatBlock = BlocklyGames.workspace.newBlock('pintor_repeat_internal');
            var moveBlock = BlocklyGames.workspace.newBlock('pintor_move_internal');
            var turnBlock = BlocklyGames.workspace.newBlock('pintor_turn_internal');
            var blocks= [repeatBlock , moveBlock , turnBlock];

            $.each(blocks,function (index,value) { // Inicilizacion de bloques
                value.initSvg();
                value.render();
                value.setMovable(false);
                value.setDeletable(false);
            });

            if(BlocklyGames.LEVEL == 9){
                /*Conexiones*/
                moveBlock.nextConnection.connect(turnBlock.previousConnection);
                repeatBlock.getInput('DO').connection.connect(moveBlock.previousConnection);
                inicioBlock.nextConnection.connect(repeatBlock.previousConnection);

                /*set values*/
                moveBlock.setFieldValue(50,'VALUE');
                turnBlock.setFieldValue(144,'VALUE');
                repeatBlock.setFieldValue(5,'TIMES');

            }else if(BlocklyGames.LEVEL == 10){
                var moveBlock_2 = BlocklyGames.workspace.newBlock('pintor_move_internal');
                moveBlock_2.initSvg();
                moveBlock_2.render();
                moveBlock_2.setMovable(false);
                moveBlock_2.setDeletable(false);

                /*Conexiones*/
                moveBlock_2.nextConnection.connect(turnBlock.previousConnection);
                moveBlock.nextConnection.connect(moveBlock_2.previousConnection);
                repeatBlock.getInput('DO').connection.connect(moveBlock.previousConnection);
                inicioBlock.nextConnection.connect(repeatBlock.previousConnection);

                /*Set values*/
                moveBlock.setFieldValue(50,'VALUE');
                moveBlock_2.setFieldValue(50,'VALUE');
                moveBlock_2.setFieldValue('moveBackward','DIR');
                turnBlock.setFieldValue(1,'VALUE');
                repeatBlock.setFieldValue(360,'TIMES');

                /*Rename function block*/
                var block = getBlock(BlocklyGames.workspace,'draw_start_function');
                block.setFieldValue("Funcion dibujar circulo",'name');
            }
        }else{
            /*Rename function block*/
            var block = getBlock(BlocklyGames.workspace,'draw_start_function');
            block.setFieldValue(" Funcion ",'name');
        }
    };

    var setToolbox = function () {
        var toolbox =
            "<xml id='toolbox2' style='display: none'>"+
                "<block type='pintor_move_internal'>"+
                    "<field name='VALUE'>100</field>"+
                "</block>"+
                "<block type='pintor_turn_internal'>"+
                    "<field name='VALUE'>90</field>"+
                "</block>";

        if(BlocklyGames.LEVEL >= 3){
            toolbox += "<block type='pintor_repeat_internal'>"+
                "<field name='TIMES'>4</field>"+
                "</block>";
        }
        if(BlocklyGames.LEVEL >= 5){
            toolbox += "<block type='pintor_colour_internal'></block>" ;
        }
        if(BlocklyGames.LEVEL >= 7){
            toolbox += "<block type='pintor_pen'></block>" ;
        }

        if(BlocklyGames.LEVEL >= levelrootFunction){
            if(BlocklyGames.LEVEL == levelrootFunction) {
                toolbox += "<block type='draw_start_implement'></block>";
            }
            else if(BlocklyGames.LEVEL == levelrootFunction+1) {
                textFunction = "Dibujar Circulo";
                toolbox += "<block type='draw_start_implement'><field name='name'>"+textFunction+"</field></block>";
            }
            else{
                textFunction = "Usar funcion";
                toolbox += "<block type='draw_start_implement'><field name='name'>"+textFunction+"</field></block>";
            }
        }

        toolbox += "</xml>";

        $("body").append(toolbox);
    };

    window.addEventListener('scroll', function() {
        onresize();
        Blockly.fireUiEvent(window, 'resize');
    });
    window.addEventListener('resize', onresize);

    $("#blockly-bar").css('display','block');
    onresize();
    setToolbox();

    var toolbox = document.getElementById('toolbox2');//BlocklyGames.LEVEL == BlocklyGames.MAX_LEVEL ? document.getElementById('toolbox') : document.getElementById('toolbox2');
    
    BlocklyGames.workspace = Blockly.inject('blockly',
        {
            media: 'media/',
            rtl: rtl,
            scrollbars:true,
            toolbox: toolbox,
            toolboxRight:false,
            trashcan: true,
            zoom: BlocklyGames.LEVEL == BlocklyGames.MAX_LEVEL ?
            {'controls': true, 'wheel': true} : null});

    setrootBlocks();
    BlocklyGames.LEVEL >= levelrootFunction ? setrootFunction() : null;

    var workspaceChanged =  function () {
        var blocks = BlocklyGames.workspace.getAllBlocks();
        $.each(blocks,function (index, value) {
            if(value.type == "draw_start_implement"){
                value.setFieldValue(textFunction,'name');
            }
        });
        $("#blocksUsed-text").text(blocks.length - 1);
        (blocks.length - 1 >= Pintor.MAX_BLOCKS) ? $("#bar-workspace").css('color','RED') : $("#bar-workspace").css('color','WHITE');
    };

    BlocklyGames.workspace.addChangeListener(workspaceChanged);
};



var checkBlockAlone = function () {
    var blocks = BlocklyGames.workspace.getTopBlocks();
    var blockAlone= false;
    $.each(blocks , function (index,value) {
        if(value.type != 'inicio' && value.getParent() == null){
            blockAlone = true ;
            return;
        }
    });
    return blockAlone;
};

var getcodeTree =  function (blockRoot) {
    var code="";
    Blockly.JavaScript.init(Blockly.mainWorkspace);
    var topBlocks = Blockly.mainWorkspace.getTopBlocks();
    if(blockRoot.nextConnection){
        if(topBlocks.indexOf(blockRoot) != -1){
            code += Blockly.JavaScript.blockToCode(blockRoot);
        }
        if(blockRoot.nextConnection.targetBlock()) {
            code += getcodeTree(blockRoot.nextConnection.targetBlock());
        }
    }

    return code;
};

var getBlock = function (workspace , type) {
    var topBlocks = workspace.getAllBlocks();
    var block = null;
    $.each(topBlocks,function (index,value) {
        if(value.type == type){
            block = value;
            return ;
        }
    });
    return block
};

$(window).load(function () {

    /*Los bloques del workpace deben estar en un z inferior al flyout, por buena apariencia*/
    setTimeout(function () {
        var blockcanvas = $(".blocklySvg").children(".blocklyWorkspace").children(".blocklyBlockCanvas");
        $(blockcanvas).after($(".blocklyFlyout"));
    },1000);

});