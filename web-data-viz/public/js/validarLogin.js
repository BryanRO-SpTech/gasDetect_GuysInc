function validarLogin() {
    const email = document.getElementById("ipt_email").value;
    const senha = document.getElementById("ipt_senha").value;
    const spanError = document.getElementById("spn_login_error");

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha,
        }),
    }).then(function (res) {
        console.log(res.status)
        if (!res.ok) {
            spanError.innerHTML = "Usuário ou senha incorretos";
            return spanError.style.display = "block";
        }

        if (res.ok) {
            res.json().then(function (data) {
                var suporte = data.nome; // Agora `data` é o objeto com as propriedades, e você acessa `nome` corretamente
                console.log(suporte);

                if (suporte == "Suporte N3") {

                    window.location.replace("./suporte.html");
                } else {
                    sessionStorage.ID_USUARIO = data.idFuncionario;
                    sessionStorage.EMAIL = data.email;
                    sessionStorage.NOME = data.nome;
                    sessionStorage.ID_EMPRESA = data.idEmpresa;
                    sessionStorage.NIVEL_PERMISSAO = data.nivelPermissao;
                    sessionStorage.CPF = data.cpf;

                    window.location.replace("./dashboard.html");
                }
            });
        }
    });
}