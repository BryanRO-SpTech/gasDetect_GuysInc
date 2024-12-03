const dashboardModel = require('../models/dashboardModel.js');

function listarSensores(req, res) {
    var setorId = req.params.idSetor;

    dashboardModel.listarSensores(setorId)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).send(erro.message || erro);
            }
        );
}

function listarSetoresPeloIdFabrica(req, res) {
    const idFabrica = req.params.idFabrica;

    dashboardModel.listarSetoresPeloIdFabrica(idFabrica)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                res.status(500).send(erro.message || erro);
            }
        );
}


function listarFabricasPeloIdEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashboardModel.listarFabricasPeloIdEmpresa(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                res.status(500).send(erro.message || erro);
            }
        )
}

function contarDiasSemVazamentosPorFabrica(req, res) {
    const idFabrica = req.params.idFabrica;

    dashboardModel.contarDiasSemVazamentosPorFabrica(idFabrica)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                res.status(500).send(erro.message || erro);
            }
        )
}

module.exports = {
    listarSensores,
    listarSetoresPeloIdFabrica,
    listarFabricasPeloIdEmpresa,
    contarDiasSemVazamentosPorFabrica
}