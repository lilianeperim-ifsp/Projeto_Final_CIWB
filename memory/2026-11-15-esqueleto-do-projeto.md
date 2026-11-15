---
data: 2026-11-15
autor: Alexandre Santos
assunto: esqueleto do projeto
---

## Resumo
O Alexandre pediu para criar a árvore da seção 2 do plano (`docs/plano.md`). Como cada arquivo da árvore tem um dono (seção 7), o Claude perguntou como criar, e a escolha foi o esqueleto completo: todos os arquivos do site criados vazios, cada um com uma linha de comentário dizendo o que é e quem é o dono. Foi acrescentada uma nota na seção 6 do `docs/plano.md` explicando o esqueleto.

## Decisões tomadas
- **Esqueleto completo, vazio e com o dono em comentário.** Foram criados 18 arquivos:
  - `index.html`;
  - `pages/personagens.html`, `episodios.html`, `temporadas.html`, `especies.html` e `familias.html`;
  - `css/style.css`;
  - `js/cache.js`, `api.js`, `busca.js`, `ui.js` e `layout.js`;
  - `js/paginas/inicio.js`, `personagens.js`, `episodios.js`, `temporadas.js`, `especies.js` e `familias.js`.

  Cada comentário diz a função do arquivo, os requisitos ligados a ele (por exemplo, `api.js`: RF03, RN02 e RNF04; `busca.js`: RF06 e RF07) e o dono com o PR correspondente (A1, A2, L1 ou L2). O porquê: com os arquivos já na `dev`, os PRs L1, L2, A1 e A2 só **preenchem** arquivos existentes, e dois PRs nunca criam o mesmo arquivo, o que evitaria conflito de "arquivo adicionado nos dois lados". Alternativas descartadas:
  - criar só os arquivos do Alexandre (`cache.js`, `api.js`, `busca.js`, `ui.js`);
  - criar o esqueleto já com o conteúdo do contrato da seção 4 (HTML semântico, ordem dos scripts, `js/paginas/*.js` com `montarLayout`), que adiantaria o PR L1 da Liliane sem ela concordar.
- **`img/` e `css/paginas/` ficaram de fora.** O Git não guarda pasta vazia, e o logo e o favicon são imagens que a Liliane vai fazer. A `css/paginas/` só nasce se alguma página precisar de estilo próprio, como o plano já previa.
- **Os donos não mudam.** A nota na seção 6 do `docs/plano.md` diz que o resto do plano continua igual e que os donos são os da seção 7. Os esqueletos de página continuam com a Liliane no L1, e depois passam para o dono de cada página (Alexandre: Espécies, Famílias e Temporadas; Liliane: Personagens, Episódios e a inicial).

## Erros e rejeições da IA
Nenhum.

## Pendências
- O esqueleto precisa chegar à `dev` antes de qualquer um começar o L1 ou o A1. Se o PR do primeiro passo ainda estiver aberto, o commit do esqueleto entra nele.
- Continuam em aberto: o usuário do GitHub da Liliane (os comandos dela usam `trabalho/<usuario-da-liliane>`) e a confirmação da página inicial com o professor (D1).

## Próximos passos
- A Liliane revisar e fazer merge do PR na `dev` e rodar `/atualizar-branch` para receber o esqueleto, as transcrições, o plano e as memórias.
- Alexandre, manhã de 17/11: PR A1, preenchendo `js/cache.js` e `js/api.js`.
- Liliane, de 16 a 20/11: PR L1, preenchendo os 6 HTMLs, `js/layout.js`, `css/style.css` e os `js/paginas/*.js` mínimos, e criando `img/logo.png` e `img/favicon.png`.
