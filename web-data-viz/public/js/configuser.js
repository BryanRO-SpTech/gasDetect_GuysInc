function mostrardadosuser() {
    const username = sessionStorage.getItem('NOME')
    const useremail = sessionStorage.getItem('EMAIL')
    const usercpf = sessionStorage.getItem('CPF')
    const userlevel = sessionStorage.getItem('NIVEL_PERMISSAO')

    document.getElementById('ipt_nome').placeholder = username
    document.getElementById('ipt_email').placeholder = useremail
    document.getElementById('ipt_cpf').placeholder = usercpf

    b_usuario.innerHTML = username;
    a_usuario.innerHTML = username;

    if (userlevel == 1) {
        document.getElementById('condicional').style.display = 'flex'
    }
}

function alterar_senha() {}

function salvar() {}