// js/paginas/personagens.js: página de personagens em formato de blog. Mínimo: Liliane (PR L1). Dona da página: Liliane.
// capa no HTML, os três protagonistas em destaque e a grade com a busca; cada personagem mostra etiquetas
// com as espécies e a família, e o modal continua com as espécies e a família resolvidas pela URL

// os 49 personagens, guardados para a busca filtrar sem nova requisição (RN02)
let personagens = [];

// URL → nome ('https://tvd-api.vercel.app/api/species/2' → 'Vampiro'), para as etiquetas;
// ficam null se a lista não chegar, e aí os cards aparecem sem aquelas etiquetas
let especiesPorUrl = null;
let familiasPorUrl = null;


window.onload = async function(){

    montarLayout('personagens', '../');

    mostrarCarregando('Carregando personagens…');

    // as espécies e as famílias (1 página cada) saem junto com os personagens;
    // são as mesmas chaves de cache que o modal e as outras páginas usam (RN02)
    const pedidoEspecies = buscarTodos('species');
    const pedidoFamilias = buscarTodos('families');

    // são 5 páginas da API; o texto mostra o progresso (RF03)
    const jsonPersonagens = await buscarTodos('characters', function(pagina, totalPaginas){
        mostrarCarregando(`Carregando personagens… página ${pagina} de ${totalPaginas}`);
    });

    // null quando a API não respondeu e a lista não estava no cache
    if (jsonPersonagens === null){
        mostrarErro('Não foi possível carregar os personagens. Confira a sua conexão e tente novamente.');
    }
    else{

        especiesPorUrl = criarMapaDeNomes(await pedidoEspecies);
        familiasPorUrl = criarMapaDeNomes(await pedidoFamilias);

        personagens = jsonPersonagens;

        esconderCarregando();

        // Elena, Stefan e Damon são os três primeiros da API; eles continuam na grade, para a busca achar
        mostrarDestaques(personagens.slice(0, 3));
        mostrarPersonagens(personagens);
        configurarBusca(personagens, 'name', mostrarPersonagens);
    }
};


// lista da API → objeto URL → nome; lista null (a API não respondeu) → null
function criarMapaDeNomes(lista){

    if (lista === null){
        return null;
    }

    const mapa = {};

    for (let item of lista){
        mapa[item.url] = item.name;
    }

    return mapa;
}


// etiquetas do personagem: as espécies com contorno e a família com fundo
// dentro de <span>, porque nos cards elas ficam dentro do <button> do criarCard
function criarEtiquetasPersonagem(personagem){

    const caixa = document.createElement('span');
    caixa.className = 'etiquetas';

    if (especiesPorUrl !== null){

        for (let url of personagem.species){

            const nome = especiesPorUrl[url];

            if (nome !== undefined){
                const etiqueta = document.createElement('span');
                etiqueta.className = 'etiqueta';
                etiqueta.textContent = nome;
                caixa.appendChild(etiqueta);
            }
        }
    }

    if (familiasPorUrl !== null && personagem.family !== null){

        const nome = familiasPorUrl[personagem.family];

        if (nome !== undefined){
            const etiqueta = document.createElement('span');
            etiqueta.className = 'etiqueta etiqueta-familia';
            etiqueta.textContent = nome;
            caixa.appendChild(etiqueta);
        }
    }

    return caixa;
}


// os três protagonistas: foto ao lado do texto, com ator, etiquetas, descrição e o botão que abre o modal
function mostrarDestaques(lista){

    const destaques = document.querySelector('#destaques');

    destaques.innerHTML = '';

    for (let personagem of lista){

        const coluna = document.createElement('div');
        coluna.className = 'col';

        const artigo = document.createElement('article');
        artigo.className = 'destaque';

        const foto = criarFotoDetalhe(personagem.image, `Foto de ${personagem.name}`, personagem.name);

        const texto = document.createElement('div');
        texto.className = 'destaque-texto';

        const titulo = document.createElement('h3');
        titulo.className = 'h5 mb-0';
        titulo.textContent = personagem.name;

        const ator = document.createElement('p');
        ator.className = 'text-body-secondary mb-1';
        ator.textContent = personagem.actor;

        const descricao = document.createElement('p');
        descricao.className = 'mb-2';
        descricao.textContent = personagem.description;

        // botão com cara de link: abre o mesmo modal dos cards (RF05)
        const botVer = document.createElement('button');
        botVer.type = 'button';
        botVer.className = 'mais';
        botVer.textContent = 'Ver perfil →';
        botVer.setAttribute('aria-label', `Ver perfil de ${personagem.name}`);

        botVer.onclick = function(){
            abrirDetalhesPersonagem(personagem);
        };

        texto.appendChild(titulo);
        texto.appendChild(ator);
        texto.appendChild(criarEtiquetasPersonagem(personagem));
        texto.appendChild(descricao);
        texto.appendChild(botVer);

        artigo.appendChild(foto);
        artigo.appendChild(texto);

        coluna.appendChild(artigo);
        destaques.appendChild(coluna);
    }
}


// desenha os cards; a busca chama esta mesma função com a lista filtrada
function mostrarPersonagens(lista){

    mostrarLista(lista, montarCardPersonagem, abrirDetalhesPersonagem);
}


// card com a foto 4:5, o nome, o ator, as etiquetas e duas linhas da descrição (RF04);
// com image null, o criarCard mostra as iniciais (D5)
function montarCardPersonagem(personagem){

    // o trecho é cortado em duas linhas pelo CSS; a descrição inteira fica no modal
    const trecho = document.createElement('span');
    trecho.className = 'trecho';
    trecho.textContent = personagem.description;

    const linhas = [personagem.actor, criarEtiquetasPersonagem(personagem), trecho];

    return criarCard(personagem.name, linhas, personagem.image, `Foto de ${personagem.name}`);
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

    const abertura = abrirModal(personagem.name, montarDetalhesPersonagem(personagem, criarSpinner('Carregando espécies…'), criarSpinner('Carregando família…')));

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
