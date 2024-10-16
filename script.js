$(document).ready(function () {
    $('.adicionar').on('click', function () {
        const mesa = $(this).closest('.mesa');
        const item = mesa.find('.item').val();
        const valor = parseFloat(mesa.find('.valor').val());
        const quantidade = parseInt(mesa.find('.quantidade').val());

        if (item && valor && quantidade) {
            let total = valor * quantidade;
            let resumo = mesa.find('.resumo');

            resumo.append(`<p>${item} - R$ ${valor.toFixed(2)} x ${quantidade} = R$ ${(total).toFixed(2)}</p>`);

            let valorTotal = 0;
            resumo.find('p').each(function () {
                const linha = $(this).text();
                const partes = linha.split('= R$ ');
                if (partes.length > 1) {
                    valorTotal += parseFloat(partes[1]);
                }
            });

            mesa.find('.qr-code').empty();
            if (valorTotal > 0) {
                const qrCodeUrl = `https://alemmds.github.io/QR3/resumo.html?mesa=${mesa.data('mesa')}`;
                new QRCode(mesa.find('.qr-code')[0], {
                    text: qrCodeUrl,
                    width: 128,
                    height: 128,
                });
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    $('.limpar').on('click', function () {
        const mesa = $(this).closest('.mesa');
        mesa.find('.item').val('');
        mesa.find('.valor').val('');
        mesa.find('.quantidade').val('');
        mesa.find('.resumo').empty();
        mesa.find('.qr-code').empty();
    });
});
