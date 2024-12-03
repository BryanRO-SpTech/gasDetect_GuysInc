const router = require('express').Router();

const dashboardController = require('../controllers/dashboardController.js');

router.get('/listarSensores/:idSetor', function (req, res) {
    dashboardController.listarSensores(req, res);
});

router.get("/listarSetores/:idFabrica", function (req, res) {
    dashboardController.listarSetoresPeloIdFabrica(req, res);
});

router.get("/listarFabricas/:idEmpresa", function (req, res) {
    dashboardController.listarFabricasPeloIdEmpresa(req, res);
})


router.get("/contarDiasSemVazamentos/:idFabrica", function (req, res) {
    dashboardController.contarDiasSemVazamentosPorFabrica(req, res);
});

router.get("/ultimoRegistroPorSensor/:idSetor", function (req, res) {
    dashboardController.ultimosRegistrosPorSetor(req, res);
});

router.get("/vazamentosPorMes/:idSensor", function (req, res) {
    dashboardController.vazamentosPorMes(req, res);
});

router.get("/mediaGasPorMes/:idSensor", function (req, res) {
    dashboardController.mediaGasPorMes(req, res);
});

router.get("/mediaGasPorDia/:idSensor", function (req, res) {
    dashboardController.mediaGasPorDia(req, res);
});

router.get("/mediaGasHorario/:idSensor", function (req, res) {
    dashboardController.mediaGasPorHora(req, res);
});

module.exports = router;
