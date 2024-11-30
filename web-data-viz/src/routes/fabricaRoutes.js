const router = require('express').Router();

const fabricaController = require('../controllers/fabricaController.js');


router.get('/listar/:userId', function (req, res) {
    fabricaController.listarPeloIdDoUsuario(req, res);
});

router.post('/criar', function (req, res) {
    fabricaController.criar(req, res);
});

module.exports = router;
