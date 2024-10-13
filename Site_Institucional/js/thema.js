var LogoAtual = "../assets/img/Gas_Detetc_dark.png"
var LogoAnterior = "../assets/img/gas_detect_light.png"

var imgAtual = "../assets/img/img-temaDark.png"
var imgAnterior = "../assets/img/img_quem-Guys.png"

// Mudança de tema mais eficiente, mais bonita (hahah) e completa, armazenado a última escolha de tema feita pelo usuário e ao recarregar a tela mantém o tema escolhido.

// document.documentElement.setAttribute('theme', localStorage.getItem('theme') || 'ligth');

// const trocaTema = () => {
//     const newTheme = document.documentElement.getAttribute('theme') == 'ligth' ? 'dark':'ligth';
//     document.documentElement.setAttribute('theme', newTheme);
//     localStorage.setItem('theme', newTheme);

//     document.getElementById("trocaLogo").src = LogoAtual;
//     var auxLogo = LogoAtual;
//     LogoAtual = LogoAnterior;
//     LogoAnterior = auxLogo;

//     document.getElementById("trocaImg").src = imgAtual;
//     var auxImg = imgAtual;
//     imgAtual = imgAnterior;
//     imgAnterior = auxImg;
// } 

// Mudança de tema mais simples e não salva o tema escolhido.

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
