// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCnB8oJ711SF79RQZ9qrLrMqa1RrrlROVg",
    authDomain: "festadaesfirraiapg.firebaseapp.com",
    projectId: "festadaesfirraiapg",
    storageBucket: "festadaesfirraiapg.appspot.com",
    messagingSenderId: "503098581785",
    appId: "festadaesfirraiapg"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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

    const pedido = { nome, endereco, telefone, quantidade: parseInt(quantidade), vendedor };
    db.collection('pedidos').add(pedido)
        .then(() => {
            console.log('Pedido adicionado com sucesso!');
            carregarPedidos();
        })
        .catch((error) => {
            console.error('Erro ao adicionar pedido: ', error);
        });
}

function anotarPedidoAvulso() {
    const nome = document.getElementById('nome-avulso').value.toUpperCase();
    const quantidade = document.getElementById('quantidade-avulso').value;

    const pedido = { nome, endereco: 'RETIRADA', telefone: '', quantidade: parseInt(quantidade), vendedor: 'Avulso' };
    db.collection('pedidos').add(pedido)
        .then(() => {
            console.log('Pedido avulso adicionado com sucesso!');
            carregarPedidos();
        })
        .catch((error) => {
            console.error('Erro ao adicionar pedido avulso: ', error);
        });
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
            <td><button class="btn btn-danger" onclick="excluirPedido('${pedido.id}')">Excluir</button></td>
        `;
        tbody.appendChild(row);
        totalKits += parseInt(pedido.quantidade);
    });
    document.getElementById('total-kits').textContent = `(${totalKits} kits)`;
}

function excluirPedido(id) {
    db.collection('pedidos').doc(id).delete()
        .then(() => {
            console.log('Pedido excluído com sucesso!');
            carregarPedidos();
        })
        .catch((error) => {
            console.error('Erro ao excluir pedido: ', error);
        });
}

function carregarPedidos() {
    db.collection('pedidos').get()
        .then((querySnapshot) => {
            pedidos = [];
            querySnapshot.forEach((doc) => {
                const pedido = doc.data();
                pedido.id = doc.id;
                pedidos.push(pedido);
            });
            atualizarTabelaPedidos();
        })
        .catch((error) => {
            console.error('Erro ao carregar pedidos: ', error);
        });
}

function abrirPaginaConferencia() {
    window.open('conferencia.html', '_blank');
}
