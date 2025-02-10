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

document.addEventListener('DOMContentLoaded', function() {
    db.collection('pedidos').get()
        .then((querySnapshot) => {
            let pedidos = [];
            querySnapshot.forEach((doc) => {
                const pedido = doc.data();
                pedido.id = doc.id;
                pedidos.push(pedido);
            });

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
        })
        .catch((error) => {
            console.error('Erro ao carregar pedidos: ', error);
        });
});
