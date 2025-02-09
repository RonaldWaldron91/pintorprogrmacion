/**
 * Created by USER on 25/05/2016.
 */

if(!window.sessionStorage.levelsEnd){
    sessionStorage.levelsEnd = JSON.stringify([]);
}

var storageLevel =  function (level){
    if(window.sessionStorage.levelsEnd !== undefined){
        var levels = JSON.parse(window.sessionStorage.levelsEnd);
        if(levels.indexOf(level) == -1){
            levels.push(level);
            sessionStorage.levelsEnd = JSON.stringify(levels);
        }
    }
};

var checkLevelStorage = function (level) {
    if(window.sessionStorage.levelsEnd !== undefined) {
        var levels = JSON.parse(window.sessionStorage.levelsEnd);
        if(levels.indexOf(level) != -1){
            return true;
        }
    }
    return false;
};

var getLevelStorage = function () {
    var levels = [];
    if(window.sessionStorage.levelsEnd !== undefined) {
        levels = JSON.parse(window.sessionStorage.levelsEnd);
    }
    return levels;
};