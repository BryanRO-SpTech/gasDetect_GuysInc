let lineChart = null;
let sensorSelecionado = 0;

function mostrarKPI() {
    const kpisContent = document.getElementById("kpis-content");

    for (let i = 0; i < dataDiario.length; i++) {
        const kpi = parseInt(dataDiario[i].registros[dataDiario[i].registros.length - 1].porcGas);

        kpisContent.insertAdjacentHTML("beforeend", `
            <div class="kpi">
                <div class="nanometro">
                    <div class="chartDiv">
                        <canvas id="doughnutChart${i}"></canvas>
                    </div>
                    <span>${kpi}%</span>
                </div>
        
                <span>Sensor ${i + 1}</span>
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
                        kpi > 30 ? "red" : "#8D6969",
                        "transparent"
                    ],
                    rotation: 180,
                    borderWidth: 0,
                    cutout: '75%',
                    hoverOffset: 4
                }]
            },
        });
    }

    const kpis = document.querySelectorAll(".kpi");

    for (let i = 0; i < kpis.length; i++) {
        kpis[i].addEventListener("click", () => {
            for (let j = 0; j < kpis.length; j++) {
                kpis[j].classList.remove("selected");
            }


            kpis[i].classList.add("selected");
            sensorSelecionado = i;
            mostrarGraficoDeLinha();
        });
    }
}


function mostrarGraficoDeLinha() {
    const ctx = document.getElementById("lineChart");

    let data = [];
    let labels = [];

    const diario = document.getElementById("diario");
    const mensal = document.getElementById("mensal");
    const anual = document.getElementById("anual");


    for (let i = 0; i < dataDiario[sensorSelecionado].registros.length; i++) {
        data.push(dataDiario[sensorSelecionado].registros[i].porcGas);
        labels.push(dataDiario[sensorSelecionado].registros[i].horario);
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
                        backgroundColor: ['#65C5D7'],
                        borderColor: ['#65C5D7'],
                    },
                    {
                        label: "",
                        data: [100],
                        fill: false,
                        tension: 0.1,
                        backgroundColor: ['transparent'],
                        borderColor: ['transparent'],
                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,

                    }
                }
            }
        });
    } else {
        anual.classList.remove("selected");
        mensal.classList.remove("selected");
        diario.classList.add("selected");

        lineChart.data.datasets[0].data = data;
        lineChart.data.labels = labels;
        lineChart.data.datasets[0].label = `Sensor ${sensorSelecionado + 1}`;
        lineChart.update();
    }


    diario.addEventListener("click", () => {
        data = [];
        labels = [];

        for (let i = 0; i < dataDiario[sensorSelecionado].registros.length; i++) {
            data.push(dataDiario[sensorSelecionado].registros[i].porcGas);
            labels.push(dataDiario[sensorSelecionado].registros[i].horario);
        }

        lineChart.data.datasets[0].data = data;
        lineChart.data.labels = labels;
        lineChart.update();

        anual.classList.remove("selected");
        mensal.classList.remove("selected");
        diario.classList.add("selected");
    });

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
    });

    anual.addEventListener("click", () => {
        data = [];
        labels = [];

        for (let i = 0; i < dataAnual[sensorSelecionado].registros.length; i++) {
            data.push(dataAnual[sensorSelecionado].registros[i].porcGas);
            labels.push(`Mês de ${dataAnual[sensorSelecionado].registros[i].mes}`);
        }

        lineChart.data.datasets[0].data = data;
        lineChart.data.labels = labels;
        lineChart.update();

        diario.classList.remove("selected");
        mensal.classList.remove("selected");
        anual.classList.add("selected");
    });
}


document.addEventListener("DOMContentLoaded", mostrarKPI);
document.addEventListener("DOMContentLoaded", mostrarGraficoDeLinha);