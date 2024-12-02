var usuarioModel = require("../models/usuarioModel");
const zoho = require("../zoho/config.js");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    }else {
        usuarioModel.autenticar(email, senha)   
            .then(
                function (resultadoAutenticar) {
                    console.log(resultadoAutenticar);
                    
                    if (resultadoAutenticar.length == 1) {
                        if (email == "suporte@gmail.com" && senha == "senha0101") {
                            res.json({
                                nome: resultadoAutenticar[0].nome
                            })
                        }else {
                            res.json({
                                nome: resultadoAutenticar[0].nome,
                                email: resultadoAutenticar[0].email,
                                idEmpresa: resultadoAutenticar[0].idEmpresa,
                                nivelPermissao: resultadoAutenticar[0].nivelPermissao,
                                cpf: resultadoAutenticar[0].cpf
                            });

                        }

                        

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (razaoSocial == undefined) {
        res.status(400).send("Sua razão social está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {

        const zohoClientId = await zoho.criarCliente(nome, email);

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(razaoSocial, cnpj, nome, email, cpf, senha, zohoClientId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function salvar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var cstorageServer = req.body.cstorageServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {

        usuarioModel.salvar(nome, email, cpf, cstorageServer)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function alterar_senha(req, res) {
    var senhaorig = req.body.origsenhaServer;
    var senha = req.body.senhaServer;
    var cpf = req.body.cpfServer;

    if (senhaorig == undefined) {
        res.status(400).send("Sua senha original está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.alterar_senha(senhaorig, senha, cpf)
            .then(
                function (resultadoalterar_senha) {
                    console.log(`\nResultados encontrados: ${resultadoalterar_senha.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoalterar_senha)}`);

                    if (resultadoalterar_senha.affectedRows == 1) {
                        console.log(resultadoalterar_senha);

                        res.json();

                    } else if (resultadoalterar_senha.affectedRows == 0) {
                        res.status(403).send("senha inválida");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    autenticar,
    cadastrar,
    salvar,
    alterar_senha
}