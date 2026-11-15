---
data: 2026-11-15
autor: Alexandre Santos
assunto: fechamento do dia
---

## Resumo
Fechamento do dia 15/11, depois da memória `2026-11-15-esqueleto-do-projeto.md`. O Alexandre tirou duas dúvidas de git: se pode colar um bloco de comandos inteiro no terminal e em que ordem rodar os passos que faltavam. Pela checagem do repositório e do GitHub, toda a parte dele do dia está commitada e enviada: o PR #1 foi mergeado na `dev` e o PR #2 está aberto, esperando a Liliane.

## Decisões tomadas
- **Colar o bloco de git inteiro:** funciona, porque os comandos rodam em sequência. Mas o `git status` deixa de servir de conferência e um erro (por exemplo, um `git add` com o caminho errado) não interrompe os comandos seguintes. Combinado: em blocos de um arquivo só, pode colar tudo. Em blocos grandes, como o do esqueleto, rodar primeiro o `git status`, conferir e depois colar o resto. No fim, conferir se aparece `nothing to commit, working tree clean`.
- **Ordem do que faltava:**
  1. Alexandre abre o PR #2 (`trabalho/alexsant22` → `dev`), feito em 15/11. O PR leva os 6 commits que ficaram fora do PR #1: aulas 1 a 9 e 15, `docs/plano.md`, o esqueleto do site e as memórias.
  2. Liliane revisa e faz o merge do PR #2.
  3. Liliane cria a `trabalho/<usuario-dela>` a partir da `dev` já atualizada. Assim ela recebe tudo e não precisa de `/atualizar-branch` agora. Se ainda não tiver o repositório, clona antes.
  4. Alexandre roda `/atualizar-branch` (`git pull --no-edit origin dev`) na manhã de 17/11, antes do A1, para receber o commit de merge da `dev`.
- **Situação conferida no fim do dia:** sem alterações pendentes na máquina do Alexandre, `trabalho/alexsant22` igual ao GitHub, PR #1 mergeado e PR #2 aberto. A branch da Liliane ainda não existe no GitHub.

## Erros e rejeições da IA
Nenhum.

## Pendências
- Liliane: fazer o merge do PR #2 e criar a branch dela (passos 2 e 3 acima).
- Confirmar o usuário do GitHub da Liliane, para trocar `<usuario-da-liliane>` nos comandos dela.
- Confirmar com o professor se a página inicial pode existir (D1 do plano).
- Esta memória vai para a `trabalho/alexsant22` e, se o PR #2 ainda estiver aberto quando for enviada, entra nele.

## Próximos passos
- Alexandre, manhã de 17/11: `/atualizar-branch` e PR A1 (`js/cache.js` e `js/api.js`), testado no console com uma página HTML temporária, sem commit, conforme a seção 6 do `docs/plano.md`.
- Liliane, de 16 a 20/11: PR L1 (6 HTMLs, `js/layout.js`, `css/style.css` base, `js/paginas/*.js` mínimos, `img/logo.png` e `img/favicon.png`).
