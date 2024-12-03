var database = require("../database/config")

function pesquisar(email, minemail, empresa) {
    var instrucaoSqlusuario = `SELECT idFuncionario nome, email, cpf, fkNivel FROM Funcionario WHERE email = '${email}' OR email = '${minemail}' AND fkEmpresa = '${empresa}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSqlusuario);
    return database.executar(instrucaoSqlusuario);
}

function mostrarfuncionario(empresa) {
    var instrucaoSql = `SELECT idFuncionario, nome, email, cpf, fkNivel FROM Funcionario WHERE fkEmpresa = '${empresa}'`;
    return database.executar(instrucaoSql);
}

function mostrarfuncionarioesp(empresa, idfunc) {
    var instrucaoSql = `SELECT nome, email, cpf, fkNivel FROM Funcionario WHERE fkEmpresa = '${empresa}' AND '${idfunc}'`;
    return database.executar(instrucaoSql);
}

module.exports = {
    pesquisar,
    mostrarfuncionarioesp,
    mostrarfuncionario
};