// js/paginas/inicio.js: página inicial em formato de blog. Dona: Liliane (PRs L1 e L2).
// atalhos com a contagem de cada recurso, vinda do count da primeira página (D1),
// e as imagens dos posts que vêm da tvd-api (cena do Pilot, pôster da Temporada 1 e foto da Elena)

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
        li.appendChild(criarAtalho(atalho));

        lista.appendChild(li);
    }

    mostrarCarregando('Carregando contagens…');

    // dispara as cinco requisições juntas; cada uma é uma Promise
    // a mesma URL e a mesma chave de cache que a página do recurso usa depois (RN02)
    const pedidos = [];

    for (let atalho of ATALHOS){
        pedidos.push(buscarComCache(`${URL_API}/${atalho.recurso}`));
    }

    let houveErro = false;

    for (let i = 0; i < ATALHOS.length; i++){

        // espera cada resposta, na ordem dos atalhos
        const jsonPagina = await pedidos[i];

        const contagem = document.querySelector(`#contagem-${ATALHOS[i].recurso}`);

        // null quando a API não respondeu e a página não estava no cache
        if (jsonPagina === null){
            houveErro = true;
            contagem.textContent = '—';
        }
        else{
            contagem.textContent = jsonPagina.count;

            // o primeiro item da página ilustra o post do recurso, quando ele tem imagem da API
            montarMidiaPost(ATALHOS[i].recurso, jsonPagina.results[0]);
        }
    }

    if (houveErro){
        mostrarErro('Não foi possível carregar todas as contagens. Confira a sua conexão e tente novamente.');
    }
    else{
        esconderCarregando();
    }
};


// atalho compacto: a contagem em cima e o nome do recurso embaixo, com link para a página
function criarAtalho(atalho){

    const link = document.createElement('a');
    link.className = 'atalho';
    link.href = atalho.arquivo;

    // começa com reticências e recebe o count quando a resposta chega
    const contagem = document.createElement('span');
    contagem.className = 'contagem';
    contagem.id = `contagem-${atalho.recurso}`;
    contagem.textContent = '…';

    const titulo = document.createElement('span');
    titulo.className = 'atalho-nome';
    titulo.textContent = atalho.titulo;

    link.appendChild(contagem);
    link.appendChild(titulo);

    return link;
}


// coloca a imagem do primeiro item no <figure id="midia-recurso"> do post
// characters → foto da Elena (post de Espécies), episodes → cena do Pilot, seasons → pôster da Temporada 1
function montarMidiaPost(recurso, item){

    const figura = document.querySelector(`#midia-${recurso}`);

    // espécies e famílias não têm imagem na API, e os posts delas usam fotos fixas no HTML
    if (figura === null || item === undefined){
        return;
    }

    let nome = item.name;
    let alt = `Foto de ${item.name}`;
    let formato = 'vertical';

    if (recurso === 'episodes'){
        nome = item.title;
        alt = `Cena do episódio ${item.title}`;
        formato = 'cena';
    }
    else if (recurso === 'seasons'){
        alt = `Pôster da ${item.name}`;
    }

    // o criarFotoDetalhe do ui.js já troca a foto pelas iniciais quando ela falta ou não carrega (D5)
    const foto = criarFotoDetalhe(item.image, alt, nome);

    // foto e pôster são em pé ('vertical'); a cena do episódio é deitada e pequena ('cena')
    // sem imagem, o que volta são as iniciais, que já têm o tamanho certo no style.css
    if (item.image !== null){
        foto.classList.add('post-foto');
        foto.classList.add(formato);
    }

    figura.innerHTML = '';
    figura.appendChild(foto);
}
