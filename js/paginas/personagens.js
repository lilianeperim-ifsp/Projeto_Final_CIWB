// js/paginas/personagens.js: página de personagens em formato de blog. Mínimo: Liliane (PR L1). Dona da página: Liliane.
// capa no HTML, os três protagonistas em destaque e a grade com a busca; cada personagem mostra etiquetas
// com as espécies e a família, e o modal é uma ficha com anterior e próximo

// os 49 personagens, guardados para a busca filtrar sem nova requisição (RN02)
let personagens = [];

// a lista que está na tela (inteira ou filtrada pela busca), para o anterior e o próximo do modal
let listaMostrada = [];

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

        // botão com cara de link, para o teclado (Tab e Enter); o clique nele sobe para o artigo,
        // que abre o mesmo modal dos cards (RF05)
        const botVer = document.createElement('button');
        botVer.type = 'button';
        botVer.className = 'mais';
        botVer.textContent = 'Ver perfil →';
        botVer.setAttribute('aria-label', `Ver perfil de ${personagem.name}`);

        // o destaque inteiro é clicável, como os cards da grade
        artigo.onclick = function(){
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

    listaMostrada = lista;

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


// ficha do modal: foto à esquerda; à direita o ator, as etiquetas, a descrição em destaque e a linha
// com episódios e família; embaixo, o anterior e o próximo da lista (RF05)
function montarDetalhesPersonagem(personagem){

    const foto = criarFotoDetalhe(personagem.image, `Foto de ${personagem.name}`, personagem.name);

    const info = document.createElement('div');
    info.className = 'perfil-info';

    const ator = document.createElement('p');
    ator.className = 'text-body-secondary mb-0';
    ator.textContent = personagem.actor;
    info.appendChild(ator);

    info.appendChild(criarEtiquetasPersonagem(personagem));

    // as listas de espécies e de famílias vêm na carga da página; se não chegaram, as etiquetas ficam incompletas
    if (especiesPorUrl === null || familiasPorUrl === null){
        info.appendChild(criarAvisoErro('Não foi possível carregar as espécies e a família. Confira a sua conexão e tente novamente.'));
    }

    const descricao = document.createElement('p');
    descricao.className = 'perfil-descricao';
    descricao.textContent = personagem.description;
    info.appendChild(descricao);

    info.appendChild(criarDadosPersonagem(personagem));

    const conteudo = document.createElement('div');
    conteudo.appendChild(criarDetalhesComFoto(foto, info));
    conteudo.appendChild(criarNavegacaoPersonagem(personagem));

    return conteudo;
}


// linha com o número de episódios e a família, cada um com o rótulo em negrito
function criarDadosPersonagem(personagem){

    // 34 personagens vêm com episodeCount null
    let episodios = 'Não informado';

    if (personagem.episodeCount !== null){
        episodios = personagem.episodeCount;
    }

    let familia = 'Sem família registrada';

    if (personagem.family !== null && familiasPorUrl !== null && familiasPorUrl[personagem.family] !== undefined){
        familia = familiasPorUrl[personagem.family];
    }

    // 'Episódios: 171   Família: Salvatore', montada pelo criarLinhaDados do ui.js
    return criarLinhaDados([['Episódios', episodios], ['Família', familia]]);
}


// rodapé do modal com o personagem anterior e o próximo da lista que está na tela
// (aberto pelos destaques com a busca escondendo o personagem, segue a lista inteira);
// os botões são montados pelo criarNavegacaoModal do ui.js, o mesmo de Episódios
function criarNavegacaoPersonagem(personagem){

    let lista = listaMostrada;

    if (!lista.includes(personagem)){
        lista = personagens;
    }

    return criarNavegacaoModal(lista, personagem, 'Outros personagens', (p) => p.name, abrirDetalhesPersonagem);
}


// abre o modal já com tudo, porque as espécies e as famílias vêm na carga da página (RF05)
function abrirDetalhesPersonagem(personagem){

    abrirModal(personagem.name, montarDetalhesPersonagem(personagem));
}
