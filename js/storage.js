// storage.js - Funções de salvar e carregar dados
const MODO_TESTE = true;  // ✅ Quando for integrar com banco, basta trocar para false

let clientes = [];
let produtos = [
  { codigo: "515", nome: "Bauru Calabresa", preco: 38.95, grupo: "Assados" },
  { codigo: "513", nome: "Bauru Frango", preco: 38.95, grupo: "Assados" },
  { codigo: "517", nome: "Bauru Pres/Q", preco: 38.95, grupo: "Assados" },
  { codigo: "154", nome: "Crois-Chocolate", preco: 32.95, grupo: "Assados" },
  { codigo: "516", nome: "Crois-Frango", preco: 32.95, grupo: "Assados" },
  { codigo: "548", nome: "Dogão", preco: 35.95, grupo: "Assados" },
  { codigo: "156", nome: "Empada Frango", preco: 30.95, grupo: "Assados" },
  { codigo: "543", nome: "Folhado Calab*", preco: 39.95, grupo: "Assados" },
  { codigo: "544", nome: "Folhado Choco*", preco: 39.95, grupo: "Assados" },
  { codigo: "486", nome: "Folhado frango", preco: 39.95, grupo: "Assados" },
  { codigo: "521", nome: "Folhado P/Q", preco: 39.95, grupo: "Assados" },
  { codigo: "526", nome: "Hamburgão", preco: 43.90, grupo: "Assados" },
  { codigo: "529", nome: "Pão Bat-Calabre", preco: 32.95, grupo: "Assados" },
  { codigo: "530", nome: "Pão Bat-Frango", preco: 32.95, grupo: "Assados" },
  { codigo: "549", nome: "Pão Bat-Reque*", preco: 32.95, grupo: "Assados" },
  { codigo: "527", nome: "Trança Calabre", preco: 34.95, grupo: "Assados" },
  { codigo: "528", nome: "Trança Frango", preco: 34.95, grupo: "Assados" },
  { codigo: "545", nome: "Trança P/Q", preco: 34.95, grupo: "Assados" },
  { codigo: "148", nome: "Almodega", preco: 34.95, grupo: "Fritos 10x1" },
  { codigo: "151", nome: "Coxinha AÍPIM", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "153", nome: "Coxinha", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "2259", nome: "Coxinha Costela", preco: 29.50, grupo: "Fritos 10x1" },
  { codigo: "364", nome: "Croquete A carne", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "362", nome: "Croquete A frango", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "281", nome: "Espetinho", preco: 39.95, grupo: "Fritos 10x1" },
  { codigo: "158", nome: "Kibe Carne", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "329", nome: "Risoles Carne", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "173", nome: "Risoles Frango", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "323", nome: "Risoles Palmito", preco: 24.95, grupo: "Fritos 10x1" },
  { codigo: "175", nome: "Risoles P/Q", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "322", nome: "Risoles Queijo", preco: 26.95, grupo: "Fritos 10x1" },
  { codigo: "176", nome: "Salsicha Empanada", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "280", nome: "Salsicha Aípim", preco: 23.95, grupo: "Fritos 10x1" },
  { codigo: "150", nome: "Bolinho A*Carne", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "180", nome: "Bolinha Queijo", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "152", nome: "Coxinha Aípim", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "177", nome: "Coxinha", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "157", nome: "Kibe Carne", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "159", nome: "Mini Churros", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "178", nome: "Risoles Frango", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "359", nome: "Risoles P/Q", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "179", nome: "Salsicha", preco: 38.00, grupo: "Minis 2KG" },
  { codigo: "313", nome: "P. Banana", preco: 19.95, grupo: "Pastéis 10x1" },
  { codigo: "160", nome: "P. Carne", preco: 23.95, grupo: "Pastéis 10x1" },
  { codigo: "161", nome: "P. Carne Ovos", preco: 23.95, grupo: "Pastéis 10x1" },
  { codigo: "181", nome: "P. Frango R/Q", preco: 23.95, grupo: "Pastéis 10x1" },
  { codigo: "335", nome: "P. Palmito", preco: 23.95, grupo: "Pastéis 10x1" },
  { codigo: "184", nome: "P. Pizza R/Q", preco: 23.95, grupo: "Pastéis 10x1" },
  { codigo: "337", nome: "P. Presunto Q", preco: 23.95, grupo: "Pastéis 10x1" },
  { codigo: "2252", nome: "P. Carne Ovos", preco: 47.90, grupo: "Pastéis 210G 10X1" },
  { codigo: "2253", nome: "P. Carne/ Req", preco: 47.90, grupo: "Pastéis 210G 10X1" },
  { codigo: "2254", nome: "P. Calabresa/ Qjo", preco: 47.90, grupo: "Pastéis 210G 10X1" },
  { codigo: "2255", nome: "P. Frango/ Req", preco: 47.90, grupo: "Pastéis 210G 10X1" },
  { codigo: "1570", nome: "Coxinha Aípim", preco: 20.00, grupo: "Salgados 20/60" },
  { codigo: "1438", nome: "Coxinha MB", preco: 20.00, grupo: "Salgados 20/60" },
  { codigo: "1315", nome: "Coxinha MV", preco: 20.00, grupo: "Salgados 20/60" },
  { codigo: "1572", nome: "Risoles Frango", preco: 15.00, grupo: "Salgados 20/60" },
  { codigo: "1587", nome: "Risoles P/Q", preco: 20.00, grupo: "Salgados 20/60" },
  { codigo: "1736", nome: "Salsicha", preco: 20.00, grupo: "Salgados 20/60" },
  { codigo: "163", nome: "P.Carne", preco: 49.00, grupo: "Pastéis 2KG" },
  { codigo: "165", nome: "P.Frango", preco: 49.00, grupo: "Pastéis 2KG" },
  { codigo: "1533", nome: "P.Banana Cho", preco: 49.00, grupo: "Pastéis 2KG" },
  { codigo: "169", nome: "P.Calabresa", preco: 49.00, grupo: "Forno 2KG" },
  { codigo: "167", nome: "P.Carne", preco: 49.00, grupo: "Forno 2KG" },
  { codigo: "171", nome: "P.Frango", preco: 49.00, grupo: "Forno 2KG" },
  { codigo: "155", nome: "Doguinho", preco: 36.00, grupo: "Forno 2KG" },
  { codigo: "319", nome: "Bacon R/Q", preco: 36.95, grupo: "P. Forno 10x1" },
  { codigo: "168", nome: "Calabresa R/Q", preco: 34.95, grupo: "P. Forno 10x1" },
  { codigo: "166", nome: "Carne", preco: 34.95, grupo: "P. Forno 10x1" },
  { codigo: "520", nome: "Carne Cheddar", preco: 34.95, grupo: "P. Forno 10x1" },
  { codigo: "321", nome: "Catuperu", preco: 34.95, grupo: "P. Forno 10x1" },
  { codigo: "501", nome: "Chocolate", preco: 34.00, grupo: "P. Forno 10x1" },
  { codigo: "170", nome: "Frango R/Q", preco: 34.95, grupo: "P. Forno 10x1" },
  { codigo: "277", nome: "Integral Brócolis", preco: 34.95, grupo: "P. Forno 10x1" },
  { codigo: "279", nome: "Integral Frango", preco: 34.95, grupo: "P. Forno 10x1" },
  { codigo: "278", nome: "Integral Palmito", preco: 34.95, grupo: "P. Forno 10x1" },
];
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
 * Insere clientes fictícios sempre em modo de teste.
 */
function carregarLocal() {
  if (MODO_TESTE) {
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
    produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    vendedores = JSON.parse(localStorage.getItem("vendedores") || "[]");

    localStorage.setItem("clientes", JSON.stringify(clientes));
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
      senha: "1234"
    });
    salvarLocal();
  }
}
