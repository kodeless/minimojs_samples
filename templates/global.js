function onAddModalButton(idModal, button, properties) {
	button.setAttribute("class", properties.cor);
	_('button_place_' + idModal).appendChild(button);
}

function onHighlight(field) {
	field.style.border = "1px solid red";
}
function onRemoveHighlight(field) {
	field.style.border = "1px solid #e3e3e3";
}

function beforeShowModal(path) {
	var color = X.getValue("corLayout");
	
	if (color != null) {
		if (_('modalheader')) {
			_('modalheader').style.background = '#' + color;
			for (i = 0; i < 10; i++) {
				if (document.getElementsByClassName("cor_tema")[i] != undefined) {
					document.getElementsByClassName("cor_tema")[i].style.background = "#" + color;
				} else {
					i = 11;
				}
			}
		}
	}
}

function beforeShowPage(path) {
	var color = X.getValue("corLayout");
	
	if (color != null) {
		if (_('headerpage')) {
			_('headerpage').style.background = '#' + color;
			for (i = 0; i < 10; i++) {
				if (document.getElementsByClassName("cor_tema")[i] != undefined) {
					document.getElementsByClassName("cor_tema")[i].style.background = "#" + color;
				} else {
					i = 11;
				}
			}
		}
	}
}