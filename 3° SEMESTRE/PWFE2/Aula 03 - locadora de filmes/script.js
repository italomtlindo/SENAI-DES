const modalCli = document.getElementById("modalCli");
const formCli = document.querySelector("#formCli");

var filmes = JSON.parse(localStorage.getItem("filmes")) || [];

function abrirModal(){
    modalCli.style.display = "block";
}

function fecharModal(){
    modalCli.style.display = "none";
}

function salvarLocal(){
    localStorage.setItem("filmes", JSON.stringify(filmes));
    renderizarTabela();
}

formCli.addEventListener("submit", e => {
    e.preventDefault();

    const obj = {
        img: formCli.img.value,
        tituloFilme: formCli.tituloFilme.value,
        AnodoLançamento: formCli.anoLancamento.value,
        Gênero: formCli.genero.value,
        Classificação: formCli.classificacao.value,
        Sinopse: formCli.sinopse.value
    };

    filmes.push(obj);

    salvarLocal();

    formCli.reset();
    fecharModal();
});

function renderizarTabela(){

    const corpo = document.querySelector("#dados");
    corpo.innerHTML = "";

    filmes.forEach((c, i) => {

        corpo.innerHTML += `
        <tr>
            <td><img src="${c.img}" width="80"></td>
            <td>${c.tituloFilme}</td>
            <td>${c.AnodoLançamento}</td>
            <td>${c.Gênero}</td>
            <td>${c.Classificação}</td>
            <td>${c.Sinopse}</td>
            <td>
            <button onclick="excluir(${i})">Excluir</button>
            </td>
        </tr>
        `;
    });

}

function filtrarGenero() {
    const filtro = document.querySelector("#filtroGenero").value.trim();
    const corpo = document.querySelector("#dados");

    corpo.innerHTML = "";

    filmes.forEach((c, i) => {
        if (c.Gênero.toLowerCase().includes(filtro)) {
            corpo.innerHTML += `
            <tr>
            <td><img src="${c.img}" width="80"></td>
            <td>${c.tituloFilme}</td>
            <td>${c.AnodoLançamento}</td>
            <td>${c.Gênero}</td>
            <td>${c.Classificação}</td>
            <td>${c.Sinopse}</td>
            <td>
                <td><button onclick="excluir(${i})">Excluir</button></td>
            </tr>
            `;
        }
    });
}

function excluir(indice){
    filmes.splice(indice, 1);
    salvarLocal();
}

renderizarTabela();