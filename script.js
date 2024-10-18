let mesas = {
    mesa1: [],
    mesa2: [],
    mesa3: [],
    mesa4: []
};

function adicionarPedido(mesaId) {
    const produto = document.getElementById(`produto${mesaId}`).value;
    const valor = parseFloat(document.getElementById(`valor${mesaId}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade${mesaId}`).value);
    
    if (!produto || isNaN(valor) || isNaN(quantidade) || quantidade <= 0 || valor <= 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    const mesa = mesas[`mesa${mesaId}`];
    mesa.push({ produto, valor, quantidade });

    atualizarTotal(mesaId);
    gerarQRCode(mesaId);

    document.getElementById(`produto${mesaId}`).value = '';
    document.getElementById(`valor${mesaId}`).value = '';
    document.getElementById(`quantidade${mesaId}`).value = '';
}

function atualizarTotal(mesaId) {
    const mesa = mesas[`mesa${mesaId}`];
    const total = mesa.reduce((sum, item) => sum + item.valor * item.quantidade, 0);
    document.getElementById(`total${mesaId}`).innerText = `Total: R$${total.toFixed(2)}`;
}

function limparMesa(mesaId) {
    mesas[`mesa${mesaId}`] = [];
    document.getElementById(`total${mesaId}`).innerText = '';
    document.getElementById(`qrcode${mesaId}`).innerHTML = '';
}

function gerarQRCode(mesaId) {
    const mesa = mesas[`mesa${mesaId}`];
    const total = mesa.reduce((sum, item) => sum + item.valor * item.quantidade, 0);

    if (total > 0) {
        const qrcodeDiv = document.getElementById(`qrcode${mesaId}`);
        qrcodeDiv.innerHTML = '';
        new QRCode(qrcodeDiv, `https://alemmds.github.io/QR3/resumo.html?mesa=${mesaId}`);
    }
}