var list;
var total = 40;
var page = 0;

function onInit(){
	fillList(0);
}

function prepareCode(obj){
	return '(' + obj.code + ')';
}

function fillList(p){
	setTimeout(function(){
		page = p;
		list = [];
		var index = (page * 10);
		for (var i = 0; i < 10; i++) {
			list.push({
				code: index,
				name: 'Name_' + index++
			});
		}
	}, 1000);
}

function previous(){
	fillList(page-1);	
}

function next(){
	fillList(page+1);	
}