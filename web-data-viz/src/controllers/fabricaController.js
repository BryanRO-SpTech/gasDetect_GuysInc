const fabricaModel = require('../models/fabricaModel.js');

function listar(req, res) {
    var empresaId = req.params.empresaId;

    fabricaModel.listar(empresaId)
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
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;
    var idEmpresa = req.body.idEmpresa;

    fabricaModel.criar(cep, logradouro, numero, bairro, cidade, uf, idEmpresa)
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