function validarRazaoSocial() {
    const razaoSocial = document.getElementById("ipt_razaoSocial").value;
    const spanMensagem = document.getElementById("span_mensagem_razao_social");

    let mensagem = "";
    let validado = true;

    if (razaoSocial.length == 0) {
        mensagem = "A razão social não pode ser vazia.";
        validado = false;
    }

    else if (razaoSocial.length > 60) {
        mensagem = "A razão social não pode ter mais de 60 caracteres.";
        validado = false;
    }

    spanMensagem.innerHTML = mensagem;

    return validado;
}

function validarCnpj() {
    const cnpj = document.getElementById("ipt_cnpj").value;
    const spanMensagem = document.getElementById("span_mensagem_cnpj");

    let mensagem = "";
    let validado = true;

    if (!contemApenasNumeros(cnpj)) {
        mensagem = "CNPJ deve conter apenas números.";
        validado = false;
    }

    else if (cnpj.length != 14) {
        mensagem = "CNPJ deve conter exatamente 14 dígitos.";
        validado = false;
    }

    spanMensagem.innerText = mensagem;

    return validado;
}

function validarNome() {
    const nome = document.getElementById("ipt_nome").value;
    const spanMensagem = document.getElementById("span_mensagem_nome");

    let mensagem = "";
    let validado = true;

    if (nome.length === 0) {
        mensagem = "O nome não pode ser vazio.";
        validado = false;
    }

    else if (nome.length > 45) {
        mensagem = "O nome não pode ter mais de 45 caracteres.";
        validado = false;
    }

    else if (contemNumeros(nome) || contemCaracterEspecial(nome)) {
        mensagem = "O nome não pode conter números, nem caracteres especiais.";
        validado = false;
    }

    spanMensagem.innerText = mensagem;

    return validado;
}

function validarEmail() {
    const email = document.getElementById("ipt_email").value;
    const spanMensagem = document.getElementById("span_mensagem_email");

    let mensagem = "";
    let validado = true;


    if (email.length === 0) {
        mensagem = "O e-mail não pode ser vazio.";
        validado = false;
    }

    else if (email.length > 60) {
        mensagem = "O e-mail não pode ter mais de 60 caracteres.";
        validado = false;
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
        validado = false;
    }


    spanMensagem.innerHTML = mensagem;
    return validado;
}


function validarCpf() {
    const cpf = document.getElementById("ipt_cpf").value;
    const spanMensagem = document.getElementById("span_mensagem_cpf");

    let mensagem = "";
    let validado = true;

    if (!contemApenasNumeros(cpf)) {
        mensagem = "CPF deve conter apenas números.";
        validado = false;
    }

    else if (cpf.length !== 11) {
        mensagem = "CPF deve conter exatamente 11 dígitos.";
        validado = false;
    }

    spanMensagem.innerHTML = mensagem;
    return validado;
}

function validarSenha() {
    const senha = document.getElementById("ipt_senha").value;
    const spanMensagem = document.getElementById("span_mensagem_senha");

    let mensagem = "";
    let validado = true;


    if (!contemNumeros(senha) || !contemLetraMaiuscula(senha) || !contemLetraMinuscula(senha) || !contemCaracterEspecial(senha)) {
        mensagem = "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial.";
        validado = false;
    }

    else if (senha.length < 8 || senha.length > 30) {
        mensagem = "A senha deve ter entre 8 e 30 caracteres.";
        validado = false;
    }



    spanMensagem.innerHTML = mensagem;
    return validado;
}

function validarConfirmarSenha() {
    const senha = document.getElementById("ipt_senha").value;
    const confirmarSenha = document.getElementById("ipt_confirmar").value;
    const spanMensagem = document.getElementById("span_mensagem_confirmar");

    let mensagem = "";
    let validado = true;

    if (senha !== confirmarSenha) {
        mensagem = "As senhas não coincidem.";
        validado = false;
    }

    spanMensagem.innerHTML = mensagem;
    return validado;
}

function ativarBotao() {
    const botaoCadastrar = document.getElementById("btn_cadastrar");

    validarRazaoSocial() &&
        validarCnpj() &&
        validarNome() &&
        validarEmail() &&
        validarCpf() &&
        validarSenha() &&
        validarConfirmarSenha() ? botaoCadastrar.disabled = false : botaoCadastrar.disabled = true;
}

function removerCaracteresInvalidos() {
    const removerCaractere = (input, caracteresValidos) => {
        let texto = "";
        for (let i = 0; i < input.value.length; i++) {
            if (caracteresValidos.includes(input.value[i])) {
                texto += input.value[i];
            }
        }

        input.value = texto;
    }


    const cnpj = document.getElementById("ipt_cnpj");
    const cpf = document.getElementById("ipt_cpf");

    removerCaractere(cnpj, "1234567890");
    removerCaractere(cpf, "1234567890");
}


const inputs = document.querySelectorAll("#cadastro_form input");

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        removerCaracteresInvalidos();
        ativarBotao();
    });
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

function removerValoresInvalidos(input, caracteresValidos) {

}