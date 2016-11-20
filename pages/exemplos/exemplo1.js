//import:/exemplos/import
var imported;
//modal:/exemplos/modal,modalDiv,toggle
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