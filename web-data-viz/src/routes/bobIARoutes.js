var express = require("express");
var router = express.Router();
var bobIAController = require ("../controllers/bobIaController");

router.post("/perguntar", function (req, res){
    bobIAController.gerarResposta(req, res);
})

module.exports = router;
