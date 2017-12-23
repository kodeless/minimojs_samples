function defineAttributes(types){
  return {
    "id": types.mandatory.string
  }
}

console.log('starting ctx');
var count = 0;
function increaseCount(){
	count++;
}
