let lineChart = null;
let barChart = null;
let periodo = "hora";

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
            for (let j = 0; j < setores.length; j++) {
                setores[j].classList.remove("selected");
            }

            setores[i].classList.add("selected");
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
                    <li class="setores ${i == 0 ? "selected" : ""}" style="cursor: pointer" data-idSetor="${data[i].idSetor}">
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
    mostrarGraficoDeLinha(kpis[0].getAttribute("data-sensor"), "hora");

    for (let i = 0; i < kpis.length; i++) {
        kpis[i].addEventListener("click", () => {
            for (let j = 0; j < kpis.length; j++) {
                kpis[j].classList.remove("selected");
            }


            kpis[i].classList.add("selected");

            mostrarGraficoDeBarra(kpis[i].getAttribute("data-sensor"));
            mostrarGraficoDeLinha(kpis[i].getAttribute("data-sensor"), "hora");
        });
    }
}


async function mostrarGraficoDeLinha(idSensor) {
    if (periodo == "hora") {
        const reqHora = await fetch(`/dashboard/mediaGasHorario/${idSensor}`);

        if (!reqHora.ok) {
            console.log(reqHora);
            return;
        }

        var res = await reqHora.json();
    } else if (periodo == "diario") {
        const reqDiario = await fetch(`/dashboard/mediaGasPorDia/${idSensor}`);

        if (!reqDiario.ok) {
            console.log(reqDiario);
            return;
        }

        var res = await reqDiario.json();
    } else {
        const reqMensal = await fetch(`/dashboard/mediaGasPorMes/${idSensor}`);

        if (!reqMensal.ok) {
            console.log(reqMensal);
            return;
        }

        var res = await reqMensal.json();
    }

    console.log(res);

    const ctx = document.getElementById("lineChart");

    let data = [];
    let labels = [];
    let limite = [];


    const diario = document.getElementById("diario");
    const mensal = document.getElementById("mensal");
    const anual = document.getElementById("anual");

    for (let i = 0; i < res.data.length; i++) {
        data.push(res.data[i].porcGas);
        labels.push(res.data[i].dt);
        limite.push(res.limite);
    }

    if (!lineChart) {
        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Pico de gás(%)`,
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
        lineChart.data.datasets[0].data = data;
        lineChart.data.datasets[1].data = limite;
        lineChart.data.labels = labels;
        lineChart.update();
    }

    //filtro grafico diario
    diario.onclick = () => {
        anual.classList.remove("selected");
        mensal.classList.remove("selected");
        diario.classList.add("selected");

        periodo = "hora";
        mostrarGraficoDeLinha(idSensor);
    };

    // filtro mensal grafico
    mensal.onclick = () => {
        anual.classList.remove("selected");
        mensal.classList.add("selected");
        diario.classList.remove("selected");

        periodo = "diario"
        mostrarGraficoDeLinha(idSensor);
    };

    // filtro anual grafico
    anual.onclick = () => {
        anual.classList.add("selected");
        mensal.classList.remove("selected");
        diario.classList.remove("selected");

        periodo = "mensal";
        mostrarGraficoDeLinha(idSensor);

    };
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
                    label: `Quantidade de vazamentos por mês`,
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



let intervalo;

function atualizarGrafico(func) {
    if (intervalo) {
        clearInterval(intervalo);
    }

    intervalo = setInterval(func, 2000);
}