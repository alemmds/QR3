function adicionarPedido(mesa) {
    const item = document.getElementById(`item${mesa}`).value;
    const valor = parseFloat(document.getElementById(`valor${mesa}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade${mesa}`).value);

    if (!item || isNaN(valor) || isNaN(quantidade)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const total = valor * quantidade;
    const pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`)) || [];
    pedidos.push({ item, valor, quantidade, total });
    localStorage.setItem(`mesa${mesa}`, JSON.stringify(pedidos));

    gerarQRCode(mesa, pedidos);
}

function limparMesa(mesa) {
    localStorage.removeItem(`mesa${mesa}`);
    document.getElementById(`qrcode${mesa}`).innerHTML = '';
}

function gerarQRCode(mesa, pedidos) {
    const total = pedidos.reduce((sum, pedido) => sum + pedido.total, 0);

    if (total > 0) {
        const link = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
        const qrCodeContainer = document.getElementById(`qrcode${mesa}`);
        qrCodeContainer.innerHTML = '';
        new QRCode(qrCodeContainer, link);
    }
}