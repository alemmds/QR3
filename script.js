let pedidosPorMesa = {
    mesa1: [],
    mesa2: [],
    mesa3: [],
    mesa4: []
};

let mesaSelecionada = "";

function selecionarMesa(mesa) {
    mesaSelecionada = mesa;
    document.getElementById('mesa-selecionada').textContent = `Cadastro de Lanches para Mesa ${mesa.replace('mesa', '')}`;
    document.getElementById('form-cadastro').style.display = 'block';
    exibirPedidosMesa(mesaSelecionada);
}

function adicionarPedido() {
    if (mesaSelecionada === "") {
        alert("Selecione uma mesa primeiro!");
        return;
    }

    const nomeLanche = document.getElementById('nome-lanche').value;
    const valorLanche = parseFloat(document.getElementById('valor-lanche').value);

    if (nomeLanche === "" || isNaN(valorLanche)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Adiciona o novo pedido à lista da mesa selecionada
    pedidosPorMesa[mesaSelecionada].push({
        nome: nomeLanche,
        valor: valorLanche
    });

    // Limpa os campos de input após adicionar o pedido
    document.getElementById('nome-lanche').value = '';
    document.getElementById('valor-lanche').value = '';

    // Atualiza a lista de pedidos e o QR code
    exibirPedidosMesa(mesaSelecionada);
}

function exibirPedidosMesa(mesa) {
    const divPedidos = document.getElementById('pedidos-lista');
    divPedidos.innerHTML = `<h3>Mesa ${mesa.replace('mesa', '')}</h3>`;

    let total = 0;
    pedidosPorMesa[mesa].forEach((pedido, index) => {
        divPedidos.innerHTML += `
            <p>${index + 1}. ${pedido.nome} - R$ ${pedido.valor.toFixed(2)}</p>
        `;
        total += pedido.valor;
    });

    divPedidos.innerHTML += `<h4>Total: R$ ${total.toFixed(2)}</h4>`;
    
    // Gera o QR Code para a mesa com seus itens
    gerarQRCode(mesa);
}

function gerarQRCode(mesa) {
    const qrCodeDiv = document.getElementById('qr-code');
    const qrCodeImageDiv = document.getElementById('qr-code-imagem');
    qrCodeDiv.style.display = 'block';
    
    const pedidos = pedidosPorMesa[mesa].map(pedido => `${pedido.nome} - R$ ${pedido.valor.toFixed(2)}`).join('\n');
    const total = pedidosPorMesa[mesa].reduce((acc, pedido) => acc + pedido.valor, 0);

    const qrContent = `Mesa ${mesa.replace('mesa', '')}\nTotal: R$ ${total.toFixed(2)}\nPedidos:\n${pedidos}`;
    
    // Geração de QR Code (usando algum plugin ou biblioteca como QRCode.js)
    qrCodeImageDiv.innerHTML = '';
    const qrCode = new QRCode(qrCodeImageDiv, {
        text: qrContent,
        width: 128,
        height: 128
    });
}

function limparMesa() {
    if (mesaSelecionada === "") {
        alert("Selecione uma mesa primeiro!");
        return;
    }

    // Limpa os pedidos da mesa selecionada
    pedidosPorMesa[mesaSelecionada] = [];
    
    // Atualiza a exibição da lista de pedidos
    exibirPedidosMesa(mesaSelecionada);
    
    // Remove o QR Code
    document.getElementById('qr-code-imagem').innerHTML = '';
}