function telaProdutos() {
  document.getElementById("app").innerHTML = `
    <header><h2>Produtos</h2></header>
    <div class="container">
      <input type="text" id="buscaProduto" placeholder="Buscar por nome, código ou grupo" oninput="filtrarProdutos()" autofocus />
      <div id="listaProdutos" style="margin-top:10px; max-height: 60vh; overflow-y: auto;"></div>
      <button onclick="mostrarMenu()">Voltar</button>
      <br/><br/>
      <label>Importar CSV:</label>
      <input type="file" accept=".csv" onchange="importarProdutosCSV(this)" />
    </div>
  `;
  filtrarProdutos();
}

function filtrarProdutos() {
  const filtro = document.getElementById("buscaProduto").value.toLowerCase();
  const listaProdutosDiv = document.getElementById("listaProdutos");

  const filtrados = produtos.filter(p =>
    (p.nome && p.nome.toLowerCase().includes(filtro)) ||
    (p.codigo && p.codigo.toLowerCase().includes(filtro)) ||
    (p.grupo && p.grupo.toLowerCase().includes(filtro))
  );

  if (filtrados.length === 0) {
    listaProdutosDiv.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  listaProdutosDiv.innerHTML = filtrados.map(p => `
    <div class="produto-item">
      <strong>Código:</strong> ${p.codigo} &nbsp;
      <strong>Nome:</strong> ${p.nome} &nbsp;
      <strong>Preço:</strong> R$ ${p.preco.toFixed(2)} &nbsp;
      <strong>Grupo:</strong> ${p.grupo || "-"}
    </div>
  `).join("");
}

function importarProdutosCSV(input) {
  const file = input.files[0];
  if (!file) {
    alert("Nenhum arquivo selecionado.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const linhas = e.target.result.split(/\r?\n/).filter(l => l.trim() !== "");

    let importados = 0;
    for (let linha of linhas) {
      const campos = linha.split(";").map(c => c.trim());

      if (campos.length < 3 || !campos[0] || !campos[1] || !campos[2]) continue;

      let codigo = campos[0];
      let nome = campos[1];
      let precoStr = campos[2].replace("R$", "").replace(",", ".").trim();
      let grupo = campos[3] || "";

      let preco = parseFloat(precoStr);
      if (!codigo || !nome || isNaN(preco)) continue;

      const produto = {
        id: gerarIdUnico(produtos),
        codigo,
        nome,
        preco,
        grupo
      };

      const existente = produtos.findIndex(p => p.codigo === codigo);
      if (existente !== -1) {
        produtos[existente] = produto;
      } else {
        produtos.push(produto);
      }

      importados++;
    }

    if (importados > 0) {
      salvarLocal();
      alert(`Importação concluída com sucesso. ${importados} produto(s) importado(s).`);
      telaProdutos();
    } else {
      alert("Nenhum produto válido encontrado.");
    }
  };

  reader.readAsText(file);
}

