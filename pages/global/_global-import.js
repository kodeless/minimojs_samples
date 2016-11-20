
var timer = 0;
//getter:timer
function getTimer(){
    return timer;
}

//setter:timer
function setTimer(t){
    timer = t;
}

setInterval(function(){
    timer++;
}, 1000);