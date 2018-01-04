function defineAttributes(types){
  return {
    "id": types.mandatory.string,
    "column": {
      "title": types.string.defaultValue(''),
      "content": types.mandatory.html
    },
    "total": types.boundVariable,
    "page": types.boundVariable,
    "list": types.boundVariable
  }
}

function gotoPage(page){
    this.page = page;
}
