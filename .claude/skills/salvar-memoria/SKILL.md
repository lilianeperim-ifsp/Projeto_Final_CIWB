---
name: salvar-memoria
description: Salva um resumo da sessão atual e das discussões sobre o Projeto Prático de CIWB em memory/AAAA-MM-DD-assunto.md, para a dupla compartilhar. Use quando o usuário pedir para salvar a memória da sessão ou ao encerrar uma sessão de trabalho.
disable-model-invocation: true
---

# Salvar memória da sessão

Registra, em um arquivo versionado na pasta `memory/` (raiz do repositório), o que foi discutido e decidido nesta sessão. O projeto é feito em dupla, então este registro precisa permitir que qualquer um dos dois entenda as decisões sem ter participado da sessão.

`/memory` é o comando interno do Claude Code e não faz isto. Esta skill é a do projeto.

## Passos

1. **Autor:** execute `git config user.name`. Se vier vazio, pergunte o nome ao usuário.
2. **Data:** use a data de hoje no formato `AAAA-MM-DD`.
3. **Assunto principal:** escolha o tema central da sessão em poucas palavras. Se o usuário passou um assunto como argumento, use-o.
4. **Nome do arquivo:** `memory/AAAA-MM-DD-assunto-principal.md`, com o assunto em minúsculas, sem acento, sem caracteres especiais e com hifens (ex.: `2026-11-15-estrutura-do-projeto.md`). Se o arquivo já existir, **não sobrescreva**: acrescente `-2`, `-3`, … antes de `.md`.
5. **Conteúdo:** escreva em português do Brasil, usando exatamente este modelo:

```markdown
---
data: AAAA-MM-DD
autor: <nome do git>
assunto: <assunto principal>
---

## Resumo
O que foi discutido e feito na sessão, em poucas frases.

## Decisões tomadas
Para cada decisão: o que foi decidido, o porquê e a alternativa descartada.

## Erros e rejeições da IA
Casos em que o Claude errou (fugiu de um requisito do enunciado, saiu do estilo dos exemplos do professor, gerou código incorreto) ou em que a dupla rejeitou uma sugestão dele, com como foi percebido e corrigido. Escreva "Nenhum" se não houve.

## Pendências
Dúvidas em aberto e coisas que dependem da outra pessoa da dupla ou do professor.

## Próximos passos
O que fazer na próxima sessão.
```

6. **Enviar:** o Claude não roda `git add`, `git commit` nem `git push`. Mande ao usuário um bloco com os comandos, um por linha, para ele rodar um de cada vez:

```bash
git status
git add memory/AAAA-MM-DD-assunto-principal.md
git commit -m "Memória da sessão: <assunto>"
git push
```

   A mensagem do commit é só essa: sem linha `Co-Authored-By` e sem rodapé citando Claude ou IA.

7. **Avisar o usuário:** informe o caminho do arquivo criado.

## Regras

- Registre apenas o que realmente aconteceu na sessão. Não invente decisões.
- Seja específico: nomes de arquivos, funções e requisitos do enunciado (RF, RN, RNF) citados nas discussões.
- Não copie código longo; descreva a ideia e aponte os arquivos.
