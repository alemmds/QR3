// Função para adicionar pedido
function adicionarPedido(mesaId) {
    const produto = document.getElementById(`produto-${mesaId}`).value;
    const valor = parseFloat(document.getElementById(`valor-${mesaId}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade-${mesaId}`).value);

    if (!produto || isNaN(valor) || isNaN(quantidade)) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    const pedidos = JSON.parse(localStorage.getItem('pedidosMesa' + mesaId)) || [];
    pedidos.push({ produto, valor, quantidade });

    localStorage.setItem('pedidosMesa' + mesaId, JSON.stringify(pedidos));
    calcularTotal(mesaId);
    gerarQRCode(mesaId);
}

// Função para calcular o total de pedidos de cada mesa
function calcularTotal(mesaId) {
    const pedidos = JSON.parse(localStorage.getItem('pedidosMesa' + mesaId)) || [];
    let total = 0;
    pedidos.forEach(pedido => {
        total += pedido.valor * pedido.quantidade;
    });

    document.getElementById(`total-${mesaId}`).innerText = `Total: R$ ${total.toFixed(2)}`;
    
    // Exibe o botão de resumo se o total for maior que 0
    const resumoBtn = document.getElementById(`resumo-${mesaId}`);
    if (total > 0) {
        resumoBtn.style.display = 'block';
    } else {
        resumoBtn.style.display = 'none';
    }
}

// Função para gerar o QR Code
function gerarQRCode(mesaId) {
    const qrContainer = document.getElementById(`qrcode-${mesaId}`);
    qrContainer.innerHTML = '';  // Limpa o QR Code anterior

    const qrCodeUrl = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesaId}`;
    const qrcode = new QRCode(qrContainer, {
        text: qrCodeUrl,
        width: 128,
        height: 128
    });
}

// Função para limpar os pedidos da mesa
function limparMesa(mesaId) {
    localStorage.removeItem('pedidosMesa' + mesaId);
    document.getElementById(`total-${mesaId}`).innerText = 'Total: R$ 0,00';
    document.getElementById(`qrcode-${mesaId}`).innerHTML = '';
    document.getElementById(`resumo-${mesaId}`).style.display = 'none';
}