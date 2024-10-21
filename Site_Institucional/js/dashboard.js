let lineChart = null;
let barChart = null;
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
            mostrarGraficoDeBarra();
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
                        backgroundColor: ['red'],
                        borderColor: ['red'],
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
            labels.push(`${dataAnual[sensorSelecionado].registros[i].mes}`);
        }

        lineChart.data.datasets[0].data = data;
        lineChart.data.labels = labels;
        lineChart.update();

        diario.classList.remove("selected");
        mensal.classList.remove("selected");
        anual.classList.add("selected");
    });
}


function mostrarGraficoDeBarra() {

    const ctx = document.getElementById('barChart');

    if (!barChart) {
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: `Sensor ${sensorSelecionado + 1}`,
                    data: [12, 19, 3, 5, 2, 3, 10, 6, 14, 10, 18, 12],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }

        });
    } else {
        if (sensorSelecionado == 0) {
            barChart.data.datasets[0].data = [12, 19, 3, 5, 2, 3, 10, 6, 14, 10, 18, 12];
            barChart.data.datasets[0].label = `Sensor ${sensorSelecionado + 1}`;
        } else if (sensorSelecionado == 1) {
            barChart.data.datasets[0].data = [20, 7, 10, 8, 5, 11, 15, 19, 10, 4, 11, 17];
            barChart.data.datasets[0].label = `Sensor ${sensorSelecionado + 1}`;
        } else if (sensorSelecionado == 2) {
            barChart.data.datasets[0].data = [11, 4, 17, 19, 4, 10, 18, 15, 12, 3, 4, 7];
            barChart.data.datasets[0].label = `Sensor ${sensorSelecionado + 1}`;
        } else if (sensorSelecionado == 3) {
            barChart.data.datasets[0].data = [3, 7, 13, 18, 10, 6, 5, 11, 15, 19, 3, 5];
            barChart.data.datasets[0].label = `Sensor ${sensorSelecionado + 1}`;
        }
        barChart.update();
    }
}

function mudarTema() {
    const theme = document.documentElement.getAttribute("theme");
    console.log(theme);
    if (theme == "light") {
        lineChart.options.scales.y.grid.color = "#2A719B";
        lineChart.options.scales.x.grid.color = "#2A719B";
        barChart.options.scales.y.grid.color = "#2A719B";
        barChart.options.scales.x.grid.color = "#2A719B";
    } else {
        lineChart.options.scales.y.grid.color = "#cfd1d0";
        lineChart.options.scales.x.grid.color = "#cfd1d0";
        barChart.options.scales.y.grid.color = "#cfd1d0";
        barChart.options.scales.x.grid.color = "#cfd1d0";
    }
    lineChart.update();
    barChart.update();
    trocaTema();
}

document.addEventListener("DOMContentLoaded", mostrarKPI);
document.addEventListener("DOMContentLoaded", mostrarGraficoDeLinha);
document.addEventListener("DOMContentLoaded", mostrarGraficoDeBarra);