---
data: 2026-11-25
autor: lilianeperim-ifsp
assunto: revisão do PR #20, checklist 5 a 9 (T19) e README (T17)
---

## Resumo
- **Atualização da branch:** no começo da sessão, a `trabalho/lilianeperim-ifsp` já estava em dia com a `dev`, mas tinha o commit `18d5760` ("Create settings.json", que cria o `.vscode/settings.json`) só no computador.
- **PR #20 (Alexandre, `trabalho/alexsant22` → `dev`):** a Liliane era a revisora. O Claude leu o diff:
  - `img.onerror` no `criarCard` e no `criarFotoDetalhe` (`js/ui.js`), que troca a foto que não carrega pelas iniciais com `replaceChild` (D5);
  - `docs/plano.md` atualizado com os dados novos da tvd-api;
  - 3 memórias do Alexandre.

  A Liliane aprovou, e o merge foi feito às 22:52 UTC (merge `1a4c738`).
- **Branch depois do merge:** o `git pull --ff-only origin dev` falhou, porque a branch tinha `b73298f` e `18d5760`, que a `dev` não tinha. A Liliane rodou `git pull --no-edit origin dev` (merge `118ad01`) e deu o push. O `18d5760` subiu junto.
- **T19, checklist da seção 9, itens 5 a 9:** o Claude conferiu pelo código e por requisições, e a Liliane testou no navegador, no preview da `dev`.
  - **5. Erro:** passou. O modo *Offline* do DevTools mostrou só a tela de sem internet do navegador (o dinossauro), porque nem o HTML carrega. O teste certo é bloquear só o domínio `tvd-api.vercel.app` (*Block request domain*) e clicar em "Limpar dados salvos". Assim apareceu o alerta com "Tentar novamente", e a lista carregou depois de desbloquear.
  - **6. RNF01:** passou em 375, 768 e 1280 px. As fotos demoram um pouco por causa do `loading="lazy"` e de virem do TVmaze, o que é normal.
  - **7. RNF02:** passou. O teclado funcionou e o Lighthouse deu 100 em Acessibilidade. Os 10 itens "Additional items to manually check" não são erros: o Lighthouse sempre lista esses itens, e o Claude mostrou onde cada um é atendido.
  - **8. RNF03:** passou. O `fetch(` só aparece em `js/api.js:20`, e nenhum nome de função se repete entre os arquivos de `js/`.
  - **9. Vercel:** os 23 arquivos do site respondem 200 na produção e no preview da `dev`, e os links do menu (`layout.js`) apontam para páginas que existem. Mas a produção ainda está na versão da Fase 1: a `dev` tem 16 commits que a `main` não tem, e lá o `episodios.js` só tem o esqueleto. O item fica para depois do T20.
- **T17, README:** o Claude escreveu o `README.md` completo, inclusive a seção "Como o site funciona por dentro", que era a parte do Alexandre. O texto dele não tinha chegado, e a Liliane pediu o README completo, com base nas memórias e no código. Commit `6517ef9`.
- **PR #21** ("docs: README completo do projeto", `trabalho/lilianeperim-ifsp` → `dev`): aberto pela Liliane pelo terminal, com o Alexandre como revisor. Sem conflito e com os checks da Vercel passando. Ele leva o README, a memória `2026-11-24-paginas-de-personagens-e-episodios.md` e o `.vscode/settings.json`.

## Decisões tomadas
- **README com a explicação da tvd-api:** uma seção diz que o enunciado sugere a SWAPI ou a Hogwarts API e que a dupla criou a tvd-api no formato da SWAPI (lista paginada, relações como URL), então os requisitos continuam os mesmos.
- **Conteúdo do README:**
  - os links de produção, do preview da `dev`, da API e do código da API;
  - as funcionalidades;
  - uma tabela que liga cada requisito (RF01 a RNF04) ao arquivo e à função;
  - "Como o site funciona por dentro": cache, relações em nomes, busca sem acento (faixa U+0300 a U+036F) e as peças do `ui.js`;
  - uma tabela das páginas (card e modal), a estrutura das pastas, como rodar, as tecnologias e a dupla, com a parte de cada um.
- **O README entrou antes do texto do Alexandre:** primeiro a Liliane quis esperar a parte dele. Depois pediu o README completo. O Alexandre confere a seção dele na revisão do PR #21.
- **Os resultados do T19 vão na descrição do PR #21,** porque os testes não mudaram nenhum arquivo e não precisam de PR próprio.
- **Mudança da porta do Live Server desfeita:** o `.vscode/settings.json` apareceu alterado (5501 → 5502), provavelmente mudado sozinho pelo Live Server. A Liliane rodou `git restore`, e o arquivo ficou com 5501.

## Erros e rejeições da IA
- **Caracteres invisíveis na regex de novo:** o README e a descrição do PR #21 foram escritos com os acentos de verdade no lugar dos códigos `\u0300` e `\u036f`, o mesmo erro das memórias de 17/11 e 24/11. O Claude percebeu contando os caracteres da faixa U+0300 a U+036F nos dois arquivos, antes do commit e antes do PR. Corrigiu montando a barra invertida com `[char]92` no PowerShell. Depois disso, os dois arquivos ficaram com 0. O mesmo aconteceu com esta memória, corrigida e conferida do mesmo jeito antes do commit.
- **Frases sem fonte no README:** o Claude tinha escrito que a dupla criou a API "porque não havia uma API pública adequada" e um nome por extenso para ARQCIWB. Ele mesmo tirou as duas frases antes de mostrar o arquivo, porque não tinha fonte para elas.
- **Teste 5 com instrução errada:** o roteiro mandava usar o modo *Offline*, que impede o carregamento da própria página. A Liliane viu o dinossauro em vez do alerta. O teste foi refeito bloqueando só a API.
- **Perguntas recusadas:** a Liliane recusou duas vezes as perguntas sobre a parte do Alexandre e a explicação da tvd-api. Na segunda, pediu o README completo, com o que faltasse tirado das memórias.

## Pendências
- **PR #21:** o Alexandre revisa, principalmente a seção "Como o site funciona por dentro", e faz o merge. Avisar que o `.vscode/settings.json` vai junto, caso ele prefira não ter esse arquivo na `dev`.
- **`.vscode/` no Git:** se o Live Server continuar mudando a porta, combinar com o Alexandre de pôr a pasta `.vscode/` no `.gitignore`, que é dele.
- **Sugestão do item 8 para o Alexandre:** `abrirDetalhesEspecie`, `abrirDetalhesFamilia` e `abrirDetalhesTemporada` repetem o mesmo bloco que junta os nomes, trata a lista vazia e chama `criarListaDeNomes`. É opcional.
- **Item 9 do checklist:** conferir todas as páginas em https://projetofinalciwb.vercel.app/ depois do merge do PR final `dev` → `main` (T20).
- **Quadro:** mover o T17 para "PR aberto" com o número 21. O T19 só vai para Feito depois do item 9.

## Próximos passos
1. Depois do merge do PR #21, rodar `/atualizar-branch`.
2. Revisar o PR final `dev` → `main` (T20) quando o Alexandre abrir. Depois do merge, refazer o item 9 na produção.
3. Preparar os slides da apresentação (prazo do plano: 04/12).
