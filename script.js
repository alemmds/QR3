// Função para adicionar pedidos
function adicionarPedido(mesaId) {
    const nome = document.getElementById(`nome-produto${mesaId}`).value;
    const valor = parseFloat(document.getElementById(`valor-produto${mesaId}`).value);
    const quantidade = parseInt(document.getElementById(`quantidade-produto${mesaId}`).value);

    if (!nome || isNaN(valor) || isNaN(quantidade) || quantidade <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const pedidos = JSON.parse(localStorage.getItem(`pedidosMesa${mesaId}`)) || [];

    // Adiciona o pedido à lista
    pedidos.push({ nome, valor, quantidade });

    // Salva no localStorage
    localStorage.setItem(`pedidosMesa${mesaId}`, JSON.stringify(pedidos));

    // Atualiza o total
    atualizarTotal(mesaId);

    // Limpa os campos
    document.getElementById(`nome-produto${mesaId}`).value = '';
    document.getElementById(`valor-produto${mesaId}`).value = '';
    document.getElementById(`quantidade-produto${mesaId}`).value = '';

    alert("Pedido adicionado com sucesso!");
}

// Função para atualizar o total da mesa
function atualizarTotal(mesaId) {
    const pedidos = JSON.parse(localStorage.getItem(`pedidosMesa${mesaId}`)) || [];
    const total = pedidos.reduce((acc, pedido) => acc + pedido.valor * pedido.quantidade, 0);

    // Atualiza o total na interface
    document.getElementById(`mesa${mesaId}-total`).textContent = `Total: R$ ${total.toFixed(2)}`;

    // Exibe ou oculta o botão de gerar QR code baseado no total
    if (total > 0) {
        document.getElementById(`mesa${mesaId}-qrcode`).style.display = 'block';
    } else {
        document.getElementById(`mesa${mesaId}-qrcode`).style.display = 'none';
    }
}

// Função para gerar o QR Code
function gerarQRCode(mesaId) {
    const pedidos = JSON.parse(localStorage.getItem(`pedidosMesa${mesaId}`)) || [];
    const total = pedidos.reduce((acc, pedido) => acc + pedido.valor * pedido.quantidade, 0);

    if (total > 0) {
        window.location.href = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesaId}`;
    } else {
        alert('Nenhum pedido para esta mesa.');
    }
}

// Função para limpar os pedidos da mesa
function limparMesa(mesaId) {
    if (confirm('Tem certeza que deseja limpar todos os pedidos desta mesa?')) {
        localStorage.removeItem(`pedidosMesa${mesaId}`);
        document.getElementById(`mesa${mesaId}-total`).textContent = 'Total: R$ 0,00';
        document.getElementById(`mesa${mesaId}-qrcode`).style.display = 'none';
    }
}

// Função para exibir os pedidos na página de resumo
function exibirPedidos() {
    const urlParams = new URLSearchParams(window.location.search);
    const mesaId = urlParams.get('mesa');
    const pedidos = JSON.parse(localStorage.getItem(`pedidosMesa${mesaId}`)) || [];
    const pedidosList = document.getElementById('pedidos-list');
    const totalValor = document.getElementById('total-valor');
    let total = 0;

    pedidosList.innerHTML = '';

    if (pedidos.length === 0) {
        pedidosList.innerHTML = '<li>Nenhum pedido registrado</li>';
    } else {
        pedidos.forEach((pedido, index) => {
            const li = document.createElement('li');
            li.textContent = `${pedido.nome} - R$ ${pedido.valor.toFixed(2)} (Qtd: ${pedido.quantidade})`;
            pedidosList.appendChild(li);
            total += pedido.valor * pedido.quantidade;
        });

        totalValor.textContent = total.toFixed(2);
    }
}

// Função para voltar para a página principal
function voltar() {
    window.location.href = 'index.html'; // Redireciona para a página principal
}

// Carregar pedidos ao abrir a página de resumo
window.onload = function() {
    if (window.location.pathname.includes('resumo.html')) {
        exibirPedidos();
    }
};