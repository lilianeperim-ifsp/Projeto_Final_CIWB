---
data: 2026-11-24
autor: Alexandre Santos
assunto: revisão e merge do PR #18 (Personagens)
---

## Resumo
Continuação de `2026-11-24-revisao-dos-prs-16-e-17.md`.

- A Liliane abriu o PR #18 ("feat: página de Personagens", `trabalho/lilianeperim-ifsp` → `dev`) às 22:02. Ele muda um arquivo só, o `js/paginas/personagens.js`.
- O Claude revisou. Às 22:07, o Alexandre postou uma revisão pedindo uma alteração, com uma sugestão de código na linha 75.
- A Liliane aplicou a sugestão no commit `6f2b703` (22:09). O Alexandre aprovou às 22:11 e fez o merge na `dev` no mesmo minuto (merge `ad8246a`).
- **Quadro:** a sincronização não tinha cartão para mover, porque o T14 ("Página de Personagens") estava em A fazer e sem número de PR. Com a autorização da dupla, o Claude moveu o T14 para Feito e colocou o PR 18 no cartão. Na Fase 2, falta só o T16 (Episódios, da Liliane, prazo em 29/11).
- **Branches:** a `dev` local avançou direto até o `ad8246a`. A `trabalho/alexsant22` ficou como estava, porque tem o commit `e485566` (memória dos PRs #16 e #17), que a `dev` não tem.

## Decisões tomadas
- **O que a página de Personagens faz** (está na descrição do PR):
  - card com a foto 4:5 ou as iniciais (D5), o nome e o ator;
  - busca pelo `name`;
  - carregando com o progresso "página X de 5" (RF03);
  - o modal abre na hora com a foto, o ator, os episódios e a descrição. O spinner fica só em Espécies e Família, e as duas buscas saem juntas;
  - `family: null` mostra "Sem família registrada", e `episodeCount: null` mostra "Não informado".
- **O que o Claude conferiu, rodando o `personagens.js` dela no Node com a API real:**
  - o progresso vai de 1/5 a 5/5, com 5 requisições;
  - a busca "mikael" acha os 7: Klaus, Elijah, Rebekah, Kol, Finn e Esther Mikaelson, e Mikael;
  - Elena: "Humano, Doppelgänger, Vampiro", Gilbert, 134 episódios e foto;
  - Elijah: "Vampiro Original", Mikaelson, "Não informado" e iniciais;
  - Alaric: "Humano, Vampiro Original" e "Sem família registrada";
  - Silas: "Bruxa, Imortal", "Sem família registrada" e iniciais;
  - RN02: os quatro modais fizeram só 2 requisições, uma para as espécies e outra para as famílias;
  - nos dados: os 49 personagens têm `name`, `actor` e `description`. Todos têm de 1 a 3 espécies. 35 vêm com `image: null`, 34 com `episodeCount: null` e 10 com `family: null`. Toda família e toda espécie para onde um personagem aponta existe na lista.
- **A sugestão sobre os spinners foi feita antes da aprovação, a pedido do Alexandre.** Antes, os dois spinners do modal diziam "Carregando…" e tinham `role="status"`, então o leitor de tela anunciava o mesmo texto duas vezes, sem dizer o que carregava (RNF02). Agora eles dizem "Carregando espécies…" e "Carregando família…". A revisão foi postada pela API do GitHub com um bloco `suggestion`, e a Liliane aplicou pelo próprio GitHub.

## Erros e rejeições da IA
- **A sugestão foi rejeitada como opcional.** O Claude tinha marcado a troca dos spinners como opcional e mandou aprovar assim mesmo. O Alexandre preferiu pedir a alteração antes de aprovar.

## Pendências
- **T16 (Episódios):** é a última página da Fase 2, da Liliane, com prazo em 29/11. O Alexandre revisa.
- **Personagens no navegador:** o Claude não abriu o preview. A Liliane testou a 1280 e a 375px, com o teclado e sem erro no console.
- Continuam as pendências de `2026-11-24-revisao-dos-prs-16-e-17.md`:
  - o pôster 2:3 no navegador;
  - o atalho do sublinhado no `docs/identidade-visual.md`;
  - o deploy de produção na Vercel;
  - o README.

## Próximos passos
1. Revisar o PR de Episódios quando a Liliane abrir.
2. Corrigir o atalho do sublinhado no `docs/identidade-visual.md`.
3. Antes do próximo trabalho na `trabalho/alexsant22`, trazer a `dev` com `git pull --no-edit origin dev`.
