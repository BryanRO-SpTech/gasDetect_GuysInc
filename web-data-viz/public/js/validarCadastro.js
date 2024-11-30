let razaoSocialValido = false;
let cnpjValido = false;
let nomeValido = false;
let emailValido = false;
let cpfValido = false;
let senhaValido = false;
let confirmarSenhaValido = false;

let razaoSocial = '';
let cnpj = '';
let nome = '';
let email = '';
let cpf = '';
let senha = '';
let confirmarSenha = '';

function validarRazaoSocial() {
    razaoSocialValido = false

    razaoSocial = document.getElementById("ipt_razaoSocial").value;
    const spanMensagem = document.getElementById("span_mensagem_razao_social");

    let mensagem = "";

    if (razaoSocial.length == 0) {
        mensagem = "A razão social não pode ser vazia.";
    }

    else {
        razaoSocialValido = true;
    }

    spanMensagem.innerHTML = mensagem;
}

function validarCnpj() {
    cnpjValido = false

    const cnpjIpt = document.getElementById("ipt_cnpj");
    const spanMensagem = document.getElementById("span_mensagem_cnpj");

    let mensagem = "";

    removerCaracteresInvalidos(cnpjIpt, "0123456789");


    if (cnpjIpt.value.length < 14) {
        mensagem = `CNPJ deve conter exatamente 14 dígitos. Digite mais ${14 - cnpjIpt.value.length} números...`;
    }

    else {
        cnpjValido = true
        cnpj = cnpjIpt.value;
    }

    spanMensagem.innerText = mensagem;
}

function validarNome() {
    nomeValido = false;

    nome = document.getElementById("ipt_nome").value;
    const spanMensagem = document.getElementById("span_mensagem_nome");

    const quantPalavras = nome.split(" ").filter(palavra => palavra != "");

    let mensagem = "";

    if (nome.length === 0) {
        mensagem = "O nome não pode ser vazio.";
    }

    else if (nome.length > 45) {
        mensagem = "O nome não pode ter mais de 45 caracteres.";
    }

    else if (quantPalavras.length < 2) {
        mensagem = "Escreva seu nome completo";
    }

    else if (contemNumeros(nome) || contemCaracterEspecial(nome)) {
        mensagem = "O nome não pode conter números, nem caracteres especiais.";
    }

    else {
        nomeValido = true;
    }

    spanMensagem.innerText = mensagem;
}

function validarEmail() {
    emailValido = false;

    email = document.getElementById("ipt_email").value;
    const spanMensagem = document.getElementById("span_mensagem_email");

    let mensagem = "";

    if (email.length === 0) {
        mensagem = "O e-mail não pode ser vazio.";
    }

    else if (email.length > 60) {
        mensagem = "O e-mail não pode ter mais de 60 caracteres.";
    }

    else if (
        !email.includes("@") ||
        !email.includes(".") ||
        email.indexOf("@") > email.lastIndexOf(".") ||
        email.indexOf("@") === email.length - 1 ||
        email.lastIndexOf(".") === email.length - 1 ||
        email.indexOf("@") + 1 === email.lastIndexOf(".")
    ) {
        mensagem = "O formato do e-mail é inválido.";
    }

    else {
        emailValido = true;
    }


    spanMensagem.innerHTML = mensagem;
}


function validarCpf() {
    cpfValido = false;

    const cpfIpt = document.getElementById("ipt_cpf");
    const spanMensagem = document.getElementById("span_mensagem_cpf");

    let mensagem = "";

    removerCaracteresInvalidos(cpfIpt, "0123456789")

    if (cpfIpt.value.length < 11) {
        mensagem = `CPF deve conter exatamente 11 dígitos. Digite mais ${11 - cpfIpt.value.length} números...`;
    }

    else {
        cpfValido = true;
        cpf = cpfIpt.value;
    }

    spanMensagem.innerHTML = mensagem;
}

function validarSenha() {
    senhaValido = false;

    senha = document.getElementById("ipt_senha").value;
    const spanMensagem = document.getElementById("span_mensagem_senha");

    let mensagem = "";


    if (!contemNumeros(senha) || !contemLetraMaiuscula(senha) || !contemLetraMinuscula(senha) || !contemCaracterEspecial(senha)) {
        mensagem = "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial.";
    }

    else if (senha.length < 8 || senha.length > 30) {
        mensagem = "A senha deve ter entre 8 e 30 caracteres.";
    }

    else {
        senhaValido = true;
    }



    spanMensagem.innerHTML = mensagem;
}

function validarConfirmarSenha() {
    confirmarSenhaValido = false;

    confirmarSenha = document.getElementById("ipt_confirmar").value;

    const spanMensagem = document.getElementById("span_mensagem_confirmar");

    let mensagem = "";

    if (senha !== confirmarSenha) {
        mensagem = "As senhas não coincidem.";
    }

    else {
        confirmarSenhaValido = true;
    }

    spanMensagem.innerHTML = mensagem;
}

function cadastrar() {
    if (
        razaoSocialValido &&
        cnpjValido &&
        nomeValido &&
        emailValido &&
        cpfValido &&
        senhaValido &&
        confirmarSenhaValido
    ) {
        console.log(cnpj)
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                razaoSocialServer: razaoSocial,
                cnpjServer: cnpj,
                nomeServer: nome,
                emailServer: email,
                cpfServer: cpf,
                senhaServer: senha
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                window.location.replace("./login.html");
            })
            .catch(function (resposta) {
                span_mensagem_cadastro_efetuado.innerHTML = `#ERRO: ${resposta}`;
            });

        return false;
    }
}

function mostrardadosuser() {
    const username = sessionStorage.getItem('NOME')
    const useremail = sessionStorage.getItem('EMAIL')
    const usercpf = sessionStorage.getItem('CPF')

    document.getElementById('ipt_nome').placeholder = username
    document.getElementById('ipt_email').placeholder = useremail
    document.getElementById('ipt_cpf').placeholder = usercpf

    b_usuario.innerHTML = username;
    a_usuario.innerHTML = username;
}

function niveladministrador() {
    const userlevel = sessionStorage.getItem('NIVEL_PERMISSAO')
    if (userlevel == '1') {
        document.getElementById('condicional').style.display = 'flex'
    }
}

function salvar() {
    const cpfstorage = sessionStorage.getItem('CPF')

    var username = ipt_nome.value
    var useremail = ipt_email.value
    var usercpf = ipt_cpf.value
    var usersenha = ipt_senha_original.value

    if (
        nomeValido &&
        emailValido &&
        cpfValido &&
        senhaValido &&
        confirmarSenhaValido
    ) {
        fetch("/usuarios/salvar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: username,
                emailServer: useremail,
                cpfServer: usercpf,
                senhaServer: usersenha,
                cstorageServer: cpfstorage
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (res.ok) {
                    res.json().then(function (data) {
                        sessionStorage.EMAIL = data.email;
                        sessionStorage.NOME = data.nome;
                        sessionStorage.CPF = data.cpf;
                    });
                }
            })
            .catch(function (resposta) {
                span_mensagem_cadastro_efetuado.innerHTML = `#ERRO: ${resposta}`;
            });

        return false;
    }
}

function alterar_senha() {
    const cpfstorage = sessionStorage.getItem('CPF')

    var useroriginalsenha = ipt_senha_original.value
    var usersenha = ipt_senha.value

    if (
        senhaValido &&
        confirmarSenhaValido
    ) {
        fetch("/usuarios/alterar_senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                origsenhaServer: useroriginalsenha,
                senhaServer: usersenha,
                cpfServer: cpfstorage
            }),
        }).then(function (res) {
            if (!res.ok) {
                span_mensagem_senha_original.innerHTML = "Senha incorretos";
                return 
            }

            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data);

                    window.location.replace("./login.html");
                });
            }
        });
    }
}





// Funções para validações genericas

function validarTexto(caracteresValidos, texto) {
    if (texto.length === 0) return false;


    for (let i = 0; i < texto.length; i++) {
        if (!caracteresValidos.includes(texto[i])) {
            return false;
        }
    }

    return true;
}

function contemLetraMaiuscula(texto) {
    return texto.toLowerCase() != texto;
}


function contemLetraMinuscula(texto) {
    return texto.toUpperCase() != texto;
}


function contemNumeros(texto) {
    for (let i = 0; i < texto.length; i++) {
        if ("1234567890".includes(texto[i])) {
            return true;
        }
    }

    return false;
}

function contemApenasNumeros(texto) {
    return !isNaN(Number(texto));
}


function contemCaracterEspecial(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (`!@#$%^&*()_+-={}[]|\\:"';<>,./?`.includes(texto[i])) {
            return true;
        }
    }

    return false;
}

function removerCaracteresInvalidos(input, caracteresValidos) {
    let texto = "";
    for (let i = 0; i < input.value.length; i++) {
        if (caracteresValidos.includes(input.value[i])) {
            texto += input.value[i];
        }
    }

    input.value = texto.trim();
}