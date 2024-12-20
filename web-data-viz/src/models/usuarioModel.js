var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSqlusuario = `SELECT idFuncionario,
	    Funcionario.nome,
	    email,
	    cpf,
	    idNivel,
	    Funcionario.fkEmpresa as idEmpresa
    FROM Funcionario 
    LEFT JOIN NivelPermissao ON idNivel = fkNivel
    WHERE email = '${email}' AND senha = '${senha}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSqlusuario);
    return database.executar(instrucaoSqlusuario);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(razaoSocial, cnpj, nome, email, cpf, senha, supportId) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSqlempresa = `
        INSERT INTO Empresa (razaoSocial, cnpjSede) VALUES ('${razaoSocial}', '${cnpj}');
    `;

    const empresa = await database.executar(instrucaoSqlempresa);

    var instrucaoSqlusuario = `
        INSERT INTO Funcionario (nome, email, cpf, senha, fkEmpresa, fkNivel, supportId) VALUES ('${nome}', '${email}', '${cpf}', '${senha}', '${empresa.insertId}', 1, '${supportId}');
    `;

    return database.executar(instrucaoSqlusuario);
}

function salvar(nome, email, cpf, cstorageServer) {
    var instrucaoSqlusuario = `
        UPDATE Funcionario SET nome = '${nome}',
        email = '${email}',
        cpf = '${cpf}'
        WHERE cpf = '${cstorageServer}'; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSqlusuario);
    return database.executar(instrucaoSqlusuario);
}

function salvarfunc(nome, email, cpf, senha, empresa, nivelpermissao) {
    var instrucaoSqlusuario = `
        INSERT INTO Funcionario (nome, email, cpf, senha, fkEmpresa, fkNivel) VALUES
        ('${nome}', '${email}', '${cpf}', '${senha}', '${empresa}', '${nivelpermissao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSqlusuario);
    return database.executar(instrucaoSqlusuario);
}

function alterar_senha(senhaorig, senha, cpf) {
    var instrucaoSqlusuario = `
        UPDATE Funcionario SET senha = '${senha}'
        WHERE senha = '${senhaorig}' AND cpf = '${cpf}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSqlusuario);
    return database.executar(instrucaoSqlusuario);
}

function pegarPorId(id) {
    var instrucaoSql = `SELECT * FROM Funcionario WHERE idFuncionario = ${id}`;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    salvar,
    alterar_senha,
    salvarfunc,
    pegarPorId
};