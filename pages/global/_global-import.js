
var timer = 0;

function getTimer(){
    return timer;
}

function setTimer(t){
    timer = t;
}

setInterval(function(){
    timer++;
}, 1000);