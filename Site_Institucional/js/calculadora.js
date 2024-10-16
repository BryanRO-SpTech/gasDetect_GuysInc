
//var globais usar nas 2 funções

var economiaPerdas = 0;
var incidentesAnuais = 0;

function calcular() {
    // atribuindo VALORES DAS INPUTS
    incidentesAnuais = Number(ipt_mediaIncidentes.value)
    var custoIndenizacao = Number(ipt_custoIndenizacao.value)
    var custoManutencao = Number(ipt_custoManutencao.value)
    var tempoParada = Number(ipt_tempoParada.value)
    var custoParadaHora = Number(ipt_custoParadaHora.value)

    //CALCULO PERDAS
    var totalIndenizacao = incidentesAnuais * custoIndenizacao;
    var totalManutencao = incidentesAnuais * custoManutencao;
    var totalHorasParada = incidentesAnuais * tempoParada;
    var totalParada = totalHorasParada * custoParadaHora;

    totalPerdas = totalIndenizacao + totalManutencao + totalParada;

    //CALCULO GANHO
    economiaPerdas = totalPerdas * 0.5;

    div_mensagem.innerHTML = `<br><br><br><br>Detalhamento de perdas considerando média de <b> ${incidentesAnuais} </b> incidentes por ano:<br> <br>
                🕝 Devido à paralisação da sua fábrica por ${totalHorasParada} horas no total, <br> sua empresa sofreu uma perda de  <span class = 'perdas'>${formatarDinheiro(totalParada)}.</span><br><br>
                💼 Em indenizações a colaboradores decorrentes dos incidentes, <br> sua empresa sofreu uma perda de  <span class = 'perdas'>${formatarDinheiro(totalIndenizacao)}.</span><br><br>
                🛠️ O custo com manutenção de equipamentos após os incidentes <br> foi de  <span class = 'perdas'>${formatarDinheiro(totalManutencao)}.</span><br><br>
                ⚠️Perda total estimada:  <span class = 'perdas'>${formatarDinheiro(totalPerdas)}</span> <br><br> 
            
            <button onclick='solucao()'>GasDetect</button> <br>`

}

function solucao() {
    div_mensagem.innerHTML = `<br><br><br><br><br><br><b>Economia com a solução GasDetect:</b> <br> <br>
                                Com a implementação do nosso sistema, sua empresa pode obter um ganho financeiro de até <span class='ganhos'><b>50%</b></span> <br> <br>
                                💸 Considerando a média de ${incidentesAnuais} incidentes anuais você teria um lucro ao ANO de: <span class='ganhos'>${formatarDinheiro(economiaPerdas)}.</span> <br> <br>
                                📶 Ao adquirir a nossa solução pelos próximos 3 anos sua empresa obteria uma prospecção de  <span class='ganhos'>${formatarDinheiro(economiaPerdas * 3)}.</span>`
}

function formatarDinheiro(valor) {
    return valor.toLocaleString('pt-br', { style: "currency", currency: 'BRL' })
}


