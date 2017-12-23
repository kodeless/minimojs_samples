console.log('starting ctx');
var time = new Date().getTime();
var count = 0;
function increaseCount(){
	count++;
	console.log('print count ' + count + ', time: ' + time);
}
