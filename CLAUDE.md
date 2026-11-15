# Projeto Prático de CIWB

Regras para toda sessão do Claude Code neste repositório.

## Modelo de branches

- `main`: branch principal do projeto, publicada na Vercel.
- `dev`: onde a dupla testa e confere se está tudo certo antes de subir para a `main`.
- `trabalho/<usuario-github>`: uma branch de trabalho para cada pessoa da dupla. É onde se desenvolve, e cada uma vai para a `dev` por PR.

O caminho é sempre `trabalho/<usuario-github>` → PR → `dev` → testes → PR → `main` → Vercel.

## Git

O Claude não roda `git add`, `git commit`, `git push` nem `git pull`, e não abre PR. Quem faz isso é o usuário.

Ao terminar cada passo, mande um bloco com os comandos git desse passo, um comando por linha, para o usuário rodar um de cada vez: primeiro `git status`, depois um `git add` para cada arquivo (nunca `git add .` nem `-A`), o `git commit` com a mensagem e o `git push`. Quando for hora de PR, o comando ou o link para abrir vai no mesmo bloco. Exemplo:

```bash
git status
git add js/api.js
git commit -m "feat: funções de acesso à tvd-api"
git push -u origin trabalho/<usuario-github>
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
