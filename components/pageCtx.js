function context(){
	console.log('starting ctx');
	var time = new Date().getTime();
	var count = 0;
	function increaseCount(){
		count++;
		console.log('print count ' + count + ', time: ' + time);
	}
}

function getHtml(comp){
	return '<div  style="border: 1px solid black;">Page: <br>Count:<div id="pg">${count}</div>' +
		'{xbody}' +
		'</div>'; 
}