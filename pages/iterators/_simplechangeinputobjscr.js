var list;
var count = 0;

function onInit(){
	recreate();
}

function recreate(){
	list = [{val:"Item0", bool: true}, {val:"Item1", bool: false}, {val:"Item2", bool: true}, {val:"Item3", bool: false}];
}

function add(){
	list.push({val:"Item" + list.length, bool: true});
}

function remove(i){
	console.log(i)
	list.splice(i, 1);
}

function kup(){
	console.log('kup');
}

function clickCount(){
	count++;
}