// Carrega os dados do Local Storage ao carregar a página
window.onload = function() {
    for (let i = 1; i <= 5; i++) {
        loadMesa(i);
    }
};

// Função para carregar os pedidos de uma mesa específica
function loadMesa(mesa) {
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`));
    if (pedidos && pedidos.length > 0) {
        pedidos.forEach(pedido => adicionarPedido(mesa, pedido.nome, pedido.valor, pedido.quantidade, false));
        atualizarTotal(mesa);
    }
}

// Função para adicionar pedidos
function adicionarPedido(mesa, nome, valor, quantidade, save = true) {
    if (!nome || !valor || !quantidade) return;

    valor = parseFloat(valor);
    quantidade = parseInt(quantidade);

    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`)) || [];

    pedidos.push({ nome, valor, quantidade });

    if (save) {
        localStorage.setItem(`mesa${mesa}`, JSON.stringify(pedidos));
    }

    atualizarMesaHTML(mesa, pedidos);
    atualizarTotal(mesa);
}

// Função para atualizar o conteúdo HTML da mesa com os pedidos
function atualizarMesaHTML(mesa, pedidos) {
    let listaPedidos = document.getElementById(`pedidosMesa${mesa}`);
    listaPedidos.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    pedidos.forEach(pedido => {
        let item = document.createElement('li');
        item.innerHTML = `${pedido.nome} - R$${pedido.valor.toFixed(2)} x ${pedido.quantidade}`;
        listaPedidos.appendChild(item);
    });
}

// Função para calcular e atualizar o total da mesa
function atualizarTotal(mesa) {
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`)) || [];
    let total = pedidos.reduce((acc, pedido) => acc + (pedido.valor * pedido.quantidade), 0);
    document.getElementById(`totalMesa${mesa}`).innerText = `Total: R$${total.toFixed(2)}`;

    // Gera o QR Code apenas se o total for maior que 0
    if (total > 0) {
        gerarQRCode(mesa);
    } else {
        document.getElementById(`qrcodeMesa${mesa}`).innerHTML = '';
    }
}

// Função para gerar o QR Code
function gerarQRCode(mesa) {
    let qrcodeDiv = document.getElementById(`qrcodeMesa${mesa}`);
    qrcodeDiv.innerHTML = ''; // Limpa o QR code existente
    new QRCode(qrcodeDiv, {
        text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
        width: 128,
        height: 128
    });
}

// Função para limpar uma mesa
function limparMesa(mesa) {
    localStorage.removeItem(`mesa${mesa}`);
    document.getElementById(`pedidosMesa${mesa}`).innerHTML = '';
    document.getElementById(`totalMesa${mesa}`).innerText = 'Total: R$0,00';
    document.getElementById(`qrcodeMesa${mesa}`).innerHTML = '';
}

// Função para adicionar um pedido ao clicar no botão "Adicionar"
document.querySelectorAll('.btnAdicionar').forEach(button => {
    button.addEventListener('click', function() {
        let mesa = this.dataset.mesa;
        let nome = document.getElementById(`nomeMesa${mesa}`).value;
        let valor = document.getElementById(`valorMesa${mesa}`).value;
        let quantidade = document.getElementById(`quantidadeMesa${mesa}`).value;
        adicionarPedido(mesa, nome, valor, quantidade);
    });
});

// Função para limpar uma mesa ao clicar no botão "Limpar"
document.querySelectorAll('.btnLimpar').forEach(button => {
    button.addEventListener('click', function() {
        let mesa = this.dataset.mesa;
        limparMesa(mesa);
    });
});