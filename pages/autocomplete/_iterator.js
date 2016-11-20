var list = [{
	code:1,
	name: 'Test Name One',
	description: 'Item One'
},{
	code:2,
	name: 'Test Name Two',
	description: 'Item Two'
},{
	code:3,
	name: 'Test Name Three',
	description: 'Item Three'
},{
	code:5,
	name: 'Test Name Five',
	description: 'Item Five'
}];

var objList = [{}, {}, {}]

var selected;

function acFn(typed, callback){
	var countFound = 0;
	var selList = [];
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		if (item.name.toUpperCase().indexOf(typed.toUpperCase()) >= 0 || item.description.indexOf(typed.toUpperCase()) >= 0) {
			countFound ++;
			selList.push(list[i]);
		}
		if(countFound > 2){
			break;
		}
	}
	callback(selList);
}