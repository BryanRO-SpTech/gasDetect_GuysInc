const router = require('express').Router();

const setorController = require('../controllers/setorController.js');


router.get('/listar/:idFabrica', function (req, res) {
    setorController.listar(req, res);
});

router.post('/criar', function (req, res) {
    setorController.criar(req, res);
});

module.exports = router;
