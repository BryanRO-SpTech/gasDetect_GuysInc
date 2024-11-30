async function gerarToken() {
    const tokenRequest = await fetch('https://accounts.zoho.com/oauth/v2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: process.env.ZOHO_REFRESH_TOKEN
        }),
    });

    if (tokenRequest.status !== 200) {
        console.error('Erro ao gerar token:', tokenRequest);
        return;
    }

    const tokenResponse = await tokenRequest.json();

    return tokenResponse.access_token;

}


async function criarCliente(nome, email) {
    const token = await gerarToken();

    console.log("Token: ", token);

    const createRequest = await fetch('https://desk.zoho.com/api/v1/contacts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lastName: nome,
            email: email,
        }),
    })

    if (createRequest.status !== 200) {
        console.error('Erro ao criar cliente:', createRequest);
        return;
    }

    const createResponse = await createRequest.json();

    return createResponse.id;
}



function solicitarSensor(zohoClientId, {
    nomeCliente,
    emailCliente,
    empresa: {
        razaoSocial,
        cnpj
    },
    fabrica: {
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
    },
    setor: {
        nomeSetor,
        descricao,
        tamanhoM2
    }
}, idSensor) {
    const token = gerarToken();

    fetch('https://desk.zoho.com/api/v1/tickets', {
        method: 'POST',
        headers: {
            'Authorization': `Zoho-oauthtoken ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: `#REQUISIÇÃO DE CLIENTE - Novo Sensor de gás na empresa: ${razaoSocial}`,
            description: `
                <h2><strong>O usu&aacute;rio, ${nomeCliente} est&aacute; solicitando um novo sensor.</strong></h2>

                <table align="left" border="1" cellpadding="1" cellspacing="0" style="width:500px">
                    <thead>
                        <tr>
                            <th scope="col" style="text-align:left"><span style="font-size:16px">Descri&ccedil;&atilde;o</span></th>
                            <th scope="col" style="text-align:left"><span style="font-size:16px">Dado</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span style="font-size:16px"><strong>Nome do us&aacute;rio</strong></span></td>
                            <td><span style="font-size:16px">${nomeCliente}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>Email do usu&aacute;rio</strong></span></td>
                            <td><span style="font-size:16px">${emailCliente}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>Empresa</strong></span></td>
                            <td><span style="font-size:16px">${razaoSocial}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>CNPJ</strong></span></td>
                            <td><span style="font-size:16px">${cnpj}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>CEP da F&aacute;brica</strong></span></td>
                            <td><span style="font-size:16px">${cep}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>Endere&ccedil;o da F&aacute;brica</strong></span></td>
                            <td><span style="font-size:16px">${logradouro}, ${numero}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>Bairro da F&aacute;brica</strong></span></td>
                            <td><span style="font-size:16px">${bairro}/span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>M&uacute;nicipio&nbsp;</strong><strong>da F&aacute;brica</strong></span></td>
                            <td><span style="font-size:16px">${cidade}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>Estado da F&aacute;brica</strong></span></td>
                            <td><span style="font-size:16px">${uf}</span></td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>Setor</strong></span></td>
                            <td><span style="font-size:16px">${nomeSetor}</span></td>
                        </tr>
                        <tr>
                            <td>
                            <p><span style="font-size:16px"><strong>Descri&ccedil;&atilde;o do Setor</strong></span></p>
                            </td>
                            <td>
                            <p><span style="font-size:16px">${descricao}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td><span style="font-size:16px"><strong>Tamanho do setor em M2</strong></span></td>
                            <td>${tamanhoM2}</td>
                        </tr>
                    </tbody>
                </table>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p>&nbsp;</p>

                <p><span style="font-size:18px"><strong>&Eacute; necess&aacute;rio configurar um novo sensor com o ID ${idSensor} e enviar o suporte para realizar a instala&ccedil;&atilde;o do sensor no endere&ccedil;o solicitado.</strong></span></p>

            `,
            contactId: zohoClientId,
            departmentId: "1061151000000006907"
        })
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


module.exports = {
    criarCliente,
    solicitarSensor
}