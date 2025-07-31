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
  }
}

/**
 * Carrega os dados do localStorage ou da base de dados.
 * Insere clientes fictícios se estiver vazio.
 */
function carregarLocal() {
  if (MODO_TESTE) {
    clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    vendedores = JSON.parse(localStorage.getItem("vendedores") || "[]");

    // Inserir clientes fictícios apenas se não houver nenhum salvo
    if (clientes.length === 0) {
      clientes = [
        {
          id: 1,
          nome: "Cliente A",
          nomeFantasia: "Fantasia A",
          cnpj: "00.000.000/0001-00",
          inscricaoEstadual: "",
          logradouro: "",
          municipio: "",
          uf: "",
          cep: "",
          telefone: "",
          email: ""
        },
        {
          id: 2,
          nome: "Cliente B",
          nomeFantasia: "Fantasia B",
          cnpj: "11.111.111/0001-11",
          inscricaoEstadual: "",
          logradouro: "",
          municipio: "",
          uf: "",
          cep: "",
          telefone: "",
          email: ""
        },
        {
          id: 3,
          nome: "Cliente C",
          nomeFantasia: "Fantasia C",
          cnpj: "22.222.222/0001-22",
          inscricaoEstadual: "",
          logradouro: "",
          municipio: "",
          uf: "",
          cep: "",
          telefone: "",
          email: ""
        },
        {
          id: 4,
          nome: "Cliente D",
          nomeFantasia: "Fantasia D",
          cnpj: "33.333.333/0001-33",
          inscricaoEstadual: "",
          logradouro: "",
          municipio: "",
          uf: "",
          cep: "",
          telefone: "",
          email: ""
        }
      ];
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }

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
