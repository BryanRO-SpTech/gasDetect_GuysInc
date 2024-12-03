var express = require("express");
var router = express.Router();

var pesquisarfuncController = require("../controllers/pesquisafuncController.js");

router.post("/mostrarfuncionario", function (req, res) {
    pesquisarfuncController.mostrarfuncionario(req, res);
})

router.post("/mostrarfuncionarioesp", function (req, res) {
    pesquisarfuncController.mostrarfuncionarioesp(req, res);
})

router.post("/pesquisar", function (req, res) {
    pesquisarfuncController.pesquisar(req, res);
})

module.exports = router;