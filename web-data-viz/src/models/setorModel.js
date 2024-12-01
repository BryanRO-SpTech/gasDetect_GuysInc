const database = require("../database/config");

function listar(idFabrica) {
    var instrucaoSql = `SELECT 
    s.tamanhoM2,
    s.setor,
    s.descricao,
    la.limite,
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

function criar(setor, tamanho, descricao, fabrica, limite, idFabrica) {
    var instrucaoSql = `INSERT INTO Setor (setor, tamanhoM2, descricao, fabrica, limite, fkFabrica) VALUES ('${setor}', '${tamanho}', '${descricao}', '${fabrica}', '${limite}', ${idFabrica})`;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    criar
}

