// js/api.js: acesso à tvd-api, único fetch do projeto (RF03, RN02 e RNF04). Dono: Alexandre (PR A1).
// usa lerCache e salvarCache do cache.js, que é carregado antes

const URL_API = 'https://tvd-api.vercel.app/api';


async function buscarComCache(url){

    // antes de cada requisição, procura a resposta no cache (RN02)
    const jsonSalvo = lerCache(url);

    if (jsonSalvo !== null){
        return jsonSalvo;
    }

    // o try/catch pega o fetch rejeitado quando não há rede
    try{

        // consulta a tvd-api
        const resposta = await fetch(url);

        // se a resposta não chegar ou a página não existir
        if (!resposta.ok){
            console.log(`Erro ${resposta.status} ao acessar ${url}`);
            return null;
        }
        else{

            // obtém o JSON da Promise
            const jsonDados = await resposta.json();

            // guarda no cache com a URL como chave (RN01)
            salvarCache(url, jsonDados);

            return jsonDados;
        }
    }
    catch (erro){
        console.log(`Sem conexão com a API ao acessar ${url}`);
        return null;
    }
}


async function buscarTodos(recurso, aoCarregarPagina){

    // a primeira página é a URL do recurso, sem ?page=
    let url = `${URL_API}/${recurso}`;

    const itens = [];
    let pagina = 0;
    let totalPaginas = 1;

    // segue o next até a última página, que vem com next null (RF03)
    while (url !== null){

        const jsonPagina = await buscarComCache(url);

        // se uma página falhar, a lista não fica pela metade
        if (jsonPagina === null){
            return null;
        }

        for (let item of jsonPagina.results){
            itens.push(item);
        }

        pagina++;

        // o total sai da primeira página, que vem cheia (a última pode ter só 1 item)
        if (pagina === 1 && jsonPagina.results.length > 0){
            totalPaginas = Math.ceil(jsonPagina.count / jsonPagina.results.length);
        }

        // avisa a página quantas já chegaram, para o texto do carregando
        if (aoCarregarPagina){
            aoCarregarPagina(pagina, totalPaginas);
        }

        url = jsonPagina.next;
    }

    return itens;
}


function recursoDaUrl(url){

    // 'https://tvd-api.vercel.app/api/species/2' → 'species/2' → 'species'
    const caminho = url.substring(URL_API.length + 1);

    // o split('?') tira o ?page= das URLs de lista ('episodes?page=3' → 'episodes')
    return caminho.split('/')[0].split('?')[0];
}


async function buscarRelacionados(urls){

    if (urls.length === 0){
        return [];
    }

    // todas as URLs de um campo são do mesmo recurso (ex.: species de um personagem)
    const recurso = recursoDaUrl(urls[0]);

    // a lista inteira do recurso sai do cache depois da primeira vez
    const todos = await buscarTodos(recurso);

    if (todos === null){
        return null;
    }

    // procura cada URL na lista, mantendo a ordem em que vieram
    const relacionados = [];

    for (let url of urls){

        for (let item of todos){

            if (item.url === url){
                relacionados.push(item);
                break;
            }
        }
    }

    return relacionados;
}
