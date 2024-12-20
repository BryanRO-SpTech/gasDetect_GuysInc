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
                console.log(erro);
                res.status(500).send(erro.message || erro);
            }
        )
}

function ultimosRegistrosPorSetor(req, res) {
    const idSetor = req.params.idSetor;

    dashboardModel.ultimosRegistrosPorSetor(idSetor)
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

function vazamentosPorMes(req, res) {
    const idSensor = req.params.idSensor;

    dashboardModel.vazamentosPorMes(idSensor)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                res.status(500).send(erro.message || erro);
            }
        );
}

function mediaGasPorMes(req, res) {
    const idSensor = req.params.idSensor;

    dashboardModel.mediaGasPorMes(idSensor).then(resultado => {
        res.json(resultado);
    }).catch(error => {
        console.error(error);
        res.status(500).send(error.message || error);
    })
}

function mediaGasPorDia(req, res) {
    const idSensor = req.params.idSensor;

    dashboardModel.mediaGasPorDia(idSensor).then(resultado => {
        res.json(resultado);
    }).catch(error => {
        console.error(error);
        res.status(500).send(error.message || error);
    })
}

function mediaGasPorHora(req, res) {
    const idSensor = req.params.idSensor;

    dashboardModel.mediaGasHorario(idSensor).then(resultado => {
        res.json(resultado);
    }).catch(error => {
        console.error(error);
        res.status(500).send(error.message || error);
    })
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
    mediaGasPorHora
}