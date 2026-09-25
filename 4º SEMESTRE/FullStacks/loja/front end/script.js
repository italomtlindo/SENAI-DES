const API_URL = "http://localhost:3000/produto";


const btnAbrir = document.getElementById("btnAbrir");
const btnFechar = document.getElementById("btnFechar");
const btnSalvar = document.getElementById("btnSalvar");
const overlay = document.getElementById("overlay");
const listaProdutos = document.getElementById("listaProdutos");
const mensagemVazia = document.getElementById("mensagemVazia");
const erroMsg = document.getElementById("erroMsg");


const inputNome = document.getElementById("nome");
const inputDescricao = document.getElementById("descricao");
const inputPreco = document.getElementById("preco");
const inputImagem = document.getElementById("imagem");


const previewContainer = document.getElementById("previewContainer");
const previewImg = document.getElementById("previewImg");



btnAbrir.addEventListener("click", function() {
  overlay.classList.remove("escondido");
  inputNome.focus();
});

btnFechar.addEventListener("click", function() {
  fecharModal();
});

overlay.addEventListener("click", function(e) {
  if (e.target === overlay) {
    fecharModal();
  }
});

function fecharModal() {
  overlay.classList.add("escondido");
  limparCampos();
}

function limparCampos() {
  inputNome.value = "";
  inputDescricao.value = "";
  inputPreco.value = "";
  inputImagem.value = "";
  erroMsg.classList.add("escondido");
  previewContainer.classList.add("escondido");
  previewImg.src = "";
}



inputImagem.addEventListener("input", function() {
  const url = inputImagem.value.trim();

  if (url.length > 10) {
    previewImg.src = url;
    previewContainer.classList.remove("escondido");

    previewImg.onerror = function() {
      previewImg.src = "https://via.placeholder.com/400x180?text=Imagem+nao+encontrada";
    };
  } else {
    previewContainer.classList.add("escondido");
  }
});



async function carregarProdutos() {
  try {
    const resposta = await fetch(`${API_URL}/listar`);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    const produtos = await resposta.json();

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
      listaProdutos.innerHTML = '<p id="mensagemVazia">Nenhum produto cadastrado ainda...</p>';
      return;
    }

    produtos.forEach(function(produto) {
      const card = criarCard(produto);
      listaProdutos.appendChild(card);
    });

  } catch (erro) {
    console.error("Deu erro ao carregar produtos:", erro);
    listaProdutos.innerHTML = '<p id="mensagemVazia">Erro ao carregar produtos. Verifique o backend.</p>';
  }
}



function criarCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
 
  const precoFormatado = Number(produto.preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
 
  card.innerHTML = `
    <img 
      src="${produto.imagem}" 
      alt="${produto.nome}"
      onerror="this.src='https://via.placeholder.com/400x180?text=Sem+imagem'; this.classList.add('erro-img')"
    />
    <div class="card-info">
      <h3>${produto.nome}</h3>
      <p class="descricao-card">${produto.descricao}</p>
      <span class="preco">${precoFormatado}</span>
      <button class="btnExcluir" data-id="${produto.id}">🗑 Excluir</button>
    </div>
  `;
 
  const btnExcluir = card.querySelector(".btnExcluir");
  btnExcluir.addEventListener("click", function() {
    excluirProduto(produto.id, card);
  });
 
  return card;
}



btnSalvar.addEventListener("click", async function() {
  const nome = inputNome.value.trim();
  const descricao = inputDescricao.value.trim();
  const preco = inputPreco.value.trim();
  const imagem = inputImagem.value.trim();

  if (!nome || !descricao || !preco || !imagem) {
    erroMsg.classList.remove("escondido");
    return;
  }

  erroMsg.classList.add("escondido");

  const novoProduto = {
    nome: nome,
    descricao: descricao,
    preco: parseFloat(preco),
    imagem: imagem
  };

  btnSalvar.disabled = true;
  btnSalvar.textContent = "Salvando...";

  try {

    const resposta = await fetch(`${API_URL}/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoProduto)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao salvar produto");
    }

    fecharModal();
    await carregarProdutos();

  } catch (erro) {
    console.error("Deu erro ao salvar:", erro);
    erroMsg.textContent = "⚠️ Erro ao salvar. Verifique o backend!";
    erroMsg.classList.remove("escondido");
  } finally {
    btnSalvar.disabled = false;
    btnSalvar.textContent = "Salvar Produto";
  }
});

async function excluirProduto(id, card) {

  const confirmar = confirm("Tem certeza que quer excluir esse produto?");
  if (!confirmar) return;
 
  try {
  
    const resposta = await fetch(`${API_URL}/excluir/${id}`, {
      method: "DELETE"
    });
 
    if (!resposta.ok) {
      throw new Error("Erro ao excluir produto");
    }
 
    card.remove();
 
    const cards = listaProdutos.querySelectorAll(".card");
    if (cards.length === 0) {
      listaProdutos.innerHTML = '<p id="mensagemVazia">Nenhum produto cadastrado ainda...</p>';
    }
 
  } catch (erro) {
    console.error("Deu erro ao excluir:", erro);
    alert("Erro ao excluir o produto. Verifique o backend!");
  }
}


carregarProdutos();