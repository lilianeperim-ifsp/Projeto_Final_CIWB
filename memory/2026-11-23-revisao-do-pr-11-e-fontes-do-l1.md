---
data: 2026-11-23
autor: lilianeperim-ifsp
assunto: revisão do PR #11 e fontes do L1
---

## Resumo
A `trabalho/lilianeperim-ifsp` foi atualizada com a `dev` (merge `0f40fcf`, que trouxe o `e7660af` "docs: design das páginas" do PR #9). Depois o Claude revisou o PR #11 do Alexandre (A1: `js/cache.js`, `js/api.js` e ajustes no `docs/plano.md`) e conferiu o PR #10 da Liliane (L1). O #10 ainda não estava aprovado: o Alexandre tinha pedido alterações em 19/11. A alteração foi feita no commit `d1f3363` e já está no GitHub.

## Decisões tomadas
- **Atualização da branch com merge:** o `git pull --ff-only origin dev` falhou porque a branch e a `dev` tinham commits diferentes. A Liliane rodou `git pull --no-edit origin dev`, e o Claude deu o push. Não havia outra opção dentro das regras do `CLAUDE.md`, que proíbem `rebase`.
- **PR #11 pode ser aprovado:** as funções foram testadas contra a tvd-api de verdade, no Node, com um `localStorage` simulado:
  - `buscarComCache` faz 1 requisição na primeira vez e 0 na segunda (RN02);
  - `buscarTodos('episodes')` devolve 171 episódios (RF03);
  - o `aoCarregarPagina` conta `1/5 … 5/5` nos personagens;
  - `buscarRelacionados` devolve as espécies da Elena na ordem certa (D2);
  - `limparCache()` apaga o cache e mantém a chave `tema`;
  - uma página inexistente dá 404 e devolve `null`, e `buscarRelacionados([])` devolve `[]`.

  O código segue o contrato da seção 4 do `docs/plano.md` e o estilo do professor (`async`/`await`, `if (!resposta.ok)` com o erro primeiro, prefixo `json`). Os ajustes da D1 e da D10 no plano estão corretos. A aprovação é da Liliane (`gh pr review 11 --approve`), e o Claude não aprova.
- **Pedido do Alexandre no PR #10:** o `<link>` do Google Fonts (Cinzel 500/700 e Lato 400/700) entrou no `<head>` do `index.html` e das cinco páginas de `pages/`, entre o CSS do Bootstrap e o `style.css`, na ordem que a seção 4 do plano pede. Entrou agora, e não no L2, porque `especies.html`, `familias.html` e `temporadas.html` passam para o Alexandre depois do merge. O sublinhado dourado do menu ativo continua no L2, como ele aceitou.

## Erros e rejeições da IA
Nenhum.

## Pendências
- **PR #11:** a Liliane precisa aprovar (o Claude passou o comando `gh pr review 11 --approve`).
- **Detalhes do PR #11** que não impedem a aprovação e ficam para o Alexandre decidir se muda:
  - se o `salvarCache` falhar (armazenamento cheio), o `catch` de `buscarComCache` mostra "Sem conexão com a API", o que não é verdade;
  - se uma chave do cache estiver com um valor corrompido, o `JSON.parse` do `lerCache` dá erro fora do `try`.
- **PR #10:** o Alexandre precisa revisar de novo. Os comandos `gh pr comment 10` e `gh pr edit 10 --add-reviewer alexsant22` foram passados à Liliane.
- **Quadro:** o L1 continua em revisão até a aprovação e o merge do #10.

## Próximos passos
1. Depois do merge do #11 e do #10, atualizar a `dev` local e a `trabalho/lilianeperim-ifsp` (skill `atualizar-branch`).
2. Mover o L1 para concluído no quadro.
3. Começar o L2:
   - `css/style.css` com a tipografia Cinzel/Lato (`--tvd-fonte-titulo` e `--tvd-fonte-texto` de `docs/identidade-visual.md`), o sublinhado dourado do menu ativo e o resto da seção "Design das páginas";
   - `js/paginas/inicio.js`, com os cinco cards de contagem usando `buscarComCache(URL_API + '/' + recurso)` do A1.
