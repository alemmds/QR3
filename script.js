// Função para adicionar um pedido
function adicionarPedido(mesa) {
    const item = document.getElementById(`item${mesa}`).value;
    const valor = document.getElementById(`valor${mesa}`).value;
    const quantidade = document.getElementById(`quantidade${mesa}`).value;

    if (item && valor > 0 && quantidade > 0) {
        const pedidos = JSON.parse(localStorage.getItem(`pedidosMesa${mesa}`)) || [];
        const total = valor * quantidade;
        pedidos.push({ item, valor: Number(valor), quantidade: Number(quantidade) });
        localStorage.setItem(`pedidosMesa${mesa}`, JSON.stringify(pedidos));

        atualizarResumo(mesa);
        gerarQRCode(mesa); // Garantindo que o QR code seja gerado após adicionar um pedido
    } else {
        alert("Preencha todos os campos corretamente.");
    }
}

// Função para limpar os pedidos da mesa
function limparMesa(mesa) {
    localStorage.removeItem(`pedidosMesa${mesa}`);
    document.getElementById(`qrcode${mesa}`).innerHTML = '';
    atualizarResumo(mesa);
}

// Função para atualizar o resumo dos pedidos na mesa
function atualizarResumo(mesa) {
    const pedidos = JSON.parse(localStorage.getItem(`pedidosMesa${mesa}`)) || [];
    let total = 0;
    let resumoHTML = '';

    if (pedidos.length > 0) {
        pedidos.forEach(pedido => {
            resumoHTML += `<p>${pedido.quantidade}x ${pedido.item} - R$${pedido.valor.toFixed(2)}</p>`;
            total += pedido.valor * pedido.quantidade;
        });
        resumoHTML += `<h3>Total: R$${total.toFixed(2)}</h3>`;
    } else {
        resumoHTML = '<p>Nenhum pedido registrado.</p>';
    }

    document.getElementById(`pedidos`).innerHTML = resumoHTML;
    document.getElementById(`total`).innerHTML = `Total: R$${total.toFixed(2)}`;

    // Atualiza o QR Code se houver total
    gerarQRCode(mesa, total);
}

// Função para gerar o QR Code
function gerarQRCode(mesa) {
    const qrcodeContainer = document.getElementById(`qrcode${mesa}`);
    qrcodeContainer.innerHTML = ''; // Limpa o QR Code anterior

    const pedidos = JSON.parse(localStorage.getItem(`pedidosMesa${mesa}`)) || [];
    if (pedidos.length > 0) {
        const total = pedidos.reduce((acc, pedido) => acc + (pedido.valor * pedido.quantidade), 0);
        if (total > 0) {
            const qrcode = new QRCode(qrcodeContainer, {
                text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
                width: 128,
                height: 128
            });
        }
    }
}

// Função para voltar para a página principal
function voltar() {
    window.history.back();
}

// Função para mostrar a mesa referenciada pelo QR code
function mostrarMesa() {
    const urlParams = new URLSearchParams(window.location.search);
    const mesa = urlParams.get('mesa');
    if (mesa) {
        atualizarResumo(mesa);
    }
}

// Atualiza os resumos ao carregar a página
window.onload = mostrarMesa;