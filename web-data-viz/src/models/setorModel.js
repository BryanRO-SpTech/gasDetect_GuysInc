const database = require("../database/config");

function listar(idFabrica) {
    var instrucaoSql = `SELECT 
    s.idSetor,
    s.tamanhoM2,
    s.nome,
    s.descricao,
    la.limiteAlerta,
    f.idFabrica
FROM 
    Setor s
JOIN 
    Fabrica f
ON 
    s.fkFabrica = f.idFabrica
    
JOIN 
    LimiteAlerta la 
ON
    s.fkLimite = la.idParametroAlerta
    WHERE f.idFabrica = ${idFabrica};
    `

    return database.executar(instrucaoSql);
}


function pegarPorId(idSetor) {
    var instrucaoSql = `SELECT * FROM Setor WHERE idSetor = ${idSetor}`;
    return database.executar(instrucaoSql);
}

function criar(setor, tamanho, descricao, idFabrica, limite) {
    var instrucaoSQL2 = `INSERT INTO LimiteAlerta (LimiteAlerta) VALUES (${limite})`;
    // var instrucaoSql3 = `UPDATE Setor SET fkLimite = ${idParametroAlerta} WHERE idSetor = ${idSetor}`

    return database.executar(instrucaoSQL2).then(function (resultado) {
        var instrucaoSql = `INSERT INTO Setor (nome, tamanhoM2, descricao, fkFabrica, fkLimite) VALUES ('${setor}', ${tamanho}, '${descricao}', ${idFabrica}, ${resultado.insertId})`;
        return database.executar(instrucaoSql);
    })
}

module.exports = {
    listar,
    pegarPorId,
    criar
}

