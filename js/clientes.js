function telaClientes() {
  document.getElementById("app").innerHTML = `
    <header><h2>Clientes</h2></header>
    <div class="container">
      <button onclick="telaCadastroCliente()">Novo Cliente</button>
      <input type="text" id="buscaCliente" placeholder="Buscar por nome, CNPJ ou ID" oninput="filtrarClientes()" />
      <div id="listaClientes" style="margin-top:10px; max-height: 60vh; overflow-y: auto;"></div>
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
    (c.cnpj && c.cnpj.toLowerCase().includes(filtro)) ||
    (c.id && c.id.toString().includes(filtro))
  );

  if (filtrados.length === 0) {
    listaDiv.innerHTML = "<p>Nenhum cliente encontrado.</p>";
    return;
  }

  listaDiv.innerHTML = filtrados.map(c => `
    <div class="lista">
      <strong>${c.nome}</strong> <br/>
      CNPJ: ${c.cnpj || "-"} <br/>
      ID: ${c.id || "-"}<br/>
      <button onclick="visualizarCliente(${c.id})">Visualizar</button>
    </div>
  `).join("");
}

function telaCadastroCliente() {
  document.getElementById("app").innerHTML = `
    <header><h2>Cadastro de Cliente</h2></header>
    <div class="container">
      <label>ID:</label>
      <input type="text" id="clienteId" placeholder="(Opcional)"/>

      <label>Razão Social:</label>
      <input type="text" id="clienteRazaoSocial" placeholder="(Opcional)"/>

      <label>Nome Fantasia: *</label>
      <input type="text" id="clienteNome" required />

      <label>CNPJ: *</label>
      <input type="text" id="clienteCnpj" required />

      <label>Inscrição Estadual:</label>
      <input type="text" id="clienteInscricaoEstadual" />

      <label>Endereço (Logradouro):</label>
      <input type="text" id="clienteLogradouro" />

      <label>Número:</label>
      <input type="text" id="clienteNumero" />

      <label>Município:</label>
      <input type="text" id="clienteMunicipio" />

      <label>UF:</label>
      <input type="text" id="clienteUf" maxlength="2" />

      <label>CEP:</label>
      <input type="text" id="clienteCep" />

      <label>Telefone:</label>
      <input type="text" id="clienteTelefone" />

      <label>Email:</label>
      <input type="email" id="clienteEmail" />

      <button onclick="salvarCliente()">Salvar</button>
      <button onclick="telaClientes()">Voltar</button>
    </div>
  `;
}

function salvarCliente() {
  const nome = document.getElementById("clienteNome").value.trim();
  const cnpj = document.getElementById("clienteCnpj").value.trim();

  if (!nome || !cnpj) {
    alert("Nome e CNPJ são obrigatórios.");
    return;
  }

  const novoCliente = {
    id: document.getElementById("clienteId").value.trim() || gerarIdUnico(clientes),
    nome,
    nomeFantasia: document.getElementById("clienteRazaoSocial").value.trim(),
    cnpj,
    inscricaoEstadual: document.getElementById("clienteInscricaoEstadual").value.trim(),
    logradouro: document.getElementById("clienteLogradouro").value.trim(),
    numero: document.getElementById("clienteNumero").value.trim(),
    municipio: document.getElementById("clienteMunicipio").value.trim(),
    uf: document.getElementById("clienteUf").value.trim(),
    cep: document.getElementById("clienteCep").value.trim(),
    telefone: document.getElementById("clienteTelefone").value.trim(),
    email: document.getElementById("clienteEmail").value.trim()
  };

  clientes.push(novoCliente);
  salvarLocal();
  alert("Cliente salvo com sucesso!");
  telaClientes();
}

function visualizarCliente(id) {
  const c = clientes.find(c => c.id == id);
  if (!c) {
    alert("Cliente não encontrado.");
    return;
  }

  document.getElementById("app").innerHTML = `
    <header><h2>Cliente #${c.id}</h2></header>
    <div class="container">
      <p><strong>Nome Fantasia:</strong> ${c.nome || "-"}</p>
      <p><strong>Razão Social:</strong> ${c.nomeFantasia || "-"}</p>
      <p><strong>CNPJ:</strong> ${c.cnpj || "-"}</p>
      <p><strong>Inscrição Estadual:</strong> ${c.inscricaoEstadual || "-"}</p>
      <p><strong>Endereço:</strong> ${c.logradouro || "-"} ${c.numero || ""}</p>
      <p><strong>Município:</strong> ${c.municipio || "-"}</p>
      <p><strong>UF:</strong> ${c.uf || "-"}</p>
      <p><strong>CEP:</strong> ${c.cep || "-"}</p>
      <p><strong>Telefone:</strong> ${c.telefone || "-"}</p>
      <p><strong>Email:</strong> ${c.email || "-"}</p>
      <button onclick="telaClientes()">Voltar</button>
    </div>
  `;
}
