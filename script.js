let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

function salvarPedido() {
    const nomeComprador = document.getElementById("nome_comprador").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const quantidadeKits = document.getElementById("quantidade_kits").value;
    const formaEntrega = document.getElementById("forma_entrega").value;
    const vendedor = document.getElementById("vendedor").value;

    const novoPedido = {
        nomeComprador,
        endereco,
        telefone,
        quantidadeKits,
        formaEntrega,
        vendedor
    };

    pedidos.push(novoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    atualizarTabela();
    limparFormulario();
}

function atualizarTabela() {
    const tabelaPedidos = document.getElementById("pedidos").getElementsByTagName('tbody')[0];
    tabelaPedidos.innerHTML = '';

    pedidos.forEach((pedido, index) => {
        const row = tabelaPedidos.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${pedido.nomeComprador}</td>
            <td>${pedido.endereco}</td>
            <td>${pedido.telefone}</td>
            <td>${pedido.quantidadeKits}</td>
            <td>${pedido.formaEntrega}</td>
            <td>${pedido.vendedor}</td>
            <td><button onclick="excluirPedido(${index})">Excluir</button></td>
        `;
    });
}

function excluirPedido(index) {
    pedidos.splice(index, 1);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    atualizarTabela();
}

function gerarRelatorio() {
    let relatorio = "Relatório de Pedidos:\n\n";
    pedidos.forEach((pedido, index) => {
        relatorio += `Pedido #${index + 1}:\n`;
        relatorio += `Nome: ${pedido.nomeComprador}\n`;
        relatorio += `Endereço: ${pedido.endereco}\n`;
        relatorio += `Telefone: ${pedido.telefone}\n`;
        relatorio += `Quantidade de Kits: ${pedido.quantidadeKits}\n`;
        relatorio += `Forma de Entrega: ${pedido.formaEntrega}\n`;
        relatorio += `Vendedor: ${pedido.vendedor}\n\n`;
    });
    alert(relatorio);
}

function limparFormulario() {
    document.getElementById("nome_comprador").value = '';
    document.getElementById("endereco").value = '';
    document.getElementById("telefone").value = '';
    document.getElementById("quantidade_kits").value = '';
    document.getElementById("forma_entrega").value = 'domicilio';
    document.getElementById("vendedor").value = 'eduardo_andrade';
}

document.addEventListener('DOMContentLoaded', function () {
    atualizarTabela();
});
