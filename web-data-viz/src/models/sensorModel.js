const database = require("../database/config");


function cadastrarSensor(titulo, fkSetor) {
    var instrucaoSql = `INSERT INTO Sensor (titulo, fkSetor) VALUES ('${titulo}', ${fkSetor})`;
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarSensor
}