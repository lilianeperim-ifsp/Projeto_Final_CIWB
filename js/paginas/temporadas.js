// js/paginas/temporadas.js: página de temporadas. Mínimo: Liliane (PR L1). Dono da página: Alexandre (D11).
// segue o molde de Famílias, com o pôster 2:3 no card e a lista numerada dos episódios no modal

// as 8 temporadas, guardadas para a busca filtrar sem nova requisição (RN02)
let temporadas = [];


window.onload = async function(){

    montarLayout('temporadas', '../');

    mostrarCarregando('Carregando temporadas…');

    // as 8 temporadas vêm numa página só
    const jsonTemporadas = await buscarTodos('seasons');

    // null quando a API não respondeu e a lista não estava no cache
    if (jsonTemporadas === null){
        mostrarErro('Não foi possível carregar as temporadas. Confira a sua conexão e tente novamente.');
    }
    else{

        temporadas = jsonTemporadas;

        esconderCarregando();
        mostrarTemporadas(temporadas);
        configurarBusca(temporadas, 'name', mostrarTemporadas);
    }
};


// desenha os cards; a busca chama esta mesma função com a lista filtrada
function mostrarTemporadas(lista){

    mostrarLista(lista, montarCardTemporada, abrirDetalhesTemporada);
}


// '2009-09-10' e '2010-05-13' → '2009–2010'; se começa e termina no mesmo ano, só '2009'
function formatarPeriodo(inicio, fim){

    if (!inicio){
        return 'Período não informado';
    }

    const anoInicio = inicio.split('-')[0];

    if (!fim){
        return anoInicio;
    }

    const anoFim = fim.split('-')[0];

    if (anoInicio === anoFim){
        return anoInicio;
    }
    else{
        return `${anoInicio}–${anoFim}`;
    }
}


// '22 episódios', ou '1 episódio'
function textoEpisodios(quantidade){

    if (quantidade === 1){
        return '1 episódio';
    }
    else{
        return `${quantidade} episódios`;
    }
}


// card com o pôster 2:3: nome, período e número de episódios
function montarCardTemporada(temporada){

    const linhas = [
        formatarPeriodo(temporada.premiereDate, temporada.endDate),
        textoEpisodios(temporada.episodeCount)
    ];

    return criarCard(temporada.name, linhas, temporada.image, `Pôster da ${temporada.name}`, true);
}


// pôster à esquerda e os dados à direita; valorEpisodios é o spinner ou a lista dos títulos
function montarDetalhesTemporada(temporada, valorEpisodios){

    const foto = criarFotoDetalhe(temporada.image, `Pôster da ${temporada.name}`, temporada.name);

    const detalhes = criarListaDetalhes([
        ['Estreia', formatarData(temporada.premiereDate)],
        ['Encerramento', formatarData(temporada.endDate)],
        ['Número de episódios', temporada.episodeCount],
        ['Episódios', valorEpisodios]
    ]);

    return criarDetalhesComFoto(foto, detalhes);
}


// abre o modal na hora com o pôster e as datas; o spinner fica só no lugar dos episódios (RF05)
async function abrirDetalhesTemporada(temporada){

    const abertura = abrirModal(temporada.name, montarDetalhesTemporada(temporada, criarSpinner('Carregando episódios…')));

    // na primeira vez são até 18 páginas de episódios; depois, tudo sai do cache (RN02)
    const episodios = await buscarRelacionados(temporada.episodes);

    if (episodios === null){
        preencherModal(abertura, montarDetalhesTemporada(temporada, criarAvisoErro('Não foi possível carregar os episódios desta temporada. Confira a sua conexão e tente novamente.')));
    }
    else{

        const titulos = [];

        // os episódios vêm na ordem da temporada, então a lista numerada segue o número do episódio
        for (let episodio of episodios){
            titulos.push(episodio.title);
        }

        let valorEpisodios;

        if (titulos.length === 0){
            valorEpisodios = 'Nenhum episódio registrado';
        }
        else{
            valorEpisodios = criarListaDeNomes(titulos, true);
        }

        preencherModal(abertura, montarDetalhesTemporada(temporada, valorEpisodios));
    }
}
