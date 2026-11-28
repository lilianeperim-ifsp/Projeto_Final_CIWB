// js/paginas/episodios.js: página de episódios em formato de blog. Mínimo: Liliane (PR L1). Dona da página: Liliane.
// o episódio mais assistido em destaque e a grade com a cena, a busca pelo título e o filtro por temporada;
// no modal, a cena e a ficha do episódio, com anterior e próximo

// os 171 episódios, guardados para a busca filtrar sem nova requisição (RN02)
let episodios = [];

// URL da temporada → nome ('https://tvd-api.vercel.app/api/seasons/1' → 'Temporada 1')
const temporadasPorUrl = {};

// as 8 temporadas na ordem da API, para as pílulas do filtro
let temporadas = [];

// a lista que está na tela (filtrada pela temporada e pela busca), para o anterior e o próximo do modal
let listaMostrada = [];


window.onload = async function(){

    montarLayout('episodios', '../');

    mostrarCarregando('Carregando temporadas…');

    // as 8 temporadas vêm numa página só; depois saem do cache (RN02)
    const jsonTemporadas = await buscarTodos('seasons');

    if (jsonTemporadas === null){
        mostrarErro('Não foi possível carregar os episódios. Confira a sua conexão e tente novamente.');
        return;
    }

    temporadas = jsonTemporadas;

    for (let temporada of temporadas){
        temporadasPorUrl[temporada.url] = temporada.name;
    }

    mostrarCarregando('Carregando episódios…');

    // são 18 páginas da API; o texto mostra o progresso (RF03)
    const jsonEpisodios = await buscarTodos('episodes', function(pagina, totalPaginas){
        mostrarCarregando(`Carregando episódios… página ${pagina} de ${totalPaginas}`);
    });

    // null quando a API não respondeu e a lista não estava no cache
    if (jsonEpisodios === null){
        mostrarErro('Não foi possível carregar os episódios. Confira a sua conexão e tente novamente.');
    }
    else{

        episodios = jsonEpisodios;

        esconderCarregando();

        mostrarDestaqueEpisodio(episodioMaisAssistido(episodios));
        montarFiltroTemporadas();

        // começa com todas as temporadas; o filtro também liga a busca (RF06)
        filtrarPorTemporada(null);
    }
};


// desenha os cards; a busca chama esta mesma função com a lista filtrada
function mostrarEpisodios(lista){

    listaMostrada = lista;

    mostrarLista(lista, montarCardEpisodio, abrirDetalhesEpisodio);
}


// 'https://tvd-api.vercel.app/api/seasons/1' → 'Temporada 1'
function nomeTemporadaEpisodio(urlTemporada){

    const nome = temporadasPorUrl[urlTemporada];

    if (nome === undefined){
        return 'Temporada não informada';
    }

    return nome;
}


// 4.91 → '4,91 milhões'; o replace troca o ponto decimal pela vírgula
function textoAudienciaEpisodio(milhoes){

    return `${String(milhoes).replace('.', ',')} milhões`;
}


// o episódio com a maior audiência (usViewers); episódios sem audiência ficam de fora
function episodioMaisAssistido(lista){

    let maior = null;

    for (let episodio of lista){

        if (episodio.usViewers !== null && (maior === null || episodio.usViewers > maior.usViewers)){
            maior = episodio;
        }
    }

    return maior;
}


// destaque: a cena à esquerda e, à direita, a temporada, o título, a data, a audiência, a direção,
// o resumo e o botão que abre o modal; o artigo inteiro é clicável, como os destaques de Personagens
function mostrarDestaqueEpisodio(episodio){

    const destaque = document.querySelector('#destaque');

    destaque.innerHTML = '';

    if (episodio === null){
        return;
    }

    const artigo = document.createElement('article');
    artigo.className = 'destaque destaque-episodio';

    const cena = criarFotoDetalhe(episodio.image, `Cena do episódio ${episodio.title}`, episodio.title);

    const texto = document.createElement('div');
    texto.className = 'destaque-texto';

    const meta = document.createElement('p');
    meta.className = 'meta mb-0';
    meta.textContent = `O mais assistido · ${nomeTemporadaEpisodio(episodio.season)} · Episódio ${episodio.number}`;

    const titulo = document.createElement('h3');
    titulo.className = 'h4 mb-0';
    titulo.textContent = episodio.title;

    const dados = document.createElement('p');
    dados.className = 'text-body-secondary mb-1';
    dados.textContent = `${formatarData(episodio.airDate)} · ${textoAudienciaEpisodio(episodio.usViewers)} de espectadores · Direção de ${episodio.directedBy}`;

    const resumo = document.createElement('p');
    resumo.className = 'mb-2';
    resumo.textContent = episodio.summary;

    // botão com cara de link, para o teclado; o clique sobe para o artigo, que abre o modal (RF05)
    const botLer = document.createElement('button');
    botLer.type = 'button';
    botLer.className = 'mais';
    botLer.textContent = 'Ler o episódio →';
    botLer.setAttribute('aria-label', `Ler o episódio ${episodio.title}`);

    artigo.onclick = function(){
        abrirDetalhesEpisodio(episodio);
    };

    texto.appendChild(meta);
    texto.appendChild(titulo);
    texto.appendChild(dados);
    texto.appendChild(resumo);
    texto.appendChild(botLer);

    artigo.appendChild(cena);
    artigo.appendChild(texto);

    destaque.appendChild(artigo);
}


// pílulas Todas, T1 a T8; cada uma é um botão com aria-pressed, para o leitor de tela dizer qual está ativa
function montarFiltroTemporadas(){

    const filtro = document.querySelector('#filtro-temporadas');

    filtro.innerHTML = '';

    filtro.appendChild(criarPilulaTemporada('Todas', 'Todas as temporadas', null));

    for (let i = 0; i < temporadas.length; i++){
        filtro.appendChild(criarPilulaTemporada(`T${i + 1}`, temporadas[i].name, temporadas[i].url));
    }
}


function criarPilulaTemporada(texto, rotulo, urlTemporada){

    const pilula = document.createElement('button');
    pilula.type = 'button';
    pilula.className = 'filtro-pilula';
    pilula.textContent = texto;
    pilula.setAttribute('aria-label', rotulo);
    pilula.setAttribute('aria-pressed', 'false');

    // guarda a URL da temporada no botão ('' para Todas), para marcar a pílula ativa depois
    pilula.dataset.temporada = '';

    if (urlTemporada !== null){
        pilula.dataset.temporada = urlTemporada;
    }

    pilula.onclick = function(){
        filtrarPorTemporada(urlTemporada);
    };

    return pilula;
}


// mostra só os episódios da temporada (null = todas) e liga a busca a essa lista;
// assim a busca pelo título e o "Nenhum resultado" funcionam dentro da temporada escolhida (RF06 e RF07)
function filtrarPorTemporada(urlTemporada){

    let lista = episodios;

    if (urlTemporada !== null){

        lista = [];

        for (let episodio of episodios){

            if (episodio.season === urlTemporada){
                lista.push(episodio);
            }
        }
    }

    // marca a pílula ativa
    for (let pilula of document.querySelectorAll('.filtro-pilula')){

        let ativa = pilula.dataset.temporada === '';

        if (urlTemporada !== null){
            ativa = pilula.dataset.temporada === urlTemporada;
        }

        pilula.classList.toggle('ativa', ativa);
        pilula.setAttribute('aria-pressed', String(ativa));
    }

    mostrarEpisodios(lista);

    // episódios filtram pelo título, e não pelo nome; com um termo já digitado, o configurarBusca
    // refaz a busca na lista nova e atualiza a mensagem
    configurarBusca(lista, 'title', mostrarEpisodios);
}


// card com a cena, o título, 'Temporada 1 · Episódio 1', a data de exibição e duas linhas do resumo (RF04);
// sem cena (image null), o criarCard mostra as iniciais do título (D5)
function montarCardEpisodio(episodio){

    // o trecho é cortado em duas linhas pelo CSS; o resumo inteiro fica no modal
    const trecho = document.createElement('span');
    trecho.className = 'trecho';
    trecho.textContent = episodio.summary;

    const linhas = [
        `${nomeTemporadaEpisodio(episodio.season)} · Episódio ${episodio.number}`,
        formatarData(episodio.airDate),
        trecho
    ];

    return criarCard(episodio.title, linhas, episodio.image, `Cena do episódio ${episodio.title}`);
}


// ficha do modal, no mesmo desenho do de Personagens: a cena à esquerda; à direita a temporada, o episódio
// e a data, o resumo em destaque e a linha com direção, roteiro, audiência, duração e código;
// embaixo, o anterior e o próximo da lista (RF05)
function montarDetalhesEpisodio(episodio){

    const cena = criarFotoDetalhe(episodio.image, `Cena do episódio ${episodio.title}`, episodio.title);

    // a cena é em paisagem; o .cena tira o recorte 4:5 das fotos de personagem
    cena.classList.add('cena');

    const info = document.createElement('div');
    info.className = 'perfil-info';

    const meta = document.createElement('p');
    meta.className = 'meta mb-0';
    meta.textContent = `${nomeTemporadaEpisodio(episodio.season)} · Episódio ${episodio.number} · ${formatarData(episodio.airDate)}`;
    info.appendChild(meta);

    const resumo = document.createElement('p');
    resumo.className = 'perfil-descricao';
    resumo.textContent = episodio.summary;
    info.appendChild(resumo);

    info.appendChild(criarLinhaDados([
        ['Direção', episodio.directedBy],
        ['Roteiro', episodio.writtenBy],
        ['Audiência nos EUA', textoAudienciaEpisodio(episodio.usViewers)],
        ['Duração', `${episodio.runtime} min`],
        ['Código de produção', episodio.productionCode]
    ]));

    // a lista da tela; o destaque pode abrir um episódio que a temporada ou a busca escondeu, e aí segue a lista inteira
    let lista = listaMostrada;

    if (!lista.includes(episodio)){
        lista = episodios;
    }

    const conteudo = document.createElement('div');
    conteudo.appendChild(criarDetalhesComFoto(cena, info));
    conteudo.appendChild(criarNavegacaoModal(lista, episodio, 'Outros episódios', (e) => e.title, abrirDetalhesEpisodio));

    return conteudo;
}


// todos os dados já estão no episódio e no mapa de temporadas, então o modal abre sem spinner (RF05)
function abrirDetalhesEpisodio(episodio){

    abrirModal(episodio.title, montarDetalhesEpisodio(episodio));
}
