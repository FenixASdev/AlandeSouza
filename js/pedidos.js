function telaPedidos() {
  document.getElementById("app").innerHTML = `
    <header><h2>Pedidos</h2></header>
    <div class="container">
      <button onclick="novoPedido()">Novo Pedido</button>
      <input type="text" id="buscaPedido" placeholder="Buscar pedido por ID ou cliente" oninput="filtrarPedidos()" />
      <div id="listaPedidos" style="margin-top:10px; max-height: 60vh; overflow-y: auto;"></div>
      <button onclick="mostrarMenu()">Voltar</button>
    </div>
  `;
  filtrarPedidos();
}

function filtrarPedidos() {
  const filtro = document.getElementById("buscaPedido").value.toLowerCase();
  const listaPedidosDiv = document.getElementById("listaPedidos");
  const filtrados = pedidos.filter(p => {
    const cliente = clientes.find(c => c.id === p.clienteId) || {};
    return p.id.toString().includes(filtro) || (cliente.nome && cliente.nome.toLowerCase().includes(filtro));
  });

  listaPedidosDiv.innerHTML = filtrados.map(p => {
    const cliente = clientes.find(c => c.id === p.clienteId) || { nome: "-" };
    return `
      <div class="lista">
        <strong>Pedido ID:</strong> ${p.id} <br/>
        <strong>Cliente:</strong> ${cliente.nome} <br/>
        <strong>Data Entrega:</strong> ${p.dataEntrega}<br/>
        <button onclick="editarPedido(${p.id})">Visualizar / Editar</button>
        <button onclick="exportarPedidoCSV(${p.id})">Exportar CSV</button>
        <button onclick="exportarPedidoPDF(${p.id})">Exportar PDF</button>
        <button onclick="excluirPedido(${p.id})">Excluir</button>
      </div>
    `;
  }).join("") || "<p>Nenhum pedido encontrado.</p>";
}

function novoPedido() {
  const clienteOptions = clientes.map(c => `<option value="${c.id}">${c.nome} (ID ${c.id})</option>`).join("");
  document.getElementById("app").innerHTML = `
    <header><h2>Novo Pedido</h2></header>
    <div class="container">
      <label>Cliente:</label>
      <select id="clientePedido">${clienteOptions}</select>
      <label>Data de entrega:</label>
      <input type="date" id="dataEntregaPedido" />
      <button onclick="adicionarItensPedido()">Continuar</button>
      <button onclick="telaPedidos()">Cancelar</button>
    </div>
  `;
}

function adicionarItensPedido(idPedido = null) {
  let pedido;
  let editando = false;

  if (idPedido !== null) {
    pedido = pedidos.find(p => p.id === idPedido);
    if (!pedido) return alert("Pedido não encontrado.");
    editando = true;
  } else {
    const clienteId = parseInt(document.getElementById("clientePedido").value);
    const dataEntrega = document.getElementById("dataEntregaPedido").value;
    if (!clienteId || !dataEntrega) return alert("Preencha todos os campos.");
    pedido = {
      id: gerarIdUnico(pedidos),
      clienteId,
      dataEntrega,
      vendedorId: vendedorLogado?.id || 0,
      vendedorNome: vendedorLogado?.nome || "Desconhecido",
      itens: []
    };
  }

  function renderizarTela() {
    document.getElementById("app").innerHTML = `
      <header><h2>${editando ? "Editar Pedido #" + pedido.id : "Novo Pedido"}</h2></header>
      <div class="container">
        <input type="text" id="buscaProdutoPedido" placeholder="Buscar produto por nome ou código" oninput="filtrarProdutosPedido()" />
        <div id="listaProdutosPedido"></div>
        <hr/>
        <strong>Total: R$ <span id="totalPedido">0.00</span></strong><br/>
        <button onclick="salvarPedido(${editando ? pedido.id : null})">Salvar</button>
        <button onclick="telaPedidos()">Cancelar</button>
      </div>
    `;
    filtrarProdutosPedido();
    atualizarTotal();
  }

  window.filtrarProdutosPedido = function () {
    const filtro = document.getElementById("buscaProdutoPedido").value.toLowerCase();
    const lista = produtos.filter(p =>
      p.nome.toLowerCase().includes(filtro) || p.codigo.toLowerCase().includes(filtro)
    );

    document.getElementById("listaProdutosPedido").innerHTML = lista.map(p => {
      const item = pedido.itens.find(i => i.codigo === p.codigo) || {};
      const qtd = item.quantidade || 0;
      return `
        <div class="produto-item" style="${qtd > 0 ? "background:#fffbcc;" : ""}">
          <strong>${p.nome}</strong> - R$ ${p.preco.toFixed(2)}<br/>
          Qtd: <input type="number" min="0" value="${qtd}" onchange="atualizarQtd('${p.codigo}', this.value)" style="width:60px;" />
        </div>
      `;
    }).join("") || "<p>Nenhum produto encontrado.</p>";
  };

  window.atualizarQtd = function (codigo, valor) {
    const quantidade = parseInt(valor);
    const produto = produtos.find(p => p.codigo === codigo);
    if (!produto) return;

    const idx = pedido.itens.findIndex(i => i.codigo === codigo);
    if (quantidade > 0) {
      const novoItem = { codigo: produto.codigo, nome: produto.nome, preco: produto.preco, quantidade };
      if (idx >= 0) pedido.itens[idx] = novoItem;
      else pedido.itens.push(novoItem);
    } else {
      if (idx >= 0) pedido.itens.splice(idx, 1);
    }

    filtrarProdutosPedido();
    atualizarTotal();
  };

  window.atualizarTotal = function () {
    const total = pedido.itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
    document.getElementById("totalPedido").textContent = total.toFixed(2);
  };

  window.salvarPedido = function (id) {
    if (pedido.itens.length === 0) return alert("Adicione pelo menos um item.");
    if (id === null) pedidos.push(pedido);
    else pedidos[pedidos.findIndex(p => p.id === id)] = pedido;
    salvarLocal();
    telaPedidos();
  };

  renderizarTela();
}

function editarPedido(id) {
  adicionarItensPedido(id);
}

function exportarPedidoCSV(id) {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return alert("Pedido não encontrado.");
  const cliente = clientes.find(c => c.id === pedido.clienteId) || {};

  let total = 0;
  let csv = "PedidoID,Cliente,DataEntrega,Código,Produto,Quantidade,Preço,Subtotal\n";
  pedido.itens.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    csv += `${pedido.id},${cliente.nome},${pedido.dataEntrega},${item.codigo},${item.nome},${item.quantidade},${item.preco.toFixed(2)},${subtotal.toFixed(2)}\n`;
  });
  csv += `,,,,,,,Total:,${total.toFixed(2)}\n`;

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `pedido_${pedido.id}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportarPedidoPDF(id) {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return alert("Pedido não encontrado.");
  const cliente = clientes.find(c => c.id === pedido.clienteId) || {};
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;
  let total = 0;

  doc.setFontSize(14);
  doc.text(`Pedido #${pedido.id}`, 14, y); y += 8;
  doc.text(`Cliente: ${cliente.nome || "-"}`, 14, y); y += 8;
  doc.text(`Entrega: ${pedido.dataEntrega}`, 14, y); y += 8;

  doc.setFontSize(12);
  pedido.itens.forEach((i, idx) => {
    const subtotal = i.preco * i.quantidade;
    total += subtotal;
    doc.text(`${idx + 1}. ${i.nome} - ${i.quantidade} x R$ ${i.preco.toFixed(2)} = R$ ${subtotal.toFixed(2)}`, 14, y);
    y += 8;
    if (y > 280) { doc.addPage(); y = 20; }
  });

  doc.setFontSize(14);
  doc.text(`Total: R$ ${total.toFixed(2)}`, 14, y);
  doc.save(`pedido_${pedido.id}.pdf`);
}

function excluirPedido(id) {
  if (!confirm("Deseja excluir este pedido?")) return;
  pedidos = pedidos.filter(p => p.id !== id);
  salvarLocal();
  telaPedidos();
}
