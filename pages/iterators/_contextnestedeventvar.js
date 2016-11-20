var list = [{
	code: 'One',
	list: [{val:'1', code: 'a'}, {val:'11', code: 'aa'}, {val:'111', code: 'aaa'}]
},{
	code: 'Two',
	list: [{val:'2', code: 'b'}, {val:'22', code: 'bb'}, {val:'222', code: 'bbb'}]
},{
	code: 'Three',
	list: [{val:'3', code: 'c'}, {val:'33', code: 'cc'}, {val:'333', code: 'ccc'}]
}];
var obj;
var index;
var parentIndex;
var ii = '(ii)';
var i = '(i)';

function change(item, i, ip){
	obj = item;
	index = i;
	parentIndex = ip;
}