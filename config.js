/* ========================
   CONFIGURAÇÃO DO APP
   ======================== */

// Ativar/desativar modo de teste offline
const MODO_TESTE = true;

/* ========= GOOGLE SHEETS =========
   Se for integrar com Google Sheets:
   - Publique um Web App no Apps Script
   - Cole a URL abaixo
*/
const GOOGLE_SHEETS_URL = ""; // ex: "https://script.google.com/macros/s/SEU_ID/exec"

/* ========= FIREBASE =========
   Se for integrar com Firebase:
   - Adicione seu config abaixo
   - Inicialize Firebase Firestore
*/
const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

/* ========= FUNÇÕES DE INTEGRAÇÃO =========
   Essas funções podem ser preenchidas depois.
   O app.js chama elas se MODO_TESTE = false
*/

// Salvar pedido na nuvem
async function salvarPedidoNuvem(pedido) {
  // Google Sheets exemplo:
  // await fetch(GOOGLE_SHEETS_URL, {method:"POST",body:JSON.stringify(pedido)});
  
  // Firebase exemplo:
  // await addDoc(collection(db, "pedidos"), pedido);
}

// Carregar clientes da nuvem
async function carregarClientesNuvem() {
  // Buscar do Sheets ou Firebase e retornar array de clientes
  return [];
}

// Carregar produtos da nuvem
async function carregarProdutosNuvem() {
  return [];
}

// Carregar pedidos da nuvem
async function carregarPedidosNuvem() {
  return [];
}
