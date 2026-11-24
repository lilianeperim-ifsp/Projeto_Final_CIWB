---
data: 2026-11-23
autor: lilianeperim-ifsp
assunto: atualização da branch com o PR #13
---

## Resumo
Continuação das sessões registradas em `2026-11-23-revisao-do-pr-12.md` e `2026-11-23-vercel-ligada.md`. Depois do merge do PR #13 (Famílias) na `dev`, a `trabalho/lilianeperim-ifsp` foi atualizada pela skill `atualizar-branch` (merge `94274f5`, sem conflito). Antes disso, o commit da memória da Vercel (`b453f82`) ficou parado localmente e só chegou ao GitHub quando o Claude deu o push.

## Decisões tomadas
- **Atualização com merge:** o `git pull --ff-only origin dev` falhou porque a branch tinha três memórias (`08da5f6`, `389001d` e `b453f82`) que a `dev` não tinha. A Liliane rodou `git pull --no-edit origin dev` e deu o push. Não houve conflito, porque os commits dela só criavam arquivos novos em `memory/`. O `rebase` foi descartado, porque o `CLAUDE.md` proíbe.
- **O que chegou da `dev`:**
  - PR #12 (A2): `js/ui.js`, `js/busca.js` e `js/paginas/especies.js`, com o commit de correção `5e23e2a` (`criarListaDetalhes` e `criarCard` aceitam número, `#form-busca.onsubmit` ligado assim que o `busca.js` carrega, e `criarIniciais` como `<span>` no `docs/plano.md`);
  - PR #13: `js/paginas/familias.js` e a memória do Alexandre;
  - `b842de2`: o Alexandre corrigiu na memória dele quem fez o merge do #12, como a Liliane tinha apontado na aprovação do #13.

  Com isso, a branch da Liliane já tem os cards de Espécies e Famílias que o `css/style.css` da L2 vai estilizar (`.card-recurso`, `.iniciais`, `.selo-fundadora`).

## Erros e rejeições da IA
Nenhum.

## Pendências
- **Preview da `dev` sem login:** ainda não foi conferido. O merge do #13 deve ter gerado o primeiro preview da `dev` na Vercel. Falta abrir numa janela anônima e testar Espécies e Famílias no navegador: o selo, o modo Offline com o cache limpo e o teclado (Tab, Enter e Esc, com o foco voltando ao card).
- **README:** mandar o domínio https://projetofinalciwb.vercel.app/ ao Alexandre.
- **Quadro kanban:** a Liliane ainda não tem acesso de edição. Os cartões V e t12 precisam ir para Feito, e o t11 a rotina das 9h move sozinha.
- **L2:** `css/style.css` final e `js/paginas/inicio.js`, prazo em 24/11.

## Próximos passos
1. Começar a L2 na `trabalho/lilianeperim-ifsp`: o `css/style.css` a partir de `docs/identidade-visual.md` (tipografia Cinzel/Lato, cards, iniciais, selo, modal e sublinhado dourado do menu ativo) e o `js/paginas/inicio.js`, com os cinco cards de contagem usando `buscarComCache(URL_API + '/' + recurso)`.
2. Conferir o preview da `dev` sem login.
3. Pedir ao Alexandre acesso de edição ao quadro.
