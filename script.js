// Objeto para armazenar os pedidos de cada mesa
let pedidosPorMesa = {
    mesa1: [],
    mesa2: [],
    mesa3: [],
    mesa4: []
};

// Variável para armazenar a mesa selecionada
let mesaSelecionada = "";

// Função para selecionar a mesa e exibir o formulário de cadastro
function selecionarMesa(mesa) {
    mesaSelecionada = mesa;

    // Atualiza o texto da mesa selecionada
    document.getElementById('mesa-selecionada').textContent = `Mesa ${mesa.replace('mesa', '')}`;

    // Exibe o formulário de cadastro de lanches
    document.getElementById('form-cadastro').style.display = 'block';
}

// Função para adicionar o pedido à mesa selecionada
function adicionarPedido() {
    if (mesaSelecionada === "") {
        alert("Selecione uma mesa primeiro!");
        return;
    }

    // Obtém os valores inseridos no formulário
    const nomeLanche = document.getElementById('nome-lanche').value;
    const valorLanche = parseFloat(document.getElementById('valor-lanche').value);

    if (nomeLanche === "" || isNaN(valorLanche)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Adiciona o pedido ao array da mesa selecionada
    pedidosPorMesa[mesaSelecionada].push({
        nome: nomeLanche,
        valor: valorLanche
    });

    // Atualiza a exibição dos pedidos
    exibirPedidosMesa(mesaSelecionada);

    // Limpa os campos do formulário após adicionar
    document.getElementById('nome-lanche').value = '';
    document.getElementById('valor-lanche').value = '';
}

// Função para exibir os pedidos da mesa selecionada
function exibirPedidosMesa(mesa) {
    const divPedidos = document.getElementById(`pedidos-${mesa}`);
    divPedidos.innerHTML = `<h3>Mesa ${mesa.replace('mesa', '')}</h3>`;

    let total = 0;
    pedidosPorMesa[mesa].forEach((pedido, index) => {
        divPedidos.innerHTML += `
            <p>${index + 1}. ${pedido.nome} - R$ ${pedido.valor.toFixed(2)}</p>
        `;
        total += pedido.valor;
    });

    divPedidos.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;

    // Gera o QR code e exibe abaixo do total
    gerarQRCode(mesa);
}

// Função para gerar o QR code do resumo da mesa
function gerarQRCode(mesa) {
    const divPedidos = document.getElementById(`pedidos-${mesa}`);
    const qrCodeUrl = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa.replace('mesa', '')}`;

    // Adiciona o QR code ao final da lista de pedidos
    divPedidos.innerHTML += `
        <div id="qr-code-${mesa}">
            <p>Resumo da Mesa ${mesa.replace('mesa', '')}</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeUrl}&size=150x150" alt="QR Code da Mesa ${mesa.replace('mesa', '')}">
        </div>
    `;
}

// Função para limpar os pedidos da mesa selecionada
function limparPedidosMesa(mesa) {
    pedidosPorMesa[mesa] = [];
    exibirPedidosMesa(mesa);
}