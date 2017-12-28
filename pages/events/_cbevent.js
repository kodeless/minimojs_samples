var val = [];
function clickevt() {
	event('click');
}

function changeevt() {
	event('change');
}

function focusevt() {
	event('focus');
}

function blurevt() {
	event('blur');
}

function event(name) {
	var e = m.event;
	val.push('type:' + e.type + ',expected:' + name);
	val.sort();
	console.log(val.join('/'));
}