//import:/import/_imp1
var i;

var val = 'impvalnested';
function getVal(){
	return val;
}

function setVal(v){
	val = v;
}

function getNestedVal(){
	return i.getVal();
}

function setNestedVal(v){
	i.setVal(v);
}

