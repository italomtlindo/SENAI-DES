let dados = [];

fetch("dados.csv")
    .then(resposta => resposta.text())
    .then(texto => {

        dados = interpretarCSV(texto);

        criarDashboard();

    })
    .catch(erro => {

        console.error("Erro ao carregar dados.csv:", erro);

        alert(
            "Não foi possível carregar o dados.csv. " +
            "Abra o projeto usando o Live Server."
        );

    });

function interpretarCSV(texto) {

    const linhas = texto
        .trim()
        .split("\n");

    linhas.shift();

    return linhas
        .filter(linha => linha.trim() !== "")
        .map(linha => {

            const partes = linha
                .trim()
                .split(";");

            return {

                data: partes[0],

                hora: partes[1],

                semana: Number(partes[2])

            };

        });

}

function criarDashboard() {

    criarGraficoDiario();

    criarGraficoSemanal();

    criarTabela();

}

function criarGraficoDiario() {

    const contagem = {};

    for (let dia = 1; dia <= 31; dia++) {

        const data =
            String(dia).padStart(2, "0") +
            "/05/2026";

        contagem[data] = 0;
    }

    dados.forEach(registro => {

        if (contagem[registro.data] !== undefined) {

            contagem[registro.data]++;

        }

    });


    const datas = Object.keys(contagem);

    const valores = Object.values(contagem);


    const canvas =
        document.getElementById("graficoDiario");


    new Chart(canvas, {

        type: "bar",

        data: {

            labels: datas,

            datasets: [

                {
                    label: "Aberturas",

                    data: valores,

                    backgroundColor: "#173f5f",

                    borderColor: "#173f5f",

                    borderWidth: 1
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return (
                                " Aberturas: " +
                                context.raw
                            );

                        }

                    }

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {
                        stepSize: 10
                    },

                    grid: {
                        color: "#e0e0e0"
                    },

                    title: {

                        display: true,

                        text: "Quantidade de aberturas"

                    }

                },

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {

                        maxRotation: 60,

                        minRotation: 45,

                        font: {
                            size: 10
                        }

                    }

                }

            }

        }

    });

}

function criarGraficoSemanal() {

    const semanas = {

        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0

    };

    dados.forEach(registro => {

        if (semanas[registro.semana] !== undefined) {

            semanas[registro.semana]++;

        }

    });


    const valores = [

        semanas[1],
        semanas[2],
        semanas[3],
        semanas[4],
        semanas[5]

    ];


    const canvas =
        document.getElementById("graficoSemanal");


    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Semana 1",
                "Semana 2",
                "Semana 3",
                "Semana 4",
                "Semana 5"

            ],

            datasets: [

                {
                    label: "Aberturas",

                    data: valores,

                    backgroundColor: "#173f5f",

                    borderColor: "#173f5f",

                    borderWidth: 1
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {
                        stepSize: 20
                    },

                    grid: {
                        color: "#e0e0e0"
                    },

                    title: {

                        display: true,

                        text: "Quantidade de aberturas"

                    }

                },

                x: {

                    grid: {
                        display: false
                    }

                }

            }

        }

    });

}

function criarTabela() {

    const tabela =
        document.getElementById("tabelaDados");


    dados.forEach(registro => {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>${registro.data}</td>

            <td>${registro.hora}</td>

            <td>${registro.semana}</td>

        `;


        tabela.appendChild(linha);

    });

}