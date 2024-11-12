function validarLogin() {
    const email = document.getElementById("ipt_email").value;
    const senha = document.getElementById("ipt_senha").value;
    const spanError = document.getElementById("spn_login_error");

    if (email != "guys@guysinc.com" || senha != "12345678") {
        spanError.innerHTML = "E-mail ou senha incorretos, tente novamente.";
    } else {
        window.location.replace("./dashboard.html");
    }

}