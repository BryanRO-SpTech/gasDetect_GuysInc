var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/salvar", function (req, res) {
    usuarioController.salvar(req, res);
});
router.post("/salvarfunc", function (req, res) {
    usuarioController.salvarfunc(req, res);
});

router.post("/alterar_senha", function (req, res) {
    usuarioController.alterar_senha(req, res);
});

module.exports = router;