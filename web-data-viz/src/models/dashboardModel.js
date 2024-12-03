const database = require("../database/config");

function listarSensores(idFabrica,idSetor) {
    var instrucaoSql = `select idSensor,
    setor.nome as Setor
    from sensor
    JOIN setor on fkSetor = idSetor
    JOIN fabrica on fkFabrica = idFabrica
    WHERE fkFabrica = ${idFabrica} and fkSetor = ${idSetor};
    `

    return database.executar(instrucaoSql);

}

module.exports = {
    listarSensores
}