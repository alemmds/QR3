function adicionarPedido(mesa) {
    let nome = document.getElementById(`nome-produto${mesa}`).value;
    let valor = parseFloat(document.getElementById(`valor-produto${mesa}`).value);
    let quantidade = parseInt(document.getElementById(`quantidade-produto${mesa}`).value);

    if (!isNaN(valor) && !isNaN(quantidade) && nome !== "") {
        let totalAtual = parseFloat(document.getElementById(`mesa${mesa}-total`).innerText.replace("Total: R$ ", "").replace(",", "."));
        let novoTotal = totalAtual + (valor * quantidade);

        // Atualizando o total da mesa
        document.getElementById(`mesa${mesa}-total`).innerText = `Total: R$ ${novoTotal.toFixed(2).replace(".", ",")}`;

        // Salvando os pedidos no Local Storage
        let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}-pedidos`)) || [];
        pedidos.push({ nome, valor, quantidade });
        localStorage.setItem(`mesa${mesa}-pedidos`, JSON.stringify(pedidos));

        // Gerar QR Code se o total for maior que 0
        if (novoTotal > 0) {
            document.getElementById(`mesa${mesa}-qrcode`).style.display = "block";
            gerarQRCode(mesa);
        }

        atualizarResumoMesa(mesa);
    }
}

function limparMesa(mesa) {
    document.getElementById(`nome-produto${mesa}`).value = "";
    document.getElementById(`valor-produto${mesa}`).value = "";
    document.getElementById(`quantidade-produto${mesa}`).value = "";
    
    document.getElementById(`mesa${mesa}-total`).innerText = "Total: R$ 0,00";
    document.getElementById(`mesa${mesa}-qrcode`).style.display = "none";

    // Limpar Local Storage
    localStorage.removeItem(`mesa${mesa}-pedidos`);

    atualizarResumoMesa(mesa);
}

function gerarQRCode(mesa) {
    let qrDiv = document.getElementById(`mesa${mesa}-qrcode`);
    qrDiv.innerHTML = ""; // Limpa o QR Code anterior, se houver
    
    let qrcode = new QRCode(qrDiv, {
        text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
        width: 128,
        height: 128
    });
}

function atualizarResumoMesa(mesa) {
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}-pedidos`)) || [];
    let resumoDiv = document.getElementById(`mesa${mesa}-resumo`);
    resumoDiv.innerHTML = ""; // Limpa o resumo anterior

    pedidos.forEach(pedido => {
        let item = document.createElement("div");
        item.innerText = `${pedido.nome} - R$${pedido.valor.toFixed(2)} x ${pedido.quantidade}`;
        resumoDiv.appendChild(item);
    });
}

// Carrega os pedidos do Local Storage ao iniciar a página
function carregarPedidosIniciais() {
    for (let mesa = 1; mesa <= 5; mesa++) {
        atualizarResumoMesa(mesa);
        let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}-pedidos`)) || [];
        if (pedidos.length > 0) {
            let total = pedidos.reduce((sum, pedido) => sum + (pedido.valor * pedido.quantidade), 0);
            document.getElementById(`mesa${mesa}-total`).innerText = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
            document.getElementById(`mesa${mesa}-qrcode`).style.display = "block";
            gerarQRCode(mesa);
        }
    }
}

window.onload = carregarPedidosIniciais;