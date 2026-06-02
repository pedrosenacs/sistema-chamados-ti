let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
let idChamadoEditando = null;

const formChamado = document.getElementById("formChamado");
const listaChamados = document.getElementById("listaChamados");

const totalChamados = document.getElementById("totalChamados");
const chamadosAbertos = document.getElementById("chamadosAbertos");
const chamadosAtendimento = document.getElementById("chamadosAtendimento");
const chamadosResolvidos = document.getElementById("chamadosResolvidos");

const campoBusca = document.getElementById("campoBusca");
const filtroStatus = document.getElementById("filtroStatus");
const filtroPrioridade = document.getElementById("filtroPrioridade");
const btnLimparFiltros = document.getElementById("btnLimparFiltros");

const toast = document.getElementById("toast");
const btnTema = document.getElementById("btnTema");

const tituloFormulario = document.getElementById("tituloFormulario");
const subtituloFormulario = document.getElementById("subtituloFormulario");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
const mensagemProtocolo = document.getElementById("mensagemProtocolo");

function salvarChamados() {
    localStorage.setItem("chamados", JSON.stringify(chamados));
}

function gerarId() {
    if (chamados.length === 0) {
        return 1;
    }

    const ids = chamados.map(chamado => chamado.id);
    return Math.max(...ids) + 1;
}

function formatarData() {
    const data = new Date();

    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function mostrarToast(mensagem) {
    if (!toast) {
        return;
    }

    toast.textContent = mensagem;
    toast.classList.add("ativo");

    setTimeout(() => {
        toast.classList.remove("ativo");
    }, 2500);
}

function carregarTema() {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("modo-escuro");

        if (btnTema) {
            btnTema.textContent = "☀️ Modo claro";
        }
    } else {
        if (btnTema) {
            btnTema.textContent = "🌙 Modo escuro";
        }
    }
}

function alternarTema() {
    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        localStorage.setItem("tema", "escuro");

        if (btnTema) {
            btnTema.textContent = "☀️ Modo claro";
        }

        mostrarToast("Modo escuro ativado.");
    } else {
        localStorage.setItem("tema", "claro");

        if (btnTema) {
            btnTema.textContent = "🌙 Modo escuro";
        }

        mostrarToast("Modo claro ativado.");
    }
}

function cadastrarOuEditarChamado(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const setor = document.getElementById("setor").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    if (nome === "" || setor === "" || descricao === "") {
        mostrarToast("Preencha nome, setor e descrição.");
        return;
    }

    if (idChamadoEditando !== null) {
        chamados = chamados.map(chamado => {
            if (chamado.id === idChamadoEditando) {
                return {
                    ...chamado,
                    nome: nome,
                    setor: setor,
                    descricao: descricao,
                    prioridade: prioridade
                };
            }

            return chamado;
        });

        salvarChamados();
        localStorage.removeItem("editarChamadoId");

        cancelarEdicao();
        mostrarToast("Chamado editado com sucesso!");

        setTimeout(() => {
            window.location.href = "admin.html";
        }, 600);

        return;
    }

    const chamado = {
        id: gerarId(),
        nome: nome,
        setor: setor,
        descricao: descricao,
        prioridade: prioridade,
        status: "Aberto",
        dataAbertura: formatarData(),
        dataResolucao: null
    };

    chamados.push(chamado);
    salvarChamados();

    formChamado.reset();

    if (mensagemProtocolo) {
        mensagemProtocolo.classList.remove("escondido");
        mensagemProtocolo.textContent = `Chamado enviado com sucesso! Protocolo: #${chamado.id}`;
    }

    mostrarToast("Chamado cadastrado com sucesso!");
}

function carregarEdicaoSeExistir() {
    const idEdicao = localStorage.getItem("editarChamadoId");

    if (!idEdicao || !formChamado) {
        return;
    }

    const id = Number(idEdicao);
    const chamado = chamados.find(chamado => chamado.id === id);

    if (!chamado) {
        localStorage.removeItem("editarChamadoId");
        return;
    }

    idChamadoEditando = id;

    document.getElementById("nome").value = chamado.nome;
    document.getElementById("setor").value = chamado.setor;
    document.getElementById("descricao").value = chamado.descricao;
    document.getElementById("prioridade").value = chamado.prioridade;

    tituloFormulario.textContent = `Editando chamado #${id}`;
    subtituloFormulario.textContent = "Altere os dados necessários e salve a edição.";
    btnSubmit.textContent = "Salvar alterações";
    btnCancelarEdicao.classList.remove("escondido");

    if (mensagemProtocolo) {
        mensagemProtocolo.classList.add("escondido");
    }
}

function cancelarEdicao() {
    idChamadoEditando = null;

    if (formChamado) {
        formChamado.reset();
    }

    localStorage.removeItem("editarChamadoId");

    if (tituloFormulario) {
        tituloFormulario.textContent = "Novo chamado";
    }

    if (subtituloFormulario) {
        subtituloFormulario.textContent = "Preencha os dados para registrar uma solicitação.";
    }

    if (btnSubmit) {
        btnSubmit.textContent = "Enviar chamado";
    }

    if (btnCancelarEdicao) {
        btnCancelarEdicao.classList.add("escondido");
    }
}

function definirClasseStatus(status) {
    if (status === "Aberto") {
        return "status-aberto";
    }

    if (status === "Em atendimento") {
        return "status-atendimento";
    }

    if (status === "Resolvido") {
        return "status-resolvido";
    }

    return "";
}

function definirClassePrioridade(prioridade) {
    if (prioridade === "Baixa") {
        return "prioridade-baixa";
    }

    if (prioridade === "Média") {
        return "prioridade-media";
    }

    if (prioridade === "Alta") {
        return "prioridade-alta";
    }

    return "";
}

function obterChamadosFiltrados() {
    const textoBusca = campoBusca ? campoBusca.value.toLowerCase().trim() : "";
    const statusSelecionado = filtroStatus ? filtroStatus.value : "Todos";
    const prioridadeSelecionada = filtroPrioridade ? filtroPrioridade.value : "Todas";

    return chamados.filter(chamado => {
        const correspondeTexto =
            chamado.nome.toLowerCase().includes(textoBusca) ||
            chamado.setor.toLowerCase().includes(textoBusca) ||
            chamado.descricao.toLowerCase().includes(textoBusca) ||
            String(chamado.id).includes(textoBusca);

        const correspondeStatus =
            statusSelecionado === "Todos" || chamado.status === statusSelecionado;

        const correspondePrioridade =
            prioridadeSelecionada === "Todas" || chamado.prioridade === prioridadeSelecionada;

        return correspondeTexto && correspondeStatus && correspondePrioridade;
    });
}

function gerarBotoesPorStatus(chamado) {
    if (chamado.status === "Aberto") {
        return `
            <button class="btn-atendimento" onclick="alterarStatus(${chamado.id}, 'Em atendimento')">
                🟡 Em atendimento
            </button>

            <button class="btn-resolver" onclick="alterarStatus(${chamado.id}, 'Resolvido')">
                ✅ Resolver
            </button>
        `;
    }

    if (chamado.status === "Em atendimento") {
        return `
            <button class="btn-resolver" onclick="alterarStatus(${chamado.id}, 'Resolvido')">
                ✅ Resolver
            </button>

            <button class="btn-reabrir" onclick="alterarStatus(${chamado.id}, 'Aberto')">
                🔄 Reabrir
            </button>
        `;
    }

    if (chamado.status === "Resolvido") {
        return `
            <button class="btn-reabrir" onclick="alterarStatus(${chamado.id}, 'Aberto')">
                🔄 Reabrir
            </button>
        `;
    }

    return "";
}

function renderizarChamados() {
    if (!listaChamados) {
        return;
    }

    listaChamados.innerHTML = "";

    const chamadosFiltrados = obterChamadosFiltrados();

    if (chamadosFiltrados.length === 0) {
        listaChamados.innerHTML = `
            <div class="mensagem-vazia">
                Nenhum chamado encontrado.<br>
                Abra um chamado na Área do usuário para começar.
            </div>
        `;
        return;
    }

    chamadosFiltrados.forEach(chamado => {
        const cardChamado = document.createElement("div");
        cardChamado.classList.add("chamado");

        const textoResolucao = chamado.dataResolucao
            ? `<p class="chamado-resolucao">Resolvido em ${chamado.dataResolucao}</p>`
            : "";

        const botoesStatus = gerarBotoesPorStatus(chamado);

        cardChamado.innerHTML = `
            <div class="conteudo-chamado">
                <h3>Chamado #${chamado.id}</h3>
                <p class="chamado-data">Aberto em ${chamado.dataAbertura}</p>
                ${textoResolucao}

                <div class="badges">
                    <span class="badge ${definirClasseStatus(chamado.status)}">
                        ${chamado.status}
                    </span>

                    <span class="badge ${definirClassePrioridade(chamado.prioridade)}">
                        Prioridade ${chamado.prioridade}
                    </span>
                </div>

                <div class="chamado-info">
                    <p><strong>Solicitante:</strong> ${chamado.nome}</p>
                    <p><strong>Setor:</strong> ${chamado.setor}</p>
                    <p><strong>Descrição:</strong> ${chamado.descricao}</p>
                </div>
            </div>

            <div class="botoes-chamado">
                <button class="btn-editar" onclick="editarChamado(${chamado.id})">
                    ✏️ Editar
                </button>

                ${botoesStatus}

                <button class="btn-excluir" onclick="excluirChamado(${chamado.id})">
                    🗑️ Excluir
                </button>
            </div>
        `;

        listaChamados.appendChild(cardChamado);
    });
}

function editarChamado(id) {
    localStorage.setItem("editarChamadoId", String(id));
    window.location.href = "usuario.html";
}

function alterarStatus(id, novoStatus) {
    chamados = chamados.map(chamado => {
        if (chamado.id === id) {
            if (novoStatus === "Resolvido") {
                return {
                    ...chamado,
                    status: novoStatus,
                    dataResolucao: formatarData()
                };
            }

            return {
                ...chamado,
                status: novoStatus,
                dataResolucao: null
            };
        }

        return chamado;
    });

    salvarChamados();
    renderizarChamados();
    atualizarEstatisticas();

    mostrarToast(`Status alterado para ${novoStatus}.`);
}

function excluirChamado(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este chamado?");

    if (!confirmar) {
        return;
    }

    chamados = chamados.filter(chamado => chamado.id !== id);

    salvarChamados();
    renderizarChamados();
    atualizarEstatisticas();

    mostrarToast("Chamado excluído com sucesso.");
}

function atualizarEstatisticas() {
    if (!totalChamados) {
        return;
    }

    const total = chamados.length;
    const abertos = chamados.filter(chamado => chamado.status === "Aberto").length;
    const emAtendimento = chamados.filter(chamado => chamado.status === "Em atendimento").length;
    const resolvidos = chamados.filter(chamado => chamado.status === "Resolvido").length;

    totalChamados.textContent = total;
    chamadosAbertos.textContent = abertos;
    chamadosAtendimento.textContent = emAtendimento;
    chamadosResolvidos.textContent = resolvidos;
}

function limparFiltros() {
    if (campoBusca) {
        campoBusca.value = "";
    }

    if (filtroStatus) {
        filtroStatus.value = "Todos";
    }

    if (filtroPrioridade) {
        filtroPrioridade.value = "Todas";
    }

    renderizarChamados();
}

if (formChamado) {
    formChamado.addEventListener("submit", cadastrarOuEditarChamado);
}

if (btnCancelarEdicao) {
    btnCancelarEdicao.addEventListener("click", cancelarEdicao);
}

if (campoBusca) {
    campoBusca.addEventListener("input", renderizarChamados);
}

if (filtroStatus) {
    filtroStatus.addEventListener("change", renderizarChamados);
}

if (filtroPrioridade) {
    filtroPrioridade.addEventListener("change", renderizarChamados);
}

if (btnLimparFiltros) {
    btnLimparFiltros.addEventListener("click", limparFiltros);
}

if (btnTema) {
    btnTema.addEventListener("click", alternarTema);
}

carregarTema();
carregarEdicaoSeExistir();
renderizarChamados();
atualizarEstatisticas();