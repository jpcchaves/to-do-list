const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//função para criar o LI
function criaLi(){
    const li = document.createElement('li');
    return li;
}

//capturando o evento de ENTER. Vai adicionar apenas se o input não estiver VAZIO
inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return; 
        criaTarefa(inputTarefa.value);
    }
});

//função para limpar e dar foco no INPUT. É chamada na função criaTarefa
function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li){
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar essa tarefa');
    li.appendChild(botaoApagar);
}

//função que cria a tarefa e exibe na tela interligada a função criaLi
function criaTarefa(textoInput){
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li)
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

//PREVINE que o input VAZIO seja considerado
btnTarefa.addEventListener('click', function(e) {
    if(!inputTarefa.value) return; 
    criaTarefa(inputTarefa.value);
})

//capturando o evento de click no botão APAGAR
document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove(); //removendo um elemento a partir do pai
        salvarTarefas();
    }
});


//Função para salvar as tarefas ao sair da página

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //.trim tira o espaço vazio no array
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas); // converte JSON em string
    localStorage.setItem('tarefas', tarefasJSON); //valor a ser recuperado
}

//Função que vai ler os dados e jogá-los de volta na lista

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);//converte a string em um array
    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas()
