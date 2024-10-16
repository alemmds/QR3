<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script src="qrcode.min.js"></script>
    <script src="script.js" defer></script>
    <title>Mesas da Lanchonete Bacanga</title>
</head>
<body>
    <div class="container">
        <h1>Mesas da Lanchonete Bacanga</h1>
        <div class="mesas">
            <!-- Repetir para as 5 mesas -->
            <div class="mesa">
                <h2>Mesa 1</h2>
                <input type="text" id="nomeMesa1" placeholder="Nome do Produto">
                <input type="number" id="valorMesa1" placeholder="Valor" step="0.01">
                <input type="number" id="quantidadeMesa1" placeholder="Quantidade">
                <button class="btnAdicionar" data-mesa="1">Adicionar</button>
                <button class="btnLimpar" data-mesa="1">Limpar</button>
                <ul id="pedidosMesa1"></ul>
                <p id="totalMesa1">Total: R$0,00</p>
                <div id="qrcodeMesa1"></div>
            </div>
            <!-- Repita para mesas 2 a 5 -->
            <div class="mesa">
                <h2>Mesa 2</h2>
                <input type="text" id="nomeMesa2" placeholder="Nome do Produto">
                <input type="number" id="valorMesa2" placeholder="Valor" step="0.01">
                <input type="number" id="quantidadeMesa2" placeholder="Quantidade">
                <button class="btnAdicionar" data-mesa="2">Adicionar</button>
                <button class="btnLimpar" data-mesa="2">Limpar</button>
                <ul id="pedidosMesa2"></ul>
                <p id="totalMesa2">Total: R$0,00</p>
                <div id="qrcodeMesa2"></div>
            </div>
            <div class="mesa">
                <h2>Mesa 3</h2>
                <input type="text" id="nomeMesa3" placeholder="Nome do Produto">
                <input type="number" id="valorMesa3" placeholder="Valor" step="0.01">
                <input type="number" id="quantidadeMesa3" placeholder="Quantidade">
                <button class="btnAdicionar" data-mesa="3">Adicionar</button>
                <button class="btnLimpar" data-mesa="3">Limpar</button>
                <ul id="pedidosMesa3"></ul>
                <p id="totalMesa3">Total: R$0,00</p>
                <div id="qrcodeMesa3"></div>
            </div>
            <div class="mesa">
                <h2>Mesa 4</h2>
                <input type="text" id="nomeMesa4" placeholder="Nome do Produto">
                <input type="number" id="valorMesa4" placeholder="Valor" step="0.01">
                <input type="number" id="quantidadeMesa4" placeholder="Quantidade">
                <button class="btnAdicionar" data-mesa="4">Adicionar</button>
                <button class="btnLimpar" data-mesa="4">Limpar</button>
                <ul id="pedidosMesa4"></ul>
                <p id="totalMesa4">Total: R$0,00</p>
                <div id="qrcodeMesa4"></div>
            </div>
            <div class="mesa">
                <h2>Mesa 5</h2>
                <input type="text" id="nomeMesa5" placeholder="Nome do Produto">
                <input type="number" id="valorMesa5" placeholder="Valor" step="0.01">
                <input type="number" id="quantidadeMesa5" placeholder="Quantidade">
                <button class="btnAdicionar" data-mesa="5">Adicionar</button>
                <button class="btnLimpar" data-mesa="5">Limpar</button>
                <ul id="pedidosMesa5"></ul>
                <p id="totalMesa5">Total: R$0,00</p>
                <div id="qrcodeMesa5"></div>
            </div>
        </div>
    </div>
</body>
</html>