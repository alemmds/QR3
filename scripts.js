// Função para adicionar itens ao pedido
function adicionarItem(mesa) {
    const item = document.getElementById(`item${mesa}`).value;
    const preco = parseFloat(document.getElementById(`preco${mesa}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade${mesa}`).value);

    if (item && preco && quantidade) {
        const total = preco * quantidade;
        const totalElement = document.getElementById(`total${mesa}`);
        const currentTotal = parseFloat(totalElement.textContent.replace('Total: R$', '').replace(',', '.'));

        const newTotal = currentTotal + total;
        totalElement.textContent = `Total: R$ ${newTotal.toFixed(2)}`;

        // Gera o QR Code e atualiza o link
        gerarQRCode(mesa, newTotal);
    }
}

// Função para limpar os pedidos de uma mesa
function limparMesa(mesa) {
    document.getElementById(`total${mesa}`).textContent = 'Total: R$ 0,00';
    document.getElementById(`qrcode${mesa}`).innerHTML = '';
    document.getElementById(`resumo${mesa}`).textContent = '';
}

// Função para alterar o pedido da mesa
function alterarPedido(mesa) {
    window.location.href = `resumo.html?mesa=${mesa}&editar=true`;
}

// Função para gerar o QR Code
function gerarQRCode(mesa, total) {
    const qrContainer = document.getElementById(`qrcode${mesa}`);
    qrContainer.innerHTML = ''; // Limpa o QR Code existente

    const qrCodeLink = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
    new QRCode(qrContainer, {
        text: qrCodeLink,
        width: 128,
        height: 128
    });

    const resumoLink = document.getElementById(`resumo${mesa}`);
    resumoLink.textContent = 'Ver Resumo';
    resumoLink.href = qrCodeLink;
}
