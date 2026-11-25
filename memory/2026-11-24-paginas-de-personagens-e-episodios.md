---
data: 2026-11-24
autor: lilianeperim-ifsp
assunto: páginas de Personagens e Episódios
---

## Resumo
Continuação de `2026-11-24-l2-e-r1.md`, na mesma noite. Com os PRs desta sessão, as seis páginas ficaram prontas na `dev`.

- **Revisão do PR #16 (Temporadas, do Alexandre):**
  - a Liliane pediu alterações em dois pontos;
  - o Alexandre corrigiu no commit `df112b2`;
  - a Liliane aprovou, e ele fez o merge (`56399da`).
- **PR #17 (Liliane):** pôster 2:3 no modal e botão de tema numa linha só. O Alexandre aprovou, e a Liliane fez o merge (`b49a28d`).
- **PR #18 (Personagens):** o Alexandre pediu uma alteração, corrigida no `6f2b703`. Ele aprovou e fez o merge (`ad8246a`).
- **PR #19 (Episódios):** o Alexandre aprovou sem pedir alterações e fez o merge (`d7c8e12`).

O `/atualizar-branch` rodou depois de cada merge, sempre por avanço direto.

## Decisões tomadas
- **Revisão do #16:** a Liliane testou a página no preview da Vercel e numa cópia local, com cliques no card, e conferiu na API que as URLs de `episodes` de cada temporada vêm na ordem do número do episódio. Ela pediu duas alterações:
  1. na linha 22 de `memory/2026-11-24-revisao-e-merge-do-pr-14.md`, a regex tinha voltado a ter os caracteres combinantes invisíveis, o mesmo problema que o Alexandre tinha apontado no #14;
  2. o pôster era cortado para 4:5 no modal. Ficou combinado que o `temporadas.js` acrescenta a classe `poster` na imagem do modal, e que a Liliane coloca a regra no `style.css`.

  Também sugeriu nomes com o recurso nas funções auxiliares (ponto 3 do plano). O Alexandre trocou para `formatarPeriodoTemporada` e `textoEpisodiosTemporada`.
- **PR #17 (`css/style.css`):**
  - `.modal .foto-detalhe.poster { aspect-ratio: 2 / 3; }`. Sem a classe, a regra não muda nada, então o #16 e o #17 podiam entrar na `dev` em qualquer ordem;
  - `#botao-tema { white-space: nowrap; }`, porque o "Modo claro" quebrava em duas linhas a 1000 px;
  - só o `nowrap` fazia o botão passar da borda direita entre 992 e 1000 px. Por isso, entre 992 e 1199 px, o `--bs-navbar-nav-link-padding-x` do `#menu` caiu de `.75rem` para `.5rem`. O menu foi testado em 992, 1100, 1199 e 1200 px, nos dois temas.
- **Personagens (`js/paginas/personagens.js`):** segue o molde de Temporadas.
  - **Card:** `criarCard` com a foto e o ator. As iniciais aparecem com `image: null` (35 personagens).
  - **Carregando:** mostra o progresso das 5 páginas.
  - **Modal:** abre na hora com a foto, o ator, os episódios e a descrição. O spinner fica só em Espécies e Família, e as duas buscas saem juntas.
  - **Espécies:** aparecem juntas em texto, com `join(', ')`.
  - **Família:** `family: null` vira "Sem família registrada", sem buscar nada.
  - **Episódios:** `episodeCount: null` vira "Não informado".
  - **Erros:** se as espécies ou a família não chegarem, o aviso aparece só no lugar delas.
  - **Rótulo:** ficou "Episódios" em vez de "Número de episódios", que quebrava em três linhas no modal estreito (abaixo de 992 px).
  - **Revisão do Alexandre:** os dois spinners diziam só "Carregando…", com `role="status"`, e o leitor de tela anunciaria o mesmo texto duas vezes (RNF02). Agora dizem "Carregando espécies…" e "Carregando família…". A sugestão foi aplicada localmente, e não pelo botão "Commit suggestion" do GitHub, para a branch local não ficar para trás.
- **Episódios (`js/paginas/episodios.js`):**
  - **Carregamento:** primeiro vêm as 8 temporadas, que montam o mapa `temporadasPorUrl`. Depois vêm os 171 episódios, com o progresso das 18 páginas.
  - **Card:** sem imagem (D6), com o título, "Temporada 1 · Episódio 1" e `formatarData`.
  - **Busca:** filtra por `title`.
  - **Modal:** abre sem spinner, porque todos os dados já estão no episódio e no mapa.
  - **Audiência:** é feita com `String(...).replace('.', ',')`, assunto da aula 6, e mostra "4,91 milhões". O `toFixed` e o `toLocaleString` foram descartados porque não aparecem em nenhuma aula.
  - **Cena do modal:** é em paisagem, de 250×140. O `style.css` ganhou `.modal .foto-detalhe.cena` (250 px, `aspect-ratio: 25 / 14`), para a cena não ser cortada no 4:5 das fotos de personagem.
- **Pasta `.vscode/`:** fica fora do git. Ela não atrapalha o `/atualizar-branch`. O `.gitignore` é do Alexandre, então acrescentar `.vscode/` lá fica com ele.

## Erros e rejeições da IA
- **`nowrap` sozinho:** na primeira versão do #17, o `white-space: nowrap` do botão de tema fez o botão passar da borda direita entre 992 e 1000 px. Isso apareceu no teste com quadros nessas larguras e foi corrigido diminuindo o espaço dos links nessa faixa.
- **Caracteres invisíveis:** a ferramenta de escrita do Claude converte o texto `\u0300` no caractere invisível. Isso aconteceu de novo na revisão do #16 e foi contornado montando a barra invertida pelo código do caractere. Toda vez, os bytes foram conferidos antes de publicar.
- **Cópia local do #16:** o `git archive` passado por pipe ao `tar` no PowerShell corrompeu o arquivo. Foi corrigido gravando o `.tar` em disco antes de extrair.

## Pendências
- **Vercel:** continua valendo a pendência de `2026-11-24-l2-e-r1.md`. Falta conferir em **Deployments** se o deploy **Current** da produção é o da `main` (`46f9944`), por causa da promoção manual de um deploy da `dev`.
- **Roteiro do Pilot:** na tvd-api, ele vem como "Teleplay by: Kevin Williamson & Julie Plec", e os outros episódios trazem só os nomes. A API é do Alexandre, e ele decide se corrige.
- **Não testado:** o texto de progresso de Episódios durante o carregamento. Ele aparece rápido demais para a captura de tela, mas usa o mesmo `aoCarregarPagina` que funcionou em Personagens.
- **README:** continua faltando mandar ao Alexandre o domínio de produção e o link do preview da `dev` (https://projetofinalciwb-git-dev-lilianeperim-ifsp.vercel.app/).

## Próximos passos
1. Fase 3: checklist da seção 9 do `docs/plano.md`. Pelo calendário, os itens 1 a 4 são do Alexandre e os itens 5 a 9 são da Liliane.
2. Corrigir o que o checklist apontar.
3. Abrir o PR final `dev` → `main` e conferir a produção.
