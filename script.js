// **Definindo as mesas
let mesas = {
    1: { total: 0, pedidos: [] },
    2: { total: 0, pedidos: [] },
    3: { total: 0, pedidos: [] },
    4: { total: 0, pedidos: [] },
    5: { total: 0, pedidos: [] }
};

// Função para gerar HTML das mesas
function gerarMesas() {
    const containerMesas = document.getElementById('mesas');
    for (let i = 1; i <= 5; i++) {
        containerMesas.innerHTML += `
            <div class="mesa" id="mesa-${i}">
                <h2>Mesa ${i}</h2>
                <input type="text" placeholder="Produto" id="produto-${i}">
                <input type="number" placeholder="Valor" id="valor-${i}">
                <input type="number" placeholder="Quantidade" id="quantidade-${i}">
                <button onclick="adicionarPedido(${i})">Adicionar</button>
                <p class="total" id="total-${i}">Total: R$ 0,00</p>
                <div class="qrcode" id="qrcode-${i}"></div>
                <button onclick="limparMesa(${i})">LIMPAR</button>
                <button onclick="atualizarMesa(${i})">ATUALIZAR</button>
            </div>
        `;
    }
}

// Função para adicionar pedidos
function adicionarPedido(mesa) {
    const produto = document.getElementById(`produto-${mesa}`).value;
    const valor = parseFloat(document.getElementById(`valor-${mesa}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade-${mesa}`).value);

    if (produto && valor > 0 && quantidade > 0) {
        mesas[mesa].pedidos.push({ produto, valor, quantidade });
        calcularTotal(mesa);
        gerarQRCode(mesa);
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

// Função para calcular o total da mesa
function calcularTotal(mesa) {
    const totalMesa = mesas[mesa].pedidos.reduce((acc, pedido) => acc + (pedido.valor * pedido.quantidade), 0);
    mesas[mesa].total = totalMesa;
    document.getElementById(`total-${mesa}`).textContent = `Total: R$ ${totalMesa.toFixed(2)}`;
}

// Função para gerar QR code
function gerarQRCode(mesa) {
    const totalMesa = mesas[mesa].total;
    const qrcodeDiv = document.getElementById(`qrcode-${mesa}`);
    qrcodeDiv.innerHTML = ''; // Limpa o QR code anterior

    if (totalMesa > 0) {
        const url = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
        new QRCode(qrcodeDiv, {
            text: url,
            width: 128,
            height: 128
        });
    }
}

// Função para limpar mesa
function limparMesa(mesa) {
    mesas[mesa].pedidos = [];
    mesas[mesa].total = 0;
    document.getElementById(`produto-${mesa}`).value = '';
    document.getElementById(`valor-${mesa}`).value = '';
    document.getElementById(`quantidade-${mesa}`).value = '';
    document.getElementById(`total-${mesa}`).textContent = 'Total: R$ 0,00';
    document.getElementById(`qrcode-${mesa}`).innerHTML = '';
}

// Função para atualizar mesa
function atualizarMesa(mesa) {
    const url = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
    window.location.href = url; // Redireciona para o resumo da mesa
}

// Inicializa as mesas no carregamento da página
window.onload = gerarMesas;
