var modal;

var list = [1,2,3];
var list2 = [4,5,6];
var check;

function onInit(){
	switchList();
}

function switchList(){
	modal.setList(check?list:list2);
}