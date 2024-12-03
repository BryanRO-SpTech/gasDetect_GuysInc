var pesquisafuncModel = require("../models/pesquisafuncModel.js");

function pesquisar(req, res) {
    var email = req.body.emailServer;
    var minemail = req.body.minemailServer;
    var empresa = req.body.empresaServer;

    pesquisafuncModel.pesquisar(email, minemail, empresa)
        .then(
            function (data) {
                res.json(data);
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
    var empresa = req.body.empresaServer;

    pesquisafuncModel.mostrarfuncionario(empresa)
        .then(
            function (info) {
                res.json(info);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao localizar o funcionario! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )

}

function mostrarfuncionarioesp(req, res) {
    var empresa = req.body.empresaServer;
    var idfunc = req.body.funcServer;

    pesquisafuncModel.mostrarfuncionario(empresa, idfunc)
        .then(
            function (data) {
                res.json(data);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao localizar o funcionario! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )

}

function alterar_dados() {
    
}

module.exports = {
    pesquisar,
    mostrarfuncionarioesp,
    mostrarfuncionario
}