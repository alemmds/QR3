// Função para adicionar um pedido à mesa
function adicionarPedido(mesa, nome, valor, quantidade) {
    if (!nome || !valor || !quantidade) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    valor = parseFloat(valor);
    quantidade = parseInt(quantidade);

    // Obtém pedidos armazenados no localStorage ou inicia uma nova lista
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`)) || [];

    pedidos.push({ nome, valor, quantidade });

    // Armazena os pedidos atualizados no localStorage
    localStorage.setItem(`mesa${mesa}`, JSON.stringify(pedidos));

    // Atualiza a interface da mesa e o total
    atualizarMesaHTML(mesa, pedidos);
    atualizarTotal(mesa);
    gerarQRCode(mesa);
}

// Função para limpar todos os pedidos da mesa
function limparMesa(mesa) {
    localStorage.removeItem(`mesa${mesa}`);
    atualizarMesaHTML(mesa, []);
    atualizarTotal(mesa);
    removerQRCode(mesa);
}

// Função para atualizar a interface da mesa com os pedidos atuais
function atualizarMesaHTML(mesa, pedidos) {
    let lista = document.getElementById(`lista-mesa${mesa}`);
    lista.innerHTML = ''; // Limpa a lista

    pedidos.forEach(pedido => {
        let item = document.createElement('li');
        item.innerText = `${pedido.nome} - R$${pedido.valor.toFixed(2)} x ${pedido.quantidade}`;
        lista.appendChild(item);
    });
}

// Função para calcular e atualizar o total da mesa
function atualizarTotal(mesa) {
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`)) || [];
    let total = pedidos.reduce((acc, pedido) => acc + pedido.valor * pedido.quantidade, 0);

    document.getElementById(`total-mesa${mesa}`).innerText = `Total: R$${total.toFixed(2)}`;

    // Exibe ou oculta o QR code conforme o valor total
    if (total > 0) {
        gerarQRCode(mesa);
    } else {
        removerQRCode(mesa);
    }
}

// Função para gerar o QR code com o link do resumo da mesa
function gerarQRCode(mesa) {
    let qrcodeDiv = document.getElementById(`qrcode-mesa${mesa}`);
    qrcodeDiv.innerHTML = ''; // Limpa o QR code anterior
    let qr = new QRCode(qrcodeDiv, {
        text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
        width: 128,
        height: 128
    });
}

// Função para remover o QR code quando a mesa está vazia
function removerQRCode(mesa) {
    let qrcodeDiv = document.getElementById(`qrcode-mesa${mesa}`);
    qrcodeDiv.innerHTML = ''; // Remove o QR code
}

// Função para carregar os pedidos da mesa ao abrir a página
function loadMesa(mesa) {
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`)) || [];
    atualizarMesaHTML(mesa, pedidos);
    atualizarTotal(mesa);
}

// Chama a função loadMesa para cada mesa ao carregar a página
window.onload = function() {
    for (let i = 1; i <= 5; i++) {
        loadMesa(i);
    }
}