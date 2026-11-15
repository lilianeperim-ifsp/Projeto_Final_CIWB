---
data: 2026-11-15
autor: Alexandre Santos
assunto: branch da liliane
---

## Resumo
Depois do fechamento do dia (`2026-11-15-fechamento-do-dia.md`), o Alexandre criou a branch da Liliane no GitHub e fez o merge do PR #2 na `dev`. A conferência mostrou que a `trabalho/lilianeperim-ifsp` tinha sido criada a partir do `Initial commit`, provavelmente da `main`, e por isso não tinha nada do que foi feito em 15/11. O Alexandre atualizou a branch dela com a `dev`, e a cópia local dessa branch na máquina dele foi apagada depois.

## Decisões tomadas
- **Usuário do GitHub da Liliane confirmado: `lilianeperim-ifsp`.** A branch dela é `trabalho/lilianeperim-ifsp`. Isso fecha a decisão D10 do `docs/plano.md`.
- **Branch da Liliane atualizada com a `dev`.** Ela tinha nascida no `Initial commit` e estava 11 commits atrás da `dev`: sem as transcrições, as skills, o `CLAUDE.md`, o plano, o esqueleto do site e as memórias. Como ainda não tinha commit próprio, o Alexandre fez, da máquina dele, o checkout da branch, `git pull --no-edit origin dev` (avanço direto, sem commit de merge) e `git push`, e voltou para a `trabalho/alexsant22`. Conferido depois: a `trabalho/lilianeperim-ifsp` ficou igual à `dev` (commit `7f53c82`, merge do PR #2). Alternativa descartada: deixar a própria Liliane atualizar antes do L1, o que arriscava ela começar o trabalho sem o esqueleto e sem o `CLAUDE.md`.
- **Instruções para a Liliane mudaram.** Como a branch já existe, ela não deve criar outra com `git checkout -b`. Na máquina dela basta clonar o repositório (ou rodar `git fetch origin`, se já tiver) e fazer `git checkout trabalho/lilianeperim-ifsp`.
- **Cópia local da branch da Liliane apagada na máquina do Alexandre**, com `git branch -d trabalho/lilianeperim-ifsp`, a pedido dele, para evitar trabalhar nela por engano. A branch do GitHub não foi afetada.

## Erros e rejeições da IA
Nenhum.

## Pendências
- Trocar `<usuario-da-liliane>` por `lilianeperim-ifsp` no `docs/plano.md` (seções 1a e 7). Combinado para ir junto com o PR A1, sem PR só para isso. As memórias anteriores ficam como estão, porque registram o que se sabia na hora.
- Confirmar com o professor se a página inicial pode existir (D1 do plano).
- A `trabalho/alexsant22` está 2 commits atrás da `dev` (só os merges dos PRs #1 e #2). Vai ser atualizada com `/atualizar-branch` em 17/11.
- Esta memória vai para a `trabalho/alexsant22` e chega à `dev` no próximo PR (A1), porque o PR #2 já foi mergeado.

## Próximos passos
- Alexandre, manhã de 17/11: `/atualizar-branch`, trocar `<usuario-da-liliane>` no `docs/plano.md` e fazer o PR A1 (`js/cache.js` e `js/api.js`).
- Liliane, de 16 a 20/11: fazer o checkout da `trabalho/lilianeperim-ifsp` e o PR L1 (6 HTMLs, `js/layout.js`, `css/style.css` base, `js/paginas/*.js` mínimos, `img/logo.png` e `img/favicon.png`).
