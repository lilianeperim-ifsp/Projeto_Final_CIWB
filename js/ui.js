// js/ui.js: lista, card, modal, carregando, erro e formatação, usados por todas as páginas (RF04 e RF05). Dono: Alexandre (PR A2).
// dentro do <button> dos cards só entram <span>, porque o HTML não permite <div> nem títulos dentro de botão


// ---------- carregando e erro (no #estado) ----------

// spinner do Bootstrap com o texto ao lado; role="status" faz o leitor de tela anunciar
function criarSpinner(texto){

    const caixa = document.createElement('div');
    caixa.className = 'd-flex align-items-center gap-2 my-3 carregando';
    caixa.setAttribute('role', 'status');

    const spinner = document.createElement('span');
    spinner.className = 'spinner-border spinner-border-sm';
    spinner.setAttribute('aria-hidden', 'true');

    const p = document.createElement('span');
    p.textContent = texto;

    caixa.appendChild(spinner);
    caixa.appendChild(p);

    return caixa;
}


function mostrarCarregando(texto){

    const estado = document.querySelector('#estado');

    estado.innerHTML = '';
    estado.appendChild(criarSpinner(texto));
}


function esconderCarregando(){

    const estado = document.querySelector('#estado');

    estado.innerHTML = '';
}


// aviso de erro com o botão que recarrega a página (RF03, quando a API falha)
function mostrarErro(mensagem){

    const estado = document.querySelector('#estado');

    estado.innerHTML = '';

    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger d-flex flex-wrap align-items-center gap-3';
    alerta.setAttribute('role', 'alert');

    const p = document.createElement('p');
    p.className = 'mb-0';
    p.textContent = mensagem;

    const botTentar = document.createElement('button');
    botTentar.type = 'button';
    botTentar.className = 'btn btn-outline-danger btn-sm';
    botTentar.textContent = 'Tentar novamente';

    botTentar.onclick = function(){
        location.reload();
    };

    alerta.appendChild(p);
    alerta.appendChild(botTentar);

    estado.appendChild(alerta);
}


// ---------- lista e card (RF04) ----------

// desenha um card por item no #lista; montarCard cria o card e aoClicar abre os detalhes
function mostrarLista(itens, montarCard, aoClicar){

    const lista = document.querySelector('#lista');

    lista.innerHTML = '';

    for (let item of itens){

        const li = document.createElement('li');
        li.className = 'col';

        const card = montarCard(item);

        card.onclick = function(){
            aoClicar(item);
        };

        li.appendChild(card);
        lista.appendChild(li);
    }
}


// iniciais do nome no lugar da foto: 'Elijah Mikaelson' → 'EM', 'Silas' → 'S' (D5)
function criarIniciais(nome){

    const palavras = [];

    for (let palavra of nome.split(' ')){

        if (palavra !== ''){
            palavras.push(palavra);
        }
    }

    let iniciais = palavras[0].charAt(0);

    if (palavras.length > 1){
        iniciais = iniciais + palavras[palavras.length - 1].charAt(0);
    }

    const caixa = document.createElement('span');
    caixa.className = 'iniciais';
    caixa.setAttribute('role', 'img');
    caixa.setAttribute('aria-label', `Sem foto de ${nome}`);
    caixa.textContent = iniciais.toUpperCase();

    return caixa;
}


// card clicável: titulo, linhas (textos ou elementos) e a mídia opcional
// imagem com URL → foto; imagem null → iniciais; imagem não passada → card sem mídia
function criarCard(titulo, linhas, imagem, alt, ehPoster){

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'card-recurso';

    const card = document.createElement('span');
    card.className = 'card';

    if (imagem){

        const img = document.createElement('img');
        img.className = 'card-img-top foto-recurso';
        img.src = imagem;
        img.alt = alt;
        img.loading = 'lazy';

        if (ehPoster){
            img.classList.add('poster');
        }

        card.appendChild(img);
    }
    else if (imagem === null){
        card.appendChild(criarIniciais(titulo));
    }

    const corpo = document.createElement('span');
    corpo.className = 'card-body d-block';

    const spanTitulo = document.createElement('span');
    spanTitulo.className = 'card-title h5 d-block';
    spanTitulo.textContent = titulo;
    corpo.appendChild(spanTitulo);

    for (let linha of linhas){

        const spanLinha = document.createElement('span');
        spanLinha.className = 'card-text d-block text-body-secondary';

        // a linha pode ser texto ou um elemento pronto (como o selo de fundadora)
        if (typeof linha === 'string'){
            spanLinha.textContent = linha;
        }
        else{
            spanLinha.appendChild(linha);
        }

        corpo.appendChild(spanLinha);
    }

    card.appendChild(corpo);
    botao.appendChild(card);

    return botao;
}


// ---------- modal de detalhes (RF05) ----------

// conta as aberturas, para um preenchimento atrasado não cair no modal de outro item
let aberturaModal = 0;
let modalAberto = false;

// o card que abriu o modal, para devolver o foco a ele quando o modal fechar
let focoAntesDoModal = null;


// cria o modal uma vez só, no fim do <body>
function criarModal(){

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'modal-detalhes';
    modal.tabIndex = -1;
    modal.setAttribute('aria-labelledby', 'modal-titulo');
    modal.setAttribute('aria-hidden', 'true');

    const dialogo = document.createElement('div');
    dialogo.className = 'modal-dialog modal-lg modal-dialog-scrollable';

    const conteudo = document.createElement('div');
    conteudo.className = 'modal-content';

    const cabecalho = document.createElement('div');
    cabecalho.className = 'modal-header';

    const titulo = document.createElement('h2');
    titulo.className = 'modal-title h4';
    titulo.id = 'modal-titulo';

    const botFechar = document.createElement('button');
    botFechar.type = 'button';
    botFechar.className = 'btn-close';
    botFechar.setAttribute('data-bs-dismiss', 'modal');
    botFechar.setAttribute('aria-label', 'Fechar');

    cabecalho.appendChild(titulo);
    cabecalho.appendChild(botFechar);

    const corpo = document.createElement('div');
    corpo.className = 'modal-body';
    corpo.id = 'modal-corpo';

    conteudo.appendChild(cabecalho);
    conteudo.appendChild(corpo);
    dialogo.appendChild(conteudo);
    modal.appendChild(dialogo);

    // o Bootstrap avisa quando o modal termina de fechar (Esc, X ou clique fora)
    modal.addEventListener('hidden.bs.modal', function(){

        modalAberto = false;

        // o Bootstrap só devolve o foco quando o modal abre por data-bs-toggle;
        // aqui ele abre pelo JavaScript, então quem devolve é o ui.js (o teclado continua no card)
        if (focoAntesDoModal !== null){
            focoAntesDoModal.focus();
            focoAntesDoModal = null;
        }
    });

    document.body.appendChild(modal);

    return modal;
}


// abre o modal com o título e o conteúdo; com o modal já aberto, só troca o conteúdo
// devolve o número da abertura, usado no preencherModal
function abrirModal(titulo, conteudo){

    let modal = document.querySelector('#modal-detalhes');

    if (modal === null){
        modal = criarModal();
    }

    document.querySelector('#modal-titulo').textContent = titulo;

    const corpo = document.querySelector('#modal-corpo');
    corpo.innerHTML = '';
    corpo.appendChild(conteudo);

    // guarda o card só na primeira abertura; com o modal já aberto, o foco está dentro dele
    if (!modalAberto){
        focoAntesDoModal = document.activeElement;
    }

    aberturaModal++;
    modalAberto = true;

    bootstrap.Modal.getOrCreateInstance(modal).show();

    return aberturaModal;
}


// troca o conteúdo depois que os nomes relacionados chegam
// se a pessoa fechou o modal ou abriu outro item enquanto carregava, não faz nada
function preencherModal(abertura, conteudo){

    if (!modalAberto || abertura !== aberturaModal){
        return;
    }

    const corpo = document.querySelector('#modal-corpo');
    corpo.innerHTML = '';
    corpo.appendChild(conteudo);
}


// aviso de erro dentro do modal, quando os nomes relacionados não chegam
function criarAvisoErro(mensagem){

    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger mb-0';
    alerta.setAttribute('role', 'alert');
    alerta.textContent = mensagem;

    return alerta;
}


// foto do modal, ou as iniciais quando o item não tem foto
function criarFotoDetalhe(imagem, alt, nome){

    if (imagem === null){
        return criarIniciais(nome);
    }

    const img = document.createElement('img');
    img.className = 'foto-detalhe';
    img.src = imagem;
    img.alt = alt;

    return img;
}


// foto à esquerda e detalhes à direita; abaixo de 768px a foto fica em cima
function criarDetalhesComFoto(foto, detalhes){

    const linha = document.createElement('div');
    linha.className = 'row g-4';

    const colFoto = document.createElement('div');
    colFoto.className = 'col-md-auto';
    colFoto.appendChild(foto);

    const colDetalhes = document.createElement('div');
    colDetalhes.className = 'col-md';
    colDetalhes.appendChild(detalhes);

    linha.appendChild(colFoto);
    linha.appendChild(colDetalhes);

    return linha;
}


// pares [rótulo, valor] em duas colunas; o valor pode ser texto ou elemento
function criarListaDetalhes(pares){

    const dl = document.createElement('dl');
    dl.className = 'row mb-0';

    for (let [rotulo, valor] of pares){

        const dt = document.createElement('dt');
        dt.className = 'col-sm-4';
        dt.textContent = rotulo;

        const dd = document.createElement('dd');
        dd.className = 'col-sm-8';

        if (typeof valor === 'string'){
            dd.textContent = valor;
        }
        else{
            dd.appendChild(valor);
        }

        dl.appendChild(dt);
        dl.appendChild(dd);
    }

    return dl;
}


// lista de nomes: <ol> quando a ordem importa (episódios da temporada), <ul> no resto
function criarListaDeNomes(nomes, numerada){

    let lista;

    if (numerada){
        lista = document.createElement('ol');
    }
    else{
        lista = document.createElement('ul');
    }

    lista.className = 'mb-0';

    for (let nome of nomes){

        const li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
    }

    return lista;
}


// ---------- formatação ----------

// '2009-09-10' → '10/09/2009' só com split, sem new Date('2009-09-10'),
// que lê o texto como UTC e, no fuso do Brasil, mostraria 09/09
function formatarData(dataIso){

    if (!dataIso){
        return 'Não informado';
    }

    const [ano, mes, dia] = dataIso.split('-');

    return `${dia}/${mes}/${ano}`;
}
