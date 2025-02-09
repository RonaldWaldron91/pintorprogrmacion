/**
 * Created by USER on 23/05/2016.
 */

var templateInit = function () {
    var containerLevels = $("#levels");
    for (var i =0; i < BlocklyGames.MAX_LEVEL ; i++){
        var link = window.location.protocol + '//' +
                   window.location.host + window.location.pathname +
                   '?lang=' + BlocklyGames.LANG + '&level=' + (i+1);

        var divLevel = "<div class = 'optionLevel' data-level = '"+(i+1)+"'><a href='"+link+"'><span></span></a></div>";
        containerLevels.append(divLevel);
        if(checkLevelStorage(i+1)){
            $(".optionLevel[data-level='"+(i+1)+"'] ").children('a').css({
                background:"RED",
                color:"WHITE"
            });
        }
    }
    $(".optionLevel[data-level='"+BlocklyGames.LEVEL+"'] ").children('a').children('span').text(BlocklyGames.LEVEL);
    $(".optionLevel[data-level!='"+BlocklyGames.LEVEL+"'] ").children('a').css({
        width:'1.0rem',
        height:'1.0rem'
    });
    
    $("#maxBlocks-text").text(Pintor.MAX_BLOCKS);
    showDialogWelcome(BlocklyGames.LEVEL);
};

var showDialogWelcome = function(lvl){
      var level = lvl || BlocklyGames.LEVEL;

      switch (level){
          case 1:
              var titulo = "Primer Nivel";
              var text = "Ayuda a EDI a pintar sus cuadros";
              var srcImage = "img/pintoralegre.png";
              break;
          case 3: 
              var titulo = "Repetir por";
              var text = "Este nuevo bloque ejecutara acciones por el numero de veces que indiques";
              var srcImage = "img/repetir.png";
              break;
          case 5:
              var titulo = "Cambiar color";
              var text = "Este nuevo bloque te servirá para cambiar el color del pincel";
              var srcImage = "img/color.png";
              break;
          case 7:
              var titulo = "Levantar lapiz";
              var text = "Con este nuevo bloque levantaras el pincel de modo que mientras te mueves no pintarás";
              var srcImage = "img/lapiz.png";
              break;
          case 9:
              var titulo = "Funciones";
              var text = "Las funciones son muy utiles, cuando debes ejecutar acciones muy repetitivas";
              var srcImage = "img/funcion.png";
              break;
          case 11:
              var titulo = "Crear Funciones";
              var text = "Crea tu propia funcion, para usar la menor cantidad de bloques";
              var srcImage = "img/pintoralegre.png";
              break;
      }

    if(titulo && text && srcImage){
        createDialog({
            titulo:titulo,
            text: text,
            src:srcImage
        });
    }
};

var createDialog = function (obj) {
    var titulo = obj.titulo || "";
    var srcImg = obj.src || "img/edi.png";
    var text = obj.text || "";
    var hidden = obj.eventHidden || null;

    var widthModal = parseInt($(".modal-dialog[role='document']").css('width').replace("px",""));
    var widthImg = widthModal/5;
    var widthText = widthModal - widthImg - parseInt($(".modal-body").css('padding-left').replace("px",""))*2
        - parseInt($("#modal-img").parent('div').css('margin-right').replace("px",""))*2 - 10;


    $("#modal-img").parent('div').css('width',widthImg);
    $("#modal-text").css('width',widthText);

    $("#myModalLabel").text(titulo);
    $("#modal-img").attr('src',srcImg);
    $("#modal-text").children('p').text(text);
    if(hidden){
        $('#myModal').on('hidden.bs.modal',hidden);
    }
    $('#myModal').modal('show');
};

$(window).load(templateInit);