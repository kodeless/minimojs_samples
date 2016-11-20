var time = new Date().getTime();
var count = 0;

function defineAttributes(types){
  return {
    "click": types.script,
    "id": types.mandatory.string
  }
}

function increaseCount(){
	count++;
	console.log('print count ' + count + ', time: ' + time);
  this.click();
}
