var database = require("../database/config")

function pesquisar(req, res) {
    var instrucaoSqlusuario = `SELECT idFuncionario, nome, email, cpf, idNivel FROM Funcionario LEFT JOIN NivelPermissao ON idNivel = fkNivel WHERE email = '${email}' OR email = '${minemail}' AND idEmpresa = '${empresa}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSqlusuario);
    return database.executar(instrucaoSqlusuario);
}

function mostrarfuncionario(req, res) {
    var instrucaoSql = `SELECT * FROM Funcionario WHERE fkEmpresa = ${idEmpresa}`;
    return database.executar(instrucaoSql);
}

module.exports = {
    pesquisar,
    mostrarfuncionario
};