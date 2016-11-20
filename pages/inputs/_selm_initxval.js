var list = [{code:1,value:"Val1"},{code:2,value:"Val2"},{code:3,value:"Val3"}];
var obj = {val: [list[0]], val2: [list[2]]};
var val = [list[1]];

function printVal1(){
	var r = [];
	for (var i = 0; i < obj.val.length; i++) {
		var v = obj.val[i];
		r.push(v.code);
	}
	return r.join(',');
}

function printVal2(){
	var r = [];
	for (var i = 0; i < obj.val2.length; i++) {
		var v = obj.val2[i];
		r.push(v.value);
	}
	return r.join(',');
}

function printVal(){
	var r = [];
	for (var i = 0; i < val.length; i++) {
		var v = val[i];
		r.push(v.code);
	}
	return r.join(',');
}