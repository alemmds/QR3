let mesas = {
    1: { total: 0, pedidos: [] },
    2: { total: 0, pedidos: [] },
    3: { total: 0, pedidos: [] },
    4: { total: 0, pedidos: [] },
    5: { total: 0, pedidos: [] }
};

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
                <button onclick="mostrarResumo(${i})">Mostrar Resumo e QR Code</button>
                <div class="qrcode" id="qrcode-${i}"></div>
                <button onclick="limparMesa(${i})">LIMPAR</button>
                <button onclick="resumoMesa(${i})">RESUMO</button>
            </div>
        `;
    }
}

function adicionarPedido(mesa) {
    const produto = document.getElementById(`produto-${mesa}`).value;
    const valor = parseFloat(document.getElementById(`valor-${mesa}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade-${mesa}`).value);

    if (produto && valor > 0 && quantidade > 0) {
        mesas[mesa].pedidos.push({ produto, valor, quantidade });
        calcularTotal(mesa);
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}

function calcularTotal(mesa) {
    const totalMesa = mesas[mesa].pedidos.reduce((acc, pedido) => acc + (pedido.valor * pedido.quantidade), 0);
    mesas[mesa].total = totalMesa;
    document.getElementById(`total-${mesa}`).textContent = `Total: R$ ${totalMesa.toFixed(2)}`;
}

function gerarQRCode(mesa) {
    const totalMesa = mesas[mesa].total;
    const qrcodeDiv = document.getElementById(`qrcode-${mesa}`);
    qrcodeDiv.innerHTML = ''; 

    if (totalMesa > 0) {
        const url = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
        new QRCode(qrcodeDiv, {
            text: url,
            width: 128,
            height: 128
        });
    }
}

function mostrarResumo(mesa) {
    calcularTotal(mesa); 
    const totalMesa = mesas[mesa].total;

    if (totalMesa > 0) {
        gerarQRCode(mesa);
    } else {
        alert("Adicione pedidos para gerar o resumo e QR code!");
    }
}

function limparMesa(mesa) {
    mesas[mesa].pedidos = [];
    mesas[mesa].total = 0;
    document.getElementById(`produto-${mesa}`).value = '';
    document.getElementById(`valor-${mesa}`).value = '';
    document.getElementById(`quantidade-${mesa}`).value = '';
    document.getElementById(`total-${mesa}`).textContent = 'Total: R$ 0,00';
    document.getElementById(`qrcode-${mesa}`).innerHTML = ''; 
}

function resumoMesa(mesa) {
    window.location.href = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa}`;
}

// Gerar mesas ao carregar a página
window.onload = gerarMesas;