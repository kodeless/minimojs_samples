function defineAttributes(types){
  return {
    "id": types.mandatory.string,
    "column": {
      "title": types.string.defaultValue(''),
      "content": types.mandatory.html
    },
    "list": types.boundVariable,
    "itemVarName": types.exportedVariable.of("item"),
    "indexVarName": types.exportedVariable.of("index"),
  }
}

function remove(indexToRemove){
    this.list.splice(indexToRemove, 1);
}