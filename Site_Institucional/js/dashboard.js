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
                    <span>${kpi}</span>
                </div>
        
                <span>Sensor ${i + 1}</span>
            </div>
        `);

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
                        kpi > 50 ? "red" : "#8D6969",
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
}

document.addEventListener("DOMContentLoaded", mostrarKPI);