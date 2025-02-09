// Função para formatar o telefone
function formatarTelefone(input) {
  const numeros = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  const formatado = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Formata o número
  input.value = formatado;
}

// Função para converter texto para maiúsculo
function converterParaMaiusculo(input) {
  input.value = input.value.toUpperCase();
}

// Função para adicionar o vendedor ao pedido (simulação)
function adicionarVendedor() {
  const vendedor = document.getElementById('vendedor').value;
  alert("Vendedor adicionado: " + vendedor);
}

// Função para salvar o pedido (simulação)
function salvarPedido() {
  const nomeComprador = document.getElementById('nome_comprador').value;
  const endereco = document.getElementById('endereco').value;
  const telefone = document.getElementById('telefone').value;
  const quantidadeKits = document.getElementById('quantidade_kits').value;
  const formaEntrega = document.getElementById('forma_entrega').value;
  const vendedor = document.getElementById('vendedor').value;

  // Criar linha da tabela de pedidos
  const tabela = document.getElementById('pedidos').getElementsByTagName('tbody')[0];
  const novaLinha = tabela.insertRow();

  // Adiciona os dados nas células da linha
  novaLinha.insertCell(0).textContent = tabela.rows.length; // Número do pedido
  novaLinha.insertCell(1).textContent = nomeComprador;
  novaLinha.insertCell(2).textContent = endereco;
  novaLinha.insertCell(3).textContent = telefone;
  novaLinha.insertCell(4).textContent = quantidadeKits;
  novaLinha.insertCell(5).textContent = formaEntrega;
  novaLinha.insertCell(6).textContent = vendedor;

  // Adiciona botão de excluir pedido
  const acaoCell = novaLinha.insertCell(7);
  acaoCell.innerHTML = `<button onclick="excluirPedido(this)">Excluir</button>`;
  
  // Limpar os campos do formulário após salvar
  document.querySelector('form').reset();
}

// Função para excluir pedido da tabela
function excluirPedido(button) {
  const row = button.closest('tr');
  row.remove();
}

// Função para gerar o relatório de pedidos
function gerarRelatorio() {
  alert('Gerando relatório de pedidos para impressão...');
}
