// js/paginas/familias.js: página de famílias. Mínimo: Liliane (PR L1). Dono da página: Alexandre.
// segue o molde de Espécies, com o selo de família fundadora no card e no modal

// as 10 famílias, guardadas para a busca filtrar sem nova requisição (RN02)
let familias = [];


window.onload = async function(){

    montarLayout('familias', '../');

    mostrarCarregando('Carregando famílias…');

    const jsonFamilias = await buscarTodos('families');

    // null quando a API não respondeu e a lista não estava no cache
    if (jsonFamilias === null){
        mostrarErro('Não foi possível carregar as famílias. Confira a sua conexão e tente novamente.');
    }
    else{

        familias = jsonFamilias;

        esconderCarregando();
        mostrarFamilias(familias);
        configurarBusca(familias, 'name', mostrarFamilias);
    }
};


// desenha os cards; a busca chama esta mesma função com a lista filtrada
function mostrarFamilias(lista){

    mostrarLista(lista, montarCardFamilia, abrirDetalhesFamilia);
}


// card sem imagem: nome, selo "Fundadora" nas cinco fundadoras de Mystic Falls e número de personagens
function montarCardFamilia(familia){

    const linhas = [];

    if (familia.founding){

        const selo = document.createElement('span');
        selo.className = 'selo-fundadora';
        selo.textContent = 'Fundadora';

        linhas.push(selo);
    }

    const quantidade = familia.characters.length;

    if (quantidade === 1){
        linhas.push('1 personagem');
    }
    else{
        linhas.push(`${quantidade} personagens`);
    }

    return criarCard(familia.name, linhas);
}


// abre o modal na hora com o spinner e preenche quando os nomes dos personagens chegam (RF05)
async function abrirDetalhesFamilia(familia){

    const abertura = abrirModal(familia.name, criarSpinner('Carregando personagens…'));

    // a lista de personagens sai do cache depois da primeira vez
    const personagens = await buscarRelacionados(familia.characters);

    if (personagens === null){
        preencherModal(abertura, criarAvisoErro('Não foi possível carregar os personagens desta família. Confira a sua conexão e tente novamente.'));
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

        let fundadora = 'Não';

        if (familia.founding){
            fundadora = 'Sim';
        }

        const detalhes = criarListaDetalhes([
            ['Fundadora de Mystic Falls', fundadora],
            ['Descrição', familia.description],
            [`Personagens (${nomes.length})`, valorPersonagens]
        ]);

        preencherModal(abertura, detalhes);
    }
}
