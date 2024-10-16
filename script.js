function adicionarPedido(mesa) {
    let nome = document.getElementById(`nome-produto${mesa}`).value;
    let valor = parseFloat(document.getElementById(`valor-produto${mesa}`).value);
    let quantidade = parseInt(document.getElementById(`quantidade-produto${mesa}`).value);

    if (!isNaN(valor) && !isNaN(quantidade) && nome !== "") {
        // Calculando o novo total
        let totalAtual = parseFloat(document.getElementById(`mesa${mesa}-total`).innerText.replace("Total: R$ ", "").replace(",", "."));
        let novoTotal = totalAtual + (valor * quantidade);
        
        // Atualizando o total da mesa
        document.getElementById(`mesa${mesa}-total`).innerText = `Total: R$ ${novoTotal.toFixed(2).replace(".", ",")}`;

        // Gerar QR Code se o total for maior que 0
        if (novoTotal > 0) {
            document.getElementById(`mesa${mesa}-qrcode`).style.display = "block";
            gerarQRCode(mesa);
        }
    }
}

function limparMesa(mesa) {
    // Limpando os inputs de nome, valor e quantidade
    document.getElementById(`nome-produto${mesa}`).value = "";
    document.getElementById(`valor-produto${mesa}`).value = "";
    document.getElementById(`quantidade-produto${mesa}`).value = "";

    // Resetando o total para R$ 0,00
    document.getElementById(`mesa${mesa}-total`).innerText = "Total: R$ 0,00";

    // Escondendo o QR Code
    document.getElementById(`mesa${mesa}-qrcode`).style.display = "none";
}

function gerarQRCode(mesa) {
    let qrDiv = document.getElementById(`mesa${mesa}-qrcode`);
    qrDiv.innerHTML = ""; // Limpa o QR Code anterior, se houver
    
    // Gerando o novo QR Code com o link correto para a mesa
    let qrcode = new QRCode(qrDiv, {
        text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`, // Link com o número da mesa
        width: 128,
        height: 128
    });
}