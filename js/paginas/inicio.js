// js/paginas/inicio.js: página inicial. Dona: Liliane (PRs L1 e L2).
// cinco atalhos com a contagem de cada recurso, vinda do count da primeira página (D1)

// recursos da tvd-api, na ordem do menu; o arquivo é relativo à raiz do site
const ATALHOS = [
    { recurso: 'characters', titulo: 'Personagens', arquivo: 'pages/personagens.html' },
    { recurso: 'episodes', titulo: 'Episódios', arquivo: 'pages/episodios.html' },
    { recurso: 'seasons', titulo: 'Temporadas', arquivo: 'pages/temporadas.html' },
    { recurso: 'species', titulo: 'Espécies', arquivo: 'pages/especies.html' },
    { recurso: 'families', titulo: 'Famílias', arquivo: 'pages/familias.html' }
];


window.onload = async function(){

    montarLayout('inicio', '');

    // os atalhos aparecem na hora, porque os links funcionam mesmo sem a contagem
    const lista = document.querySelector('#atalhos');

    lista.innerHTML = '';

    for (let atalho of ATALHOS){

        const li = document.createElement('li');
        li.className = 'col';
        li.appendChild(criarAtalho(atalho));

        lista.appendChild(li);
    }

    mostrarCarregando('Carregando contagens…');

    let houveErro = false;

    for (let atalho of ATALHOS){

        // a mesma URL e a mesma chave de cache que a página do recurso usa depois (RN02)
        const jsonPagina = await buscarComCache(`${URL_API}/${atalho.recurso}`);

        const contagem = document.querySelector(`#contagem-${atalho.recurso}`);

        // null quando a API não respondeu e a página não estava no cache
        if (jsonPagina === null){
            houveErro = true;
            contagem.textContent = '—';
        }
        else{
            contagem.textContent = jsonPagina.count;
        }
    }

    if (houveErro){
        mostrarErro('Não foi possível carregar todas as contagens. Confira a sua conexão e tente novamente.');
    }
    else{
        esconderCarregando();
    }
};


// card que é um link para a página do recurso: contagem, nome e "Ver todos"
// dentro do <a> ficam só <span>, como nos cards do ui.js
function criarAtalho(atalho){

    const link = document.createElement('a');
    link.className = 'card-recurso';
    link.href = atalho.arquivo;

    const card = document.createElement('span');
    card.className = 'card';

    const corpo = document.createElement('span');
    corpo.className = 'card-body d-block';

    // começa com reticências e recebe o count quando a resposta chega
    const contagem = document.createElement('span');
    contagem.className = 'contagem d-block mb-2';
    contagem.id = `contagem-${atalho.recurso}`;
    contagem.textContent = '…';

    const titulo = document.createElement('span');
    titulo.className = 'card-title h5 d-block';
    titulo.textContent = atalho.titulo;

    const verTodos = document.createElement('span');
    verTodos.className = 'card-text d-block ver-todos';
    verTodos.textContent = 'Ver todos';

    corpo.appendChild(contagem);
    corpo.appendChild(titulo);
    corpo.appendChild(verTodos);

    card.appendChild(corpo);
    link.appendChild(card);

    return link;
}
