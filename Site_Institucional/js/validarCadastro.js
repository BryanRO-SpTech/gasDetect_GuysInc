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