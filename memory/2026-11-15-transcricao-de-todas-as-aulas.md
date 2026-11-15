---
data: 2026-11-15
autor: Alexandre Santos
assunto: transcrição de todas as aulas
---

## Resumo
Continuação da sessão de planejamento (ver `memory/2026-11-15-estrutura-do-projeto.md`). O plano aprovado foi copiado para `docs/plano.md`, para a Liliane ter acesso a ele pelo repositório. O Alexandre notou que só as aulas 10 a 14 tinham sido transcritas e pediu todas. Foram transcritas as aulas 1 a 9 e 15 em `docs/contexto/slides/`, e `docs/contexto/codigos-exemplo.md` passou a cobrir as 15 pastas de exemplo do professor. A seção "Contexto" do `CLAUDE.md` foi atualizada.

## Decisões tomadas
- **Plano dentro do repositório:** `docs/plano.md` é uma cópia sem alterações do plano aprovado, com uma linha no topo dizendo que o "você" do texto é o Alexandre. Motivo: o plano original fica numa pasta local do Claude Code, fora do repositório, e a Liliane não teria acesso.
- **Transcrever todas as aulas:** o prompt de planejamento deixava de fora as aulas 1 a 9 (base da linguagem) e não citava a 15. A dupla decidiu incluir todas, de 1 a 15. A aula 15 (Expressões Regulares) também é a base da regex de acentos que o `busca.js` vai usar no RF06 e que precisa ser explicada na apresentação. Descartado: transcrever só a aula 15.
- **Arquivos novos em `docs/contexto/slides/`:** `01-introducao-ao-javascript.md`, `02-fundamentos-do-javascript.md`, `03-tipos-de-dados.md`, `04-estruturas-condicionais-e-de-repeticao.md`, `05-funcoes.md`, `06-strings.md`, `07-arrays.md`, `08-objetos.md`, `09-objeto-date.md` e `15-expressoes-regulares.md`. Cada um tem o mesmo número de slides do PDF. Os erros do material original foram mantidos e anotados, como o título "Declarações condicionais" nas aulas 5 e 6 e o `<h1>Título/h1>` da aula 2.
- **`codigos-exemplo.md` com os 55 arquivos de exemplo** (pastas `01.helloworld` a `15.regex`), copiados por script e conferidos um a um com o original. No topo foi incluída uma tabela pasta → aula, porque a numeração das pastas não bate com a dos slides (por exemplo, `09.eventos` é a aula 10, e a aula 3 não tem pasta própria).
- **Novos itens em "Padrões do professor":**
  - datas do `08.date`: `AAAA-MM-DD` separado com `split('-')` e `new Date(ano, mes - 1, dia)`, o mesmo jeito previsto para o `formatarData` do `ui.js`;
  - expressões regulares do `15.regex`: literal com as flags `i`/`g`, âncoras `^...$`, `test()` e `replace()` com `$1`/`$2`;
  - entrada e saída com `prompt`/`alert`/`console.log` nas primeiras aulas.
- **`CLAUDE.md`:** a seção "Contexto" agora fala em "slides de todas as aulas (1 a 15)".
- **Registros históricos sem mudança:** o `docs/plano.md` e a memória `2026-11-15-estrutura-do-projeto.md` ainda falam em "aulas 10 a 14", porque registram o que foi decidido naquele momento.

## Erros e rejeições da IA
- O primeiro `/salvar-memoria` desta sessão não rodou como comando, porque a skill foi criada no meio da sessão e o Claude Code só carrega skills ao iniciar. O Claude avisou e seguiu os passos do `SKILL.md` manualmente.
- A ausência das aulas 1 a 9 e 15 não foi um erro de transcrição: seguia o recorte do prompt de planejamento. A dupla mudou o recorte e o Claude completou as aulas que faltavam.

## Pendências
- Confirmar o usuário do GitHub da Liliane (os comandos dela usam `trabalho/<usuario-da-liliane>`).
- Confirmar com o professor se a página inicial pode existir (D1 do plano).
- A Liliane revisar e fazer merge do PR do primeiro passo na `dev`, com as transcrições, as skills, o `CLAUDE.md`, o `docs/plano.md` e as memórias. Depois, rodar `/atualizar-branch`.

## Próximos passos
- Alexandre, manhã de 17/11: PR A1 (`js/cache.js` + `js/api.js`), testado no console com uma página HTML temporária.
- Liliane, de 16 a 20/11: PR L1 (esqueleto dos 6 HTMLs, `layout.js`, `style.css` base, imagens e os `js/paginas/*.js` mínimos).
