// js/layout.js: menu e rodapé montados em todas as páginas (RF01 e RF02). Dona: Liliane (PR L1).
// Usa o atualizarBotaoTema() e o trocarTema() do tema.js e, só no clique do rodapé, o limparCache() do cache.js.

const NOME_SITE = 'Diários de Mystic Falls';

// páginas do menu, na ordem em que aparecem; o arquivo é relativo à raiz do site
const PAGINAS = [
    { id: 'inicio', titulo: 'Início', arquivo: 'index.html' },
    { id: 'personagens', titulo: 'Personagens', arquivo: 'pages/personagens.html' },
    { id: 'episodios', titulo: 'Episódios', arquivo: 'pages/episodios.html' },
    { id: 'temporadas', titulo: 'Temporadas', arquivo: 'pages/temporadas.html' },
    { id: 'especies', titulo: 'Espécies', arquivo: 'pages/especies.html' },
    { id: 'familias', titulo: 'Famílias', arquivo: 'pages/familias.html' }
];

// monta o menu e o rodapé; raiz é '' no index.html e '../' nas páginas de pages/
function montarLayout(paginaAtual, raiz){

    montarMenu(paginaAtual, raiz);
    montarRodape();
}

// preenche o <nav id="menu"> com a navbar responsiva do Bootstrap
function montarMenu(paginaAtual, raiz){

    const menu = document.querySelector('#menu');

    menu.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container';

    // marca: logo e nome do site, com link para a página inicial
    const marca = document.createElement('a');
    marca.className = 'navbar-brand d-flex align-items-center gap-2';
    marca.href = raiz + 'index.html';

    // alt vazio de propósito: o nome do site já está escrito ao lado, e o leitor de tela não repete
    const logo = document.createElement('img');
    logo.src = raiz + 'img/logo.png';
    logo.alt = '';
    logo.width = 40;
    logo.height = 40;
    marca.appendChild(logo);

    const nome = document.createElement('span');
    nome.textContent = NOME_SITE;
    marca.appendChild(nome);

    container.appendChild(marca);

    // botão sanduíche, que aparece em telas menores que 992 px (navbar-expand-lg)
    const botMenu = document.createElement('button');
    botMenu.className = 'navbar-toggler';
    botMenu.type = 'button';
    botMenu.setAttribute('data-bs-toggle', 'collapse');
    botMenu.setAttribute('data-bs-target', '#menu-links');
    botMenu.setAttribute('aria-controls', 'menu-links');
    botMenu.setAttribute('aria-expanded', 'false');
    botMenu.setAttribute('aria-label', 'Abrir ou fechar o menu');

    const icone = document.createElement('span');
    icone.className = 'navbar-toggler-icon';
    botMenu.appendChild(icone);

    container.appendChild(botMenu);

    // área que recolhe no celular: links das páginas e botão de tema
    const areaLinks = document.createElement('div');
    areaLinks.className = 'collapse navbar-collapse';
    areaLinks.id = 'menu-links';

    const lista = document.createElement('ul');
    lista.className = 'navbar-nav ms-auto mb-2 mb-lg-0';

    for (let pagina of PAGINAS){

        const item = document.createElement('li');
        item.className = 'nav-item';

        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = raiz + pagina.arquivo;
        link.textContent = pagina.titulo;

        // a página aberta fica destacada e é anunciada pelo leitor de tela
        if (pagina.id === paginaAtual){
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }

        item.appendChild(link);
        lista.appendChild(item);
    }

    areaLinks.appendChild(lista);

    // botão de tema: um interruptor com a bolinha que desliza (sol no modo claro, lua no escuro);
    // já nasce com o rótulo do tema que o tema.js aplicou no <head>
    const botTema = document.createElement('button');
    botTema.className = 'ms-1 ms-lg-3 mb-2 mb-lg-0';
    botTema.type = 'button';
    botTema.id = 'botao-tema';

    const bolinha = document.createElement('span');
    bolinha.className = 'bolinha';

    // alt vazio: quem diz o que o botão faz é o aria-label
    const iconeSol = document.createElement('img');
    iconeSol.className = 'icone-sol';
    iconeSol.src = raiz + 'img/sol.svg';
    iconeSol.alt = '';
    bolinha.appendChild(iconeSol);

    const iconeLua = document.createElement('img');
    iconeLua.className = 'icone-lua';
    iconeLua.src = raiz + 'img/lua.svg';
    iconeLua.alt = '';
    bolinha.appendChild(iconeLua);

    botTema.appendChild(bolinha);

    atualizarBotaoTema(botTema);
    botTema.onclick = trocarTema;

    areaLinks.appendChild(botTema);

    container.appendChild(areaLinks);

    menu.appendChild(container);
}

// preenche o <footer id="rodape"> com a dupla, a disciplina, a fonte dos dados e o botão de limpar o cache
function montarRodape(){

    const rodape = document.querySelector('#rodape');

    rodape.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container py-4 text-center';

    const pDupla = document.createElement('p');
    pDupla.className = 'mb-1';
    pDupla.textContent = `${NOME_SITE} · Alexandre Santos e Liliane Perim`;
    container.appendChild(pDupla);

    const pDisciplina = document.createElement('p');
    pDisciplina.className = 'mb-1';
    pDisciplina.textContent = 'Projeto Prático de CIWB · IFSP Araraquara · 2026';
    container.appendChild(pDisciplina);

    const pFonte = document.createElement('p');
    pFonte.className = 'mb-3';
    pFonte.textContent = 'Dados da ';

    const linkApi = document.createElement('a');
    linkApi.href = 'https://tvd-api.vercel.app';
    linkApi.textContent = 'tvd-api';
    pFonte.appendChild(linkApi);

    container.appendChild(pFonte);

    // apaga só os dados da API guardados no localStorage (o tema continua) e recarrega a página
    const botLimpar = document.createElement('button');
    botLimpar.className = 'btn btn-outline-primary btn-sm';
    botLimpar.type = 'button';
    botLimpar.textContent = 'Limpar dados salvos';

    botLimpar.onclick = function(){

        limparCache();
        location.reload();
    };

    container.appendChild(botLimpar);

    rodape.appendChild(container);
}
