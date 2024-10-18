// Função para armazenar pedidos no LocalStorage
function salvarMesa(mesa, conteudo) {
    localStorage.setItem(`mesa${mesa}`, JSON.stringify(conteudo));
}

// Função para recuperar os pedidos do LocalStorage
function carregarMesa(mesa) {
    const conteudo = localStorage.getItem(`mesa${mesa}`);
    return conteudo ? JSON.parse(conteudo) : [];
}

// Função para adicionar itens à mesa a partir dos campos de formulário
function adicionar(mesa) {
    let item = document.getElementById(`item-nome${mesa}`).value;
    let valor = parseFloat(document.getElementById(`item-valor${mesa}`).value);
    let quantidade = parseInt(document.getElementById(`item-quantidade${mesa}`).value);

    if (!isNaN(valor) && !isNaN(quantidade) && item.trim() !== "") {
        let total = valor * quantidade;
        let conteudoMesa = carregarMesa(mesa);
        conteudoMesa.push({ item, valor, quantidade, total });

        salvarMesa(mesa, conteudoMesa);
        exibirPedidos(mesa);
        gerarQRCode(mesa);
        limparCampos(mesa);
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para limpar os campos de formulário após adicionar
function limparCampos(mesa) {
    document.getElementById(`item-nome${mesa}`).value = '';
    document.getElementById(`item-valor${mesa}`).value = '';
    document.getElementById(`item-quantidade${mesa}`).value = '';
}

// Função para exibir os pedidos na mesa
function exibirPedidos(mesa) {
    const conteudoMesa = carregarMesa(mesa);
    let conteudo = document.getElementById(`mesa${mesa}-content`);
    conteudo.innerHTML = '';

    let totalGeral = 0;

    conteudoMesa.forEach(pedido => {
        totalGeral += pedido.total;
        conteudo.innerHTML += `<p>${pedido.item} - R$${pedido.total.toFixed(2)} (${pedido.quantidade})</p>`;
    });

    conteudo.innerHTML += `<p><strong>Total: R$${totalGeral.toFixed(2)}</strong></p>`;
}

// Função para limpar itens da mesa
function limpar(mesa) {
    localStorage.removeItem(`mesa${mesa}`);
    document.getElementById(`mesa${mesa}-content`).innerHTML = '';
    document.getElementById(`qrcode${mesa}`).innerHTML = '';
}

// Função para gerar o QR code
function gerarQRCode(mesa) {
    const conteudoMesa = carregarMesa(mesa);
    
    if (conteudoMesa.length > 0) {
        let qrcodeDiv = document.getElementById(`qrcode${mesa}`);
        qrcodeDiv.innerHTML = '';
        new QRCode(qrcodeDiv, {
            text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
            width: 128, 
            height: 128
        });
    } else {
        alert("Adicione pelo menos um item antes de gerar o QR code.");
    }
}

// Função para carregar pedidos ao abrir a página
window.onload = function() {
    [1, 2, 3, 4].forEach(mesa => {
        exibirPedidos(mesa);
    });
}
