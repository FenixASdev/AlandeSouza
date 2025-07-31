// clientes.js - Cadastro, edição e exportação

function telaClientes() {
  document.getElementById("app").innerHTML = `
    <header><h2>Clientes</h2></header>
    <div class="container">
      <input type="text" id="buscaCliente" placeholder="Buscar cliente" oninput="filtrarClientes()">
      <button onclick="mostrarFormCliente()">Cadastrar Novo</button>
      <div id="listaClientes"></div>
      <button onclick="mostrarMenu()">Voltar</button>
    </div>
  `;
  filtrarClientes();
}

function filtrarClientes() {
  const filtro = document.getElementById("buscaCliente").value.toLowerCase();
  const listaDiv = document.getElementById("listaClientes");
  const filtrados = clientes.filter(c => 
    (c.nome && c.nome.toLowerCase().includes(filtro)) ||
    (c.cnpj && c.cnpj.toLowerCase().includes(filtro))
  );
  if (filtrados.length === 0) {
    listaDiv.innerHTML = "<p>Nenhum cliente encontrado.</p>";
    return;
  }
  listaDiv.innerHTML = filtrados.map(c => `
    <div class="lista">
      <strong>${c.nome}</strong><br>
      CNPJ: ${c.cnpj || "-"}<br>
      <button onclick="mostrarFormCliente(${c.id})">Editar</button>
      <button onclick="excluirCliente(${c.id})">Excluir</button>
    </div>
  `).join("");
}

function mostrarFormCliente(id) {
  let cliente = {id:"", nome:"", cnpj:""};
  let editar = false;
  if (id !== undefined) {
    cliente = clientes.find(c => c.id === id);
    editar = true;
  }
  document.getElementById("app").innerHTML = `
    <header><h2>${editar ? "Editar Cliente" : "Novo Cliente"}</h2></header>
    <div class="container">
      <label>Nome:</label>
      <input type="text" id="clienteNome" value="${cliente.nome || ""}">
      <label>CNPJ:</label>
      <input type="text" id="clienteCnpj" value="${cliente.cnpj || ""}">
      <button onclick="salvarCliente(${editar ? cliente.id : null})">Salvar</button>
      <button onclick="telaClientes()">Cancelar</button>
    </div>
  `;
}

function salvarCliente(id) {
  const nome = document.getElementById("clienteNome").value.trim();
  const cnpj = document.getElementById("clienteCnpj").value.trim();
  if (!nome) {
    alert("Nome é obrigatório");
    return;
  }
  const novo = { id: id || gerarIdUnico(clientes), nome, cnpj };
  if (!id) clientes.push(novo);
  else {
    const idx = clientes.findIndex(c => c.id === id);
    clientes[idx] = novo;
  }
  salvarLocal();
  telaClientes();
}

function excluirCliente(id) {
  if (!confirm("Excluir cliente?")) return;
  clientes = clientes.filter(c => c.id !== id);
  salvarLocal();
  telaClientes();
}
