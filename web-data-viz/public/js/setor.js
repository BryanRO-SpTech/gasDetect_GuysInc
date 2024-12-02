const urlParams = new URLSearchParams(window.location.search);
const idFabrica = urlParams.get('fabrica');

console.log(idFabrica)
function carregarSetores() {
    
    fetch(`/setor/listar/${idFabrica}`)
        .then(
            function (resposta) {
                if (!resposta.ok) {
                    console.error("Erro ao listar setores:", resposta);
                    return;
                }

                return resposta.json();
            }
        )

        .then(
            function (setor) {
                var setorHTML = "";

                for (var i = 0; i < setor.length; i++) {
                    setorHTML += `
                        <tr class="${i % 2 == 0 ? "contraste" : ""}">
                            <td>${setor[i].setor}</td>
                            <td>${setor[i].tamanho}</td>
                            <td>${setor[i].descricao}</td>
                            <td>${setor[i].fabrica}</td>
                            <td>${setor[i].limite}</td>
                            <td><a href="/setor.html?setor=${setor[i].idSetor}">Ver mais</a></td>
                        </tr>
                    `;
                }

                document.getElementById("tabela_de_setor").innerHTML = setorHTML;
            }
        );
}

carregarSetores();



function abrirModal() {
    document.getElementById("modal-cadastro").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal-cadastro").style.display = "none";
}



function cadastrarSetor() {
    const setor = document.getElementById("ipt_setor").value;
    const tamanho = document.getElementById("ipt_tamanho").value;
    const descricao = document.getElementById("ipt_descricao").value;
    // const fabrica = document.getElementById("ipt_fabrica").value;
    const limite = document.getElementById("ipt_limite").value;

   

    if (!setor || !tamanho || !descricao || !limite) {
        document.getElementById("span_mensagem").innerHTML = "Todos os campos são obrigatórios.";
        return;
    }


    fetch("/setor/criar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            setor,
            tamanho,
            descricao,
            limite,
            idFabrica: idFabrica,
        }),
    }).then(function (resposta) {
        if (!resposta.ok) {
            console.error("Erro ao cadastrar setor:", resposta);
            return;
        }

        carregarSetores();
    });
}