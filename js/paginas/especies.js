// js/paginas/especies.js: página de espécies. Mínimo: Liliane (PR L1). Dono da página: Alexandre (PR A2).
// é o molde das outras páginas: carrega a lista, liga a busca e abre o modal com os nomes relacionados

// as 9 espécies, guardadas para a busca filtrar sem nova requisição (RN02)
let especies = [];


window.onload = async function(){

    montarLayout('especies', '../');

    mostrarCarregando('Carregando espécies…');

    const jsonEspecies = await buscarTodos('species');

    // null quando a API não respondeu e a lista não estava no cache
    if (jsonEspecies === null){
        mostrarErro('Não foi possível carregar as espécies. Confira a sua conexão e tente novamente.');
    }
    else{

        especies = jsonEspecies;

        esconderCarregando();
        mostrarEspecies(especies);
        configurarBusca(especies, 'name', mostrarEspecies);
    }
};


// desenha os cards; a busca chama esta mesma função com a lista filtrada
function mostrarEspecies(lista){

    mostrarLista(lista, montarCardEspecie, abrirDetalhesEspecie);
}


// card sem imagem: nome e número de personagens
function montarCardEspecie(especie){

    const quantidade = especie.characters.length;

    let textoPersonagens = `${quantidade} personagens`;

    if (quantidade === 1){
        textoPersonagens = '1 personagem';
    }

    return criarCard(especie.name, [textoPersonagens]);
}


// abre o modal na hora com o spinner e preenche quando os nomes dos personagens chegam (RF05)
async function abrirDetalhesEspecie(especie){

    const abertura = abrirModal(especie.name, criarSpinner('Carregando personagens…'));

    // a lista de personagens sai do cache depois da primeira vez
    const personagens = await buscarRelacionados(especie.characters);

    if (personagens === null){
        preencherModal(abertura, criarAvisoErro('Não foi possível carregar os personagens desta espécie. Confira a sua conexão e tente novamente.'));
    }
    else{

        const nomes = [];

        for (let personagem of personagens){
            nomes.push(personagem.name);
        }

        let valorPersonagens;

        if (nomes.length === 0){
            valorPersonagens = 'Nenhum personagem registrado';
        }
        else{
            valorPersonagens = criarListaDeNomes(nomes, false);
        }

        const detalhes = criarListaDetalhes([
            ['Descrição', especie.description],
            [`Personagens (${nomes.length})`, valorPersonagens]
        ]);

        preencherModal(abertura, detalhes);
    }
}
