let idFabrica;
let idSetor;


function carregarFabricas() {
    fetch(`/fabrica/listar/${sessionStorage.ID_EMPRESA}`)
        .then(
            function (resposta) {
                if (!resposta.ok) {
                    console.error("Erro ao listar fábricas:", resposta);
                    return;
                }

                return resposta.json();
            }
        )

        .then(
            function (fabrica) {
                var fabricaHTML = "";

                for (var i = 0; i < fabrica.length; i++) {
                    fabricaHTML += `
                        <option value="${fabrica[i].idFabrica}">${fabrica[i].logradouro}, ${fabrica[i].numero}</option>
                    `;
                }

                document.getElementById("sltFabrica").innerHTML += fabricaHTML;
            }
        );
}

carregarFabricas();


function carregarSetores() {
    fetch(`/setor/listar/${idFabrica}`)
        .then(
            function (resposta) {
                if (!resposta.ok) {
                    console.error("Erro ao listar setores:", resposta);
                    return;
                }

                return resposta.json();
            }
        )

        .then(
            function (setor) {
                var setorHTML = "";

                for (var i = 0; i < setor.length; i++) {
                    setorHTML += `
                        <option value="${setor[i].idSetor}">${setor[i].nome}</option>
                    `;
                }

                document.getElementById("sltSetor").innerHTML += setorHTML;
            }
        );
}

function fabrica() {
    var fabrica_selecionada = sltFabrica.value;

    if (fabrica_selecionada == "#") {
        spanMsgFabrica.innerHTML = `<span style="color: red;">Selecione uma opção antes de clicar no botão</span>`;
        return;
    }

    idFabrica = fabrica_selecionada;
    carregarSetores();

    document.getElementById("fabrica").style.display = "none";
    document.getElementById("setor").style.display = "block";

}

function setor() {
    var setor_selecionado = document.getElementById("sltSetor").value;

    if (setor_selecionado == "#") {
        spanMsgSetor.innerHTML = `<span>Selecione uma opção antes de clicar no botão</span>`
        return;
    }

    idSetor = setor_selecionado;

    document.getElementById("setor").style.display = "none";
    document.getElementById("modal").style.display = "block"

}

function enviar() {
    var titulo = ipt_titulo.value;

    if (
        idFabrica == "" ||
        idSetor == "" ||
        titulo == ""
    ) {
        span_mensagem.innerHTML = `<span> Preencha todos os campos para proseguir.</span>`;
        return;
    }

    console.log(idFabrica, idSetor, titulo);

    fetch("/sensor/solicitar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idSetor,
            descricaoSensor: titulo,
            userId: sessionStorage.ID_USUARIO
        }),
    }).then(function (resposta) {
        if (!resposta.ok) {
            console.error("Erro ao realizar a solicitação:", resposta);
            return;
        }
    })
}