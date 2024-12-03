function configNavBar() {
    const elementoPai = document.currentScript.parentElement;
    const paginaAtual = document.currentScript.getAttribute('paginaAtual');

    elementoPai.insertAdjacentHTML('beforeend', `
        <link rel="stylesheet" href="/components/configNavBar/configNavBar.css">
        <header>
            <div class="side">
                <div class="logo">
                    <a href="/index.html">
                        <img src="/assets/img/GUYS-logo.png" alt="Logo Guys inc.">
                    </a>
                </div>
                <h1>GUYS inc.</h1>
            </div>
            <div class="sideBar">
                <div class="nome">
                    <h3><span id="b_usuario">${sessionStorage.NOME}</span></h3>
                </div>
                <nav class="menu">
                    <ul>
                        ${sessionStorage.NIVEL_PERMISSAO <= 2 ? `
                            <a href="/config.html" class="${paginaAtual == "perfil" ? "paginaAtual" : ""}">
                            <li> <img src="/assets/icons/configurando-usuario.png" alt=""> Configurar meu perfil</li>
                        </a>` : ""}

                        ${sessionStorage.NIVEL_PERMISSAO == 1 ? `
                            <a href="/confignovofuncionario.html" class="${paginaAtual == "colaboradores" ? "paginaAtual" : ""}">
                            <li> <img src="/assets/icons/id-de-toque.png" alt=""> Cadastrar Colaboradores</li>
                        </a>` : ""}

                        ${sessionStorage.NIVEL_PERMISSAO == 1 ? `
                        <a href="/permissoes.html" class="${paginaAtual == "permissoes" ? "paginaAtual" : ""}">
                            <li> <img src="/assets/icons/id-de-toque.png" alt=""> Gerenciar Permissões</li>
                        </a>` : ""}

                        ${sessionStorage.NIVEL_PERMISSAO <= 2 ? `
                            <a href="/fabrica.html" class="${paginaAtual == "fabrica" ? "paginaAtual" : ""}">
                            <li> <img src="/assets/icons/gerenciamento.png" alt=""> Gerenciar Fábrica</li>
                        </a>` : ""}

                        ${sessionStorage.NIVEL_PERMISSAO <= 2 ? `
                        <a href="/sensorSolicitacao.html" class="${paginaAtual == "sensor" ? "paginaAtual" : ""}">
                            <li><img src="/assets/icons/companhia.png" alt=""> Solicite um Sensor</li>
                        </a>` : ""}
                    </ul>
                </nav>

                <div class="botoes">
                    <input type="checkbox" onclick="trocaTema()" class="checkbox" id="chk">

                    <label class="label" for="chk">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                        </svg>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                            <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                        </svg>
                        <div class="ball"></div>
                    </label>
                    <a href="/dashboard.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-graph-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    `);
}


configNavBar();