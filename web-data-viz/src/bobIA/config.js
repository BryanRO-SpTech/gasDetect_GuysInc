const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatIA = new GoogleGenerativeAI(process.env.MINHA_CHAVE);
const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });

async function gerarResposta(pergunta) {
    const resultado = await modeloIA.generateContent(`Em um paragráfo responda: ${pergunta}`)
    const resposta = resultado.response.text();

    return resposta;

}

module.exports = gerarResposta;