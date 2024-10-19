let pedidosPorMesa = {
    mesa1: [],
    mesa2: [],
    mesa3: [],
    mesa4: []
};

let mesaSelecionada = "";

function selecionarMesa(mesa) {
    mesaSelecionada = mesa;
    document.getElementById('mesa-selecionada').textContent = `Cadastro de Lanches para Mesa ${mesa.replace('mesa', '')}`;
    document.getElementById('form-cadastro').style.display = 'block';
    exibirPedidosMesa(mesaSelecionada);
}

function adicionarPedido() {
    if (mesaSelecionada === "") {
        alert("Selecione uma mesa primeiro!");
        return;
    }

    const nomeLanche = document.getElementById('nome-lanche').value;
    const valorLanche = parseFloat(document.getElementById('valor-lanche').value);

    if (nomeLanche === "" || isNaN(valorLanche)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    pedidosPorMesa[mesaSelecionada].push({
        nome: nomeLanche,
        valor: valorLanche
    });

    exibirPedidosMesa(mesaSelecionada);

    document.getElementById('nome-lanche').value = '';
    document.getElementById('valor-lanche').value = '';
}

function exibirPedidosMesa(mesa) {
    const divPedidos = document.getElementById(`pedidos-${mesa}`);
    divPedidos.innerHTML = `<h3>Mesa ${mesa.replace('mesa', '')}</h3>`;

    let total = 0;
    pedidosPorMesa[mesa].forEach((pedido, index) => {
        divPedidos.innerHTML += `
            <p>${index + 1}. ${pedido.nome} - R$ ${pedido.valor.toFixed(2)}</p>
        `;
        total += pedido.valor;
    });

    divPedidos.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
    gerarQRCode(mesa);
}

function gerarQRCode(mesa) {
    const divPedidos = document.getElementById(`pedidos-${mesa}`);
    const qrCodeUrl = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa.replace('mesa', '')}`;
    
    divPedidos.innerHTML += `
        <div id="qr-code-${mesa}">
            <p>Resumo da Mesa ${mesa.replace('mesa', '')}</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeUrl}&size=150x150" alt="QR Code da Mesa ${mesa.replace('mesa', '')}">
        </div>
    `;
}