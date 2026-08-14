let abastecimentos =
    JSON.parse(localStorage.getItem("abastecimentos")) || [];

let editando = -1;

function entrar() {

    document.getElementById("inicio")
        .classList.add("escondido");

    document.getElementById("principal")
        .classList.remove("escondido");

    mostrar();
}

function voltar() {

    document.getElementById("principal")
        .classList.add("escondido");

    document.getElementById("inicio")
        .classList.remove("escondido");
}

document.getElementById("tema")
    .addEventListener("change", function () {

        document.body.classList.toggle(
            "escuro"
        );

    });

function abrirModal() {

    editando = -1;

    document.getElementById("titulo")
        .innerText = "Novo abastecimento";

    document.querySelector("form").reset();

    document.getElementById("modal")
        .style.display = "flex";
}

function fecharModal() {

    document.getElementById("modal")
        .style.display = "none";
}

function salvarAbastecimento(event) {

    event.preventDefault();


    let abastecimento = {

        data:
            document.getElementById("data").value,

        combustivel:
            document.getElementById("combustivel").value,

        litros:
            Number(document.getElementById("litros").value),

        valor:
            Number(document.getElementById("valor").value),

        km:
            Number(document.getElementById("km").value)
    };

    if (editando == -1) {

        abastecimentos.push(abastecimento);

    } else {

        abastecimentos[editando] = abastecimento;
    }

    localStorage.setItem(
        "abastecimentos", JSON.stringify(abastecimentos)
    );

    fecharModal();

    mostrar();
}

function mostrar() {

    let lista =
        document.getElementById("lista");
    lista.innerHTML = "";


    if (abastecimentos.length == 0) {

        lista.innerHTML = `<p class="vazio">Nenhum abastecimento cadastrado</p>`;
        calcular();
        return;
    }

    abastecimentos.forEach(
        function (item, i) {

            lista.innerHTML += `

                <div class="item" onclick="editar(${i})">
                    <div>

                        <b>${item.combustivel}</b>

                        <p>${item.data}</p>

                        <p>${item.litros} L -R$ ${item.valor.toFixed(2)}</p>

                        <p>${item.km} km</p>

                    </div>


                    <button onclick="excluir(event, ${i})">×</button>

                </div>
            `;
        });

    calcular();
}

function excluir(event, i) {
    event.stopPropagation();

    if (
        confirm("Deseja excluir este abastecimento?")) {

        abastecimentos.splice(i, 1);

        localStorage.setItem("abastecimentos", JSON.stringify(abastecimentos));
        mostrar();
    }
}
function editar(i) {
    editando = i;
    let item =
        abastecimentos[i];

    document.getElementById("titulo").innerText =
        "Alterar abastecimento";

    document.getElementById("data")
    .value = item.data;

    document.getElementById("combustivel")
    .value = item.combustivel;

    document.getElementById("litros")
        .value = item.litros;

    document.getElementById("valor")
        .value = item.valor;

    document.getElementById("km")
        .value = item.km;

    document.getElementById("modal")
        .style.display = "flex";
}

function calcular() {

    if (abastecimentos.length == 0) {

        document.getElementById("precoMedio").innerText = "R$ 0,00/L";

        document.getElementById("consumoMedio").innerText = "0,00 km/L";
        return;
    }

    let litros = 0;

    let valor = 0;

    abastecimentos.forEach(
        function (item) {

            litros += item.litros;

            valor += item.valor;

        });

    let preco =
        valor / litros;

    document.getElementById("precoMedio")
    .innerText = "R$ " + preco.toFixed(2) + "/L";

    if (abastecimentos.length < 2) {

        document.getElementById("consumoMedio").innerText = "Aguardando 2º abastecimento";
        return;
    }

    let kmTotal = 0;

    let litrosTotal = 0;

    for (
        let i = 1;
        i < abastecimentos.length;
        i++
    ) {

        let km =
            abastecimentos[i].km -
            abastecimentos[i - 1].km;

        if (km > 0) {

            kmTotal += km;

            litrosTotal +=
                abastecimentos[i].litros;
        }
    }


    if (litrosTotal > 0) {

        let consumo =
            kmTotal / litrosTotal;


        document.getElementById("consumoMedio").innerText = consumo.toFixed(2) + " km/L";
    }
}