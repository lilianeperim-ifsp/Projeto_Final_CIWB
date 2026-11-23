> Origem: plano de estrutura aprovado na sessão de 2026-11-15 (cópia do arquivo de plano do Claude Code, sem alterações). No texto, "você" é o Alexandre. As decisões e o que veio depois estão em `memory/2026-11-15-estrutura-do-projeto.md`.

# Plano — Projeto Prático de CIWB (The Vampire Diaries / tvd-api) — v2

## Contexto

Trabalho final em dupla (Alexandre e Liliane) de ARQCIWB, IFSP Araraquara, com entrega e apresentação em **2026-12-08**. O site é multipágina, consome a **tvd-api** (`https://tvd-api.vercel.app/api`, feita pela dupla no formato da SWAPI) e precisa atender RF01–RF07, RN01–RN02 e RNF01–RNF04 do `Projeto Prático 2026.pdf`. O repositório (`lilianeperim-ifsp/Projeto_Final_CIWB`, **público**) tem só o README e a `main`. Este plano define o primeiro passo (contexto em markdown, skills, CLAUDE.md, branches), a estrutura do site, o JS compartilhado, a ordem de implementação e a divisão da dupla. Nenhum arquivo é escrito antes da aprovação.

**O que mudou na v2:** Silas e Elijah Mikaelson entram no lugar de Matt Donovan, que tem foto; os arquivos compartilhados foram divididos entre os dois, cada um com um dono só (seções 4, 6 e 7); o calendário foi refeito pelas suas outras entregas; a Vercel virou um passo com dono e prazo (1c); a regex de acentos agora aparece com os códigos `\u`; D1, D5, D9 e D10 foram aplicadas; e há uma proposta de redistribuir as páginas da Fase 2 (D11).

### O que a leitura do material e da API mostrou

- **Estilo do professor** (exemplos `11.json/cep`, `11.json/randomuser`, `13.webstorage/exemplo2`): `async function` + `const resposta = await fetch(url)` + `if (!resposta.ok) {...} else {...}`; `querySelector`; `createElement` + `textContent` + `appendChild`; `innerHTML = ''` para limpar; `window.onload = function(){...}`; eventos por propriedade (`botao.onclick`, `campo.oninput`, `form.onsubmit` com `e.preventDefault()`); `localStorage.setItem(chave, JSON.stringify(obj))` e `JSON.parse(localStorage.getItem(chave))`; `<script src>` comum no fim do `<body>`, **nunca `import`/`export`**; nomes em português e camelCase (`botCadastrar`, `divCadastrados`, `jsonUser`), comentários em português.
- **API conferida ao vivo:** CORS `*`; página inexistente devolve 404; todas as páginas dos 5 recursos somam ≈ **203 KB** de JSON (episódios ≈ 165 KB, maior resumo com 1.056 caracteres).
- **Personagens com dados faltando (conferido em 2026-11-15):** 14 têm foto (Elena, Stefan, Damon, Caroline, Bonnie, Matt, Jeremy, Tyler, Alaric, Katherine, Klaus, Jenna, Vicki, Enzo). Os outros **35 têm `image: null`**, entre eles Elijah Mikaelson (id 12). **10 têm `family: null`**: Silas (id 21), Valerie, Anna, Pearl, Lexi, Rose e Hayley, todos sem foto também. Episódios, temporadas, espécies e famílias vêm completos.
- **Tamanho das relações:** a espécie "Humano" tem 24 personagens e "Vampiro" 17; famílias têm de 2 a 7; temporadas, de 16 a 23 episódios.
- **`gh` 2.103 está instalado**, e você tem permissão de escrita no repositório.

---

## 1. Primeiro passo

### 1a. Criar as branches (você roda, um comando por vez)

```bash
git status
git checkout main
git pull origin main
git checkout -b dev
git push -u origin dev
git checkout -b trabalho/alexsant22
git push -u origin trabalho/alexsant22
```

A Liliane, na máquina dela, depois que a `dev` existir (usuário do GitHub dela: `lilianeperim-ifsp`, D10):

```bash
git status
git fetch origin
git checkout dev
git checkout -b trabalho/lilianeperim-ifsp
git push -u origin trabalho/lilianeperim-ifsp
```

Opcional, feito pela Liliane: em *Settings → Branches*, proteger `main` e `dev` exigindo PR.

### 1b. Arquivos do primeiro passo (na `trabalho/alexsant22`)

| Arquivo | Conteúdo |
|---|---|
| `docs/contexto/enunciado.md` | Começa com o caminho de origem. Transcrição fiel e completa das 2 páginas do PDF: título, abertura, tabela de opções, Objetivo, RF01–RF07, RN01–RN02, RNF01–RNF04 e prazo. O logo do IFSP vira uma linha de descrição. |
| `docs/contexto/tvd-api.md` | Começa com a origem ("seção 'A API: tvd-api' do prompt de planejamento"). A seção copiada sem mudanças. |
| `docs/contexto/slides/10-eventos.md` … `14-validacao-de-formularios.md` | Um arquivo por aula, começando com o caminho do PDF. Uma seção `## Slide N — <título>` por slide, na ordem, com o texto completo e o código das imagens transcrito em blocos de código. Imagem decorativa (capa, logo, bibliografia) é ignorada; imagem com conteúdo útil (árvore do DOM, XML vs. JSON) vira uma linha `> Imagem: ...`. A aula 14 eu leio na hora de transcrever. |
| `docs/contexto/codigos-exemplo.md` | Começa com o caminho da pasta. Primeiro "Padrões do professor" (os itens acima, cada um com um exemplo curto). Depois, um bloco por exemplo: `09.eventos`, `10.dom` (1 a 3), `11.json` (`exemplo1`, `cep`, `randomuser`), `12.cookies`, `13.webstorage` (`exemplo1`, `exemplo2`), `14.validacao` (1 a 3). Cada bloco tem `### caminho`, uma linha sobre o que o exemplo mostra e o HTML e o JS inteiros, copiados como estão. |
| `.claude/skills/salvar-memoria/SKILL.md` | Conteúdo exato do prompt. |
| `.claude/skills/atualizar-branch/SKILL.md` | Conteúdo exato do prompt. |
| `CLAUDE.md` | Conteúdo exato do prompt, **mais** a seção "Contexto" aprovada em D9 (texto abaixo). |
| `.gitignore` | **Novo.** Uma linha: `.claude/settings.local.json`. São as permissões pessoais de cada um no Claude Code, que não devem ir para o repositório. |

Seção acrescentada no fim do `CLAUDE.md`:

```markdown
## Contexto

Antes de propor código, leia:

- `docs/contexto/`: enunciado, tvd-api, slides das aulas 10 a 14 e códigos de exemplo do professor (comece pela seção "Padrões do professor" de `codigos-exemplo.md`).
- `memory/`: memórias das sessões anteriores da dupla, gravadas pela skill `salvar-memoria`.
```

A pasta `TSI - IFSP` é só lida.

**Como testar:** abrir os `.md` no preview do VS Code e comparar alguns slides com o PDF; num chat novo, conferir que `/salvar-memoria` e `/atualizar-branch` aparecem.

```bash
git status
git add docs/contexto/enunciado.md
git add docs/contexto/tvd-api.md
git add docs/contexto/codigos-exemplo.md
git add docs/contexto/slides/10-eventos.md
git add docs/contexto/slides/11-dom.md
git add docs/contexto/slides/12-json.md
git add docs/contexto/slides/13-cookies-e-localstorage.md
git add docs/contexto/slides/14-validacao-de-formularios.md
git commit -m "docs: transcrição do enunciado, da tvd-api, dos slides e dos exemplos"
git add .claude/skills/salvar-memoria/SKILL.md
git add .claude/skills/atualizar-branch/SKILL.md
git add CLAUDE.md
git add .gitignore
git commit -m "chore: skills da dupla, CLAUDE.md e .gitignore"
git push
gh pr create --base dev --head trabalho/alexsant22 --title "docs: contexto do projeto, skills e CLAUDE.md" --body "Transcrição do enunciado, da tvd-api, dos slides 10 a 14 e dos códigos de exemplo em docs/contexto/. Skills salvar-memoria e atualizar-branch. CLAUDE.md com as regras do repositório e a seção de contexto."
```

A Liliane revisa e faz o merge no GitHub, e depois roda `/atualizar-branch` na branch dela.

### 1c. Ligar o repositório na Vercel — **dona: Liliane, prazo: 24/11 (terça)**

O repositório é da conta dela, então o caminho mais simples é ela importar o projeto na Vercel dela (plano Hobby). Ela não precisa dar acesso à sua conta, porque:
- o repositório é **público**, e na Vercel Hobby commits de colaboradores em repositório público também disparam deploy;
- o Hobby não tem membros de equipe, então "dar acesso para a sua conta" exigiria plano pago.

Passos dela:
1. Entrar em vercel.com com o GitHub → *Add New… → Project* → importar `Projeto_Final_CIWB` (autorizando o app da Vercel no repositório, se for pedido).
2. *Framework Preset*: **Other**; sem *Build Command*; *Output Directory* = raiz. Clicar em *Deploy*.
3. *Settings → Git → Production Branch* = `main`. A `dev` e os PRs ganham links de *preview* automáticos.
4. *Settings → Deployment Protection*: desligar a **Vercel Authentication** dos *previews*. Sem isso, você e o professor não abrem os links de *preview*, porque não são membros do projeto dela.
5. Mandar para você o domínio de produção (ex.: `projeto-final-ciwb.vercel.app`), que vai para o README.

Tem que estar pronto **antes do primeiro PR `dev` → `main`**, no fim da Fase 1 (25/11).

---

## 2. Árvore final (a partir da estrutura de partida)

```
Projeto_Final_CIWB/
├── index.html                  página inicial (apresentação + atalhos com a contagem)
├── pages/
│   ├── personagens.html
│   ├── episodios.html
│   ├── temporadas.html
│   ├── especies.html
│   └── familias.html
├── css/
│   └── style.css               (css/paginas/ só nasce se uma página precisar)
├── js/
│   ├── cache.js                RN01 e RN02 (localStorage + JSON)
│   ├── api.js                  o único arquivo que chama fetch (RF03 e relações)
│   ├── busca.js                RF06 e RF07
│   ├── ui.js                   lista, card, modal, carregando, erro e formatação (RF04 e RF05)
│   ├── layout.js               menu e rodapé (RF01 e RF02)
│   ├── tema.js                 modo claro/escuro, carregado no <head> (D7)
│   └── paginas/
│       ├── inicio.js
│       ├── personagens.js
│       ├── episodios.js
│       ├── temporadas.js
│       ├── especies.js
│       └── familias.js
├── img/
│   ├── logo.png
│   └── favicon.png
├── docs/contexto/ …            (primeiro passo)
├── memory/                     (nasce com a primeira /salvar-memoria)
├── .claude/skills/ …
├── .gitignore                  NOVO
├── CLAUDE.md
└── README.md                   reescrito no fim (descrição, como rodar, links, dupla)
```

**O que mudou e por quê:**
- **`.gitignore` adicionado:** tira do Git o `settings.local.json` pessoal de cada um.
- **`css/paginas/` fica só como regra, não como pasta:** com cards e modal genéricos, nenhuma página deve precisar de estilo próprio.
- **Ordem dos scripts definida:** `cache.js` → `api.js` → `busca.js` → `ui.js` → `layout.js` → `paginas/x.js`, porque cada um usa funções dos anteriores. O `tema.js` é a exceção: fica no `<head>`, para o tema estar certo antes de a página aparecer (D7).
- **Nenhuma imagem substituta em `img/`:** personagem sem foto mostra as iniciais (D5).
- **O resto fica igual:** `index.html` na raiz, páginas em `pages/` com `../`, um JS por página e nomes em português, minúsculos e sem acento. Isso importa porque a Vercel roda em Linux, onde caminho diferencia maiúsculas.

---

## 3. Decisões de arquitetura (pontos 1 a 10)

### Ponto 1 — Páginas e layout
- **Seis páginas:** cinco de recurso e uma inicial (D1, decisão fechada pela dupla em 22/11). A inicial apresenta a série e tem cinco cards com a contagem de cada recurso, vinda do `count` da primeira página, que é a mesma requisição e a mesma chave de cache que a página de recurso usa depois.
- **Layout montado por JavaScript dentro de tags semânticas fixas.** Todo HTML tem `<header><nav id="menu" aria-label="Menu principal"></nav></header>`, `<main>` e `<footer id="rodape"></footer>` escritos no arquivo, e o `layout.js` só preenche o conteúdo:
  - o menu fica num lugar só;
  - o professor vê `header`/`nav`/`main`/`footer` no código-fonte (RNF02);
  - o link ativo ganha `aria-current="page"` sozinho.

### Ponto 3 — `<script>` comum, sem módulos
`<script src>` comum no fim do `<body>`, como em todos os exemplos. Abre com duplo clique (`file://`), no Live Server e na Vercel. Com `import`/`export`, o site não abriria pelo `file://` e o código fugiria do que foi ensinado. As funções ficam globais; colisão de nomes se evita com nomes únicos em português e com cada arquivo de página só criando funções com o nome do recurso (`mostrarPersonagens`, `abrirDetalhesEpisodio`).

### Ponto 4 — Cache
- **A chave é a URL exata de cada requisição**, e toda requisição passa por `buscarComCache(url)`, o único `fetch` do projeto: primeiro `lerCache(url)` e, só se vier `null`, o `fetch` (RN02).
- **Listas paginadas:** cada página é guardada na sua URL (`.../episodes`, `.../episodes?page=2`, …), e `buscarTodos` junta tudo. Se a página 7 falhar, as 6 primeiras ficam salvas.
- **Relações (URL → nome) se resolvem pela lista do recurso** (D2): `buscarRelacionados(urls)` descobre o recurso pela URL, chama `buscarTodos` (que passa pelo cache) e procura cada item pelo campo `url`. O modal de "Humano" custa 5 requisições em vez de 24, ou nenhuma se a lista já estiver salva.
- **Espaço:** ≈ 203 KB de JSON (medido); mesmo a 2 bytes por caractere (UTF-16), dá cerca de 0,4 MB, menos de 10% dos ~5 MB.
- **Sem expiração.** O botão "Limpar dados salvos" fica no rodapé (D4).

### Ponto 5 — Carregamento e erro (RF03)
- `buscarTodos(recurso, aoCarregarPagina)` segue o `next` até `null` e avisa `aoCarregarPagina(pagina, totalPaginas)`. O total vem de `Math.ceil(count / results.length)`.
- Enquanto carrega, o spinner do Bootstrap mostra "Carregando episódios… página 3 de 18" (`role="status"`).
- **Se a API falhar** (`!resposta.ok`, ou `fetch` rejeitado por falta de rede): `buscarComCache` → `null`, `buscarTodos` → `null`, e a página chama `mostrarErro(...)`, um alerta `role="alert"` com o botão "Tentar novamente" (`location.reload()`). O `try/catch` em volta do `fetch`, só em `buscarComCache`, é o único recurso fora dos exemplos do professor.

### Ponto 6 — Busca (RF06 e RF07)
**Filtrar a lista que já está na memória**, com `oninput`. O `?name=` faria uma requisição nova a cada termo, o que contraria o objetivo do RN01/RN02 de diminuir as consultas.

Ignorar acentos, linha que vai no `busca.js`:

```js
texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
```

O que explicar na apresentação:
1. `normalize('NFD')` separa cada letra acentuada em duas partes: a letra base e o acento como um caractere "combinante" à parte. `"ä"` vira `"a"` + `"\u0308"` (trema).
2. `\u0300-\u036f` é a faixa do Unicode chamada *Combining Diacritical Marks*, onde estão todos esses acentos soltos: grave `\u0300`, agudo `\u0301`, circunflexo `\u0302`, til `\u0303`, trema `\u0308`, cedilha `\u0327` e outros.
3. `/[...]/g` é uma classe de caracteres com a flag global (aula 15): casa qualquer caractere da faixa, em todas as ocorrências. `replace(..., '')` apaga esses caracteres.
4. Resultado: `"Doppelgänger"` → `"doppelganger"`, e a busca "doppelganger" encontra o item.

**Cuidado ao gravar o `busca.js`:** na primeira versão deste plano, os códigos viraram caracteres combinantes invisíveis na hora de salvar. Depois de escrever o arquivo, conferir com um `grep` que a linha mostra as barras e os números, e corrigir se não mostrar.

Episódios filtram por `title`, os outros recursos por `name`. A mensagem do RF07 e a contagem ("3 resultados") ficam numa região `aria-live="polite"`, e o Enter não recarrega a página (`form.onsubmit` + `e.preventDefault()`, como em `11.json/exemplo1`).

### Ponto 7 — Modal (RF05)
Um modal só, criado pelo `ui.js` na primeira abertura. O conteúdo é uma `<dl>` com pares rótulo/valor. Com relação a resolver, o modal abre na hora com spinner e é preenchido quando os nomes chegam.

| Recurso | Conteúdo do modal | Relações resolvidas |
|---|---|---|
| Personagem | foto (ou iniciais), nome, ator, espécies, família, descrição, nº de episódios | `species[]` → "Humano, Doppelgänger, Vampiro"; `family` → "Gilbert", ou "Sem família registrada" se `null` |
| Episódio | imagem, título, temporada, nº do episódio, data de exibição (dd/mm/aaaa), direção, roteiro, audiência nos EUA ("4,91 milhões"), código de produção, duração ("60 min"), resumo | `season` → "Temporada 1" |
| Temporada | pôster, nome, estreia, encerramento, nº de episódios, lista numerada dos títulos | `episodes[]` → títulos (18 páginas se os episódios ainda não estiverem no cache, com spinner) |
| Espécie | nome, descrição, lista de personagens | `characters[]` → nomes |
| Família | nome, "Fundadora de Mystic Falls: Sim/Não", descrição, lista de personagens | `characters[]` → nomes |

**Campos vazios:** vários personagens vêm com `episodeCount: null` (Elijah, Rebekah e outros sem foto). Nesse caso o modal mostra "Não informado" no lugar do número.

**Foto (D5):** a regra olha o próprio item, não uma lista fixa nem uma contagem. Se `image` vier preenchido, aparece a foto; se vier `null`, aparecem as iniciais. Se a tvd-api ganhar mais fotos, o site passa a mostrar sem nenhuma mudança no código.

### Ponto 8 — Lista (RF04)
Cards em grade Bootstrap (`row-cols-1 row-cols-sm-2 row-cols-lg-4`); cada card é um `<button type="button">`.

| Recurso | Card |
|---|---|
| Personagens | foto (ou iniciais), nome, ator |
| Episódios | título, "Temporada 1 · Episódio 1", data de exibição. Sem imagem (D6), e a temporada vem de `buscarTodos('seasons')` |
| Temporadas | pôster, nome, período ("2009–2010"), nº de episódios |
| Espécies | nome, nº de personagens (`characters.length`) |
| Famílias | nome, selo "Fundadora" quando `founding`, nº de personagens |

### Ponto 9 — Acessibilidade (RNF02)
`<html lang="pt-BR">`; `header`/`nav`/`main`/`footer` no código; um `<h1>` por página; `aria-current="page"` no menu; `<form role="search">` com `<label for="campo-busca">` visível; `alt` vindo dos dados ("Foto de Elena Gilbert", "Cena do episódio Pilot", "Pôster da Temporada 1"); iniciais com `role="img"` e `aria-label="Sem foto de Elijah Mikaelson"`; carregando com `role="status"` e erro com `role="alert"`; modal com `aria-labelledby`; cards como botões.

### Ponto 10 — Estilo do professor e Bootstrap
Bootstrap pela CDN do jsDelivr, fixo na **5.3.3**:
- no `<head>`: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`, depois `style.css`;
- no fim do `<body>`, antes dos nossos scripts: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js` (traz o Popper, necessário para o modal e o menu recolhível).

O site tem modo claro e modo escuro, trocados pelo `data-bs-theme` (`"light"`/`"dark"`) no `<html>`, com a paleta "Grimório" (vinho com dourado) e o nome "Diários de Mystic Falls" (D7). Na primeira visita segue o tema do sistema; o botão de tema no menu troca e salva a escolha. Cores, contraste e o CSS pronto estão em `docs/identidade-visual.md`, junto com o design das páginas: Cinzel nos títulos e Lato no texto (Google Fonts), cards com sombra, foto 4:5 no topo do card, iniciais em vinho, item ativo do menu sublinhado em dourado e detalhes do modal em duas colunas.

---

## 4. Funções compartilhadas e o contrato entre as duas metades

Como a Fase 1 é feita em paralelo, os nomes abaixo (funções, IDs e classes) são o **contrato**: cada um programa contra ele sem esperar o código do outro. Mudar o contrato exige combinar antes.

### Parte do Alexandre

**`js/cache.js`** (RN01, RN02)
- `lerCache(chave)` → objeto ou `null` (`JSON.parse(localStorage.getItem(chave))`)
- `salvarCache(chave, dados)` → `localStorage.setItem(chave, JSON.stringify(dados))`
- `limparCache()`: remove só as chaves que começam com `https://tvd-api.vercel.app/api`

**`js/api.js`** (RNF04, RF03; único `fetch`)
- `const URL_API = 'https://tvd-api.vercel.app/api';`
- `async buscarComCache(url)` → JSON ou `null`
- `async buscarTodos(recurso, aoCarregarPagina)` → array ou `null`
- `recursoDaUrl(url)` → `'species'` a partir de `.../api/species/2`
- `async buscarRelacionados(urls)` → itens na ordem das URLs, ou `null`; `[]` para uma lista vazia

**`js/busca.js`** (RF06, RF07)
- `normalizarTexto(texto)` (a linha do ponto 6)
- `filtrarPorNome(itens, termo, campo)` → array filtrado
- `configurarBusca(itens, campo, mostrar)`: liga `#campo-busca.oninput` e `#form-busca.onsubmit`
- `atualizarMensagemBusca(quantidade, termo)`: com 0, `Nenhum resultado para "termo".`; com termo e resultados, "N resultados"; com o campo vazio, limpa

**`js/ui.js`** (RF04, RF05)
- `mostrarCarregando(texto)` / `esconderCarregando()` em `#estado`
- `mostrarErro(mensagem)`: alerta com "Tentar novamente"
- `mostrarLista(itens, montarCard, aoClicar)`: limpa `#lista`, um `<li class="col">` por item
- `criarCard(titulo, linhas, imagem, alt, ehPoster)` → `<button type="button" class="card-recurso">` com um `.card` Bootstrap dentro (classes do design em `docs/identidade-visual.md`). Dentro do botão só há `<span>` (o `.card`, o `.card-body`, o título e as linhas), porque o HTML não permite `<div>` nem títulos dentro de `<button>`:
  - título em `.card-title`; `linhas` são textos ou elementos (o selo `<span class="selo-fundadora">Fundadora</span>` das famílias entra como elemento);
  - `imagem` com URL → `<img class="card-img-top foto-recurso">`, mais `.poster` quando `ehPoster` (temporadas);
  - `imagem === null` → `criarIniciais(titulo)`;
  - `imagem` não passada (episódios, espécies e famílias) → card sem mídia
- `criarIniciais(nome)` → `<div class="iniciais" role="img" aria-label="Sem foto de …">`
- `abrirModal(titulo, conteudo)`: cria o modal `.modal-lg` (título em `.modal-title`) na primeira vez, preenche e chama `bootstrap.Modal.getOrCreateInstance(...).show()`; chamado com o modal aberto, só troca o conteúdo. Devolve o número da abertura, usado no `preencherModal`
- `preencherModal(abertura, conteudo)`: troca o conteúdo quando as relações chegam. Se a pessoa fechou o modal ou abriu outro item enquanto carregava, não faz nada, e o modal não reabre sozinho nem mostra os dados de outro item. Uso:

  ```js
  const abertura = abrirModal(especie.name, criarSpinner('Carregando personagens…'));
  const personagens = await buscarRelacionados(especie.characters);
  preencherModal(abertura, conteudo);
  ```

- `criarFotoDetalhe(imagem, alt, nome)` → `<img class="foto-detalhe">`, ou as iniciais quando `imagem` é `null`
- `criarDetalhesComFoto(foto, detalhes)` → linha com a foto à esquerda e os detalhes à direita (`col-md-auto` + `col-md`); abaixo de 768px a foto fica em cima
- `criarSpinner(texto)` → `role="status"` com o spinner do Bootstrap
- `criarAvisoErro(mensagem)` → `<div class="alert alert-danger" role="alert">`, para o modal quando as relações não chegam: `preencherModal(abertura, criarAvisoErro('Não foi possível carregar os personagens…'))`
- Ao fechar (Esc, X ou clique fora), o modal devolve o foco ao card que o abriu
- `criarListaDetalhes(pares)` → `<dl class="row">` com `<dt class="col-sm-4">` e `<dd class="col-sm-8">`; `pares` é uma lista de `[rótulo, valor]`, e o valor pode ser texto ou elemento: `criarListaDetalhes([['Ator', 'Nina Dobrev'], ['Espécies', lista]])`
- `criarListaDeNomes(nomes, numerada)` → `<ol>` quando `numerada` é `true` (episódios da temporada), `<ul>` no resto
- `formatarData(dataIso)` → `'10/09/2009'` com `split('-')`, ou `'Não informado'` quando vem vazio. **Não** usar `new Date('2009-09-10')`: o texto é lido como UTC e, no fuso do Brasil, a data apareceria como 09/09.

### Parte da Liliane

**`js/layout.js`** (RF01, RF02)
- `const PAGINAS = [{ id: 'inicio', titulo: 'Início', arquivo: 'index.html' }, { id: 'personagens', titulo: 'Personagens', arquivo: 'pages/personagens.html' }, …]`
- `montarLayout(paginaAtual, raiz)`: `raiz` é `''` no `index.html` e `'../'` em `pages/`
- `montarMenu(paginaAtual, raiz)`: navbar responsiva com logo, nome "Diários de Mystic Falls", botão sanduíche, `active`/`aria-current` e o botão de tema `#botao-tema`, que chama `trocarTema()` do `tema.js`. O `montarMenu()` lê o `data-bs-theme` do `<html>` e cria o botão já com o rótulo e o `aria-label` certos: "Ativar modo claro" no escuro e "Ativar modo escuro" no claro
- `montarRodape()`: dupla, disciplina, IFSP Araraquara, 2026, link da tvd-api e botão "Limpar dados salvos" (`limparCache()` + `location.reload()`; a função vem do `cache.js` e só é chamada no clique)

**`js/tema.js`** (D7; carregado no `<head>`, logo depois do `style.css`, sem `defer`, antes de todos os outros scripts)
- `const CHAVE_TEMA = 'tema';` com valor `'light'` ou `'dark'`. Não começa com a URL da API, então o `limparCache()` não apaga.
- `temaInicial()` → o tema salvo no `localStorage` ou, sem escolha salva, `'dark'` quando `matchMedia('(prefers-color-scheme: dark)').matches` e `'light'` no resto
- `aplicarTema(tema)`: `document.documentElement.setAttribute('data-bs-theme', tema)`
- `trocarTema()`: aplica o tema oposto, salva no `localStorage` e atualiza o rótulo e o `aria-label` de `#botao-tema` ("Ativar modo claro" / "Ativar modo escuro")
- Na última linha, `aplicarTema(temaInicial());`, que roda na hora, antes de a página aparecer. O arquivo usa o `localStorage` direto, porque o `cache.js` ainda não foi carregado no `<head>`.

**Esqueleto de cada `pages/x.html`** (IDs fixos que o JS do Alexandre usa):

```html
<!DOCTYPE html>
<html lang="pt-BR" data-bs-theme="dark">
<head> charset, viewport, <title>Personagens | Diários de Mystic Falls</title>, favicon ../img/favicon.png, CSS do Bootstrap, <link> das fontes Cinzel e Lato (Google Fonts), ../css/style.css, <script src="../js/tema.js"></script> </head>
<body>
    <header><nav id="menu" class="navbar navbar-expand-lg" aria-label="Menu principal"></nav></header>
    <main class="container py-4">
        <h1>Personagens</h1>
        <form id="form-busca" role="search">
            <label for="campo-busca" class="form-label">Buscar personagem pelo nome</label>
            <input type="search" id="campo-busca" class="form-control" autocomplete="off">
        </form>
        <p id="mensagem-busca" aria-live="polite"></p>
        <div id="estado"></div>
        <ul id="lista" class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 list-unstyled"></ul>
    </main>
    <footer id="rodape"></footer>
    <script src="Bootstrap bundle 5.3.3"></script>
    <script src="../js/cache.js"></script> … <script src="../js/paginas/personagens.js"></script>
</body>
</html>
```

O `data-bs-theme="dark"` escrito no `<html>` é a reserva para quando o JavaScript não roda; com ele rodando, o `tema.js` sobrescreve o atributo antes de a página aparecer.

**`js/paginas/x.js` mínimos** (criados pela Liliane no PR L1, para o layout funcionar desde o início): só `window.onload = function(){ montarLayout('x', '../'); };`. Depois do merge do L1, cada arquivo passa para o dono da página, que completa o resto.

**`css/style.css`** estiliza, além do tema: `.card-recurso` (o botão que envolve o card), `.foto-recurso` e `.poster`, `.iniciais` (bloco 4:5 com as iniciais), `.selo-fundadora`, `.contagem`, `.foto-detalhe`, o modal e o destaque do menu ativo. O CSS pronto está em `docs/identidade-visual.md`, seções da paleta e do design das páginas.

**`js/paginas/inicio.js`**: `montarLayout('inicio', '')` e os cinco cards com o `count` vindo de `buscarComCache(URL_API + '/' + recurso)`, que é do `api.js`, pronto no PR A1. Cada card é um `<a class="card-recurso">` para a página do recurso, com o número em `.contagem`, o nome em `.card-title` e "Ver todos", numa grade `row-cols-1 row-cols-sm-3 row-cols-lg-5`.

### Específico de cada página
`js/paginas/x.js`: o array do recurso, `window.onload`, `mostrarX(lista)`, `montarCardX(item)` e `abrirDetalhesX(item)`. Episódios ainda guarda o mapa URL → nome da temporada.

---

## 5. Fluxo de uma página (Personagens)

1. O navegador carrega `pages/personagens.html`: CSS e depois os scripts na ordem (Bootstrap → cache → api → busca → ui → layout → `paginas/personagens.js`).
2. `window.onload` → `montarLayout('personagens', '../')` monta o menu, com "Personagens" ativo, e o rodapé.
3. `mostrarCarregando('Carregando personagens…')`.
4. `buscarTodos('characters', aoCarregarPagina)` chama `buscarComCache(url)` para cada página:
   - **com cache:** `lerCache(url)` e nenhuma requisição;
   - **sem cache:** `fetch` → `resposta.ok` → `resposta.json()` → `salvarCache(url, dados)`;
   - segue o `next` até `null`: 5 páginas, 49 itens.
5. Se vier `null`: `mostrarErro(...)`. Se não: `esconderCarregando()`, `mostrarPersonagens(personagens)` (foto se houver, iniciais se `image` for `null`; nome; ator) e `configurarBusca(personagens, 'name', mostrarPersonagens)`.
6. "salv" no campo → 2 cards e "2 resultados"; "xyz" → mensagem do RF07.
7. Clique em "Silas" → `abrirDetalhesPersonagem(silas)`:
   - o modal abre com spinner;
   - `buscarRelacionados(silas.species)` → nomes das espécies;
   - `family` é `null` → "Sem família registrada";
   - o modal é preenchido com as iniciais "S" (`aria-label="Sem foto de Silas"`), ator, espécies, família, descrição e episódios.
8. Recarregar → a aba Network mostra **0 requisições** à tvd-api (RN02).

---

## 6. Ordem de implementação

**Fase 0 — Alexandre:** branches + passo 1 → PR na `dev`.

> **Acréscimo de 2026-11-15 (esqueleto):** a árvore da seção 2 já foi criada pelo Alexandre e vai junto com a Fase 0. São 18 arquivos vazios, cada um com uma linha de comentário que diz o que é e quem é o dono: `index.html`, os 5 `pages/*.html`, `css/style.css`, os 5 arquivos de `js/` e os 6 de `js/paginas/`. Só `img/` ficou de fora, porque o logo e o favicon são imagens que a Liliane faz. Assim, nos PRs L1, L2, A1 e A2 cada um **preenche** arquivos que já existem na `dev`, em vez de criá-los, e dois PRs nunca criam o mesmo arquivo. O resto do plano não muda: os donos continuam os da seção 7.

**Fase 1 — compartilhados em paralelo** (começa depois do merge da Fase 0; cada arquivo tem um dono só):

| PR | Dono | Passo | O que | Como testar |
|---|---|---|---|---|
| **A1** | Alexandre | 3 | `cache.js` + `api.js` | Os HTMLs ainda não existem, então o teste usa uma página HTML temporária, sem commit, com os dois scripts. No console: `await buscarComCache(URL_API + '/species')` → 1 requisição na Network e a chave em *Application → Local Storage*; na segunda vez, 0. `(await buscarTodos('episodes')).length` dá `171`. |
| **L1** | Liliane | 2 | Os 6 HTMLs com o esqueleto da seção 4, `layout.js`, `tema.js`, `style.css` base com a paleta de `docs/identidade-visual.md`, `img/logo.png`, `img/favicon.png` e os 6 `js/paginas/x.js` mínimos | Navegar por todas as páginas pelo menu, no Live Server e com duplo clique; com 375 px, o menu vira sanduíche; `aria-current` na página ativa. Tema: com o `localStorage` limpo, o site abre no tema do sistema; o botão troca o tema, a escolha continua ao mudar de página e ao recarregar, e a página não pisca no tema errado ao abrir. |
| **A2** | Alexandre | 4–6 | `ui.js`, `busca.js` e `paginas/especies.js` completo (lista, busca, modal). Começa **depois do merge do L1**, com `/atualizar-branch` | Espécies mostra 9 cards; "vamp" → 2; "doppelganger" → Doppelgänger; "xyz" → RF07; "Humano" abre o modal com 24 nomes, e na segunda abertura não há requisição; DevTools *Offline* com cache limpo → alerta de erro; teclado: Tab, Enter e Esc. |
| **L2** | Liliane | 7 | `style.css` final (tema, `.card-recurso`, `.iniciais`, modal), `index.html` + `inicio.js`. O `inicio.js` usa o `api.js` do A1 | A inicial mostra 49/171/8/9/10; páginas a 375, 768 e 1280 px; o cartão de Espécies (do A2) fica com o estilo final. |
| **V** | Liliane | — | Vercel (seção 1c) | O domínio de produção abre. Com Vercel Authentication desligada, você abre o link de *preview* da `dev` sem login. |
| **R1** | Liliane abre, Alexandre revisa | — | Primeiro PR `dev` → `main` | Na produção: menu, inicial e Espécies completas funcionando, sem erro 404 de caminho no console. |

Dependências: o A1 vem antes do L2 (o `inicio.js` usa `buscarComCache`); o L1 vem antes do A2 (o `especies.js` parte do arquivo mínimo e usa os IDs do HTML); A2 e L2 andam juntos; V e R1 fecham a fase.

**Fase 2 — páginas, um PR por página** (D11 aprovada; Famílias começa já em 22/11, logo depois do A2):

| Dono | Página | Pontos de atenção |
|---|---|---|
| Alexandre | Famílias | Selo "Fundadora" e lista de personagens (mesmo molde de Espécies) |
| Alexandre (D11) | Temporadas | Pôster; lista de episódios no modal (até 18 páginas, com spinner) |
| Liliane | Personagens | `image: null` → iniciais e `family: null` → "Sem família registrada", decididos item a item; até 3 espécies por personagem |
| Liliane | Episódios | 18 páginas com progresso; mapa de temporadas; `formatarData`; audiência com vírgula |

**Fase 3 — integração na `dev`** com o checklist da seção 9, depois o PR final `dev` → `main`.

---

## 7. Divisão da dupla

### Donos de cada arquivo (um dono por arquivo)

| Arquivo | Dono |
|---|---|
| `docs/contexto/*`, `.claude/skills/*`, `CLAUDE.md`, `.gitignore` | Alexandre |
| `js/cache.js`, `js/api.js`, `js/busca.js`, `js/ui.js` | Alexandre |
| `pages/especies.html` + `js/paginas/especies.js`, `pages/familias.html` + `js/paginas/familias.js` | Liliane cria o esqueleto no L1; depois, **Alexandre** |
| `pages/temporadas.html` + `js/paginas/temporadas.js` | Liliane cria o esqueleto no L1; depois, **Alexandre** (D11) |
| `js/layout.js`, `js/tema.js`, `css/style.css`, `img/*`, `index.html`, `js/paginas/inicio.js` | Liliane |
| `pages/personagens.html` + `js/paginas/personagens.js`, `pages/episodios.html` + `js/paginas/episodios.js` | Liliane |
| `README.md` | Liliane (você manda a sua parte do texto para ela) |
| `memory/*` | Quem escreveu; nunca se edita o arquivo do outro |

### Regras para não haver conflito
- Só o dono edita o arquivo. Precisa de mudança no arquivo do outro? Pede ao dono, que faz num PR pequeno; enquanto isso, quem precisa resolve no arquivo da própria página e move depois.
- A única troca de dono é a dos esqueletos de página (Liliane → dono da página) no merge do L1. Depois disso, ela não mexe mais nesses HTMLs/JS.
- Rodar `/atualizar-branch` antes de começar cada PR e antes de abri-lo.
- No fim de cada sessão, `/salvar-memoria`.

### Carga de trabalho e proposta D11
Com a divisão original da Fase 2 (você só com Famílias), a Liliane ficaria com toda a parte visual da Fase 1 **e** as três páginas mais trabalhosas, enquanto a sua Fase 2 seria uma cópia do molde de Espécies. **Aprovado (D11): Temporadas passa para você.** Famílias, que segue o molde de Espécies, fica para 22/11, logo depois do A2; Temporadas fica em 28/11; 29/11 fica livre. A Liliane fica com Personagens e Episódios.

**Famílias em 22/11:** o PR do A2 ainda vai estar aberto na `trabalho/alexsant22`. Um `git push` de Famílias nesse dia entraria no mesmo PR, então Famílias fica só em commit local. O push e o PR de Famílias vão depois do merge do A2, na manhã de 23/11.

### Calendário

Você só tem manhãs nos dias úteis; o trabalho pesado fica em 21–22/11 e 28–29/11, e nada seu fica marcado em 19/11 (Engenharia de Software), 27/11 (Orientação a Objetos), 30/11 (Inglês), 03/12 e 04/12 (apresentação de Orientação a Objetos).

| Data | Alexandre | Liliane |
|---|---|---|
| dom 15/11 | Fase 0: branches + passo 1 → PR na `dev` | — |
| seg 16/11 | manhã: revisar o que faltou do passo 1 | merge da Fase 0; criar a branch dela; começar o L1 |
| ter 17/11 | manhã: **A1** (`cache.js` + `api.js`, curto, teste no console) → PR | L1 |
| qua 18 – sex 20/11 | livre (19/11 é a apresentação de Engenharia de Software) | merge do A1 (18/11); termina o L1 → PR até sex 20/11 |
| **sáb 21/11** | revisar e fazer merge do L1; `/atualizar-branch`; **A2**: `ui.js` + lista de Espécies | começa o L2 (`style.css` final, inicial) |
| **dom 22/11** | **A2**: `busca.js` + modal → PR. Depois, **Famílias** (molde de Espécies), só com commit local | L2 |
| seg 23 – ter 24/11 | manhã de 23/11: revisar o L2; depois do merge do A2, `git push` de Famílias + PR | merge do A2 (23/11); L2 → PR até 24/11; revisar Famílias; **V (Vercel) até 24/11** |
| qua 25/11 | manhã: revisar o R1 (`dev` → `main`) | abre o R1; produção conferida. Começa Personagens |
| qui 26 – sex 27/11 | livre (27/11 é a entrega de Orientação a Objetos) | Personagens → PR |
| **sáb 28/11** | revisar Personagens; **Temporadas** → PR | Episódios |
| dom 29/11 | **livre** (véspera da prova de Inglês) | Episódios → PR; revisar Temporadas |
| seg 30/11 | livre (prova de Inglês) | revisar o que faltar; README |
| ter 01/12 | manhã: revisar Episódios; checklist da seção 9 (itens 1–4) | checklist (itens 5–9) |
| qua 02/12 | manhã: corrigir o que o checklist apontar no que é seu; abrir o PR final `dev` → `main` | corrigir o que for dela |
| qui 03/12 | **nada** | revisar e fazer merge do PR final; conferir a produção |
| sex 04/12 | livre (apresentação de Orientação a Objetos) | slides da apresentação |
| sáb 05 – dom 06/12 | folga para ajustes; ensaio da apresentação juntos | ensaio |
| seg 07/12 | manhã: última conferência na produção, sem funcionalidade nova | idem |
| ter 08/12 | **Entrega e apresentação** | |

### Blocos de git

PR de página (exemplo seu, Famílias):

```bash
git status
git add pages/familias.html
git add js/paginas/familias.js
git commit -m "feat: página de famílias com lista, busca e modal"
git push
gh pr create --base dev --head trabalho/alexsant22 --title "feat: página de famílias" --body "Lista das famílias com selo de fundadora, busca por nome e modal com descrição e personagens."
```

PR da Liliane (exemplo L1):

```bash
git status
git add index.html
git add pages/personagens.html
git add pages/episodios.html
git add pages/temporadas.html
git add pages/especies.html
git add pages/familias.html
git add js/layout.js
git add js/tema.js
git add js/paginas/inicio.js
git add js/paginas/personagens.js
git add js/paginas/episodios.js
git add js/paginas/temporadas.js
git add js/paginas/especies.js
git add js/paginas/familias.js
git add css/style.css
git add img/logo.png
git add img/favicon.png
git commit -m "feat: esqueleto semântico das páginas, menu e rodapé"
git push
gh pr create --base dev --head trabalho/lilianeperim-ifsp --title "feat: esqueleto das páginas e layout" --body "Seis páginas com header, nav, main e footer, formulário de busca e contêineres da lista. Menu e rodapé montados pelo layout.js. Estilo base, logo e favicon."
```

PR `dev` → `main` (R1 e o final):

```bash
git status
gh pr create --base main --head dev --title "release: site completo" --body "Todas as páginas de recurso, cache em localStorage, busca e modais. Testado na preview da dev."
```

Pelo navegador: `https://github.com/lilianeperim-ifsp/Projeto_Final_CIWB/compare/dev...trabalho/alexsant22?expand=1`, trocando as branches conforme o caso. Quem não abriu o PR revisa e faz o merge. Nenhum commit nem PR leva `Co-Authored-By`, rodapé de ferramenta ou menção a IA.

---

## 8. Requisito → onde é atendido

| Req. | Arquivo / função |
|---|---|
| RF01 | `<header>`/`<nav>`/`<footer>` em cada HTML + `layout.js` `montarLayout`, `montarMenu`, `montarRodape` |
| RF02 | `pages/*.html` (um por recurso) + `layout.js` `PAGINAS` / `montarMenu` |
| RF03 | `api.js` `buscarTodos` (segue `next`) + `window.onload` de cada `paginas/x.js` + `ui.js` `mostrarCarregando` |
| RF04 | `ui.js` `criarCard`, `mostrarLista` + `montarCardX` de cada página |
| RF05 | `ui.js` `abrirModal`, `criarListaDetalhes` + `api.js` `buscarRelacionados` + `abrirDetalhesX` de cada página |
| RF06 | `busca.js` `configurarBusca`, `filtrarPorNome`, `normalizarTexto` + `<form role="search">` |
| RF07 | `busca.js` `atualizarMensagemBusca` + `#mensagem-busca` (`aria-live`) |
| RN01 | `cache.js` `salvarCache` (`JSON.stringify`), chamado por `api.js` `buscarComCache` |
| RN02 | `api.js` `buscarComCache` (`lerCache` antes de todo `fetch`; único `fetch` do projeto) |
| RNF01 | Bootstrap 5.3.3 (grid `row-cols-*`, navbar recolhível, modal) + `style.css` |
| RNF02 | Tags semânticas, `label` da busca, `alt` e `role="img"` em `criarCard`/`criarIniciais`, `role`/`aria-*` (ponto 9) |
| RNF03 | Pastas `css/`, `js/`, `pages/`; compartilhados em `js/*.js`, específicos em `js/paginas/` |
| RNF04 | `fetch` com async/await em `api.js` `buscarComCache` |

---

## 9. Verificação final (fase 3, na *preview* da `dev` e depois na `main`)

1. **RN01/RN02:** limpar o cache → abrir Episódios → Network com 18 + 1 requisições e as chaves em *Local Storage*. Recarregar → 0. Abrir Temporadas → 1 requisição (as páginas de episódios já estão salvas, então o modal não faz nenhuma).
2. **RF03:** contagens 49/171/8/9/10 e o progresso "página N de 18" na primeira visita.
3. **RF05:** um modal de cada recurso, com as relações em nomes:
   - **Silas** (id 21, `image` e `family` nulos) mostra as iniciais "S" e "Sem família registrada";
   - **Elijah Mikaelson** (id 12, sem foto, com família) mostra as iniciais "EM" e a família Mikaelson;
   - **Elena Gilbert** mostra a foto.
4. **RF06/RF07:** busca com e sem acento, sem resultado e com o campo vazio de novo.
5. **Erro:** DevTools *Offline* + cache limpo → alerta e "Tentar novamente".
6. **RNF01:** 375/768/1280 px em todas as páginas; o menu sanduíche funciona.
7. **RNF02:** Tab percorre o menu, a busca e os cards; Enter abre e Esc fecha o modal; Lighthouse → Acessibilidade sem erros de `label`/`alt`.
8. **RNF03:** a busca por `fetch(` no projeto só encontra `api.js`; nenhuma função repetida entre páginas.
9. **Vercel:** todas as páginas e links funcionam no domínio de produção.

---

## 10. Decisões

| # | Decisão | Situação |
|---|---|---|
| D1 | Página inicial | **Mantida.** Em 22/11 a dupla decidiu manter o `index.html` como página inicial, com a apresentação e os cinco cards de contagem, sem consultar o professor. |
| D2 | Relações resolvidas pela lista do recurso | Aprovada |
| D3 | `<script>` comum, sem módulos | Aprovada |
| D4 | Botão "Limpar dados salvos" no rodapé | Aprovada |
| D5 | Sem foto → iniciais | **Aprovada.** A regra é por item (`image` preenchido → foto; `null` → iniciais), sem depender de quantos estão sem foto. |
| D6 | Sem imagem nos cards de episódio | Aprovada |
| D7 | Nome do site e cores | **Fechada em 17/11 pela dupla:** nome "Diários de Mystic Falls", paleta "Grimório" (vinho com dourado, um vinho mais claro no modo escuro), com modo claro e modo escuro. A primeira visita segue o tema do sistema; o botão no menu troca e salva a escolha (`js/tema.js`, no `<head>`). Detalhes em `docs/identidade-visual.md`. |
| D8 | Quem faz os compartilhados | **Dividido:** Alexandre faz `cache.js`, `api.js`, `busca.js`, `ui.js` e Espécies; Liliane faz os HTMLs, `layout.js`, `style.css`, `img/`, `index.html` e `inicio.js`. Um dono por arquivo (seção 7). |
| D9 | Seção "Contexto" no `CLAUDE.md` | **Aprovada**; texto na seção 1b |
| D10 | Usuário GitHub da Liliane | **`lilianeperim-ifsp`** (confirmado em 15/11). A branch dela é `trabalho/lilianeperim-ifsp`. |
| D11 | Temporadas passa da Liliane para o Alexandre | **Aprovada.** Famílias em 22/11 (commit local; push e PR em 23/11, depois do merge do A2), Temporadas em 28/11, 29/11 livre. |
