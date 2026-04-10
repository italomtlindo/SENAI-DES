const url = "https://receitasapi-b-2025.vercel.app/";

const receitas = [];

getReceitas();

function getReceitas() {
  fetch(`${url}receitas`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((receita) => {
        receitas.push(receita);
      });
      renderReceitas();
    });
}

function renderReceitas() {
  const main = document.querySelector("main");
  receitas.forEach((r, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${r.img}" alt="${r.nome}">
    <h2>${r.nome}</h2>
    <p>${r.ingredientes}</p>
    <p>${r.modoFazer}</p>
    <button onclick="excluirReceita(${index})">Excluir</button>
`;
        main.appendChild(card)
  });
}

const modal = document.getElementById("modal");
const btn = document.getElementById("btnReceitas");
const fechar = document.getElementById("fechar");
const salvar = document.getElementById("salvar");

btn.onclick = () => modal.style.display = "flex";

fechar.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

salvar.onclick = () => {
  const novaReceita = {
    nome: document.getElementById("nome").value,
    img: document.getElementById("img").value,
    ingredientes: document.getElementById("ingredientes").value,
    modoFazer: document.getElementById("modoFazer").value
  };

  receitas.push(novaReceita);

  document.querySelector("main").innerHTML = "";
  renderReceitas();

  modal.style.display = "none";
};

function excluirReceita(index) {
  receitas.splice(index, 1);

  document.querySelector("main").innerHTML = "";
  renderReceitas();
};