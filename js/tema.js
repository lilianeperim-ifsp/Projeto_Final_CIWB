// js/tema.js: aplica o modo claro ou escuro no <head>, antes de a página aparecer (D7). Dona: Liliane (PR L1).
// Este arquivo é carregado no <head>, sem defer, antes dos outros scripts. Por isso usa o localStorage
// direto: o cache.js ainda não foi carregado quando ele roda.

// chave do tema no localStorage; não começa com a URL da API, então o limparCache() não apaga
const CHAVE_TEMA = 'tema';

// devolve o tema salvo ou, na primeira visita, o tema do sistema
function temaInicial(){

    const temaSalvo = JSON.parse(localStorage.getItem(CHAVE_TEMA));

    if (temaSalvo === 'light' || temaSalvo === 'dark'){
        return temaSalvo;
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        return 'dark';
    }
    else{
        return 'light';
    }
}

// troca o atributo do Bootstrap 5.3.3 que liga o modo claro ou escuro
function aplicarTema(tema){

    document.documentElement.setAttribute('data-bs-theme', tema);
}

// diz o que o interruptor vai fazer: no modo escuro, ativa o claro, e vice-versa
// o botão não tem texto visível, então o aria-label é lido pelo leitor de tela e o title aparece no mouse;
// a bolinha, o sol e a lua mudam só pelo CSS, a partir do data-bs-theme
function atualizarBotaoTema(botao){

    const temaAtual = document.documentElement.getAttribute('data-bs-theme');

    let rotulo = 'Ativar modo escuro';

    if (temaAtual === 'dark'){
        rotulo = 'Ativar modo claro';
    }

    botao.setAttribute('aria-label', rotulo);
    botao.title = rotulo;
}

// chamada no clique do #botao-tema: aplica o tema oposto e salva a escolha
function trocarTema(){

    const temaAtual = document.documentElement.getAttribute('data-bs-theme');

    let novoTema = 'dark';

    if (temaAtual === 'dark'){
        novoTema = 'light';
    }

    aplicarTema(novoTema);

    localStorage.setItem(CHAVE_TEMA, JSON.stringify(novoTema));

    const botTema = document.querySelector('#botao-tema');

    if (botTema){
        atualizarBotaoTema(botTema);
    }
}

// roda na hora, antes de a página aparecer, para não piscar no tema errado
aplicarTema(temaInicial());
