const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatIA = new GoogleGenerativeAI(process.env.MINHA_CHAVE);
const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });

async function gerarResposta(pergunta) {
    const resultado = await modeloIA.generateContent(`
    ${pergunta} => Antes dessa flecha está uma interação de um usuário de uma plataforma de chatbot. Com base nessa interação, o chatbot, para responder a afirmaçao ou pergunta, siga os seguintes crítérios:
    1 - Sempre responda em um unico paragrafo, com no máximo 500 caracteres.
    2 - Sempre responda de forma clara e objetiva, sem rodeios.
    3 - Sempre responda de forma educada e respeitosa.
    4 - Nunca use palavras de baixo calão ou ofensivas, mesmo que o usuário peça.
    5 - Caso o usuário peça para dar uma resposta mais longa, não ultrapasse 500 caracteres de forma alguma. Responda que você não pode dar uma resposta mais longa.
    `)
    const resposta = resultado.response.text();

    return resposta;

}

module.exports = gerarResposta;