const router = require('express').Router();

const fabricaController = require('../controllers/fabricaController.js');


router.get('/listar/:empresaId', function (req, res) {
    fabricaController.listar(req, res);
});

router.post('/criar', function (req, res) {
    fabricaController.criar(req, res);
});

module.exports = router;
