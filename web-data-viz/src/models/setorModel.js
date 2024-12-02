const database = require("../database/config");

function listar(idFabrica) {
    var instrucaoSql = `SELECT 
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

function criar(setor, tamanho, descricao, idFabrica , limite, idLimite) {
    var instrucaoSQL2 = `INSERT INTO LimiteAlerta (LimiteAlerta) VALUES (${limite})`;
    var instrucaoSql = `INSERT INTO Setor (nome, tamanhoM2, descricao, fkFabrica, fkLimite) VALUES ('${setor}', ${tamanho}, '${descricao}', ${idFabrica}, ${idLimite})`;
    // var instrucaoSql3 = `UPDATE Setor SET fkLimite = ${idParametroAlerta} WHERE idSetor = ${idSetor}`

    return database.executar(instrucaoSql, instrucaoSQL2);
}

module.exports = {
    listar,
    criar
}

