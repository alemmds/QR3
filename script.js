function adicionarPedido(mesa) {
    const item = document.getElementById(`item-mesa${mesa}`).value;
    const valor = parseFloat(document.getElementById(`valor-mesa${mesa}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade-mesa${mesa}`).value);
    if (!item || isNaN(valor) || isNaN(quantidade)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}-pedidos`)) || [];
    pedidos.push({ item, valor, quantidade });
    localStorage.setItem(`mesa${mesa}-pedidos`, JSON.stringify(pedidos));

    atualizarTotal(mesa);
}

function atualizarTotal(mesa) {
    const pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}-pedidos`)) || [];
    let total = pedidos.reduce((acc, pedido) => acc + (pedido.valor * pedido.quantidade), 0);

    document.getElementById(`total-mesa${mesa}`).innerText = `Total: R$ ${total.toFixed(2)}`;
    
    if (total > 0) {
        document.getElementById(`resumo-btn-mesa${mesa}`).style.display = 'block';
        gerarQRCode(mesa);
    } else {
        document.getElementById(`resumo-btn-mesa${mesa}`).style.display = 'none';
    }
}

function limparMesa(mesa) {
    localStorage.removeItem(`mesa${mesa}-pedidos`);
    document.getElementById(`total-mesa${mesa}`).innerText = 'Total: R$ 0,00';
    document.getElementById(`qrcode-mesa${mesa}`).innerHTML = '';
    document.getElementById(`resumo-btn-mesa${mesa}`).style.display = 'none';
}

function gerarQRCode(mesa) {
    const qrCodeDiv = document.getElementById(`qrcode-mesa${mesa}`);
    qrCodeDiv.innerHTML = ''; // Limpa o QR code existente

    const qrcode = new QRCode(qrCodeDiv, {
        text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
        width: 128,
        height: 128
    });
}

function gerarResumo(mesa) {
    window.location.href = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
}