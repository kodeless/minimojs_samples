function context(){
	console.log('starting ctx');
	var count = 0;
	function increaseCount(){
		count++;
	}
}

function getHtml(comp){
	return '<div  style="border: 1px solid black;">' + comp.id +
		'<br><button onclick="increaseCount();" id="b' + comp.id + '">Click</button>' + 
		'Count: <div id="in' + comp.id + '">${count}</div>' +
		'{xbody}' +
		'</div>'; 
}