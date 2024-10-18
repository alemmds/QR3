function adicionarItem(mesa) {
    let item = document.getElementById(`item${mesa}`).value;
    let valor = parseFloat(document.getElementById(`valor${mesa}`).value);
    let quantidade = parseInt(document.getElementById(`quantidade${mesa}`).value);
    
    if (!item || isNaN(valor) || isNaN(quantidade)) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    // Recupera ou inicializa os pedidos da mesa
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`)) || [];
    let pedido = { item, valor, quantidade };
    pedidos.push(pedido);
    localStorage.setItem(`mesa${mesa}`, JSON.stringify(pedidos));

    // Atualiza o total da mesa
    let totalElement = document.getElementById(`totalMesa${mesa}`);
    let currentTotal = parseFloat(totalElement.innerText.replace('Total: R$', '').replace(',', '.')) || 0;
    let newTotal = currentTotal + (valor * quantidade);
    totalElement.innerText = `Total: R$ ${newTotal.toFixed(2).replace('.', ',')}`;

    // Gera QR Code
    if (newTotal > 0) {
        let qrcodeDiv = document.getElementById(`qrcode${mesa}`);
        qrcodeDiv.innerHTML = ""; // Limpa o QR code anterior
        let qr = new QRCode(qrcodeDiv, {
            text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
            width: 128,
            height: 128
        });
    }
}

function limparMesa(mesa) {
    document.getElementById(`item${mesa}`).value = "";
    document.getElementById(`valor${mesa}`).value = "";
    document.getElementById(`quantidade${mesa}`).value = "";
    document.getElementById(`totalMesa${mesa}`).innerText = "Total: R$ 0,00";
    document.getElementById(`qrcode${mesa}`).innerHTML = "";
    localStorage.removeItem(`mesa${mesa}`);
}

function carregarResumoMesa(mesa) {
    let pedidos = JSON.parse(localStorage.getItem(`mesa${mesa}`));
    if (!pedidos || pedidos.length === 0) {
        document.getElementById("resumoPedidos").innerText = "Nenhum pedido registrado";
        document.getElementById("totalResumo").innerText = "Total: R$ 0,00";
        return;
    }

    let resumoHTML = "";
    let total = 0;
    pedidos.forEach(pedido => {
        let subtotal = pedido.valor * pedido.quantidade;
        total += subtotal;
        resumoHTML += `<li>${pedido.item} - Qtd: ${pedido.quantidade} - R$ ${pedido.valor.toFixed(2).replace('.', ',')} (Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')})</li>`;
    });

    document.getElementById("resumoPedidos").innerHTML = resumoHTML;
    document.getElementById("totalResumo").innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function voltarPagina() {
    window.history.back();
}

// Carregar o resumo da mesa correspondente ao QR code
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mesa = urlParams.get('mesa');
    if (mesa) {
        carregarResumoMesa(mesa);
    }
});