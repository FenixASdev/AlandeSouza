function telaRelatorios() {
  document.getElementById("app").innerHTML = `
    <header><h2>Relatórios</h2></header>
    <div class="container">
      <button onclick="exportarTodosClientesCSV()">Exportar todos os clientes CSV</button><br/>
      <button onclick="exportarTodosClientesPDF()">Exportar todos os clientes PDF</button><br/>
      <button onclick="relatorioVendaPeriodo()">Venda total por período</button><br/>
      <button onclick="relatorioVendaPorCliente()">Venda por cliente</button><br/>
      <button onclick="relatorioClientesSimples()">Clientes (nome e CNPJ)</button><br/>
      <button onclick="mostrarMenu()">Voltar</button>
    </div>
  `;
}

function exportarTodosClientesCSV() {
  if (clientes.length === 0) {
    alert("Nenhum cliente cadastrado.");
    return;
  }

  const headers = ["ID", "Nome", "Nome Fantasia", "CNPJ", "Inscrição Estadual", "Município", "UF", "CEP", "Logradouro", "Número", "Telefone", "Email"];
  let csv = headers.join(",") + "\n";

  clientes.forEach(c => {
    const linha = [
      c.id || "",
      `"${c.nome || ""}"`,
      `"${c.nomeFantasia || ""}"`,
      c.cnpj || "",
      c.inscricaoEstadual || "",
      `"${c.municipio || ""}"`,
      c.uf || "",
      c.cep || "",
      `"${c.logradouro || ""}"`,
      c.numero || "",
      c.telefone || "",
      c.email || ""
    ];
    csv += linha.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `todos_clientes.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportarTodosClientesPDF() {
  if (clientes.length === 0) {
    alert("Nenhum cliente cadastrado.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Lista de Clientes", 14, 20);
  doc.setFontSize(10);
  let y = 30;

  clientes.forEach((c, idx) => {
    doc.text(`${idx + 1}. ID: ${c.id || ""} Nome: ${c.nome || ""} CNPJ: ${c.cnpj || ""}`, 14, y);
    y += 8;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("todos_clientes.pdf");
}

function relatorioClientesSimples() {
  if (clientes.length === 0) {
    alert("Nenhum cliente cadastrado.");
    return;
  }

  let lista = "Clientes (Nome - CNPJ):\n";
  clientes.forEach(c => {
    lista += `- ${c.nome || "-"} - ${c.cnpj || "-"}\n`;
  });

  alert(lista);
}

function relatorioVendaPeriodo() {
  document.getElementById("app").innerHTML = `
    <header><h2>Relatório de Vendas por Período</h2></header>
    <div class="container">
      <label>Data Inicial:</label>
      <input type="date" id="dataInicio" />
      <label>Data Final:</label>
      <input type="date" id="dataFim" />
      <br><br>
      <button onclick="gerarRelatorioPeriodo()">Gerar Relatório</button>
      <button onclick="telaRelatorios()">Voltar</button>
    </div>
  `;
}

function gerarRelatorioPeriodo() {
  const dataIni = new Date(document.getElementById("dataInicio").value);
  const dataFim = new Date(document.getElementById("dataFim").value);

  if (isNaN(dataIni) || isNaN(dataFim)) {
    alert("Datas inválidas.");
    return;
  }

  let totalVendas = 0;
  pedidos.forEach(p => {
    const dataPedido = new Date(p.dataEntrega);
    if (dataPedido >= dataIni && dataPedido <= dataFim) {
      p.itens.forEach(i => {
        totalVendas += i.preco * i.quantidade;
      });
    }
  });

  alert(`Venda total de R$ ${totalVendas.toFixed(2)} no período.`);
}

function relatorioVendaPorCliente() {
  document.getElementById("app").innerHTML = `
    <header><h2>Relatório de Vendas por Cliente</h2></header>
    <div class="container">
      <label>Buscar Cliente:</label>
      <input type="text" id="buscaRelCliente" placeholder="Digite nome ou ID..." oninput="filtrarClientesRelatorio()" autofocus />
      <div id="listaClientesRelatorio" style="max-height:300px; overflow-y:auto; margin-bottom: 20px;"></div>
      <div id="selecaoDatas" style="display:none;">
        <label>Data Inicial:</label>
        <input type="date" id="dataInicioRel" />
        <label>Data Final:</label>
        <input type="date" id="dataFimRel" />
        <br><br>
        <button onclick="gerarRelatorioClienteSelecionado()">Gerar Relatório</button>
      </div>
      <button onclick="telaRelatorios()">Voltar</button>
    </div>
  `;
}

function filtrarClientesRelatorio() {
  const filtro = document.getElementById("buscaRelCliente").value.toLowerCase();
  const lista = clientes.filter(c =>
    (c.nome && c.nome.toLowerCase().includes(filtro)) ||
    (c.id && c.id.toString().includes(filtro))
  );

  const container = document.getElementById("listaClientesRelatorio");
  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum cliente encontrado.</p>";
    return;
  }

  container.innerHTML = lista.map(c => `
    <div class="lista">
      <strong>${c.nome}</strong> (ID: ${c.id})<br>
      <button onclick="selecionarClienteRelatorio(${c.id})">Selecionar</button>
    </div>
  `).join("");
}

let clienteSelecionadoRelatorio = null;

function selecionarClienteRelatorio(id) {
  clienteSelecionadoRelatorio = clientes.find(c => c.id === id);
  document.getElementById("selecaoDatas").style.display = "block";
}

function gerarRelatorioClienteSelecionado() {
  const dataIni = new Date(document.getElementById("dataInicioRel").value);
  const dataFim = new Date(document.getElementById("dataFimRel").value);

  if (!clienteSelecionadoRelatorio || isNaN(dataIni) || isNaN(dataFim)) {
    alert("Complete todas as informações.");
    return;
  }

  let totalVendas = 0;
  pedidos.forEach(p => {
    if (p.clienteId === clienteSelecionadoRelatorio.id) {
      const dataPedido = new Date(p.dataEntrega);
      if (dataPedido >= dataIni && dataPedido <= dataFim) {
        p.itens.forEach(i => {
          totalVendas += i.preco * i.quantidade;
        });
      }
    }
  });

  alert(`Venda total para ${clienteSelecionadoRelatorio.nome} de R$ ${totalVendas.toFixed(2)} no período.`);
}
