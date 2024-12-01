
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
    document.getElementById("solicitacao").style.display = "block";

}

function enviar() {
    var nome = ipt_nome.value;
    var email = ipt_email.value;
    var empresa = ipt_empresa.value;
    var cnpj = Number(ipt_cnpj.value);
    var cep = Number(ipt_cep.value);
    var bairro = ipt_bairro.value;
    var municipio = ipt_municipio.value;
    var estado = ipt_estado.value;
    var setor = ipt_setor.value;
    var descStor = ipt_desc_setor;
    var tamanhoSetor = Number(ipt_tamanho_setor.value);

    if (
        nome == "" ||
        email == "" ||
        empresa == "" ||
        cnpj == "" ||
        cep == "" ||
        bairro == "" ||
        municipio == "" ||
        estado == "" ||
        setor == "" ||
        descStor == "" ||
        tamanhoSetor == ""
    ) {
        spanMsgSolicitacao.innerHTML = `<span> Preencha todos os campos para proseguir.</span>`;
        return;
    }
}
