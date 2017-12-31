//import:/global/_global-import
var globalImport;

var timerValue;

function changeTimerValue(){
    console.log('new timer ' + timerValue);
    globalImport.setTimer(timerValue);
    console.log('timer set' + globalImport.getTimer());
}