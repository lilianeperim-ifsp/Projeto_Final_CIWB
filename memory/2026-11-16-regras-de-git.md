---
data: 2026-11-16
autor: Alexandre Santos
assunto: regras de git
---

## Resumo
O Alexandre trouxe um documento de outro projeto, "Regras de Git e commits para o Claude Code", e pediu uma análise para aplicar aqui. O documento foi comparado com o `CLAUDE.md`, as skills `atualizar-branch` e `salvar-memoria`, as memórias e o histórico do git. Ficou decidido aproveitar só a trava de comandos (`deny`) e as listas de comandos permitidos e proibidos. Foram criados o `.claude/settings.json` e uma ampliação da seção Git do `CLAUDE.md`. O Alexandre fez o commit (`9826c72`) e o push na `trabalho/alexsant22`.

## Decisões tomadas
- **O documento não foi adotado inteiro.** Ele foi escrito para outro projeto: branches `bb/<integrante>` e uma página de personagens. Pontos descartados e o motivo de cada um:
  - **O Claude dar `git push` e `git merge --ff-only` na `dev` e na `main`.** Isso pularia o PR e a revisão da outra pessoa da dupla, e o fluxo do projeto é `trabalho/<usuario-github>` → PR → `dev` → PR → `main`. Além disso, o merge pela interface do GitHub cria commits de merge (`7f53c82` e `3ac120e`) que a branch de trabalho não tem, então o `--ff-only` para a `dev` falharia quase sempre. Mantida a regra atual, mais rígida: o Claude não roda `add`, `commit`, `push` nem `pull` e não abre PR.
  - **Branches `bb/<integrante>`.** Continua `trabalho/<usuario-github>`.
  - **Mensagens de commit no imperativo** (ex.: `Adiciona ...`). Continua o padrão atual (`feat:`, `docs:`, `chore:`, `Memória da sessão: ...`), para não misturar estilos no log.
  - **O Claude só sugerir a mensagem de commit.** Continua o bloco completo (`git status`, um `git add` por arquivo, `git commit`, `git push`), que é mais completo e evita `git add .`.
  - **Skill `/atualizar-branch` do documento, que faz push para a `dev`.** O nome coincide com a skill do projeto, que faz o contrário (traz a `dev` para a branch de trabalho). Trocar quebraria o uso atual.
- **Adotada a trava `deny` em `.claude/settings.json`**, adaptada ao projeto. Ela bloqueia, em Bash e em PowerShell: `git add`, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`, `git reset`, `git branch -d`/`-D`, `git tag -d`, `gh pr create` e `gh pr merge`. Fica em `settings.json`, e não em `settings.local.json` (que está no `.gitignore`), para ir para o repositório e valer também para a Liliane. Alternativa descartada: deixar a regra só como texto no `CLAUDE.md`, que o Claude Code não bloqueia de verdade.
- **Seção Git do `CLAUDE.md` ampliada** com:
  - os comandos só de leitura que o Claude pode rodar: `git status`, `git diff`, `git log`, `git branch` (só para listar) e `git fetch`;
  - a lista do que ele nunca faz: `merge`, `rebase`, `reset`, `push --force`/`--force-with-lease`, apagar branch ou tag, mexer na branch da outra pessoa, resolver conflito ou descartar alterações sem pedido;
  - o aviso de que a trava só compara o começo do comando (`git -C pasta commit` escaparia) e de que, por isso, a regra do `CLAUDE.md` continua sendo a principal.
- **Efeito colateral aceito:** a trava também bloqueia o Claude quando ele recebe um pedido explícito. Comandos como o `git branch -d` da cópia local da branch da Liliane (memória `2026-11-15-branch-da-liliane.md`) passam a ser rodados pelo usuário.

## Erros e rejeições da IA
Nenhum.

## Pendências
- A trava só vale em sessão nova do Claude Code. É preciso conferir com `/permissions` se as regras aparecem na aba de negadas.
- A Liliane precisa saber da trava e das listas novas do `CLAUDE.md`. Elas chegam à branch dela quando a `dev` receber o PR A1 e ela rodar `/atualizar-branch`.
- Continuam as pendências de 15/11: trocar `<usuario-da-liliane>` por `lilianeperim-ifsp` no `docs/plano.md` e confirmar com o professor se a página inicial pode existir (D1).

## Próximos passos
- Abrir uma sessão nova e conferir a trava com `/permissions`.
- Alexandre, manhã de 17/11: `/atualizar-branch`, trocar `<usuario-da-liliane>` no `docs/plano.md` e fazer o PR A1 (`js/cache.js` e `js/api.js`). O commit `9826c72` (trava e `CLAUDE.md`) e esta memória chegam à `dev` nesse PR.
