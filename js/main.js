// main.js - Inicialização, Login e Menu Principal

function telaLogin() {
  document.getElementById("app").innerHTML = `
    <header><h2>Login - Vendedor</h2></header>
    <div class="container">
      <label>ID do Vendedor:</label>
      <input type="text" id="loginId" autofocus>
      <label>Senha:</label>
      <input type="password" id="loginSenha">
      <button onclick="fazerLogin()">Entrar</button>
    </div>
  `;
}

function fazerLogin() {
  const id = document.getElementById("loginId").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  const vendedor = vendedores.find(v => 
    v.id.toString() === id && v.senha === senha   // ✅ agora valida pelo campo senha
  );

  if (!vendedor) {
    alert("Usuário ou senha inválidos");
    return;
  }
  vendedorLogado = vendedor;
  mostrarMenu();
}

function mostrarMenu() {
  document.getElementById("app").innerHTML = `
    <header><h2>Menu Principal</h2></header>
    <div class="container">
      <div id="menuInicial">
        <div class="menu-item menu-clientes" onclick="telaClientes()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          Clientes
        </div>
        <div class="menu-item menu-pedidos" onclick="telaPedidos()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6h18v2H3zM3 12h18v2H3zM3 18h18v2H3z"/></svg>
          Pedidos
        </div>
        <div class="menu-item menu-produtos" onclick="telaProdutos()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 7v7c0 5 5 7 10 7s10-2 10-7V7l-10-5z"/></svg>
          Produtos
        </div>
        <div class="menu-item menu-relatorios" onclick="telaRelatorios()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-8h14V7H7v2z"/></svg>
          Relatórios
        </div>
        <div class="menu-item menu-perfil" onclick="telaPerfilVendedor()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          Perfil
        </div>
        <div class="menu-item menu-sair" onclick="logout()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
          Sair
        </div>
      </div>
    </div>
  `;
}


function telaPerfilVendedor() {
  if (!vendedorLogado) {
    alert("Vendedor não logado");
    telaLogin();
    return;
  }

  document.getElementById("app").innerHTML = `
    <header><h2>Perfil do Vendedor</h2></header>
    <div class="container">
      <label>ID:</label>
      <input type="text" value="${vendedorLogado.id}" readonly>
      <label>Nome:</label>
      <input type="text" id="vendedorNome" value="${vendedorLogado.nome}">
      <label>Telefone:</label>
      <input type="text" id="vendedorTelefone" value="${vendedorLogado.telefone}">
      <label>Email:</label>
      <input type="text" id="vendedorEmail" value="${vendedorLogado.email}">
      <button onclick="salvarPerfilVendedor()">Salvar</button>
      <button onclick="mostrarMenu()">Voltar</button>
    </div>
  `;
}

function salvarPerfilVendedor() {
  vendedorLogado.nome = document.getElementById("vendedorNome").value.trim();
  vendedorLogado.telefone = document.getElementById("vendedorTelefone").value.trim();
  vendedorLogado.email = document.getElementById("vendedorEmail").value.trim();

  const idx = vendedores.findIndex(v => v.id === vendedorLogado.id);
  if (idx !== -1) vendedores[idx] = vendedorLogado;

  salvarLocal();
  alert("Perfil salvo com sucesso!");
  mostrarMenu();
}

function logout() {
  vendedorLogado = null;
  telaLogin();
}

// ✅ Inicialização
window.onload = () => {
  carregarLocal();

  // ✅ Cria vendedor padrão com senha se não existir nenhum
  if (vendedores.length === 0) {
    vendedores.push({
      id: 1,
      nome: "Admin",
      telefone: "",
      email: "admin@teste.com",
      senha: "1234"  // senha separada
    });
    salvarLocal();
  }

  telaLogin();
};
