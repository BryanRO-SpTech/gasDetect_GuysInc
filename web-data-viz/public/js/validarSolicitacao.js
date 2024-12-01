
function fabrica() {
    var fabrica_selecionada = sltFabrica.value;

    if (fabrica_selecionada == "#") {
        spanMsgFabrica.innerHTML = `<span style="color: red;">Selecione uma opção antes de clicar no botão</span>`;
        return;
    }

    document.getElementById("fabrica").style.display = "none";
    document.getElementById("setor").style.display = "block";
}

function setor() {
    var setor_selecionado = sltSetor.value;

    if (setor_selecionado == "#") {
        spanMsgSetor.innerHTML = `<span>Selecione uma opção antes de clicar no botão</span>`
        return;
    }


    document.getElementById("setor").style.display = "none";
    document.getElementById("modal").style.display = "block"

}

// function closeModal() {
//     document.getElementById("modal").style.display = "none"
//     document.getElementById("setor").style.display = "block";
// }

function enviar() {
    var titulo = ipt_titulo.value;
    var n_sensores = Number(ipt_num_sensor.value);

    if (
        setor == "" ||
        descStor == "" ||
        tamanhoSetor == ""
    ) {
        span_mensagem.innerHTML = `<span> Preencha todos os campos para proseguir.</span>`;
        return;
    }

    var num_sensores = Math.ceil(tamanhoSetor / 30);


    fetch("", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            setor,
            titulo,
            n_sensores,
            idFuncionario: sessionStorage.ID_FUNCIONARIO,
        }),
    }).then(function(resposta) {
        if (!resposta.ok) {
            console.error("Erro ao realizar a solicitação:", resposta);
            return;
        }
    })
}
