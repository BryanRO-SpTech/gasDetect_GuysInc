const database = require("../database/config");

function listarSensores(idSetor) {
    var instrucaoSql = `select idSensor,
    setor.nome as Setor
    from Sensor
    JOIN Setor on fkSetor = idSetor
    WHERE fkSetor = ${idSetor};
    `

    return database.executar(instrucaoSql);

}


function listarSetoresPeloIdFabrica(idFabrica) {
    var instrucaoSql = `SELECT Setor.*, LimiteAlerta.limiteAlerta
    FROM Setor
    JOIN LimiteAlerta ON idParametroAlerta = fkLimite
    WHERE fkFabrica = ${idFabrica};`;

    return database.executar(instrucaoSql);
}

function listarFabricasPeloIdEmpresa(idEmpresa) {
    var instrucaoSql = `SELECT *
    FROM Fabrica
    WHERE fkEmpresa = ${idEmpresa};`;

    return database.executar(instrucaoSql);
}

async function contarDiasSemVazamentosPorFabrica(idFabrica) {
    const [dtUltimoVazamento] = await database.executar(
        `SELECT dtHora FROM Registro
        JOIN Sensor ON fkSensor = idSensor 
        JOIN Setor ON fkSetor = idSetor
        JOIN Fabrica ON fkFabrica = idFabrica
        JOIN LimiteAlerta ON fkLimite = idParametroAlerta
        WHERE idFabrica = ${idFabrica} AND porcGas > limiteAlerta ORDER BY dtHora DESC LIMIT 1;`
    );

    const data = new Date(dtUltimoVazamento.dtHora);

    const dataFormatada = data.toLocaleDateString("pt-BR", { dateStyle: "short" });

    const dataInvertida = dataFormatada.split('/').reverse().join('-');

    const horario = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

    const [diasSemVazamento] = await database.executar(`
        SELECT COUNT(*) AS diasSemVazamento FROM 
        (
            SELECT DAY(dtHora) AS quant FROM Registro
        JOIN Sensor ON fkSensor = idSensor 
        JOIN Setor ON fkSetor = idSetor
        JOIN Fabrica ON fkFabrica = idFabrica
        JOIN LimiteAlerta ON fkLimite = idParametroAlerta
        WHERE idFabrica = ${idFabrica} AND dtHora > '${dataInvertida} ${horario}' GROUP BY DAY(dtHora)
        ) AS resultados;
    `);


    return diasSemVazamento;
}
module.exports = {
    listarSensores,
    listarSetoresPeloIdFabrica,
    listarFabricasPeloIdEmpresa,
    contarDiasSemVazamentosPorFabrica
}