var LogoAtual = "../assets/img/Gas_Detetc_dark.png"
var LogoAnterior = "../assets/img/gas_detect_light.png"

var imgAtual = "../assets/img/img-temaDark.png"
var imgAnterior = "../assets/img/img_quem-Guys.png"

function trocaTema() {
    const temaAtual = document.documentElement.getAttribute('theme');

    if (temaAtual === "light") {
        document.documentElement.setAttribute("theme", "dark");
    } else {
        document.documentElement.setAttribute("theme", "light");
    }
    document.getElementById("trocaLogo").src = LogoAtual;
    var auxLogo = LogoAtual;
    LogoAtual = LogoAnterior;
    LogoAnterior = auxLogo;

    document.getElementById("trocaImg").src = imgAtual;
    var auxImg = imgAtual;
    imgAtual = imgAnterior;
    imgAnterior = auxImg;
}
