const database = require("../database/config");

function pegarPorId(id) {
    var instrucaoSql = `SELECT * FROM Empresa WHERE idEmpresa = ${id}`;
    return database.executar(instrucaoSql);
}


module.exports = {
    pegarPorId
}