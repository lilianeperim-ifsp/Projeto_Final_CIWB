---
data: 2026-11-24
autor: Alexandre Santos
assunto: R1, Fase 1 na produção
---

## Resumo
Continuação de `2026-11-24-revisao-e-merge-do-pr-14.md`. A dupla estava lado a lado na sala de aula.

- **Cartão T12 da Liliane** ("Revisar e fazer merge do A2 e de Famílias") foi para Feito às 20:17. As duas partes já estavam feitas desde 23/11.
- **Quadro kanban:** cada cartão passou a mostrar o seu id único no canto de cima, em maiúscula (T01, T12…). A busca também acha pelo id, e a janela de edição mostra "Editar cartão T12". O pedido veio porque dois cartões têm o mesmo código A2 (T08 e T12).
- **R1 (T13, "Primeiro PR dev → main"):** foi para Fazendo às 20:21, depois que o T09 (L2), o T10 (Vercel) e o T12 ficaram em Feito. A Liliane abriu o PR #15 ("release: Fase 1 na produção (R1)", `dev` → `main`) às 20:31. O Alexandre aprovou, e a Liliane fez o merge às 20:33 (merge `46f9944`). O T13 foi para Feito às 20:39, com o PR 15 no cartão.

## Decisões tomadas
- **No quadro, o id aparece em maiúscula, mas no banco continua em minúscula** (`t13`). Assim a rotina automática, o `/sincronizar-quadro` e as chamadas ao banco não mudam. A alternativa de renomear os documentos no banco foi descartada.
- **O PR #15 foi aprovado sem nova revisão de código**, porque tudo o que ele leva já tinha sido revisado nos PRs #7 a #14. O que o Claude conferiu:
  - o PR leva exatamente a `dev` (`b3f14a9`), com 39 commits e 36 arquivos;
  - a simulação do merge com a `main` não deu conflito, e os checks da Vercel passaram;
  - no preview da `dev`, as seis páginas e os 15 arquivos locais (CSS, JS, `img/favicon.png` e `img/logo.png`) respondem 200, e o `cache.js` publicado já é o do PR #14;
  - a tvd-api devolve 49, 171, 8, 9 e 10, os números da inicial (D1).
- **Conferência da produção** (https://projetofinalciwb.vercel.app/):
  - o Claude conferiu que a raiz, as seis páginas e os 15 arquivos respondem 200, e que o `cache.js`, o `inicio.js` e o `style.css` da produção são idênticos aos da `main`;
  - a dupla conferiu no navegador o menu, a inicial e Espécies, e estava tudo certo.
- **O T13 só foi para Feito depois da conferência da dupla no navegador**, porque o cartão pede para conferir na produção e o Claude não conseguiu abrir o navegador.

## Erros e rejeições da IA
- A extensão do Chrome falhou três vezes: o grupo de abas era criado e logo deixava de reconhecer a aba. O Claude parou, explicou o problema e deixou a conferência no navegador para a dupla.
- O Alexandre disse "aprovei e mesclei", mas o `mergedBy` do GitHub mostra que quem fez o merge do #15 foi a Liliane. O registro segue o GitHub, como combinado em `2026-11-23-merge-do-pr-13-e-tarefas-livres.md`.

## Pendências
- **Personagens, Temporadas e Episódios** estão na produção só com o menu e o rodapé. Elas entram na Fase 2.
- **Compartilhamento do quadro:** na publicação, o quadro apareceu como privado. Se a Liliane não conseguir abrir, o Alexandre compartilha pelo menu Compartilhar da página.
- **Extensão do Chrome:** não funcionou nesta sessão. Ela é necessária para o Claude testar as páginas no navegador.
- **Sublinhado no Safari:** ainda não foi testado num iPhone ou Mac.

## Próximos passos
1. Página de Temporadas (`js/paginas/temporadas.js`, prazo 28/11), como descrito em `2026-11-23-merge-do-pr-13-e-tarefas-livres.md`.
2. As outras tarefas da Fase 2 que ficaram livres no quadro.
