//import:/exemplos/import
var imported;

var modal;

var listaSexo = [{
    id: 0,
    nome: 'Masculino'
},{
      id: 1,
      nome: 'Feminino'
},{
     id: 0,
     nome: 'Indefinido'
}];
var listaInteresse = ['TECNOLOGIA', 'NEGOCIOS', 'MEIO_AMBIENTE'];
var pessoaList = [];
var pessoa;
var count = 1;

function onInit(){
    imported.setVal(pessoa);
}

function setPessoaNoModal(){
    modal.setObj(pessoa.dados);
}

function adicionarPessoa(){
    pessoaList.push(pessoa);
    pessoa = {};
    imported.setVal(pessoa);
}

function incrementCount(){
  count++;
}