//import:/exemplos/import
var imported;

var obj;

function onInit(){
    console.log('modal')
    imported.setVal(obj)
}

function setObj(o){
    obj = o;
    imported.setVal(o);
}