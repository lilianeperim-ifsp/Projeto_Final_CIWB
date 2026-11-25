---
data: 2026-11-24
autor: Alexandre Santos
assunto: revisão e merge dos PRs #16 (Temporadas) e #17
---

## Resumo
Continuação de `2026-11-24-pagina-de-temporadas.md`.

- **PR #16 (Temporadas):** às 21:17, a Liliane pediu alterações em dois pontos e deu uma sugestão opcional. O Claude corrigiu tudo no commit `df112b2`. Ela aprovou às 21:47, e o Alexandre fez o merge na `dev` às 21:48 (merge `56399da`).
- **PR #17:** a Liliane abriu às 21:28 o PR "fix: pôster 2:3 no modal e botão de tema numa linha só" (`trabalho/lilianeperim-ifsp` → `dev`). Ele traz a parte de CSS do pedido dela no #16 e a memória `2026-11-24-l2-e-r1.md`. O Claude revisou, o Alexandre aprovou às 21:44, e a Liliane fez o merge às 21:49 (merge `b49a28d`).
- **Quadro:** a sincronização manual levou o T15 para Feito, e a lista de PRs ficou com os 17 PRs. O #17 não tem cartão.
- **Branches:** a `dev` local e a `trabalho/alexsant22` avançaram direto até o `b49a28d`, sem commit de merge, e o Claude deu o push. Agora a `dev` e a `trabalho/alexsant22`, local e no GitHub, estão no mesmo commit.

## Decisões tomadas
- **O que a Liliane pediu no #16, e como foi resolvido:**
  1. Em `memory/2026-11-24-revisao-e-merge-do-pr-14.md`, linha 22, a regex do `busca.js` tinha voltado a ser gravada com os caracteres combinantes invisíveis. Agora ela aparece com as barras e os números, e nenhum arquivo do projeto tem caractere entre U+0300 e U+036F.
  2. O pôster no modal era cortado em 4:5. O `montarDetalhesTemporada` passou a pôr `foto.classList.add('poster')`, e a regra `.modal .foto-detalhe.poster { aspect-ratio: 2 / 3; }` entrou pelo #17. Os dois PRs foram feitos para entrar em qualquer ordem, porque a classe sozinha não muda nada.
  3. A sugestão opcional foi aceita: `formatarPeriodo` e `textoEpisodios` viraram `formatarPeriodoTemporada` e `textoEpisodiosTemporada`, seguindo o ponto 3 do plano (funções globais com o nome do recurso).
- **Revisão do #17 pelo Claude:**
  - a regra do pôster é mais específica que o `.modal .foto-detalhe` de 4:5, então ganha dele;
  - entre 992 e 1199px, o `--bs-navbar-nav-link-padding-x: .5rem` vem depois da regra do `#menu`, então é ele que vale. Acima de 1200px nada muda;
  - o `#botao-tema` existe no `layout.js` (linha 102);
  - não há caracteres invisíveis, os checks da Vercel passaram, e a memória da Liliane registra os merges do mesmo jeito que o GitHub.

  O Claude não abriu o preview do #17. A Liliane testou a 992, 1100, 1199 e 1200px.

## Erros e rejeições da IA
- **A regex invisível na memória do #14 foi erro do Claude.** Já está registrado em `2026-11-24-pagina-de-temporadas.md`. A correção foi feita com um script Node que monta a barra invertida com `String.fromCharCode(92)`, e depois dela não sobrou nenhum caractere combinante em `memory/`, `docs/` e `js/`.
- **O Claude não tinha conferido o próprio arquivo de memória antes do commit.** Ele só tinha conferido o `temporadas.js`. A conferência passou a valer para todo arquivo que tiver a regex.

## Pendências
- **Pôster 2:3 no modal:** ainda não foi visto no navegador com o #16 e o #17 juntos na `dev`. O preview da `dev` já tem os dois.
- **`docs/identidade-visual.md`** (do Alexandre) ainda traz o atalho `text-decoration: underline 2px …`, que o Safari descarta. A Liliane registrou isso em `2026-11-24-l2-e-r1.md`, e a correção ficou para depois.
- **Da memória da Liliane:**
  - conferir em Deployments, na Vercel, se a produção está no deploy da `main`;
  - o domínio fixo da `dev`, que foi adiado;
  - o README com o domínio de produção e o link do preview da `dev`.
- As pendências de `2026-11-24-r1-fase-1-na-producao.md` continuam: o compartilhamento do quadro, a extensão do Chrome e o sublinhado no Safari.

## Próximos passos
1. Abrir o modal de uma temporada no preview da `dev` e conferir se o pôster aparece inteiro.
2. Corrigir o atalho do sublinhado no `docs/identidade-visual.md`.
3. Revisar Personagens e Episódios da Liliane quando ela abrir os PRs.
