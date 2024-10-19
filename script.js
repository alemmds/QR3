// Inicializando variáveis para armazenar os pedidos de cada mesa
let pedidosMesas = {
    mesa1: [],
    mesa2: [],
    mesa3: [],
    mesa4: []
};

let mesaSelecionada = null;

// Função para selecionar uma mesa e exibir o formulário de cadastro
function selecionarMesa(mesa) {
    mesaSelecionada = mesa;
    document.getElementById('mesa-selecionada').textContent = `Mesa ${mesa.replace('mesa', '')}`;
    document.getElementById('form-cadastro').style.display = 'block'; // Exibir formulário
}

// Função para adicionar um pedido à mesa selecionada
function adicionarPedido() {
    if (!mesaSelecionada) {
        alert('Por favor, selecione uma mesa.');
        return;
    }

    let nomeLanche = document.getElementById('nome-lanche').value;
    let valorLanche = parseFloat(document.getElementById('valor-lanche').value);

    if (nomeLanche && valorLanche) {
        let novoPedido = {
            item: nomeLanche,
            valor: valorLanche,
            quantidade: 1
        };

        pedidosMesas[mesaSelecionada].push(novoPedido);
        atualizarPedidos();
        limparFormulario();
    } else {
        alert('Preencha os campos corretamente.');
    }
}

// Função para atualizar a exibição dos pedidos por mesa
function atualizarPedidos() {
    Object.keys(pedidosMesas).forEach(mesa => {
        let pedidoLista = document.getElementById(`pedidos-${mesa}`);
        pedidoLista.innerHTML = '';

        pedidosMesas[mesa].forEach(pedido => {
            pedidoLista.innerHTML += `<p>${pedido.item}: R$${pedido.valor.toFixed(2)}</p>`;
        });
    });
}

// Função para limpar o formulário de cadastro
function limparFormulario() {
    document.getElementById('nome-lanche').value = '';
    document.getElementById('valor-lanche').value = '';
}

// Função para carregar os pedidos da mesa na página de resumo
function carregarResumoMesa() {
    const urlParams = new URLSearchParams(window.location.search);
    const mesa = urlParams.get('mesa');
    if (mesa && pedidosMesas[mesa].length > 0) {
        let pedidoLista = document.getElementById('pedido-lista');
        let totalGeral = 0;
        pedidoLista.innerHTML = '';

        pedidosMesas[mesa].forEach(pedido => {
            let totalItem = pedido.valor * pedido.quantidade;
            totalGeral += totalItem;
            pedidoLista.innerHTML += `<p>${pedido.item}: R$${pedido.valor.toFixed(2)} x ${pedido.quantidade} = R$${totalItem.toFixed(2)}</p>`;
        });

        document.getElementById('total-geral').innerHTML = `<strong>Total: R$${totalGeral.toFixed(2)}</strong>`;
    } else {
        document.getElementById('pedido-lista').innerHTML = '<p>Nenhum produto cadastrado.</p>';
    }
}

// Salvando os pedidos no localStorage (opcional para persistência)
function salvarPedidos() {
    localStorage.setItem('pedidosMesas', JSON.stringify(pedidosMesas));
}

// Carregando os pedidos salvos (opcional para persistência)
function carregarPedidosSalvos() {
    let pedidosSalvos = localStorage.getItem('pedidosMesas');
    if (pedidosSalvos) {
        pedidosMesas = JSON.parse(pedidosSalvos);
        atualizarPedidos();
    }
}

// Carregar pedidos ao iniciar a página
window.onload = function() {
    carregarPedidosSalvos();
};