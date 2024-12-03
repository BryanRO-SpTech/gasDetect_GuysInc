const urlParams = new URLSearchParams(window.location.search);
const idFuncionario = urlParams.get('funcionario');

function mostrardadosfunc() {
    const empresastorage = sessionStorage.getItem('ID_EMPRESA')

    var funcname = ipt_nome.value
    var funcemail = ipt_email.value
    var funccpf = ipt_cpf.value
    var funcpermissao = ipt_nivel_permissao.value

    fetch(`/pesquisafunc/mostrarfuncionarioesp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            funcServer: idFuncionario,
            empresaServer: empresastorage
        }),
    })
        .then(function (res) {
            if (!res.ok) {
                resultado.textContent = "Não possui nenhum funcionario.";
            }
            return res.json()
        })

        .then(function (data) {
            data.funcname,
            data.funcemail,
            data.funccpf,
            data.funcpermissao
        })

    document.getElementById('ipt_nome').value = funcname
    document.getElementById('ipt_email').value = funcemail
    document.getElementById('ipt_cpf').value = funccpf

    nomeValido = true
    emailValido = true
    cpfValido = true
}