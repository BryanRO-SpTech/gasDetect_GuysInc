let razaoSocialValido = false;
let cnpjValido = false;
let nomeValido = false;
let emailValido = false;
let cpfValido = false;
let senhaValido = false;
let confirmarSenhaValido = false;



function validarRazaoSocial() {
    razaoSocialValido = false

    const razaoSocial = document.getElementById("ipt_razaoSocial").value;
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

    const cnpj = document.getElementById("ipt_cnpj");
    const spanMensagem = document.getElementById("span_mensagem_cnpj");

    let mensagem = "";

    removerCaracteresInvalidos(cnpj, "0123456789")


    if (cnpj.value.length < 14) {
        mensagem = `CNPJ deve conter exatamente 14 dígitos. Digite mais ${14 - cnpj.value.length} números...`;
    }

    else {
        cnpjValido = true
    }

    spanMensagem.innerText = mensagem;
}

function validarNome() {
    nomeValido = false;

    const nome = document.getElementById("ipt_nome").value;
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

    const email = document.getElementById("ipt_email").value;
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

    const cpf = document.getElementById("ipt_cpf");
    const spanMensagem = document.getElementById("span_mensagem_cpf");

    let mensagem = "";

    removerCaracteresInvalidos(cpf, "0123456789")

    if (cpf.value.length < 11) {
        mensagem = `CPF deve conter exatamente 11 dígitos. Digite mais ${11 - cpf.value.length} números...`;
    }

    else {
        cpfValido = true;
    }

    spanMensagem.innerHTML = mensagem;
}

function validarSenha() {
    senhaValido = false;

    const senha = document.getElementById("ipt_senha").value;
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

    const senha = document.getElementById("ipt_senha").value;
    const confirmarSenha = document.getElementById("ipt_confirmar").value;
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

function redirecionar() {
    if (
        razaoSocialValido &&
        cnpjValido &&
        nomeValido &&
        emailValido &&
        cpfValido &&
        senhaValido &&
        confirmarSenhaValido
    ) {
        window.location.replace("./login.html");
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