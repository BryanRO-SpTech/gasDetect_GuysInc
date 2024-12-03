var pesquisafuncModel = require("../models/pesquisafuncModel.js");

function pesquisar(req, res) {
    var email = req.body.emailServer;
    var minemail = req.body.minemailServer;
    var empresa = req.body.empresaServer;

    pesquisafuncModel.pesquisar(email, minemail, empresa)
        .then(
            function (resultadopesquisar) {
                res.json({
                    email: resultadopesquisar[0].email,
                    nome: resultadopesquisar[0].nome,
                    nivelPermissao: resultadopesquisar[0].idNivel,
                    cpf: resultadopesquisar[0].cpf
                });
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao localizar o funcionario! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function mostrarfuncionario(req, res) {
    var email = req.body.emailServer;
    var minemail = req.body.minemailServer;
    var empresa = req.body.empresaServer;

    pesquisafuncModel.mostrarfuncionario(email, minemail, empresa)
        .then(
            function (resultadomostrarfuncionario) {
                res.json({
                    email: resultadomostrarfuncionario[0].email,
                    nome: resultadomostrarfuncionario[0].nome,
                    nivelPermissao: resultadomostrarfuncionario[0].idNivel,
                    cpf: resultadomostrarfuncionario[0].cpf
                });
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao localizar o funcionario! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    pesquisar,
    mostrarfuncionario
}