let lineChart = null;
let barChart = null;
let sensorSelecionado = 0;

// function carregarPagina() {
//     // fetch(`/dashboard/listarSensores/1`)
//     //     .then(
//     //         function (resposta) {
//     //             if (!resposta.ok) {
//     //                 console.error("Erro ao listar setores:", resposta);
//     //                 return;
//     //             }

//     //             return resposta.json();
//     //         }
//     //     )
//     //     .then(
//     //         function (data) {
//     //             console.log(data);
//     //         }
//     //     )
// }




function carregarSeletorDeFabricas() {
    fetch(`/dashboard/listarFabricas/${sessionStorage.ID_EMPRESA}`)
        .then(resposta => {
            if (!resposta.ok) {
                console.log(resposta);

                return;
            }

            return resposta.json();
        }
        )
        .then(data => {
            let opcoes = "";

            for (let i = 0; i < data.length; i++) {
                opcoes += `
                        <option value="${data[i].idFabrica}">${data[i].logradouro}, ${data[i].numero}</option>
                    `;
            }

            carregarSetores(data[0].idFabrica);
            carregarDiasSemVazamento(data[0].idFabrica);
            slt_fabricas.innerHTML += opcoes;
        }
        )
}

function trocarFabrica() {
    const selectFabrica = document.getElementById("slt_fabricas").value;

    carregarSetores(selectFabrica)
    carregarDiasSemVazamento(selectFabrica);
}

function trocarSetor() {
    const setores = document.querySelectorAll(".setores");

    for (let i = 0; i < setores.length; i++) {
        setores[i].addEventListener("click", () => {
            mostrarKPI(setores[i].getAttribute("data-idSetor"));
        });
    }

}

function carregarSetores(idFabrica) {
    fetch(`/dashboard/listarSetores/${idFabrica}`)
        .then(resposta => {
            if (!resposta.ok) {
                console.log(resposta);
                return;
            }

            return resposta.json();
        })
        .then(data => {
            const divSetores = document.getElementById("setores");

            let listaSetores = "";

            for (let i = 0; i < data.length; i++) {
                listaSetores += `
                    <li class="setores" style="cursor: pointer" data-idSetor="${data[i].idSetor}">
                        <a>${data[i].nome}</a>
                    </li>
                `
            }


            if (data.length > 0) {
                mostrarKPI(data[0].idSetor);
            } else {
                mostrarKPI(0);
            }

            divSetores.innerHTML = listaSetores;

            trocarSetor();
        });
}


function carregarDiasSemVazamento(idFabrica) {
    fetch(`/dashboard/contarDiasSemVazamentos/${idFabrica}`)
        .then(resposta => {
            if (!resposta.ok) {
                console.log(resposta);

                return;
            }

            return resposta.json();
        })
        .then(data => {
            const diasSemVazamento = document.getElementById("kpiDiasSemVaza");

            diasSemVazamento.innerHTML = data.diasSemVazamento;
        });
}

window.onload = () => carregarSeletorDeFabricas();

document.getElementById("slt_fabricas").onchange = trocarFabrica;





async function mostrarKPI(idSetor) {
    const kpisContent = document.getElementById("kpis-content");

    kpisContent.innerHTML = "";


    const ultimoRegistroReq = await fetch(`/dashboard/ultimoRegistroPorSensor/${idSetor}`);
    const ultimoRegistroRes = await ultimoRegistroReq.json();

    for (let i = 0; i < ultimoRegistroRes.length; i++) {
        const kpi = parseInt(ultimoRegistroRes[i].porcGas);

        kpisContent.insertAdjacentHTML("beforeend", `
            <div class="kpi" data-sensor="${ultimoRegistroRes[i].fkSensor}">
                <div class="nanometro">
                    <div class="chartDiv">
                        <canvas id="doughnutChart${i}"></canvas>
                    </div>
                    <span>${kpi}%</span>
                </div>
        
                <span>${ultimoRegistroRes[i].titulo}</span>
            </div>
        `);

        const kpiDiv = document.querySelector(".kpi");
        if (i == 0) {
            kpiDiv.classList.add("selected");
        }

        const ctx = document.getElementById(`doughnutChart${i}`);

        new Chart(ctx, {
            type: 'doughnut',
            labels: [
                'Gás',
                'Sem gás'
            ],
            data: {
                datasets: [{
                    label: 'Gás',
                    data: [kpi, 100 - kpi],
                    backgroundColor: [
                        kpi > ultimoRegistroRes[i].limiteAlerta ? "red" : "#8D6969",
                        "transparent"
                    ],
                    rotation: 180,
                    borderWidth: 0,
                    cutout: '75%',
                    hoverOffset: 4
                }]
            }
        });
    }



    const kpis = document.querySelectorAll(".kpi");
    mostrarGraficoDeBarra(kpis[0].getAttribute("data-sensor"));

    for (let i = 0; i < kpis.length; i++) {
        kpis[i].addEventListener("click", () => {
            for (let j = 0; j < kpis.length; j++) {
                kpis[j].classList.remove("selected");
            }


            kpis[i].classList.add("selected");
            sensorSelecionado = i;
            // mostrarGraficoDeLinha();
            mostrarGraficoDeBarra(kpis[i].getAttribute("data-sensor"));
        });
    }
}


function mostrarGraficoDeLinha() {
    const ctx = document.getElementById("lineChart");

    let data = [];
    let labels = [];
    let limite = [];

    const diario = document.getElementById("diario");
    const mensal = document.getElementById("mensal");
    const anual = document.getElementById("anual");


    for (let i = 0; i < dataDiario[sensorSelecionado].registros.length; i++) {
        data.push(dataDiario[sensorSelecionado].registros[i].porcGas);
        labels.push(dataDiario[sensorSelecionado].registros[i].horario);
    }

    for (i = 0; i < 30; i++) {
        limite.push(20);
    }

    if (!lineChart) {
        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Sensor ${sensorSelecionado + 1}`,
                        data: data,
                        fill: false,
                        tension: 0.1,
                        backgroundColor: ['#3081B8'],
                        borderColor: ['#3081B8'],
                    },
                    {
                        label: "Limite Aceitável",
                        data: limite,
                        fill: false,
                        tension: 0.1,
                        backgroundColor: ['transparent'],
                        borderColor: ['red'],
                        borderDash: [5, 5],
                        pointRadius: 0,
                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        max: 100,
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        position: "bottom",
                    }
                }
            }
        });
    } else {
        anual.classList.remove("selected");
        mensal.classList.remove("selected");
        diario.classList.add("selected");

        lineChart.data.datasets[0].data = data;
        lineChart.data.datasets[1].data = limite;
        lineChart.data.labels = labels;
        lineChart.data.datasets[0].label = `Sensor ${sensorSelecionado + 1}`;
        lineChart.update();
    }

    //filtro grafico diario
    diario.addEventListener("click", () => {
        data = [];
        labels = [];

        for (let i = 0; i < dataDiario[sensorSelecionado].registros.length; i++) {
            data.push(dataDiario[sensorSelecionado].registros[i].porcGas);
            labels.push(dataDiario[sensorSelecionado].registros[i].horario);
        }

        lineChart.data.datasets[0].data = data;
        lineChart.data.datasets[1].data = limite;
        lineChart.data.labels = labels;
        lineChart.update();

        anual.classList.remove("selected");
        mensal.classList.remove("selected");
        diario.classList.add("selected");

        div_titulo.innerHTML = `<h1>Evasão de gás(%)</h1>`
    });

    // filtro mensal grafico
    mensal.addEventListener("click", () => {
        data = [];
        labels = [];

        for (let i = 0; i < dataMensal[sensorSelecionado].registros.length; i++) {
            data.push(dataMensal[sensorSelecionado].registros[i].porcGas);
            labels.push(`Dia ${dataMensal[sensorSelecionado].registros[i].dia}`);
        }

        lineChart.data.datasets[0].data = data;
        lineChart.data.labels = labels;
        lineChart.update();

        anual.classList.remove("selected");
        diario.classList.remove("selected");
        mensal.classList.add("selected");

        div_titulo.innerHTML = `<h1>Maior Evasão Registrada(%)</h1>`
    });

    // filtro anual grafico
    anual.addEventListener("click", () => {
        data = [];
        labels = [];

        for (let i = 0; i < dataAnual[sensorSelecionado].registros.length; i++) {
            data.push(dataAnual[sensorSelecionado].registros[i].porcGas);
            labels.push(`${dataAnual[sensorSelecionado].registros[i].mes}`);
        }

        lineChart.data.datasets[0].data = data;
        lineChart.data.labels = labels;
        lineChart.update();

        diario.classList.remove("selected");
        mensal.classList.remove("selected");
        anual.classList.add("selected");

        div_titulo.innerHTML = `<h1>Evasão média anual(%)</h1>`
    });
}


async function mostrarGraficoDeBarra(idSensor) {
    const reqVazamentos = await fetch(`/dashboard/vazamentosPorMes/${idSensor}`);

    if (!reqVazamentos.ok) {
        console.log(reqVazamentos);
        return;
    }

    const resVazamentos = await reqVazamentos.json();

    const labels = [];
    const data = [];

    for (let i = 0; i < resVazamentos.length; i++) {
        labels.push(`${resVazamentos[i].mes}/${resVazamentos[i].ano}`);
        data.push(resVazamentos[i].qtdVazamentos);
    }

    const ctx = document.getElementById('barChart');

    if (!barChart) {
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: `Sensor ${sensorSelecionado + 1}`,
                    data,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }

        });
    } else {
        barChart.data.datasets[0].data = data;
        barChart.data.labels = labels;
        barChart.data.datasets[0].label = `Quantidade de vazamentos por mês`;

        barChart.update();
    }
}

function mudarTema() {
    const theme = document.documentElement.getAttribute("theme");

    if (theme == "light") {
        lineChart.options.plugins.legend.labels.color = "#2A719B";
        lineChart.options.scales.y.grid.color = "#2A719B";
        lineChart.options.scales.y.ticks.color = "#2A719B";
        lineChart.options.scales.x.grid.color = "#2A719B";
        lineChart.options.scales.x.ticks.color = "#2A719B";

        barChart.options.plugins.legend.labels.color = "#2A719B";
        barChart.options.scales.y.grid.color = "#2A719B";
        barChart.options.scales.y.ticks.color = "#2A719B";
        barChart.options.scales.x.grid.color = "#2A719B";
        barChart.options.scales.x.ticks.color = "#2A719B";
    } else {
        lineChart.options.plugins.legend.labels.color = "#000000";
        lineChart.options.scales.y.grid.color = "#cfd1d0";
        lineChart.options.scales.y.ticks.color = "#000000";
        lineChart.options.scales.x.grid.color = "#cfd1d0";
        lineChart.options.scales.x.ticks.color = "#000000";

        barChart.options.plugins.legend.labels.color = "#000000";
        barChart.options.scales.y.grid.color = "#cfd1d0";
        barChart.options.scales.y.ticks.color = "#000000";
        barChart.options.scales.x.grid.color = "#cfd1d0";
        barChart.options.scales.x.ticks.color = "#000000";
    }
    lineChart.update();
    barChart.update();
    trocaTema();
}

document.addEventListener("DOMContentLoaded", mostrarGraficoDeLinha);
// document.addEventListener("DOMContentLoaded", mostrarGraficoDeBarra);