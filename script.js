// Máscara para o campo de telefone
function formatarTelefone(input) {
  const numeros = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  const formatado = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Formata o número
  input.value = formatado;
}

// Converter texto para maiúsculo
function converterParaMaiusculo(input) {
  input.value = input.value.toUpperCase();
}

// Função para salvar o pedido
let pedidos = [];
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
