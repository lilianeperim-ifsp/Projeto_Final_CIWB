---
name: atualizar-branch
description: Atualiza a branch de trabalho da pessoa da dupla com a dev. O Claude tenta o git pull --ff-only origin dev e, se não der, manda o comando para o usuário. Use quando o usuário pedir para atualizar a branch ou puxar as novidades da dev.
disable-model-invocation: true
---

# Atualizar a branch com a dev

Traz para a branch `trabalho/<usuario-github>` o que a dupla já integrou na `dev`, inclusive as memórias das sessões.

## Branches do projeto

- `main`: branch principal, publicada na Vercel. Só recebe PR da `dev`, depois dos testes.
- `dev`: onde a dupla testa e confere se está tudo certo antes de subir para a `main`.
- `trabalho/<usuario-github>`: uma para cada pessoa da dupla. É onde se desenvolve, e o trabalho vai para a `dev` por PR.

## Passos

1. **Conferir a branch:** execute `git branch --show-current`. Se o resultado não começar com `trabalho/`, pare e avise o usuário.
2. **Conferir se não há nada pendente:** execute `git status --porcelain`. Se houver alteração, pare e peça ao usuário para fazer o commit (ou dizer o que fazer com ela) antes de atualizar.
3. **Tentar o avanço direto:** execute `git pull --ff-only origin dev`. Ele só avança a branch e nunca cria commit.
   - **Se der certo e a branch avançou:** execute `git push` para a branch do GitHub ficar igual e vá para o passo 5.
   - **Se a branch já estava atualizada:** vá para o passo 5.
   - **Se o Git disser que não é possível avançar direto** (a branch tem commits que a `dev` não tem, e a `dev` tem commits que a branch não tem): siga o passo 4.
4. **Mandar o comando com merge para o usuário:** mostre o que só existe na `dev` com `git log --oneline HEAD..origin/dev`. Como o próximo comando cria um commit de merge, quem roda é o usuário:

```bash
git pull --no-edit origin dev
```

   Depois que ele avisar que rodou, execute `git push`.
   **Se trouxer conflito ou erro:** mostre os arquivos afetados e explique a mensagem do Git. Não resolva o conflito, não descarte alterações nem aborte o merge sem o usuário pedir.
5. **Responder em português do Brasil:** execute `git log -1 --format="%h %s"` e `git status -sb`. Informe o commit atual, o que chegou (ou que a branch já estava atualizada) e se a branch ficou igual à do GitHub.

## Regras

- O Claude só roda `git pull` com `--ff-only` e só dá `git push` na branch `trabalho/<usuario-github>` de quem está na sessão, nunca com `--force`.
- O Claude não roda `git commit` nem `git merge`, e não abre PR. Todo comando que cria commit vai em bloco para o usuário rodar.
