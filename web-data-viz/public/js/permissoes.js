function pesquisar() {
    var textoPesquisa = document.getElementById("pesquisaEmail").value;
    var textoPesquisamin = document.getElementById("pesquisaEmail").value.toLowerCase();

    var resultado = document.getElementById("div_resultado");

    fetch(`/pesquisafunc/pesquisar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            empresaServer: sessionStorage.ID_EMPRESA,
            emailServer: textoPesquisa,
            minemailServer: textoPesquisamin
        }),
    })
        .then(function (res) {
            if (!res.ok) {
                resultado.textContent = "Não possui nenhum funcionario.";
            }
            return res.json()
        })

        .then(function (funcionarios) {
            var funcionarioHTML = "";
            console.log(funcionarios)

            funcionarioHTML += `
                    <tr class="contraste">
                        <td>${funcionarios[0].nome}</td>
                        <td>${funcionarios[0].cpf}</td>
                        <td>${funcionarios[0].email}</td>
                        <td>${funcionarios[0].fkNivel}</td>
                        <td><a href="/configfunc.html?funcionario=${funcionarios[0].idFuncionario}">Alterar</a></td>
                    </tr>
                `;

            document.getElementById("tabela_de_funcionarios").innerHTML = funcionarioHTML;
        });
}

function mostrarfuncionario() {

    var resultado = document.getElementById("div_resultado");

    fetch(`/pesquisafunc/mostrarfuncionario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            empresaServer: sessionStorage.ID_EMPRESA
        }),
    })
        .then(function (res) {
            if (!res.ok) {
                resultado.textContent = "Não possui nenhum funcionario.";
            }
            return res.json()
        })

        .then(function (funcionarios) {
            var funcionarioHTML = "";
            console.log(funcionarios)

            for (var i = 0; i < funcionarios.length; i++) {
                funcionarioHTML += `
                    <tr class="${i % 2 == 0 ? "contraste" : ""}">
                        <td>${funcionarios[i].nome}</td>
                        <td>${funcionarios[i].cpf}</td>
                        <td>${funcionarios[i].email}</td>
                        <td>${funcionarios[i].fkNivel}</td>
                        <td><a href="/configfunc.html?funcionario=${funcionarios[i].idFuncionario}">Alterar</a></td>
                    </tr>
                `;

                document.getElementById("tabela_de_funcionarios").innerHTML = funcionarioHTML;
            }
        });
};