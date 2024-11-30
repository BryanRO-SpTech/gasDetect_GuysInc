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

function alterar_senha() {
    var username = ipt_nome.value
    var useremail = ipt_email.value
    var usercpf = ipt_cpf.value
    var useroriginalsenha = ipt_senha_original.value
    var usersenha = ipt_senha.value
    var userconfirmsenha = ipt_confirmar.value
}

function salvar() {
    var username = ipt_nome.value
    var useremail = ipt_email.value
    var usercpf = ipt_cpf.value
    var useroriginalsenha = ipt_senha_original.value
}