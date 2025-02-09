// Função para salvar o pedido
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; // Carregar pedidos do localStorage (se existirem)

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

  // Salvar pedidos no localStorage
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  atualizarTabela();
  limparFormulario();
}

// Atualizar a tabela de pedidos
function atualizarTabela() {
  const tabelaPedidos = document.getElementById("pedidos").getElementsByTagName('tbody')[0];
  tabelaPedidos.innerHTML = ''; // Limpa a tabela antes de adicionar os novos pedidos

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

// Limpar formulário
function limparFormulario() {
  document.getElementById("nome_comprador").value = '';
  document.getElementById("endereco").value = '';
  document.getElementById("telefone").value = '';
  document.getElementById("quantidade_kits").value = '';
  document.getElementById("forma_entrega").value = 'domicilio';
  document.getElementById("vendedor").value = 'eduardo_andrade';
}

// Função para excluir pedido
function excluirPedido(index) {
  pedidos.splice(index, 1);

  // Atualizar localStorage após excluir o pedido
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  atualizarTabela();
}

// Função para gerar relatório (simulação para impressão)
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
  alert(relatorio); // Exibe o relatório em uma janela de alerta
}

// Carregar os pedidos assim que a página for carregada
document.addEventListener('DOMContentLoaded', function () {
  atualizarTabela();
});
