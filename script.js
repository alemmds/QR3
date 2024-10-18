// Função para adicionar um pedido à mesa
function adicionarPedido(mesa) {
    const nome = document.getElementById(`nome${mesa}`).value;
    const valor = parseFloat(document.getElementById(`valor${mesa}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade${mesa}`).value);
    
    if (nome && valor > 0 && quantidade > 0) {
        const total = valor * quantidade;

        // Armazenar o pedido no localStorage
        const pedido = { nome, valor, quantidade, total };
        localStorage.setItem(`pedido_mesa${mesa}`, JSON.stringify(pedido));

        // Gera o QR code se houver pelo menos 1 item na mesa
        gerarQRCode(mesa);
    } else {
        alert("Preencha todos os campos corretamente.");
    }
}

// Função para limpar os pedidos da mesa
function limparMesa(mesa) {
    // Remove o pedido do localStorage
    localStorage.removeItem(`pedido_mesa${mesa}`);

    // Limpa a visualização do QR code
    document.getElementById(`qrcode${mesa}`).innerHTML = '';

    alert(`Pedidos da Mesa ${mesa} foram limpos.`);
}

// Função para gerar o QR code
function gerarQRCode(mesa) {
    const pedido = JSON.parse(localStorage.getItem(`pedido_mesa${mesa}`));
    
    if (pedido && pedido.total > 0) {
        const qrcodeDiv = document.getElementById(`qrcode${mesa}`);
        qrcodeDiv.innerHTML = ''; // Limpa o QR code anterior para gerar um novo

        const qrcode = new QRCode(qrcodeDiv, {
            text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
            width: 128,
            height: 128
        });

        alert(`QR Code gerado para a Mesa ${mesa}.`);
    } else {
        alert("Nenhum pedido encontrado para gerar QR Code.");
    }
}

// Função para carregar os pedidos no resumo (resumo.html)
function carregarResumo() {
    const urlParams = new URLSearchParams(window.location.search);
    const mesa = urlParams.get('mesa');

    const pedido = JSON.parse(localStorage.getItem(`pedido_mesa${mesa}`));

    if (pedido) {
        document.getElementById('resumoPedidos').innerHTML = `
            <p><strong>Nome do Item:</strong> ${pedido.nome}</p>
            <p><strong>Valor:</strong> R$${pedido.valor.toFixed(2)}</p>
            <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
            <p><strong>Total:</strong> R$${pedido.total.toFixed(2)}</p>
        `;
    } else {
        document.getElementById('resumoPedidos').innerHTML = '<p>Nenhum pedido registrado.</p>';
    }
}

// Função para voltar para a página principal
function voltar() {
    window.location.href = "index.html";
}

// Função para inicializar o manifest.json para web app
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function() {
        console.log('Service Worker Registered');
    });
}
