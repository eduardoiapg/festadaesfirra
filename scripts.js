let pedidos = [];

$(document).ready(function(){
    $('#telefone').mask('(00) 00000-0000');
    $('#nome').on('input', function(){
        $(this).val($(this).val().toUpperCase());
    });
    $('#nome-avulso').on('input', function(){
        $(this).val($(this).val().toUpperCase());
    });
    carregarPedidos();
});

function anotarPedido() {
    const nome = document.getElementById('nome').value.toUpperCase();
    const endereco = document.getElementById('endereco').value.toUpperCase();
    const telefone = document.getElementById('telefone').value;
    const quantidade = document.getElementById('quantidade').value;
    const vendedor = document.getElementById('vendedor').value;

    const pedido = { nome, endereco, telefone, quantidade, vendedor };
    pedidos.push(pedido);
    atualizarTabelaPedidos();
    salvarPedidos();
}

function anotarPedidoAvulso() {
    const nome = document.getElementById('nome-avulso').value.toUpperCase();
    const quantidade = document.getElementById('quantidade-avulso').value;

    const pedido = { nome, endereco: 'RETIRADA', telefone: '', quantidade, vendedor: 'Avulso' };
    pedidos.push(pedido);
    atualizarTabelaPedidos();
    salvarPedidos();
}

function adicionarVendedor() {
    const novoVendedor = prompt('Digite o nome do novo vendedor:');
    if (novoVendedor) {
        const select = document.getElementById('vendedor');
        const option = document.createElement('option');
        option.value = novoVendedor;
        option.textContent = novoVendedor;
        select.appendChild(option);
    }
}

function atualizarTabelaPedidos() {
    const tbody = document.getElementById('pedidos-table');
    tbody.innerHTML = '';
    let totalKits = 0;
    pedidos.forEach((pedido, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedido.nome}</td>
            <td>${pedido.endereco}</td>
            <td>${pedido.telefone}</td>
            <td>${pedido.quantidade}</td>
            <td>${pedido.vendedor}</td>
            <td><button class="btn btn-danger" onclick="excluirPedido(${index})">Excluir</button></td>
        `;
        tbody.appendChild(row);
        totalKits += parseInt(pedido.quantidade);
    });
    document.getElementById('total-kits').textContent = `(${totalKits} kits)`;
}

function excluirPedido(index) {
    pedidos.splice(index, 1);
    atualizarTabelaPedidos();
    salvarPedidos();
}

function salvarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function carregarPedidos() {
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (pedidosSalvos) {
        pedidos = JSON.parse(pedidosSalvos);
        atualizarTabelaPedidos();
    }
}

function abrirPaginaConferencia() {
    window.open('conferencia.html', '_blank');
}
