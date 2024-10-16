// Definindo as mesas
const mesas = [1, 2, 3, 4, 5];
const mesasContainer = document.getElementById("mesas");

// Função para limpar a mesa
function limparMesa(mesa) {
    const qrContainer = document.getElementById(`qrcode-${mesa}`);
    qrContainer.innerHTML = ""; // Limpa o QR Code
    document.getElementById(`total-${mesa}`).textContent = "Total: R$ 0,00"; // Reseta o total
}

// Função para gerar o QR Code
function gerarQRCode(mesa) {
    const totalElement = document.getElementById(`total-${mesa}`);
    const totalText = totalElement.textContent;
    
    // Verifica se o total é maior que 0
    if (parseFloat(totalText.replace("Total: R$ ", "").replace(",", ".")) > 0) {
        const qrContainer = document.getElementById(`qrcode-${mesa}`);
        qrContainer.innerHTML = ""; // Limpa o QR code anterior
        new QRCode(qrContainer, {
            text: `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`,
            width: 128,
            height: 128
        });
    } else {
        alert("O valor total deve ser maior que 0 para gerar o QR Code.");
    }
}

// Criar mesas dinamicamente
mesas.forEach(mesa => {
    const divMesa = document.createElement('div');
    divMesa.classList.add('mesa');
    divMesa.innerHTML = `
        <h2>Mesa ${mesa}</h2>
        <div id="qrcode-${mesa}" class="qrcode"></div>
        <p class="total" id="total-${mesa}">Total: R$ 0,00</p>
        <button onclick="gerarQRCode(${mesa})">Gerar QR Code</button>
        <button onclick="limparMesa(${mesa})">Limpar</button>
    `;
    mesasContainer.appendChild(divMesa);
});