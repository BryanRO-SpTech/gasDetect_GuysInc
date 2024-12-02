const sensorModel = require("../models/sensorModel.js");
const fabricaModel = require("../models/fabricaModel.js");
const setorModel = require("../models/setorModel.js");
const usuarioModel = require("../models/usuarioModel.js");
const empresaModel = require("../models/empresaModel.js");
const zoho = require("../zoho/config.js");

async function solicitarSensor(req, res) {
    const idSetor = req.body.idSetor;
    const descricaoSensor = req.body.descricaoSensor;
    const userId = req.body.userId;

    const setor = await setorModel.pegarPorId(idSetor);

    if (setor.length == 0) {
        res.status(404).send("Setor não encontrado");
        return;
    }

    const user = await usuarioModel.pegarPorId(userId);

    if (user.length == 0) {
        res.status(404).send("Usuário não encontrado");
        return;
    }

    const fabrica = await fabricaModel.pegarPorId(setor[0].fkFabrica);
    const empresa = await empresaModel.pegarPorId(fabrica[0].fkEmpresa);


    const sensorId = await sensorModel.cadastrarSensor(descricaoSensor, idSetor);

    zoho.solicitarSensor(
        user[0].supportId,
        {
            nomeCliente: user[0].nome,
            emailCliente: user[0].email,
            empresa: {
                razaoSocial: empresa[0].razaoSocial,
                cnpj: empresa[0].cnpjSede
            },
            fabrica: {
                cep: fabrica[0].cep,
                logradouro: fabrica[0].logradouro,
                numero: fabrica[0].numero,
                bairro: fabrica[0].bairro,
                cidade: fabrica[0].cidade,
                uf: fabrica[0].UF
            },
            setor: {
                nomeSetor: setor[0].nome,
                tamanhoM2: setor[0].tamanhoM2
            }
        },
        sensorId.insertId
    );

    res.status(201).send("Solicitação enviada com sucesso");
}


module.exports = {
    solicitarSensor
}