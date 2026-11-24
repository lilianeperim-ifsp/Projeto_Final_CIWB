// js/cache.js: leitura e gravação no localStorage com JSON (RN01 e RN02). Dono: Alexandre (PR A1).
// a chave de cada item é a URL exata da requisição à tvd-api

// início das chaves que pertencem ao cache da API
const PREFIXO_CACHE = 'https://tvd-api.vercel.app/api';


function lerCache(chave){

    // converte a string guardada para o objeto JS
    // se a chave não existir, getItem devolve null e JSON.parse(null) também
    // se a string guardada estiver corrompida ou o localStorage estiver bloqueado,
    // trata como se não houvesse cache e busca de novo na API
    try{
        return JSON.parse(localStorage.getItem(chave));
    }
    catch (erro){
        console.log(`Cache inválido em ${chave}`);
        return null;
    }
}


function salvarCache(chave, dados){

    // converte o objeto JS para JSON string antes de guardar (RN01)
    // se não couber, a página segue com os dados, que só não ficam guardados
    try{
        localStorage.setItem(chave, JSON.stringify(dados));
    }
    catch (erro){
        console.log(`Não foi possível guardar ${chave} no cache`);
    }
}


function limparCache(){

    // primeiro junta as chaves do cache, porque remover durante o for muda os índices
    const chavesDoCache = [];

    for (let i = 0; i < localStorage.length; i++){

        const chave = localStorage.key(i);

        // só entram as chaves da API: a do tema ('tema') fica guardada
        if (chave.startsWith(PREFIXO_CACHE)){
            chavesDoCache.push(chave);
        }
    }

    for (let chave of chavesDoCache){
        localStorage.removeItem(chave);
    }
}
