const bobIA = require("../bobIA/config");

async function gerarResposta(req, res){
    const pergunta = req.body.pergunta;
    try{
        const resposta = await bobIA(pergunta)
        res.json({bobIAResponse:resposta});
    } catch (error) {
        console.error(error);
        throw error;
    }

}
module.exports = {
    gerarResposta
}