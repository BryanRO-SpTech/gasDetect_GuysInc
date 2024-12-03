const router = require('express').Router();

const dashboardController = require('../controllers/dashboardController.js');

router.get('/listarSensores/:idFabrica', function (req, res) {
    dashboardController.listarSensores(req, res);
});

router.get('/listarSensores/:idSetor', function (req, res) {
    dashboardController.listarSensores(req, res);
});

module.exports = router;
