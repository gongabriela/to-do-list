// =====================================================
// VARIÁVEIS GLOBAIS
// =====================================================

const btnAdicionar = document.querySelector('.adicionar-tarefa');
const inputTarefa  = document.getElementById('campo-tarefa');
const listaTarefas = document.querySelector('.tarefas');

// =====================================================
//  FUNÇÕES
// =====================================================

// Se clicou no botao, mostra a caixa de inpute e esconde o botao
// se foi no input, esconde o input e mostra o botao
function alternarVisualizacao() {
    const estaEscondido = (inputTarefa.style.display === 'none' || inputTarefa.style.display === '');
    
    if (estaEscondido) {
        inputTarefa.style.display = 'block';
        btnAdicionar.style.display = 'none';
        inputTarefa.focus();
    } else {
        inputTarefa.style.display = 'none';
        btnAdicionar.style.display = 'block';
    }
}

// cria o elemento html da tarefa
function criarHTMLTarefa(texto) {
    //cria o container li
    const li = document.createElement('li');
    li.classList.add('container-tarefa');

    //cria o texto como <span>
    const spanTexto = document.createElement('span');
    spanTexto.classList.add('texto-tarefa');
    spanTexto.innerText = texto;

    //cria o botao de deletar como <button>
    const btnLixeira = document.createElement('button');
    btnLixeira.classList.add('btn-lixeira');
    const iconLixeira = document.createElement('i');
    iconLixeira.classList.add('fa-solid', 'fa-trash');
    
    //adicionar o span e o botao no container li
    btnLixeira.appendChild(iconLixeira);
    li.appendChild(spanTexto);
    li.appendChild(btnLixeira);

    return li; 
}

// processa a nova tarefa quando o usuario aperta enter
function processarNovaTarefa(evento) {
    if (evento.key === 'Enter') {
        const texto = inputTarefa.value;

        // Validação
        if (texto.trim() === '') return;

        // Chama a função de criar html
        const novaTarefa = criarHTMLTarefa(texto);

        // adiciona na tela
        listaTarefas.prepend(novaTarefa);

        // limpa e reseta
        inputTarefa.value = '';
        alternarVisualizacao();
    }
}

// risca ou desrisca a tarefa clicada
function gerenciarCliqueNaLista(evento) {
    const elementoClicado = evento.target;
    
    // ve se clicou no botao de lixeira
    const btnLixeira = elementoClicado.closest('.btn-lixeira');
    if (btnLixeira) {
        const tarefaParaRemover = btnLixeira.closest('.container-tarefa');
        tarefaParaRemover.remove();
        return;
    }

    // ve se clicou em uma tarefa
    const tarefaParaRiscar = elementoClicado.closest('.container-tarefa');
    if (tarefaParaRiscar) {
        tarefaParaRiscar.classList.toggle('concluida');
    }
}

// =====================================================
// EVENTOS (GATILHOS)
// =====================================================

// se clicou no botao de adicionar tarefa
btnAdicionar.addEventListener('click', alternarVisualizacao);

// se apertou enter na caixinha de input
inputTarefa.addEventListener('keypress', processarNovaTarefa);

// se clicou em um elemento da lista, risca ou desrisca a tarefa
listaTarefas.addEventListener('click', gerenciarCliqueNaLista);