---
data: 2026-11-16
autor: Alexandre Santos
assunto: liberação de push e pull
---

## Resumo
Depois da memória `2026-11-16-pr-4-para-a-dev.md`, o Alexandre perguntou se o Claude consegue atualizar as branches sem aparecer como contribuidor do repositório. A resposta foi que sim: o GitHub conta como contribuidor quem aparece como autor do commit ou numa linha `Co-Authored-By`. Os comandos que o Claude roda no terminal do usuário usam o `git config` e o login dele. A dupla decidiu liberar ao Claude só o `git pull --ff-only` e o `git push` da branch de trabalho. Foram alterados `.claude/settings.json`, `CLAUDE.md` e as skills `atualizar-branch` e `salvar-memoria`. O Alexandre fez o commit `0f474bf`, e o Claude deu o push na `trabalho/alexsant22`. Foi o primeiro push feito pelo Claude com a regra nova.

## Decisões tomadas
- **Liberados ao Claude o `git pull --ff-only` e o `git push` da `trabalho/<usuario-github>` de quem está na sessão, sem `--force`.** Esses comandos não criam commit, e o que eles levam ao GitHub sai com a identidade do usuário. Por isso o Claude não vira contribuidor. Continua com o usuário tudo o que cria commit (`git add`, `git commit`, `git pull` com merge) e o PR (abrir e mergear). Alternativas descartadas:
  - manter tudo com o usuário, como na memória `2026-11-16-regras-de-git.md`;
  - liberar também commit e merge, que tiraria da dupla o controle do que entra no histórico e da revisão por PR.
- **`git switch` também liberado**, para o Claude poder trocar de branch quando o passo pedir (por exemplo, atualizar a `dev` local) e voltar para a branch de trabalho.
- **Proibições novas no `CLAUDE.md`:** `git pull` sem `--ff-only` (ou com `--rebase`/`--no-ff`) e `git push` para a `dev` ou a `main`, que só recebem trabalho por PR.
- **Trava `deny` do `.claude/settings.json` ajustada.** Saíram `git pull` e `git push`. Entraram as formas perigosas desses comandos: push com `--force`, `-f` ou `--delete`, push para `dev` ou `main` (inclusive `*:dev` e `*:main`), e pull com `--rebase`, `-r`, `--no-ff` ou `--no-edit`. Isso vale em Bash e PowerShell, num total de 46 regras. Essas regras usam `*` no meio do padrão, e as antigas só comparavam o começo do comando. A trava não consegue exigir o `--ff-only` no `git pull`, então essa parte depende do `CLAUDE.md`.
- **Fluxo do fim de cada passo mudou.** O bloco que o Claude manda ao usuário termina no `git commit`. Quando o usuário avisa que commitou, o Claude roda o `git push` e confere com `git status -sb`. Isso vale também para a skill `salvar-memoria` (passo 6).
- **Skill `atualizar-branch` reescrita:**
  1. confere se está numa branch `trabalho/` e se não há alteração pendente;
  2. o Claude tenta `git pull --ff-only origin dev` e, se der certo, dá o push;
  3. se as branches divergiram, mostra o que só existe na `dev` e manda ao usuário o `git pull --no-edit origin dev`, que cria commit de merge;
  4. depois do comando do usuário, o Claude dá o push.
- **A configuração `attribution` do Claude Code não foi mexida.** Ela foi citada como reforço para o caso de o Claude passar a commitar. Como o commit continua com o usuário, não foi preciso.

## Erros e rejeições da IA
Nenhum.

## Pendências
- **Ganho limitado do `pull --ff-only`.** Cada merge de PR pelo GitHub cria um commit de merge na `dev`. Então o avanço direto falha sempre que a branch de trabalho tem commits que a `dev` não tem. Em 17/11 isso já vai acontecer: a `trabalho/alexsant22` tem `3a2e409` e `0f474bf`, e a `dev` tem o merge `e865ea4`. O `/atualizar-branch` vai cair no comando que o Alexandre roda.
- **Falta testar a trava numa sessão nova:**
  1. `/permissions` deve mostrar as regras novas na aba de negadas;
  2. o Claude deve ser recusado ao tentar `git push --dry-run --force`.

  Se não for recusado, o `*` no meio do padrão não funciona e a trava precisa ser ajustada.
- **A Liliane precisa ser avisada da mudança.** O commit `0f474bf` e esta memória só chegam à `dev` no PR A1. Até lá, a branch dela continua com as regras antigas, mais restritas.
- **A memória `2026-11-16-regras-de-git.md` registra a regra anterior** (o Claude não dava push nem pull). Ela fica como está, porque registra o que se decidiu na hora. Esta memória a substitui nesse ponto.
- Continuam: trocar `<usuario-da-liliane>` por `lilianeperim-ifsp` no `docs/plano.md` e confirmar com o professor se a página inicial pode existir (D1).

## Próximos passos
- Abrir uma sessão nova, conferir com `/permissions` e testar a recusa do `git push --dry-run --force`.
- Alexandre, manhã de 17/11: `/atualizar-branch` (vai pedir o `git pull --no-edit origin dev`), trocar `<usuario-da-liliane>` no `docs/plano.md` e fazer o PR A1 (`js/cache.js` e `js/api.js`). O PR também leva os commits `3a2e409` e `0f474bf` e esta memória.
- Avisar a Liliane da liberação e de que ela só vale para a branch de trabalho de cada um.
