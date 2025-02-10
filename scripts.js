document.addEventListener('DOMContentLoaded', () => {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const listaPedidos = document.getElementById('lista-pedidos');
    const totalKitsVendidos = document.getElementById('total-kits-vendidos');

    function atualizarPedidos() {
        listaPedidos.innerHTML = '';
        let totalKits = 0;
        pedidos.forEach((pedido, index) => {
            const li = document.createElement('li');
            const vendedorInfo = pedido.vendedor ? `Vendedor: ${pedido.vendedor}` : 'Pedido Avulso';
            li.innerHTML = `
                <span>Pedido #${index + 1}: Nome: ${pedido.nome}, Quantidade: ${pedido.quantidade} kits, ${vendedorInfo}</span>
                <button onclick="excluirPedido(${index})">Excluir</button>
            `;
            listaPedidos.appendChild(li);
            totalKits += pedido.quantidade;
        });
        totalKitsVendidos.textContent = totalKits;
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }

    window.excluirPedido = function(index) {
        pedidos.splice(index, 1);
        atualizarPedidos();
    };

    document.getElementById('anotar-pedido').addEventListener('click', () => {
        const nome = document.getElementById('nome').value.toUpperCase();
        const endereco = document.getElementById('endereco').value.toUpperCase();
        const telefone = document.getElementById('telefone').value;
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const vendedor = document.getElementById('vendedor').value;

        pedidos.push({ nome, endereco, telefone, quantidade, vendedor });
        atualizarPedidos();
    });

    document.getElementById('anotar-avulso').addEventListener('click', () => {
        const nome = document.getElementById('nome-avulso').value.toUpperCase();
        const quantidade = parseInt(document.getElementById('quantidade-avulso').value);

        pedidos.push({ nome, quantidade });
        atualizarPedidos();
    });

    document.getElementById('gerar-relatorio').addEventListener('click', () => {
        gerarPDF(pedidos, 'Relatório de Pedidos', 'A4');
    });

    document.getElementById('gerar-tickets').addEventListener('click', () => {
        gerarPDF(pedidos, 'Tickets', 'A4', true);
    });

    document.getElementById('add-vendedor').addEventListener('click', () => {
        const novoVendedor = prompt('Nome do novo vendedor:');
        if (novoVendedor) {
            const option = document.createElement('option');
            option.value = novoVendedor;
            option.textContent = novoVendedor;
            document.getElementById('vendedor').appendChild(option);
        }
    });

    atualizarPedidos();
});

function gerarPDF(pedidos, titulo, formato, isTicket = false) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yOffset = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.text(titulo, 10, yOffset);
    yOffset += 10;

    if (isTicket) {
        let ticketCount = 0;
        pedidos.forEach((pedido, index) => {
            const vendedorInfo = pedido.vendedor ? `Vendedor: ${pedido.vendedor}` : 'Pedido Avulso';
            const pedidoText = `Pedido #${index + 1}\nNome: ${pedido.nome}\nQuantidade: ${pedido.quantidade} kits\n${vendedorInfo}`;

            if (ticketCount % 4 === 0 && ticketCount !== 0) {
                doc.addPage();
                yOffset = 10;
            }

            doc.rect(10, yOffset, pageWidth / 2 - 20, 60); // Tamanho do ticket
            doc.text(pedidoText, 15, yOffset + 10, { maxWidth: pageWidth / 2 - 30 });
            yOffset += 70;
            ticketCount++;
        });
    } else {
        const tableColumnWidths = [20, 40, 30, 30, 30];
        const tableHeaders = ['#', 'Nome', 'Quantidade', 'Endereço', 'Vendedor'];

        // Desenhar cabeçalho da tabela
        yOffset += 10;
        tableHeaders.forEach((header, i) => {
            doc.text(header, 10 + tableColumnWidths.slice(0, i).reduce((a, b) => a + b, 0), yOffset);
        });
        yOffset += 10;

        pedidos.forEach((pedido, index) => {
            const vendedorInfo = pedido.vendedor ? pedido.vendedor : 'Avulso';
            const pedidoText = [`${index + 1}`, pedido.nome, `${pedido.quantidade} kits`, pedido.endereco || 'Retirada', vendedorInfo];

            pedidoText.forEach((text, i) => {
                doc.text(text, 10 + tableColumnWidths.slice(0, i).reduce((a, b) => a + b, 0), yOffset);
            });
            yOffset += 10;

            if (yOffset > pageHeight - 20) {
                doc.addPage();
                yOffset = 20;
            }
        });
    }

    doc.save(`${titulo}.pdf`);
}
