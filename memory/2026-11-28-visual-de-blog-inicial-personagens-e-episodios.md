---
data: 2026-11-28
autor: Alexandre Santos
assunto: visual de blog na inicial, em Personagens e em Episódios
---

## Resumo
Continuação de `2026-11-28-revisao-do-pr-21-e-vscode-no-gitignore.md`, na mesma tarde. O Alexandre mudou o visual do site para um formato de blog, em 14 commits na `trabalho/alexsant22` (de `5fb9112` a `0e4e10b`), e abriu o **PR #23** ("feat: visual de blog na inicial, em Personagens e em Episódios") para a `dev`, com a Liliane como revisora. Cada mudança foi testada pelo Claude no navegador, num servidor local (`python -m http.server`), e conferida na preview da Vercel da branch.

Para escolher o formato de cada parte, o Claude publicou páginas de comparação (artefatos) com três opções, usando os dados reais da tvd-api. O Alexandre escolheu em cada uma:
- página inicial: mistura da opção B (feed) com os atalhos da opção A;
- Personagens: opção A (capa, destaques e grade) com as etiquetas da opção B;
- modal de Personagens: opção C (ficha com anterior e próximo);
- Episódios: opção A (destaque, filtro por temporada e grade com cenas).

O que mudou:
- **Botão de tema** (`5fb9112`): virou um interruptor com a bolinha que desliza, com o sol no modo claro e a lua no escuro (`img/sol.svg`, `img/lua.svg`). O `atualizarBotaoTema` (`tema.js`) não escreve mais texto, só o `aria-label` e o `title`. O `layout.js` monta o interruptor.
- **Página inicial** (`b814fa8`, `13b5f64`, `301e619`):
  - capa com a arte da série (TVmaze) inteira, ao lado do título;
  - os cinco atalhos com a contagem, compactos;
  - a seção "Sobre a série", com resumo e ficha técnica;
  - seis posts com a imagem alternando de lado.

  As imagens da cena do Pilot, do pôster da Temporada 1 e da foto da Elena vêm da API pela função nova `montarMidiaPost` (`inicio.js`), nas mesmas 5 requisições de antes.
- **Hovers e sublinhado** (`dc5be5c`, `b1e3d41`, `e269db0`, `34ff71b`, `e2584e4`, `544b435`):
  - um sublinhado dourado que cresce do centro (`::after` com `scaleX`) no menu, nos links dos posts, no "Ver perfil →" e no anterior/próximo dos modais;
  - um hover com seta, sombra e borda dourada nos atalhos, nos cards (classe `hover-seta` no `<main>`) e nos destaques;
  - tudo vale também para o foco do teclado e respeita o `prefers-reduced-motion`.
- **Personagens** (`df339c6`, `db85c89`):
  - capa com a foto do elenco e os três protagonistas em destaque (`mostrarDestaques`), com o card inteiro clicável;
  - cards com etiquetas de espécie e família (`criarEtiquetasPersonagem`, `criarMapaDeNomes`) e duas linhas da descrição;
  - o modal virou uma ficha com anterior e próximo, que seguem a `listaMostrada`.
- **Episódios** (`8153d4d`, `0e4e10b`):
  - o episódio mais assistido em destaque (`episodioMaisAssistido`, hoje o Pilot, com 4,91 milhões);
  - pílulas Todas, T1 a T8 (`montarFiltroTemporadas`, `filtrarPorTemporada`);
  - cards com a cena e o trecho do resumo;
  - o mesmo modal-ficha de Personagens.
- **`ui.js`** (`0e4e10b`): três funções novas, usadas pelos dois modais: `criarLinhaDados`, `criarNavegacaoModal` e `criarBotaoNavegarModal`.

## Decisões tomadas
- **Visual de blog só na inicial, em Personagens e em Episódios neste PR.** Temporadas, Espécies e Famílias ficam com a Liliane, num próximo PR.
- **Imagens de fora da API, com licença:** a arte do TVmaze e três fotos do Wikimedia Commons, todas copiadas em `img/` (`capa-tvd.jpg`, `elenco-comic-con.jpg`, `covington-antiga.png`, `covington-praca.jpg`).
  - **Por quê:** a página ficou mais visual sem depender de links de terceiros.
  - **Crédito:** a licença CC BY-SA exige autor e licença, e o crédito fica embaixo de cada foto, com link.
  - **Descartado:** imagens de sites de fãs, Pinterest ou busca do Google, pelos direitos autorais e pelos links que quebram.
- **Capa inteira ao lado do título**, e não uma faixa larga cortada. A faixa de 21:9 cortava o caixão e ampliava a imagem de 1280 px, que ficava granulada. Em `col-lg-7` a imagem não é ampliada. A proporção vem do `width` e do `height` do `<img>`, para a `.capa-foto` servir à inicial e a Personagens.
- **Textos da inicial escritos à mão** (escolha do Alexandre). As contagens e as imagens continuam vindo da API.
- **Etiquetas em Personagens:** as listas de espécies e de famílias (1 página cada) são buscadas na carga da página, junto com os personagens. Com isso, o modal abre sem o carregando. Se elas falharem, os cards aparecem sem etiquetas, e o modal mostra um aviso de erro.
- **Etiquetas e trecho entram como linhas do `criarCard`**, um recurso que ele já tinha, sem mudar o `ui.js`. Os cards das outras páginas ficaram iguais.
- **Destaques com foto de 120 px ao lado do texto**, e não em cima. As fotos da API têm 210 px e ficariam borradas na largura de uma coluna.
- **Busca combinada com o filtro em Episódios:** a cada pílula, o `configurarBusca` é chamado de novo com a lista da temporada. O `busca.js` não mudou, e o "Nenhum resultado" (RF07) vale dentro da temporada.
- **D6 do plano revista:** os cards de Episódios voltaram a ter imagem (171 cenas com `loading="lazy"`). A opção B, que mantinha a D6, foi descartada pelo Alexandre.
- **Navegação do modal no `ui.js`:** como Personagens e Episódios usam o mesmo anterior/próximo, as funções foram para o `ui.js`, para não repetir código (RNF03). Conferido: nenhum nome de função se repete em `js/`, e o `fetch(` continua só no `api.js`.
- **Hover com seta limitado às páginas com `hover-seta`:** os cards de Temporadas, Espécies e Famílias, que usam o mesmo `criarCard`, ficaram como estavam.
- **Família sem o "(fundadora)" no modal:** a maquete mostrava, mas exigiria guardar mais um dado das famílias.

## Erros e rejeições da IA
- **Capa "bugada":** na primeira versão da inicial, a capa (21:9, com até 26rem de altura) ficou cortada embaixo e granulada no monitor do Alexandre. Ele mandou o print, e a capa passou para o lado do título, inteira.
- **Foto errada no post "Os protagonistas":** a "Comic-Con 2012 (cropped)" mostrava só a Nina Dobrev e o Ian Somerhalder. O Claude percebeu no teste e trocou pela foto com os três atores (Paul Wesley, Nina Dobrev e Ian Somerhalder).
- **Texto alternativo impreciso:** a foto antiga de Covington foi descrita como "por volta de 1900", mas mostra carros dos anos 1920 ou 30. Foi corrigido para "começo do século 20".
- **Atalhos quebrando mal:**
  - a 375 px, os atalhos ficaram em 2 + 2 + 1;
  - a 768 px, ficaram em 4 + 1, porque o container do Bootstrap é mais estreito;
  - o `flex` foi trocado por uma grade de 3 colunas (5 a partir de 768 px).
- **Operador ternário em `criarPilulaTemporada`:** trocado por `if`, como nos exemplos do professor.
- **`:focus-within` nos destaques:** deixaria o card destacado depois de um clique com o mouse. Foi trocado por `:has(.mais:focus-visible)`.
- **"EpisódiosNão informado":** o leitor de tela juntaria o rótulo e o valor no modal. Agora o texto é "Episódios: valor", com o espaço no próprio texto.
- **`prefers-reduced-motion` anulado:** a regra mais específica de `.hover-seta` reativava a transição. O Claude percebeu antes do commit e corrigiu.
- **Download do Wikimedia:** a primeira tentativa recebeu "Too many requests" (429), e o Claude parou sem tentar contornar o bloqueio. Mais tarde, o download funcionou.
- **Perguntas recusadas:** nas perguntas de múltipla escolha sobre o formato da inicial e de Personagens, o Alexandre pediu um artefato com as opções. Isso virou o jeito de decidir cada parte.

## Pendências
- **PR #23:** a Liliane revisa, principalmente as cores e os tamanhos do interruptor, das etiquetas e das pílulas, porque `style.css`, `layout.js`, `tema.js`, `img/`, `index.html` e as páginas são dela.
- **Fatos da seção "Sobre a série":** as datas conferem com o TVmaze. A emissora The CW, os criadores Kevin Williamson e Julie Plec, os livros de L. J. Smith, o ano de 1864 e as derivadas The Originals e Legacies foram escritos sem consulta a uma fonte e precisam ser conferidos.
- **README do PR #21:** ainda descreve a inicial antiga ("cinco atalhos", "`img/` com logo e favicon") e as páginas de Personagens e Episódios de antes. O #21 continua com *Changes requested*.
- **Checklist, item 7:** refazer o teclado e o Lighthouse de Acessibilidade na preview, antes do PR final para a `main`.
- **Liliane:** trazer Temporadas, Espécies e Famílias para o estilo de blog. Basta pôr `hover-seta` no `<main>` para ter o mesmo hover dos cards, e os modais podem usar o `criarLinhaDados` e o `criarNavegacaoModal`.

## Próximos passos
1. Depois do merge do PR #23, rodar `/atualizar-branch`.
2. Revisar o PR da Liliane com as outras três páginas e o #21 corrigido.
3. Refazer o item 7 do checklist e abrir o PR final `dev` → `main` (T20).
4. Preparar os slides da apresentação (prazo do plano: 04/12).
