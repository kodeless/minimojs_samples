var list;
var count = 0;

function onInit(){
	recreate();
}

function recreate(){
	list = ["Item0", "Item1", "Item2", "Item3"];
}

function add(){
	count++;
}

function addItem(){
	list.push("Item" + list.length);
}

function remove(i){
	console.log(i)
	list.splice(i, 1);
	console.log(list.length);
}