const urlParams = new URLSearchParams(window.location.search);
const idFuncionario = urlParams.get('funcionario');

function mostrardadosfuncesp() {
    const empresastorage = sessionStorage.getItem('ID_EMPRESA')

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
            document.getElementById('ipt_nome').value = data[0].nome
            document.getElementById('ipt_email').value = data[0].email
            document.getElementById('ipt_cpf').value = data[0].cpf
            document.getElementById('ipt_permissao').value = data[0].fkNivel
        })
}

function alterar_dados() {
    var funcname = ipt_nome.value 
    var funcemail = ipt_email.value 
    var funccpf = ipt_cpf.value 
    var funcnivel = ipt_permissao.value  
    const empresastorage = sessionStorage.getItem('ID_EMPRESA')

    fetch(`/pesquisafunc/mostrarfuncionarioesp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            funcServer: idFuncionario,
            nomeServer: funcname,
            emailServer: funcemail,
            cpfServer: funccpf,
            nivelServer: funcnivel,
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
            document.getElementById('ipt_nome').value = data[0].nome
            document.getElementById('ipt_email').value = data[0].email
            document.getElementById('ipt_cpf').value = data[0].cpf
            document.getElementById('ipt_permissao').value = data[0].fkNivel
        })
}