---
data: 2026-11-18
autor: lilianeperim-ifsp
assunto: revisão do PR #9
---

## Resumo
Conferimos os PRs abertos. Havia dois, os dois para a `dev`: o #9 ("docs: design das páginas", do alexsant22) e o #10 ("feat: esqueleto das páginas e layout (L1)", da Liliane). O #9 só mexe em `docs/identidade-visual.md` e `docs/plano.md`. Ele foi revisado, e a Liliane aprovou e mergeou na `dev`. Depois a `dev` local foi atualizada com `git pull --ff-only`, e um teste de merge mostrou que o #10 entra na `dev` atualizada sem conflito.

## Decisões tomadas
- **Aprovar o #9 sem esperar ajustes.** Por quê: é só documentação, sem conflito com a `dev` e sem tocar em nenhum arquivo do #10. Alternativa descartada: pedir que o design fosse alinhado ao CSS do L1 antes do merge.
- **Item ativo do menu: fica o sublinhado dourado do #9.** O L1 usa fundo vinho com texto claro (`#menu .nav-link.active` em `css/style.css`). O design aprovado usa traço dourado de 2px em `--tvd-link`, com o texto na cor principal. A troca entra no L2. Alternativa descartada: manter o fundo vinho do L1.
- **Esperar o merge do #10 para começar o L2.** Por quê: o L2 se apoia no L1, e começar depois deixa o PR do L2 só com as mudanças novas. Alternativa descartada: começar o L2 já, com o L1 ainda aberto.

## Erros e rejeições da IA
Nenhum.

## Pendências
- O alexsant22 precisa revisar e mergear o PR #10 (L1).
- Atenção para o L2: o CSS do documento usa o seletor `.navbar .nav-link.active`, que perde para o `#menu .nav-link.active` do L1 (o seletor com id tem prioridade). A regra antiga precisa ser substituída, não só acrescentada. Vale o mesmo para as variáveis `--bs-navbar-*`, que no L1 estão em `#menu`.

## Próximos passos
Depois do merge do #10:
1. Atualizar a `dev` local (`git pull --ff-only`) e conferir se a `trabalho/lilianeperim-ifsp` está em dia com ela.
2. Fazer o L2 em `css/style.css`: o sublinhado dourado no menu ativo e o resto do CSS da seção "Design das páginas" de `docs/identidade-visual.md` (tipografia Cinzel/Lato, `.card-recurso`, `.foto-recurso`, `.poster`, `.iniciais` em 4:5, `.selo-fundadora`, `.contagem`, `.foto-detalhe`, `dt` do modal).
3. Colocar o `<link>` do Google Fonts (Cinzel 500/700 e Lato 400/700) no `<head>` de `index.html` e das cinco páginas de `pages/`, antes do `style.css`.
