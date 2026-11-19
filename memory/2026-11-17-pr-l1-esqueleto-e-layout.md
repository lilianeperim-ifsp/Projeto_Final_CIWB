---
data: 2026-11-17
autor: lilianeperim-ifsp
assunto: PR L1, esqueleto e layout
---

## Resumo
A Liliane atualizou a `trabalho/lilianeperim-ifsp` com a `dev`. Na primeira vez, o `git pull --no-edit origin dev` trouxe 14 commits (regras de git, `.claude/settings.json`, skill `sincronizar-quadro` e memórias de 15 e 16/11). Depois, o `/atualizar-branch` deu o push que faltava e, mais tarde, trouxe o merge do PR #8 por avanço direto (`f8ea73e`).

A Liliane revisou o PR #8 do Alexandre (identidade visual, D7):
- **Primeira revisão:** pediu alterações. Os 20 contrastes da tabela batiam com a fórmula do WCAG 2.1, mas havia três problemas:
  - o anel de foco com 50% de transparência caía para 1,77:1 no modo claro;
  - o `.card` e o `.modal` não recebiam a cor de superfície;
  - o plano não dizia quem escreve o rótulo inicial do `#botao-tema`.
- **Correções:** o Alexandre corrigiu tudo no commit `737e507`, inclusive os pontos menores: vinho do modo escuro `#c0304a`, nota sobre o `data-bs-theme="dark"` fixo e datas.
- **Aprovação:** os contrastes novos foram conferidos (botão no escuro 4,77; botão no fundo escuro 3,46; item ativo 3,16). A Liliane aprovou e fez o merge.

Depois foi feito o **PR L1** (#10, aberto para a `dev`, commit `2813155`), com 18 arquivos:
- os 6 HTMLs com o esqueleto da seção 4 do `docs/plano.md`;
- `js/tema.js` e `js/layout.js`;
- `css/style.css` base;
- os 6 `js/paginas/*.js` mínimos;
- `img/logo.png`, `img/favicon.png` e `img/logo.svg`.

Testes no Chrome headless:
- modo claro e escuro;
- tema do sistema na primeira visita;
- clique no botão de tema, com a escolha salva e mantida ao trocar de página;
- menu sanduíche a 375 px;
- `aria-current` certo nas 6 páginas;
- nenhum link do menu quebrado.

Também foi publicado um painel de validação visual, artefato privado da Liliane: https://claude.ai/artifact/3gjyhREuo88hb9sqTXHE8B. Ele mostra:
- o site rodando em quadros de computador e de celular, nos modos claro e escuro;
- um checklist do L1;
- a comparação entre os logos A e B.

## Decisões tomadas
- **`tema.js` como no contrato, mais uma função:** `CHAVE_TEMA`, `temaInicial()`, `aplicarTema()`, `trocarTema()` e `aplicarTema(temaInicial())` na última linha.
  - O valor vai para o `localStorage` com `JSON.stringify`, como nos exemplos do professor (fica `"light"`/`"dark"`).
  - Entrou a função extra `atualizarBotaoTema(botao)`, chamada pelo `montarMenu()` e pelo `trocarTema()`. Assim os textos do botão ("Modo claro"/"Ativar modo claro" e "Modo escuro"/"Ativar modo escuro") ficam num lugar só (RNF03).
  - Descartado: repetir os textos no `layout.js` e no `tema.js`.
- **`layout.js` no estilo do professor:** `createElement`, `textContent`, `appendChild`, `for...of` e `onclick` por propriedade. O `PAGINAS` segue a ordem Início, Personagens, Episódios, Temporadas, Espécies e Famílias.
  - O logo tem `alt=""`, porque o nome do site está escrito ao lado dele no mesmo link.
  - O botão "Limpar dados salvos" chama `limparCache()` e `location.reload()` só no clique.
- **`style.css`:** o bloco de CSS de `docs/identidade-visual.md` foi copiado sem mudanças. Por cima dele:
  - cores da navbar e item ativo com `--tvd-destaque`;
  - `.btn-primary` e `.btn-outline-primary` com as variáveis da paleta, para os botões seguirem a paleta sem trocar classes do Bootstrap;
  - spinner;
  - rodapé fixo embaixo, com `body` em flex.

  Todos os pares de cor novos já estão na tabela de contraste. O `.card-recurso`, as `.iniciais` e o modal ficam para o L2.
- **`index.html` no L1 só com o `<h1>`.** O conteúdo da inicial vem no L2. Ele carrega cache, api, ui, layout e `inicio.js`, sem o `busca.js`, porque a inicial não tem busca.
- **Logo: selo de cera (versão B), original.**
  - **O logo oficial de The Vampire Diaries não foi usado.** A Liliane pediu para colocar o logo da série numa moldura. O Claude recusou, porque é marca registrada protegida, e ofereceu desenhos originais. Se a dupla ainda quiser o logo oficial, precisa confirmar com o professor.
  - **Primeira versão (A):** monograma "MF" num círculo vinho.
  - **Versão escolhida (B):** selo de cera vinho com borda irregular e moldura dourada acompanhando a borda, com o "MF" no mesmo dourado do logo A (`#e8c36f` nas letras, `#d9b26a` na moldura e no anel).
  - **Ajustes pedidos pela Liliane no B:** tirar a lua crescente, pôr a moldura dourada e usar o mesmo dourado do A. O Claude também aumentou as letras para equilibrar o destaque.
  - **`img/logo.svg`:** é o desenho original. Os PNGs de 256 px e 64 px saem dele, gerados com o Chrome headless.
- **Sem `border-radius` no logo:** a regra `#menu .navbar-brand img { border-radius: 50% }` foi tirada, porque cortaria a borda irregular do selo. O PNG já tem fundo transparente.
- **No painel, o Bootstrap vai como arquivo:** o artefato bloqueia CSS de outros sites, então o painel leva uma cópia do `bootstrap.min.css` 5.3.3. No repositório, o CSS continua vindo da CDN do jsDelivr.

## Erros e rejeições da IA
- **Primeira renderização do logo cortada:** no Chrome headless, a área da página é mais larga que a captura. Corrigido prendendo o SVG no canto superior esquerdo.
- **Teste do modo claro abriu escuro:** o Chrome seguiu o tema escuro do Windows. Corrigido forçando o esquema de cores claro na linha de comando.
- **Teste a 375 px cortado:** pelo mesmo motivo, a captura do celular saiu cortada. Corrigido carregando a página num quadro de 375 px.
- **Aviso falso no painel:** "não deixou o painel controlar os quadros" aparecia na abertura, porque a troca de logo rodava antes de os quadros carregarem. Corrigido ignorando quadros ainda carregando.
- **Seletores do painel:** depois que a comparação de logos ganhou figuras sem quadro, o código procurava `figure` em geral e quebraria. Corrigido para `figure.pc, figure.cel`.
- **Mover o cartão do L1 no quadro kanban não foi possível:** pela conta da Liliane, o quadro (https://claude.ai/artifact/8eX7Hr9PHAKpmuvBBtaS7r) volta como "não encontrado", e a lista de artefatos compartilhados está vazia.

## Pendências
- **Quadro kanban:** a Liliane precisa abrir o link e aceitar o convite. Se não tiver acesso, o Alexandre confere o compartilhamento. Depois, mover o cartão do L1 para "PR aberto" com o nº do PR **10**.
- **Rodapé:** confirmar "Alexandre Santos e Liliane Perim" e "Projeto Prático de CIWB" em `js/layout.js` (função `montarRodape`).
- **"Limpar dados salvos":** dá erro no clique até o merge do A1, porque o `limparCache()` vem do `cache.js`.
- **PR #10:** o Alexandre revisa e faz o merge. Enquanto ele estiver aberto, todo push na `trabalho/lilianeperim-ifsp` entra nele, inclusive esta memória.
- **Painel de validação:** é privado. Para o Alexandre ver, a Liliane precisa compartilhar pelo claude.ai.
- **Bloco de foco:** não cobre `.form-select` nem `.form-check-input`. Só importa se esses campos forem usados.
- **Texto do botão no modo escuro:** está com 4,77:1, pouca folga acima de 4,5. Conferir de novo se essas cores mudarem.
- **Continua de antes:** confirmar com o professor se a página inicial pode existir (D1).

## Próximos passos
- Depois do merge do PR #10: rodar `/atualizar-branch` e começar o L2 (`style.css` final com `.card-recurso`, `.iniciais` e modal, `index.html` e `js/paginas/inicio.js`). O `inicio.js` depende do `api.js` do A1.
- Testar o L1 também no Live Server e com duplo clique no `index.html`, conferindo o favicon na aba.
- Até 24/11: ligar a Vercel (seção 1c do plano).
