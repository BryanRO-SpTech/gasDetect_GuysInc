const setorModel = require('../models/setorModel.js');

function listar(req, res) {
    var fabricaId = req.params.idFabrica;
console.log(fabricaId, "coco xixi bunda")

    setorModel.listar(fabricaId)
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

function criar(req, res) {
    var setor = req.body.setor;
    var tamanho = req.body.tamanho;
    var descricao = req.body.descricao;
    var limite = req.body.limite;
    var idFabrica = req.body.idFabrica;
    var idLimite = req.params.idParametroAlerta

    setorModel.criar(setor, tamanho, descricao, idFabrica , limite, idLimite)
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

module.exports = {
    listar,
    criar
}