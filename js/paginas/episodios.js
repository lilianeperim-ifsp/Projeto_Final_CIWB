// js/paginas/episodios.js: página de episódios. Mínimo: Liliane (PR L1). Dona da página: Liliane.
// cards sem imagem (D6) com a temporada vinda do mapa URL → nome; no modal, a cena do episódio e a ficha completa

// os 171 episódios, guardados para a busca filtrar sem nova requisição (RN02)
let episodios = [];

// URL da temporada → nome ('https://tvd-api.vercel.app/api/seasons/1' → 'Temporada 1')
const temporadasPorUrl = {};


window.onload = async function(){

    montarLayout('episodios', '../');

    mostrarCarregando('Carregando temporadas…');

    // as 8 temporadas vêm numa página só; depois saem do cache (RN02)
    const jsonTemporadas = await buscarTodos('seasons');

    if (jsonTemporadas === null){
        mostrarErro('Não foi possível carregar os episódios. Confira a sua conexão e tente novamente.');
        return;
    }

    for (let temporada of jsonTemporadas){
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
        mostrarEpisodios(episodios);

        // episódios filtram pelo título, e não pelo nome
        configurarBusca(episodios, 'title', mostrarEpisodios);
    }
};


// desenha os cards; a busca chama esta mesma função com a lista filtrada
function mostrarEpisodios(lista){

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


// card sem imagem (D6): título, 'Temporada 1 · Episódio 1' e a data de exibição
function montarCardEpisodio(episodio){

    const linhas = [
        `${nomeTemporadaEpisodio(episodio.season)} · Episódio ${episodio.number}`,
        formatarData(episodio.airDate)
    ];

    return criarCard(episodio.title, linhas);
}


// todos os dados já estão no episódio e no mapa de temporadas, então o modal abre sem spinner (RF05)
function abrirDetalhesEpisodio(episodio){

    const cena = criarFotoDetalhe(episodio.image, `Cena do episódio ${episodio.title}`, episodio.title);

    // a cena é em paisagem; o .cena tira o recorte 4:5 das fotos de personagem
    cena.classList.add('cena');

    const detalhes = criarListaDetalhes([
        ['Temporada', nomeTemporadaEpisodio(episodio.season)],
        ['Episódio', episodio.number],
        ['Exibição', formatarData(episodio.airDate)],
        ['Direção', episodio.directedBy],
        ['Roteiro', episodio.writtenBy],
        ['Audiência nos EUA', textoAudienciaEpisodio(episodio.usViewers)],
        ['Código de produção', episodio.productionCode],
        ['Duração', `${episodio.runtime} min`],
        ['Resumo', episodio.summary]
    ]);

    abrirModal(episodio.title, criarDetalhesComFoto(cena, detalhes));
}
