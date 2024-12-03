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

module.exports = router;
