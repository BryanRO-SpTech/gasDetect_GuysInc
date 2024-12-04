const database = require("../database/config");

function listarSensores(idSetor) {
    var instrucaoSql = `select idSensor,
    Setor.nome as Setor
    from Sensor
    JOIN Setor on fkSetor = idSetor
    WHERE fkSetor = ${idSetor};
    `

    return database.executar(instrucaoSql);

}


function listarSetoresPeloIdFabrica(idFabrica) {
    var instrucaoSql = `SELECT * FROM view_listar_setor WHERE fkFabrica = ${idFabrica};`;

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
        WHERE idFabrica = ${idFabrica} AND porcGas >= limiteAlerta ORDER BY dtHora DESC LIMIT 1;`
    );

    if (!dtUltimoVazamento) {
        const [diasSemVazamento] = await database.executar(`
            SELECT COUNT(*) AS diasSemVazamento FROM 
            (   
                SELECT DAY(dtHora) AS quant FROM Registro
            JOIN Sensor ON fkSensor = idSensor 
            JOIN Setor ON fkSetor = idSetor
            JOIN Fabrica ON fkFabrica = idFabrica
            JOIN LimiteAlerta ON fkLimite = idParametroAlerta
            WHERE idFabrica = ${idFabrica} GROUP BY DAY(dtHora)
            ) AS resultados;    
        `);

        return diasSemVazamento;
    }

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

async function ultimosRegistrosPorSetor(idSetor) {
    return await database.executar(`
        SELECT r.idRegistro, r.fkSensor, r.porcGas, r.dtHora, sub.titulo, sub.limiteAlerta
        FROM Registro AS r
        JOIN (
            SELECT fkSensor, titulo, MAX(dtHora) AS maxDtHora, limiteAlerta
            FROM Registro
            JOIN Sensor ON fkSensor = idSensor
            JOIN Setor ON fkSetor = idSetor
            JOIN LimiteAlerta ON fkLimite = idParametroAlerta
            WHERE fkSetor = ${idSetor}
            GROUP BY fkSensor
        ) AS sub ON r.fkSensor = sub.fkSensor AND r.dtHora = sub.maxDtHora
        ORDER BY r.dtHora DESC;
    `);
}

async function vazamentosPorMes(idSensor) {
    const vazamentos = await database.executar(
        `SELECT DATE_FORMAT(dtHora, '%b') mes, YEAR(dtHora) ano, COUNT(*) AS qtdVazamentos
        FROM (
            SELECT dtHora
            FROM Registro 
            JOIN Sensor ON fkSensor = idSensor
            JOIN Setor ON fkSetor = idSetor
            JOIN LimiteAlerta ON fkLimite = idParametroAlerta
            WHERE idSensor = ${idSensor} AND porcGas >= limiteAlerta
            GROUP BY DATE(dtHora)
        ) AS sub
        GROUP BY MONTH(dtHora), YEAR(dtHora)
        ORDER BY mes DESC, ano DESC LIMIT 12;
        `);


    return vazamentos;
}

async function mediaGasPorMes(idSensor) {
    const media = await database.executar(`
        SELECT DATE_FORMAT(dtHora, '%b/ %Y') AS dt, TRUNCATE(MAX(porcGas), 2) AS porcGas 
        FROM Registro WHERE fkSensor = ${idSensor} 
        GROUP BY MONTH(dtHora), YEAR(dtHora) 
        ORDER BY dtHora DESC LIMIT 12
    `);

    const limite = await database.executar(`
        SELECT limiteAlerta FROM Sensor JOIN Setor ON fkSetor = idSetor
        JOIN LimiteAlerta ON fkLimite = idParametroAlerta
        WHERE idSensor = ${idSensor};
    `);

    return {
        data: media.reverse(),
        limite: limite[0].limiteAlerta
    };
}

async function mediaGasPorDia(idSensor) {
    const media = await database.executar(`
        SELECT DATE_FORMAT(dtHora, '%d /%b') AS dt, TRUNCATE(MAX(porcGas), 2) AS porcGas
        FROM Registro 
        WHERE fkSensor = ${idSensor}
        GROUP BY DAY(dtHora), MONTH(dtHora), YEAR(dtHora) 
        ORDER BY dtHora DESC LIMIT 30;
    `);

    const limite = await database.executar(`
        SELECT limiteAlerta FROM Sensor JOIN Setor ON fkSetor = idSetor
        JOIN LimiteAlerta ON fkLimite = idParametroAlerta
        WHERE idSensor = ${idSensor};
    `);

    return {
        data: media.reverse(),
        limite: limite[0].limiteAlerta
    };
}


async function mediaGasHorario(idSensor) {
    const media = await database.executar(`
        SELECT DATE_FORMAT(dtHora, 'Dia %d - %H:%i') AS dt, TRUNCATE(MAX(porcGas), 2) AS porcGas 
        FROM Registro 
        WHERE fkSensor = ${idSensor}
        GROUP BY HOUR(dtHora), DAY(dtHora), MONTH(dtHora), YEAR(dtHora) 
        ORDER BY dtHora DESC LIMIT 24;    
    `);

    const limite = await database.executar(`
        SELECT limiteAlerta FROM Sensor JOIN Setor ON fkSetor = idSetor
        JOIN LimiteAlerta ON fkLimite = idParametroAlerta
        WHERE idSensor = ${idSensor};
    `);


    return {
        data: media.reverse(),
        limite: limite[0].limiteAlerta
    };
}

module.exports = {
    listarSensores,
    listarSetoresPeloIdFabrica,
    listarFabricasPeloIdEmpresa,
    contarDiasSemVazamentosPorFabrica,
    ultimosRegistrosPorSetor,
    vazamentosPorMes,
    mediaGasPorMes,
    mediaGasPorDia,
    mediaGasHorario
}