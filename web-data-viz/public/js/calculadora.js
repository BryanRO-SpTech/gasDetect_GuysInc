
//var globais usar nas 2 funções

var economiaPerdas = 0;
var incidentesAnuais = 0;

function calcular() {
    // atribuindo VALORES DAS INPUTS
    var incidentesAnuais = Number(ipt_mediaIncidentes.value);
    var custoIndenizacaoManutencao = Number(ipt_custoIndenizacao.value);
    var tempoParada = Number(ipt_tempoParada.value);
    var custoParadaHora = Number(ipt_custoParadaHora.value);

    div_incidente.innerHTML = ``
    div_custo.innerHTML = ``
    div_custohora.innerHTML = ``
    div_hora.innerHTML = ``

    //CALCULO PERDAS
    var totalIndenizacao = incidentesAnuais * custoIndenizacaoManutencao;
    var totalHorasParada = incidentesAnuais * tempoParada;
    var totalParada = totalHorasParada * custoParadaHora;

    totalPerdas = totalIndenizacao + totalParada;

    //CALCULO GANHO
    economiaPerdas = totalPerdas * 0.5;

    if (incidentesAnuais <= 0) {

        div_incidente.innerHTML = `⛔ Insira um valor válido`;

    }

    if (custoIndenizacaoManutencao <= 0) {

        div_custo.innerHTML = `⛔ Insira um valor válido`;

    }

    if (custoParadaHora <= 0) {

        div_custohora.innerHTML = `⛔ Insira um valor válido`;

    }

    if (tempoParada <= 0) {

        div_hora.innerHTML = `⛔ Insira um valor válido`;

    }

    if (incidentesAnuais > 0 && custoIndenizacaoManutencao > 0 && custoParadaHora > 0 && tempoParada > 0) {

        div_mensagem.innerHTML = `Detalhamento de perdas considerando média de <b> ${incidentesAnuais} </b> incidentes por ano:<br> <br>
        🕝 Com a paralisação de ${totalHorasParada} horas causou perdas na produção e finanças de  <span class = 'perdas'>${formatarDinheiro(totalParada)}.</span><br><br>
        🛠️ 
        O custo com manutenção e indenizações resultou em uma perda de <span class='perdas'>${formatarDinheiro(totalIndenizacao)}.</span><br><br>
        ⚠️ Perda total estimada:<span class = 'perdas'>${formatarDinheiro(totalPerdas)}</span> <br><br><br><br>
        
        <b>Economia com a solução GasDetect:</b>
        
       Com nosso sistema, sua empresa tem um ganho de até <span class='ganhos'><b>50%</b></span>. <br><br>
        💸 Com ${incidentesAnuais} incidentes anuais, seu lucro anual seria de: <span class='ganhos'>${formatarDinheiro(economiaPerdas)}.</span> <br> <br>
        📶 Ao adquirir nossa solução por 3 anos, sua empresa terá uma prospecção de <span class='ganhos'>${formatarDinheiro(economiaPerdas * 3)}.</span>
        
        <button class="botao-voltar" onclick="location.reload()">Voltar</button>
        `


    }
}



function formatarDinheiro(valor) {
    return valor.toLocaleString('pt-br', { style: "currency", currency: 'BRL' })
}


