document.addEventListener('DOMContentLoaded', function() {
    const pedidosSalvos = localStorage.getItem('pedidos');
    let pedidos = [];

    if (pedidosSalvos) {
        pedidos = JSON.parse(pedidosSalvos);
    }

    // Ordenar pedidos por nome
    pedidos.sort((a, b) => a.nome.localeCompare(b.nome));

    // Exibir pedidos na tabela
    const tbody = document.getElementById('conferencia-table');
    pedidos.forEach(pedido => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedido.nome}</td>
            <td>${pedido.endereco}</td>
            <td>${pedido.telefone}</td>
            <td>${pedido.quantidade}</td>
            <td>${pedido.vendedor}</td>
        `;
        tbody.appendChild(row);
    });
});
