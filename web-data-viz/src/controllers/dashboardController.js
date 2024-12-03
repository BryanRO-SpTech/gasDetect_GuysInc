const dashboardModel = require('../models/dashboardModel.js');

function listarSensores(req, res) {
    var fabricaId = req.params.idFabrica;
    var setorId = req.params.idSetor;

    dashboardModel.listarSensores(fabricaId,setorId)
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
    listarSensores
}