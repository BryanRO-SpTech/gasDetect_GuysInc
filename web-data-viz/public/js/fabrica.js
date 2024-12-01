function carregarFabricas() {
    fetch(`/fabrica/listar/${sessionStorage.ID_EMPRESA}`)
        .then(
            function (resposta) {
                if (!resposta.ok) {
                    console.error("Erro ao listar fábricas:", resposta);
                    return;
                }

                return resposta.json();
            }
        )

        .then(
            function (fabricas) {
                var fabricaHTML = "";

                for (var i = 0; i < fabricas.length; i++) {
                    fabricaHTML += `
                        <tr style="${i % 2 == 0 ? "background-color: #e6e5e5" : ""}">
                            <td>${fabricas[i].cep}</td>
                            <td>${fabricas[i].logradouro}</td>
                            <td>${fabricas[i].numero}</td>
                            <td>${fabricas[i].bairro}</td>
                            <td>${fabricas[i].cidade}</td>
                            <td>${fabricas[i].UF}</td>
                            <td><a href="/setor.html?fabrica=${fabricas[i].idFabrica}">Ver mais</a></td>
                        </tr>
                    `;
                }

                document.getElementById("tabela_de_fabricas").innerHTML = fabricaHTML;
            }
        );
}

carregarFabricas();



function abrirModal() {
    document.getElementById("modal-cadastro").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal-cadastro").style.display = "none";
}



async function preencherFormularioComCep() {
    document.getElementById("ipt_logradouro").value = "";
    document.getElementById("ipt_bairro").value = "";
    document.getElementById("ipt_cidade").value = "";
    document.getElementById("ipt_uf").value = "";


    const cep = document.getElementById("ipt_cep");

    cep.value = cep.value.replace(/\D/g, "");
    cep.value = cep.value.replace(/^(\d{5})(\d)/, "$1-$2");

    if (cep.value.length != 9) {
        return;
    }

    const resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

    if (!resposta.ok) {
        console.error("Erro ao buscar CEP:", resposta);
        return;
    }

    const endereco = await resposta.json();

    document.getElementById("ipt_logradouro").value = endereco.logradouro;
    document.getElementById("ipt_bairro").value = endereco.bairro;
    document.getElementById("ipt_cidade").value = endereco.localidade;
    document.getElementById("ipt_uf").value = endereco.uf;
}




function cadastrarFabrica() {
    const cep = document.getElementById("ipt_cep").value;
    const logradouro = document.getElementById("ipt_logradouro").value;
    const numero = document.getElementById("ipt_numero").value;
    const bairro = document.getElementById("ipt_bairro").value;
    const cidade = document.getElementById("ipt_cidade").value;
    const uf = document.getElementById("ipt_uf").value;

    if (!cep || !logradouro || !numero || !bairro || !cidade || !uf) {
        document.getElementById("span_mensagem").innerHTML = "Todos os campos são obrigatórios.";
        return;
    }


    fetch("/fabrica/criar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            uf,
            idEmpresa: sessionStorage.ID_EMPRESA,
        }),
    }).then(function (resposta) {
        if (!resposta.ok) {
            console.error("Erro ao cadastrar fábrica:", resposta);
            return;
        }

        carregarFabricas();
    });
}