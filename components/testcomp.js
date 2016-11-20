function defineAttributes(types){
  return {
    "strval": types.string.defaultValue('_'),
    "boolval": types.mandatory.bool,
    "numval": types.mandatory.number
  }
}

var showContent = false;

function toggleShow(){
    showContent = !showContent;
}

function shouldShowContent(){
    return showContent;
}
