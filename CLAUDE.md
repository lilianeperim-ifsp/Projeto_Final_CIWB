# Projeto Prático de CIWB

Regras para toda sessão do Claude Code neste repositório.

## Modelo de branches

- `main`: branch principal do projeto, publicada na Vercel.
- `dev`: onde a dupla testa e confere se está tudo certo antes de subir para a `main`.
- `trabalho/<usuario-github>`: uma branch de trabalho para cada pessoa da dupla. É onde se desenvolve, e cada uma vai para a `dev` por PR.

O caminho é sempre `trabalho/<usuario-github>` → PR → `dev` → testes → PR → `main` → Vercel.

## Git

O Claude não roda `git add` nem `git commit`, e não abre nem mergeia PR. Quem faz isso é o usuário.

O Claude pode rodar:

- comandos de leitura: `git status`, `git diff`, `git log`, `git branch` (só para listar) e `git fetch`;
- `git switch`, para trocar de branch quando o passo pedir (por exemplo, atualizar a `dev` local) e voltar para a branch de trabalho;
- `git pull --ff-only`, que só avança a branch e nunca cria commit. Se o fast-forward falhar, ele para e manda ao usuário o comando que resolve;
- `git push` da branch `trabalho/<usuario-github>` de quem está na sessão, sem `--force`, depois que o usuário avisar que fez o commit.

O Claude nunca:

- roda `git pull` sem `--ff-only` (nem com `--rebase` ou `--no-ff`), porque pode criar commit de merge;
- dá `git push` para a `dev` ou para a `main`, que só recebem trabalho por PR;
- roda `git merge`, `git rebase` ou `git reset`;
- usa `git push --force` nem `--force-with-lease`;
- apaga branch ou tag;
- mexe na branch da outra pessoa da dupla;
- resolve conflito, descarta alterações ou aborta um merge sem o usuário pedir. Se algo der errado, ele para, mostra o problema e explica as opções, e quem executa é o usuário.

Boa parte dessas proibições também está travada no `.claude/settings.json` (lista `deny`), e o Claude Code recusa esses comandos antes de rodar. A trava não cobre tudo: ela compara o texto do comando e não consegue exigir o `--ff-only` no `git pull`. Por isso a regra deste arquivo continua sendo a principal.

Ao terminar cada passo, mande um bloco com os comandos git desse passo, um comando por linha, para o usuário rodar um de cada vez: primeiro `git status`, depois um `git add` para cada arquivo (nunca `git add .` nem `-A`) e o `git commit` com a mensagem. Quando o usuário avisar que fez o commit, o Claude roda o `git push` e confere com `git status -sb` se a branch ficou igual à do GitHub. Quando for hora de PR, o comando ou o link para abrir vai num bloco para o usuário. Exemplo:

```bash
git status
git add js/api.js
git commit -m "feat: funções de acesso à tvd-api"
```

## Contribuidores

O Claude não pode aparecer como contribuidor no GitHub. Nas mensagens de commit e nas descrições de PR:

- nada de linha `Co-Authored-By` (o GitHub conta quem aparece nela como contribuidor);
- nada de rodapé "Generated with Claude Code" nem de emoji de robô;
- nada de citar Claude ou IA no texto.

A mensagem descreve só o que mudou no código.

## Contexto

Antes de propor código, leia:

- `docs/contexto/`: enunciado, tvd-api, slides de todas as aulas (1 a 15) e códigos de exemplo do professor (comece pela seção "Padrões do professor" de `codigos-exemplo.md`).
- `memory/`: memórias das sessões anteriores da dupla, gravadas pela skill `salvar-memoria`.
