let mesaSelecionada = null;
let pedidos = {
    mesa1: [],
    mesa2: [],
    mesa3: [],
    mesa4: []
};

// Função para selecionar a mesa
function selecionarMesa(mesa) {
    mesaSelecionada = mesa;
    document.getElementById('mesaSelecionadaTexto').innerText = `Cadastro de Lanches para ${mesa.replace('mesa', 'Mesa ')}`;
    document.getElementById('pedidosMesa').innerHTML = listarPedidos(mesaSelecionada);
    document.getElementById('qr-code').style.display = 'none';
}

// Função para adicionar um pedido
function adicionarPedido(event) {
    event.preventDefault();
    const nomeLanche = document.getElementById('nomeLanche').value;
    const valorLanche = parseFloat(document.getElementById('valorLanche').value);

    if (!mesaSelecionada) {
        alert('Selecione uma mesa!');
        return;
    }

    const novoPedido = { nome: nomeLanche, valor: valorLanche };
    pedidos[mesaSelecionada].push(novoPedido);

    localStorage.setItem(`pedidos_${mesaSelecionada}`, JSON.stringify(pedidos[mesaSelecionada]));

    document.getElementById('pedidosMesa').innerHTML = listarPedidos(mesaSelecionada);
    gerarQRCode();
    document.getElementById('nomeLanche').value = '';
    document.getElementById('valorLanche').value = '';
}

// Função para listar os pedidos da mesa
function listarPedidos(mesa) {
    const mesaPedidos = pedidos[mesa] || [];
    let html = '<h3>Pedidos por Mesa</h3>';
    let total = 0;
    mesaPedidos.forEach((pedido, index) => {
        html += `${index + 1}. ${pedido.nome} - R$ ${pedido.valor.toFixed(2)}<br>`;
        total += pedido.valor;
    });
    html += `<h4>Total: R$ ${total.toFixed(2)}</h4>`;
    return html;
}

// Função para gerar o QR Code com o resumo da mesa
function gerarQRCode() {
    const qrCodeDiv = document.getElementById('qr-code-imagem');
    qrCodeDiv.innerHTML = ''; // Limpar o conteúdo anterior

    const mesaPedidos = pedidos[mesaSelecionada] || [];
    let total = mesaPedidos.reduce((acc, pedido) => acc + pedido.valor, 0);

    const qrContent = `Mesa ${mesaSelecionada.replace('mesa', '')}\nTotal: R$ ${total.toFixed(2)}\nPedidos:\n` +
        mesaPedidos.map(p => `${p.nome} - R$ ${p.valor.toFixed(2)}`).join('\n');

    const qrCode = new QRCode(qrCodeDiv, {
        text: qrContent,
        width: 128,
        height: 128
    });

    document.getElementById('qr-code').style.display = 'block';
}

// Função para limpar os pedidos da mesa
function limparMesa() {
    if (!mesaSelecionada) {
        alert('Selecione uma mesa!');
        return;
    }

    pedidos[mesaSelecionada] = [];
    localStorage.setItem(`pedidos_${mesaSelecionada}`, JSON.stringify(pedidos[mesaSelecionada]));

    document.getElementById('pedidosMesa').innerHTML = listarPedidos(mesaSelecionada);
    document.getElementById('qr-code').style.display = 'none';
}