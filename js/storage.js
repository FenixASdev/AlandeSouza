// storage.js - Funções de salvar e carregar dados
const MODO_TESTE = true;  // ✅ Quando for integrar com banco, basta trocar para false

let clientes = [];
let produtos = [];
let pedidos = [];
let vendedores = [];
let vendedorLogado = null;

/**
 * Salva os dados no localStorage ou futura base de dados.
 */
function salvarLocal() {
  if (MODO_TESTE) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.setItem("vendedores", JSON.stringify(vendedores));
  } else {
    // 🔗 Aqui entra a integração com Google Sheets ou Firebase.
    // Exemplo: enviar via API usando fetch() ou SDK do Firebase.
  }
}

/**
 * Carrega os dados do localStorage ou da base de dados.
 */
function carregarLocal() {
  if (MODO_TESTE) {
    clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    vendedores = JSON.parse(localStorage.getItem("vendedores") || "[]");
  } else {
    // 🔗 Aqui entra a integração para carregar dados do banco.
  }
}

/**
 * Gera um ID incremental baseado na lista de objetos.
 */
function gerarIdUnico(arr) {
  if (arr.length === 0) return 1;
  return Math.max(...arr.map(x => x.id || 0)) + 1;
}

/**
 * 🔧 Função de inicialização para garantir vendedor padrão.
 * Chame isso na primeira execução para ter login padrão.
 */
function inicializarVendedorPadrao() {
  if (vendedores.length === 0) {
    vendedores.push({
      id: 1,
      nome: "Admin",
      telefone: "",
      email: "admin@teste.com",
      senha: "1234"  // ✅ senha separada do email
    });
    salvarLocal();
  }
}
