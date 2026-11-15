---
name: atualizar-branch
description: Atualiza a branch de trabalho da pessoa da dupla com a dev, pelo git pull origin dev. Use quando o usuário pedir para atualizar a branch ou puxar as novidades da dev.
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
2. **Mandar o comando:** o Claude não roda o pull, porque ele pode criar um commit de merge na branch local. Mande ao usuário:

```bash
git pull --no-edit origin dev
```

3. **Se ele trouxer conflito ou erro:** mostre os arquivos afetados e explique a mensagem do Git. Não resolva o conflito, não descarte alterações nem aborte o merge sem o usuário pedir.
4. **Responder em português do Brasil:** depois que ele rodar, execute `git log -1 --format="%h %s"` e informe o commit atual e o que chegou, ou diga que a branch já estava atualizada.

## Regras

- Esta skill não roda `git pull`, `git commit` nem `git push`, e não abre PR. Todo comando que muda a branch vai em bloco para o usuário rodar.
