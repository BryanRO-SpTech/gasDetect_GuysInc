const database = require("../database/config");

function listar(empresaId) {
    var instrucaoSql = `SELECT * FROM Fabrica WHERE fkEmpresa = ${empresaId}`;

    return database.executar(instrucaoSql);

}

function pegarPorId(id) {
    var instrucaoSql = `SELECT * FROM Fabrica WHERE idFabrica = ${id}`;
    return database.executar(instrucaoSql);
}

function criar(cep, logradouro, numero, bairro, cidade, uf, idEmpresa) {
    var instrucaoSql = `INSERT INTO Fabrica (cep, logradouro, numero, bairro, cidade, uf, fkEmpresa) VALUES ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}', ${idEmpresa})`;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    pegarPorId,
    criar
}