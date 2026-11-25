---
data: 2026-11-23
autor: Alexandre Santos
assunto: merge do PR #13 e tarefas livres
---

## Resumo
Continuação de `2026-11-23-correcoes-do-pr-12-e-familias.md`.

- A Liliane aprovou o PR #13 (página de Famílias) às 21:08. Ela testou com os dados da API: 10 famílias, selo nas 5 fundadoras, Mikaelson com 7 personagens e a busca com "mik", "salv" e "xyz".
- Na revisão, ela apontou que a memória anterior dizia que ela tinha feito o merge do #12, quando quem fez foi o Alexandre. A memória foi corrigida no commit `b842de2`, que entrou no #13.
- O Alexandre fez o merge do #13 às 21:10, e o `/sincronizar-quadro` moveu o cartão "Página de Famílias" (t11) para Feito. Os 13 PRs do repositório estão mergeados, e a coluna "PR aberto" ficou vazia.
- Depois a dupla conferiu quais tarefas do Alexandre estão livres.
- A `dev` local e a `trabalho/alexsant22` avançaram direto até o `c18c9f0` (merge do #13), sem precisar de merge.

## Decisões tomadas
- **Cartão t12 da Liliane ("Revisar e fazer merge do A2 e de Famílias") não foi movido.** As duas partes já foram feitas: ela revisou o #12 e o #13, e o Alexandre fez os dois merges. Mas o cartão é dela, então ele só vai para Feito quando a dupla combinar.
- **A Página de Temporadas (t15) já pode começar.** No quadro ela depende do t12, mas o que ela usa (`ui.js`, `busca.js` e o molde de Espécies e Famílias) já está na `dev`.
- **O que continua bloqueado de verdade:** o R1 (primeiro PR `dev` → `main`), que espera o L2 e a Vercel da Liliane, e o checklist final, itens 1 a 4, que espera as páginas de Personagens, Temporadas e Episódios.

## Erros e rejeições da IA
- A memória anterior dizia que a Liliane fez o merge do #12. Ela percebeu na revisão do #13, e o erro foi corrigido e registrado naquela memória. Desde então o Claude confere o `mergedBy` no GitHub antes de escrever quem fez um merge.

## Pendências
- **Cartão t12:** combinar com a Liliane para passar para Feito. Isso destrava a Temporadas no quadro.
- **Ainda do PR #11:** a mensagem "Sem conexão com a API" aparece quando o problema é o `salvarCache`, e um valor corrompido no cache faz o `JSON.parse` do `lerCache` dar erro fora do `try`.
- **Da Liliane:** L2 e Vercel (V), com prazo em 24/11. Depois vem o R1, que ela abre e o Alexandre revisa.
- **Teste no navegador de Espécies e Famílias:** o teclado, o foco voltando ao card e o modo Offline ainda não foram conferidos pelo Claude.

## Próximos passos
1. Página de Temporadas (`js/paginas/temporadas.js`, prazo 28/11):
   - o card mostra o pôster 2:3 (`ehPoster`), o nome, o período ("2009–2010") e o número de episódios;
   - o modal mostra a estreia e o encerramento com `formatarData`, o número de episódios e a lista numerada dos títulos (`criarListaDeNomes(nomes, true)`), com spinner, porque podem ser até 18 páginas de episódios.
2. Revisar o R1 quando a Liliane abrir.
