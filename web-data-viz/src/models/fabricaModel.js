const database = require("../database/config");

function listarPeloIdDoUsuario(userId) {
    var instrucaoSqlUser = `SELECT fkEmpresa FROM Funcionario WHERE idFuncionario = ${userId}`;

    return database.executar(instrucaoSqlUser)
        .then(function (resultado) {
            if (resultado.length == 0) {
                throw new Error("Usuário não encontrado!");
            }


            var instrucaoSql = `SELECT * FROM Fabrica WHERE fkEmpresa = ${resultado[0].fkEmpresa}`;

            return database.executar(instrucaoSql);
        });
}

function criar(cep, logradouro, numero, bairro, cidade, uf, idUsuarioCriador) {
    var instrucaoSqlUser = `SELECT fkEmpresa FROM Funcionario WHERE idFuncionario = ${idUsuarioCriador}`;

    return database.executar(instrucaoSqlUser).then(function (resultado) {
        var instrucaoSql = `INSERT INTO Fabrica (cep, logradouro, numero, bairro, cidade, uf, fkEmpresa) VALUES ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}', ${resultado[0].fkEmpresa})`;

        return database.executar(instrucaoSql);
    });

}

module.exports = {
    listarPeloIdDoUsuario,
    criar
}