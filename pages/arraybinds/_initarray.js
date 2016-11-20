var list = [{code:1, desc: "one"}, {code:2, desc:"two"}];
var array;
var array2 = ["t1", "t2", "t3"];
var array3 = [true, false, true];
var array4 = [list[0], null, list[1]];

function onInit(){
	array = [{txt: "a1txt0", bol: true, sel: list[0]}, 
			 {txt: "a1txt1", bol: false, sel: list[1]}, 
			 {txt: "a1txt2", bol: true, sel: null}];
}

function printArray(){
	if(!array){
		return "";
	}
	var s = [];
	for(var i = 0; i < array.length; i++){
		var a = array[i];
		s.push(a ? (a.txt + '-' + a.bol + '-' + (a.sel ? a.sel.desc : "")) : "");
	}
	return s.join('/');
}

function printArray2(){
	var s = [];
	for(var i = 0; i < array2.length; i++){
		var a = array2[i];
		s.push(a);
	}
	return s.join('/');
}

function printArray3(){
	var s = [];
	for(var i = 0; i < array3.length; i++){
		var a = array3[i];
		s.push(a);
	}
	return s.join('/');
}

function printArray4(){
	var s = [];
	for(var i = 0; i < array4.length; i++){
		var a = array4[i];
		s.push(a ? a.desc : "");
	}
	return s.join('/');
}
