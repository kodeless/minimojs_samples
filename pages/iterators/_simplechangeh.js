var list;

function onInit(){
	recreate();
}

function recreate(){
	list = ["Item0", "Item1", "Item2", "Item3"];
}

function add(){
	list.push("Item" + list.length);
}

function remove(i){
	console.log(`Index to remove: ${i}, list size: ${list.length}`);
	list.splice(i, 1);
	console.log(`Removed: ${list.length}`);
}