var obj;

function onInit(){
}

function show(link){
	var param = {};
	if(link){
		param.obj = obj;
	}
	X.popup({
		url: '/popup/_modalcomp',
		parameter: param,
		callback: function(){
		}
	});
}