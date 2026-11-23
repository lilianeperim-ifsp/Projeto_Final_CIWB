// js/busca.js: busca por nome em todas as páginas (RF06 e RF07). Dono: Alexandre (PR A2).
// filtra a lista que já está na memória, sem nova requisição à API (RN02)


// deixa o texto pronto para comparar: sem acento, minúsculo e sem espaços nas pontas
function normalizarTexto(texto){

    // normalize('NFD') separa a letra do acento ('ä' vira 'a' + trema)
    // a faixa \u0300-\u036f (Combining Diacritical Marks) tem os acentos soltos, e o replace apaga todos
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}


// devolve só os itens cujo campo ('name' ou 'title') contém o termo
function filtrarPorNome(itens, termo, campo){

    const termoNormalizado = normalizarTexto(termo);

    // campo vazio mostra a lista inteira
    if (termoNormalizado === ''){
        return itens;
    }

    const encontrados = [];

    for (let item of itens){

        if (normalizarTexto(item[campo]).includes(termoNormalizado)){
            encontrados.push(item);
        }
    }

    return encontrados;
}


// liga o campo de busca à lista da página; mostrar é a função que desenha os cards
function configurarBusca(itens, campo, mostrar){

    const form = document.querySelector('#form-busca');
    const campoBusca = document.querySelector('#campo-busca');

    // filtra enquanto a pessoa digita (RF06)
    campoBusca.oninput = function(){

        const filtrados = filtrarPorNome(itens, campoBusca.value, campo);

        mostrar(filtrados);
        atualizarMensagemBusca(filtrados.length, campoBusca.value);
    };

    form.onsubmit = function(e){

        // interrompe o comportamento padrão do evento: o Enter não recarrega a página
        e.preventDefault();
    };

    // se o navegador devolveu um termo ao voltar para a página, a lista já sai filtrada
    if (campoBusca.value.trim() !== ''){
        campoBusca.oninput();
    }
}


// escreve no #mensagem-busca (aria-live), que o leitor de tela anuncia sozinho
function atualizarMensagemBusca(quantidade, termo){

    const mensagem = document.querySelector('#mensagem-busca');
    const termoLimpo = termo.trim();

    if (termoLimpo === ''){
        mensagem.textContent = '';
    }
    else if (quantidade === 0){
        // resultado vazio (RF07)
        mensagem.textContent = `Nenhum resultado para "${termoLimpo}".`;
    }
    else if (quantidade === 1){
        mensagem.textContent = '1 resultado';
    }
    else{
        mensagem.textContent = `${quantidade} resultados`;
    }
}
