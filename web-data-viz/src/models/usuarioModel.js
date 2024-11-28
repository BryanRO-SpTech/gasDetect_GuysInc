var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSqlusuario = `
        SELECT idFuncionario, nome, email, fkEmpresa as empresaId FROM Funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSqlusuario);
    return database.executar(instrucaoSqlusuario);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(razaoSocial, cnpj, nome, email, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, cnpj, nome, email, cpf, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSqlempresa = `
        INSERT INTO Empresa (razaoSocial, cnpjSede) VALUES ('${razaoSocial}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSqlempresa);

    const empresa = await database.executar(instrucaoSqlempresa);

    var instrucaoSqlusuario = `
        INSERT INTO Funcionario (nome, email, cpf, senha, fkEmpresa) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', '${empresa.insertId}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSqlempresa);
    return database.executar(instrucaoSqlusuario);
}

module.exports = {
    autenticar,
    cadastrar
};