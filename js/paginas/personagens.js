// js/paginas/personagens.js: página de personagens. Mínimo: Liliane (PR L1). Dona da página: Liliane.
// segue o molde de Temporadas: foto (ou iniciais) no card e, no modal, as espécies e a família resolvidas pela URL

// os 49 personagens, guardados para a busca filtrar sem nova requisição (RN02)
let personagens = [];


window.onload = async function(){

    montarLayout('personagens', '../');

    mostrarCarregando('Carregando personagens…');

    // são 5 páginas da API; o texto mostra o progresso (RF03)
    const jsonPersonagens = await buscarTodos('characters', function(pagina, totalPaginas){
        mostrarCarregando(`Carregando personagens… página ${pagina} de ${totalPaginas}`);
    });

    // null quando a API não respondeu e a lista não estava no cache
    if (jsonPersonagens === null){
        mostrarErro('Não foi possível carregar os personagens. Confira a sua conexão e tente novamente.');
    }
    else{

        personagens = jsonPersonagens;

        esconderCarregando();
        mostrarPersonagens(personagens);
        configurarBusca(personagens, 'name', mostrarPersonagens);
    }
};


// desenha os cards; a busca chama esta mesma função com a lista filtrada
function mostrarPersonagens(lista){

    mostrarLista(lista, montarCardPersonagem, abrirDetalhesPersonagem);
}


// card com a foto 4:5, o nome e o ator; com image null, o criarCard mostra as iniciais (D5)
function montarCardPersonagem(personagem){

    return criarCard(personagem.name, [personagem.actor], personagem.image, `Foto de ${personagem.name}`);
}


// foto à esquerda e os dados à direita; valorEspecies e valorFamilia são o spinner, o texto ou o aviso de erro
function montarDetalhesPersonagem(personagem, valorEspecies, valorFamilia){

    const foto = criarFotoDetalhe(personagem.image, `Foto de ${personagem.name}`, personagem.name);

    // vários personagens vêm com episodeCount null
    let episodios = 'Não informado';

    if (personagem.episodeCount !== null){
        episodios = personagem.episodeCount;
    }

    const detalhes = criarListaDetalhes([
        ['Ator', personagem.actor],
        ['Espécies', valorEspecies],
        ['Família', valorFamilia],
        ['Episódios', episodios],
        ['Descrição', personagem.description]
    ]);

    return criarDetalhesComFoto(foto, detalhes);
}


// abre o modal na hora com a foto e os dados do personagem; o spinner fica só nas espécies e na família (RF05)
async function abrirDetalhesPersonagem(personagem){

    const abertura = abrirModal(personagem.name, montarDetalhesPersonagem(personagem, criarSpinner('Carregando…'), criarSpinner('Carregando…')));

    // dispara as duas buscas juntas; as listas de espécies e de famílias saem do cache depois da primeira vez (RN02)
    const pedidoEspecies = buscarRelacionados(personagem.species);

    // sem família (family null), não há o que buscar
    let pedidoFamilia = null;

    if (personagem.family !== null){
        pedidoFamilia = buscarRelacionados([personagem.family]);
    }

    const especies = await pedidoEspecies;

    let familia = [];

    if (pedidoFamilia !== null){
        familia = await pedidoFamilia;
    }

    preencherModal(abertura, montarDetalhesPersonagem(personagem, textoEspeciesPersonagem(especies), textoFamiliaPersonagem(familia)));
}


// [Humano, Doppelgänger, Vampiro] → 'Humano, Doppelgänger, Vampiro'
function textoEspeciesPersonagem(especies){

    if (especies === null){
        return criarAvisoErro('Não foi possível carregar as espécies. Confira a sua conexão e tente novamente.');
    }

    if (especies.length === 0){
        return 'Nenhuma espécie registrada';
    }

    const nomes = [];

    for (let especie of especies){
        nomes.push(especie.name);
    }

    return nomes.join(', ');
}


// [Gilbert] → 'Gilbert'; lista vazia (family null) → 'Sem família registrada'
function textoFamiliaPersonagem(familia){

    if (familia === null){
        return criarAvisoErro('Não foi possível carregar a família. Confira a sua conexão e tente novamente.');
    }

    if (familia.length === 0){
        return 'Sem família registrada';
    }

    return familia[0].name;
}
