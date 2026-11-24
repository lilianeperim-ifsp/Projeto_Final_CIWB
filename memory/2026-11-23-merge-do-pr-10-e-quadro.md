---
data: 2026-11-23
autor: lilianeperim-ifsp
assunto: merge do PR #10 e quadro
---

## Resumo
Continuação de `2026-11-23-revisao-do-pr-11-e-fontes-do-l1.md`. A Liliane aprovou o PR #11 (A1). A primeira tentativa não ficou registrada no GitHub e precisou ser refeita, e na segunda a aprovação apareceu, às 21:27. Ela também pediu ao alexsant22 que revisasse o PR #10 (L1) de novo e depois mesclou o #10 na `dev` (commit `162c632`, às 21:29), com o ok dele por mensagem. Em seguida, o Claude conferiu os cartões "Esqueleto das páginas e layout" e "Logo e favicon" do quadro e avançou a `trabalho/lilianeperim-ifsp` até a `dev` com `git pull --ff-only`.

## Decisões tomadas
- **Merge do #10 sem a aprovação formal do alexsant22:** a `dev` não tem proteção de branch nem regras (rulesets), então o GitHub permitia o merge mesmo com a revisão dele marcada como "Changes requested". O Claude recomendou esperar a nova revisão. A Liliane mesclou porque o alexsant22 pediu por mensagem. O merge foi feito com "Merge pull request" (`gh pr merge 10 --merge`), sem squash nem rebase e sem apagar a branch. O Claude sugeriu deixar um comentário no PR registrando o ok por mensagem.
- **Cartões do quadro:**
  - "Logo e favicon" está concluído: o `img/logo.png` (selo de cera vinho com "MF" dourado) e o `img/favicon.png` estão na `dev`.
  - "L1 · Revisar e fazer merge do L1" está concluído com o merge do #10.
  - "Esqueleto das páginas e layout": todo o código está na `dev` (6 HTMLs, `layout.js`, `tema.js`, `style.css`, `js/paginas/*.js`). O cartão ainda depende de "A1 · Revisar e fazer merge do A1". O plano não liga o L1 ao A1, mas o botão "Limpar dados salvos" do rodapé chama o `limparCache()` do `cache.js` e dá erro no clique até o #11 entrar na `dev`. A recomendação foi mover o cartão quando o #11 for mesclado. Mover agora também é aceitável, sabendo que o botão fica dando erro até lá.
- **Avanço da branch antes da memória:** a branch estava só um commit atrás da `dev` (o merge do #10), então o `git pull --ff-only origin dev` avançou a branch sem criar commit. Assim o commit desta memória entra depois do merge, e a próxima atualização não vai precisar de um commit de merge.

## Erros e rejeições da IA
Nenhum.

## Pendências
- **PR #11:** está aprovado e sem conflito com a `dev`, mas falta o merge, que a Liliane ou o alexsant22 fazem.
- **Cartões "Esqueleto das páginas e layout" e "A1 · Revisar e fazer merge do A1":** vão para concluído depois do merge do #11.

## Próximos passos
1. Depois do merge do #11, rodar `/atualizar-branch` para trazer o A1 para a `trabalho/lilianeperim-ifsp`.
2. Começar o L2:
   - `css/style.css` com a tipografia Cinzel/Lato, o sublinhado dourado do menu ativo e o resto da seção "Design das páginas" de `docs/identidade-visual.md`;
   - `js/paginas/inicio.js`, com os cinco cards de contagem usando o `buscarComCache`.
3. O alexsant22 já pode começar o A2 (Espécies), que dependia do merge do L1.
