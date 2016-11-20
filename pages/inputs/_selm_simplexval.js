var val;
var list = [{code:1,value:"Val1"},{code:2,value:"Val2"},{code:3,value:"Val3"}]

function printCode(){
	var r = [];
	if(val){
		for (var i = 0; i < val.length; i++) {
			var v = val[i];
			r.push(v.code);
		}		
	}
	return r.join(',');
}

function printValue(){
	var r = [];
	if(val){
		for (var i = 0; i < val.length; i++) {
			var v = val[i];
			r.push(v.value);
		}		
	}
	return r.join(',');
}