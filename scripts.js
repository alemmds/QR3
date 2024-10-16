let mesas = {
    1: { total: 0, pedidos: [] },
    2: { total: 0, pedidos: [] },
    3: { total: 0, pedidos: [] },
    4: { total: 0, pedidos: [] },
    5: { total: 0, pedidos: [] }
};

function adicionarPedido(mesa) {
    const produto = document.getElementById(`produto-${mesa}`).value;
    const valor = parseFloat(document.getElementById(`valor-${mesa}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade-${mesa}`).value);

    if (produto && valor > 0 && quantidade > 0) {
        mesas[mesa].pedidos.push({ produto, valor, quantidade });
        calcularTotal(mesa);
        gerarQRCode(mesa);
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

function calcularTotal(mesa) {
    const totalMesa = mesas[mesa].pedidos.reduce((acc, pedido) => acc + (pedido.valor * pedido.quantidade), 0);
    mesas[mesa].total = totalMesa;
    document.getElementById(`total-${mesa}`).textContent = `Total: R$ ${totalMesa.toFixed(2)}`;
}

function gerarQRCode(mesa) {
    const totalMesa = mesas[mesa].total;
    const qrcodeDiv = document.getElementById(`qrcode-${mesa}`);
    qrcodeDiv.innerHTML = ''; // Limpa o QR code anterior

    if (totalMesa > 0) {
        const url = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
        new QRCode(qrcodeDiv, {
            text: url,
            width: 128,
            height: 128
        });
    }
}

function limparMesa(mesa) {
    mesas[mesa].pedidos = [];
    mesas[mesa].total = 0;
    document.getElementById(`produto-${mesa}`).value = '';
    document.getElementById(`valor-${mesa}`).value = '';
    document.getElementById(`quantidade-${mesa}`).value = '';
    document.getElementById(`total-${mesa}`).textContent = 'Total: R$ 0,00';
    document.getElementById(`qrcode-${mesa}`).innerHTML = '';
}

function atualizarMesa(mesa) {
    const url = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
    window.location.href = url; // Redireciona para a página de resumo da mesa
}