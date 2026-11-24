# Identidade visual (D7)

Decidida pela dupla em 2026-11-17. Vale para todas as páginas e é a base do `style.css`, do logo e do favicon (PR L1).

## Nome do site

**Diários de Mystic Falls**

- Na marca do menu (ao lado do logo) e no rodapé.
- No fim do `<title>` de cada página: `Personagens | Diários de Mystic Falls`. Na inicial, só `Diários de Mystic Falls`.

## Paleta "Grimório"

Vinho com dourado. O site tem **modo claro e modo escuro**, trocados pelo atributo `data-bs-theme` do Bootstrap 5.3.3 (`"light"` e `"dark"`) no `<html>`. No modo escuro, o vinho do destaque é mais claro (`#c0304a` em vez de `#8a1526`), porque o vinho original quase sumia no fundo escuro (2,04:1). No modo claro, os links passam a dourado escuro, porque o dourado claro não teria contraste no fundo de pergaminho.

| Variável | Uso | Claro | Escuro |
|---|---|---|---|
| `--tvd-fundo` | fundo da página (`body`) | `#f6efe4` | `#140c0e` |
| `--tvd-superficie` | menu, cards, modal e rodapé | `#fffaf2` | `#22151a` |
| `--tvd-borda` | bordas e divisórias | `#e0d0bb` | `#43303a` |
| `--tvd-texto` | texto principal | `#2a1a14` | `#f1e6dc` |
| `--tvd-texto-secundario` | ator, data, legendas | `#6e5a4b` | `#bfae9e` |
| `--tvd-destaque` | botões e item ativo do menu | `#8a1526` | `#c0304a` |
| `--tvd-texto-destaque` | texto dos botões | `#fff7ec` | `#f7ecd9` |
| `--tvd-link` | links e "Ver detalhes" | `#7a5612` | `#d9b26a` |
| `--tvd-foco` | anel de foco do teclado | `#a07a1f` | `#e8c36f` |
| `--tvd-carregando` | spinner (`role="status"`) | `#8a1526` | `#d9b26a` |
| `--tvd-erro-fundo` | aviso de erro (`role="alert"`) | `#fbe3e0` | `#3d1016` |
| `--tvd-erro-texto` | texto do aviso de erro | `#8a1a14` | `#ffb3ae` |

### Contraste (WCAG 2.1, nível AA)

Mínimo de 4,5:1 para texto e de 3:1 para o anel de foco, o spinner e o destaque contra o que está em volta. Tudo passa nos dois modos.

| Par | Mínimo | Claro | Escuro |
|---|---|---|---|
| Texto no fundo | 4,5 | 14,6 | 15,7 |
| Texto no card | 4,5 | 16,1 | 14,4 |
| Texto secundário no card | 4,5 | 6,3 | 8,2 |
| Texto secundário no fundo | 4,5 | 5,7 | 9,0 |
| Texto do botão | 4,5 | 8,9 | 4,8 |
| Botão no fundo | 3 | 8,3 | 3,5 |
| Item ativo no menu | 3 | 9,1 | 3,2 |
| Link no fundo | 4,5 | 5,8 | 9,7 |
| Link no card | 4,5 | 6,4 | 8,8 |
| Anel de foco no fundo | 3 | 3,5 | 11,5 |
| Anel de foco no card | 3 | 3,8 | 10,5 |
| Spinner no fundo | 3 | 8,3 | 9,7 |
| Texto do erro | 4,5 | 7,7 | 9,6 |

As contas usam as cores sólidas, sem transparência. Por isso o anel de foco é desenhado com a cor cheia (`outline` sólido de 2px): com 50% de transparência, o anel do modo claro cairia para 1,76:1. Quem mudar uma cor confere de novo os pares dela nesta tabela.

### CSS para o `style.css`

Vai no começo do `css/style.css`, que é carregado depois do CSS do Bootstrap. Os seletores têm a mesma força que os do Bootstrap, então os nossos valores ganham por virem depois.

```css
/* modo claro */
:root,
[data-bs-theme="light"] {
    --tvd-fundo: #f6efe4;
    --tvd-superficie: #fffaf2;
    --tvd-borda: #e0d0bb;
    --tvd-texto: #2a1a14;
    --tvd-texto-secundario: #6e5a4b;
    --tvd-destaque: #8a1526;
    --tvd-texto-destaque: #fff7ec;
    --tvd-link: #7a5612;
    --tvd-foco: #a07a1f;
    --tvd-carregando: #8a1526;
    --tvd-erro-fundo: #fbe3e0;
    --tvd-erro-texto: #8a1a14;

    /* variáveis do Bootstrap 5.3.3 apontando para a paleta */
    --bs-body-bg: var(--tvd-fundo);
    --bs-body-color: var(--tvd-texto);
    --bs-secondary-color: var(--tvd-texto-secundario);
    --bs-tertiary-bg: var(--tvd-superficie);
    --bs-border-color: var(--tvd-borda);
    --bs-link-color: var(--tvd-link);
    --bs-link-color-rgb: 122, 86, 18;
    --bs-link-hover-color: var(--tvd-texto);
    --bs-link-hover-color-rgb: 42, 26, 20;
    --bs-focus-ring-color: var(--tvd-foco);
    --bs-danger-bg-subtle: var(--tvd-erro-fundo);
    --bs-danger-text-emphasis: var(--tvd-erro-texto);
}

/* modo escuro */
[data-bs-theme="dark"] {
    --tvd-fundo: #140c0e;
    --tvd-superficie: #22151a;
    --tvd-borda: #43303a;
    --tvd-texto: #f1e6dc;
    --tvd-texto-secundario: #bfae9e;
    --tvd-destaque: #c0304a;
    --tvd-texto-destaque: #f7ecd9;
    --tvd-link: #d9b26a;
    --tvd-foco: #e8c36f;
    --tvd-carregando: #d9b26a;
    --tvd-erro-fundo: #3d1016;
    --tvd-erro-texto: #ffb3ae;

    /* variáveis do Bootstrap 5.3.3 apontando para a paleta */
    --bs-body-bg: var(--tvd-fundo);
    --bs-body-color: var(--tvd-texto);
    --bs-secondary-color: var(--tvd-texto-secundario);
    --bs-tertiary-bg: var(--tvd-superficie);
    --bs-border-color: var(--tvd-borda);
    --bs-link-color: var(--tvd-link);
    --bs-link-color-rgb: 217, 178, 106;
    --bs-link-hover-color: var(--tvd-texto);
    --bs-link-hover-color-rgb: 241, 230, 220;
    --bs-focus-ring-color: var(--tvd-foco);
    --bs-danger-bg-subtle: var(--tvd-erro-fundo);
    --bs-danger-text-emphasis: var(--tvd-erro-texto);
}

/* superfície: o .card e o .modal do Bootstrap copiam o --bs-body-bg, e a navbar é transparente */
.card {
    --bs-card-bg: var(--tvd-superficie);
    --bs-card-border-color: var(--tvd-borda);
}

.modal {
    --bs-modal-bg: var(--tvd-superficie);
    --bs-modal-border-color: var(--tvd-borda);
}

#menu,
#rodape {
    background-color: var(--tvd-superficie);
}

/* anel de foco da paleta no lugar do azul do Bootstrap; os seletores com classe
   são necessários porque o Bootstrap zera o outline neles com a mesma força */
:focus-visible,
.btn:focus-visible,
.btn-close:focus-visible,
.nav-link:focus-visible,
.navbar-toggler:focus-visible,
.form-control:focus {
    outline: 2px solid var(--tvd-foco);
    outline-offset: 2px;
    box-shadow: none;
}

.form-control:focus {
    border-color: var(--tvd-foco);
}

.btn-close:focus,
.navbar-toggler:focus {
    box-shadow: none;
}
```

Os blocos de componente (superfície e foco) ficam fora dos blocos de tema, porque só usam as variáveis `--tvd-*`, que já mudam com o modo. O `--bs-focus-ring-color` só vale para a classe `.focus-ring` do Bootstrap; o anel dos botões, links, campos e do botão do menu sanduíche vem do bloco de foco acima.

Os botões, o item ativo do menu, as `.iniciais` e o spinner usam as variáveis `--tvd-*` direto no `style.css` (por exemplo, `background-color: var(--tvd-destaque)`), sem trocar as classes do Bootstrap.

## Modo claro e modo escuro

- **Primeira visita:** o site segue o tema do sistema (`prefers-color-scheme`). Quem usa o sistema no escuro vê o modo escuro; quem usa no claro vê o modo claro.
- **Botão de tema no menu:** troca entre claro e escuro e salva a escolha no `localStorage`, na chave `tema` (valor `"light"` ou `"dark"`). Depois do clique, vale a escolha salva, em qualquer página.
- **"Limpar dados salvos" não apaga o tema:** o `limparCache()` só remove as chaves que começam com `https://tvd-api.vercel.app/api`.
- **Sem piscar na abertura:** o tema é aplicado pelo `js/tema.js`, carregado no `<head>` logo depois do `style.css`, sem `defer`. Assim o atributo `data-bs-theme` já está certo antes de a página aparecer. Se o script ficasse no fim do `<body>` com os outros, a página abriria no tema errado e trocaria na frente da pessoa.
- **Rótulo certo desde a abertura:** o `tema.js` roda antes de o botão existir, então quem cria o `#botao-tema` é o `montarMenu()`, que lê o `data-bs-theme` do `<html>` e já monta o botão com o rótulo certo. Depois, o `trocarTema()` atualiza o rótulo a cada clique.
- **Acessibilidade:** o botão diz o que faz, com `aria-label="Ativar modo claro"` no modo escuro e `aria-label="Ativar modo escuro"` no modo claro, e o texto do rótulo troca junto com o tema.
- **Sem JavaScript:** o `data-bs-theme="dark"` escrito no `<html>` dos HTMLs é a reserva para quando o JavaScript não roda. Com ele rodando, o `tema.js` sobrescreve o atributo.

O contrato do `tema.js` e do botão está no `docs/plano.md`, seção 4, "Parte da Liliane".

## Design das páginas

Decidido pela dupla em 2026-11-17, em cima da paleta acima e do Bootstrap 5.3.3.

| Item | Escolha |
|---|---|
| Tipografia | **Inscrição:** Cinzel nos títulos (`h1`–`h6`, marca do menu, título do modal e do card, contagem da inicial) e Lato no texto |
| Card (`.card-recurso`) | **Elevado:** sem borda, com sombra; no hover sobe 2px e a sombra cresce |
| Foto no card | **Retrato no topo:** foto 4:5 ocupando a largura do card. O pôster de temporada é sempre 2:3 |
| Iniciais (`.iniciais`) | **Vinho cheio:** fundo `--tvd-destaque`, letras `--tvd-texto-destaque`, no mesmo formato 4:5 da foto |
| Item ativo do menu | **Sublinhado dourado:** texto na cor principal com traço de 2px em `--tvd-link` |
| Detalhes do modal | **Duas colunas:** `<dl class="row">`, rótulo à esquerda (`col-sm-4`) e valor à direita (`col-sm-8`) |

### Telas

- **Inicial:** `h1` com o nome do site, uma frase de apresentação e cinco atalhos (`<a class="card-recurso">`) com a contagem em `.contagem`, o nome do recurso e "Ver todos". Grade de 1 coluna no celular, 3 a partir do `sm` e 5 a partir do `lg` (`row-cols-1 row-cols-sm-3 row-cols-lg-5`).
- **Página de recurso:** `h1`, busca com `label` visível e grade de cards com 1, 2 e 4 colunas (`row-cols-1 row-cols-sm-2 row-cols-lg-4`).
  - Personagens: foto ou iniciais, nome e ator.
  - Episódios: sem imagem; título, "Temporada 1 · Episódio 1" e a data.
  - Temporadas: pôster 2:3, nome, período e nº de episódios.
  - Espécies: sem imagem; nome e nº de personagens.
  - Famílias: sem imagem; nome, selo "Fundadora" (`.selo-fundadora`) e nº de personagens.
- **Modal:** `.modal-lg` no desktop. Foto (`.foto-detalhe`, 200px em 4:5) ou iniciais à esquerda e a `<dl>` à direita; abaixo de 768px a foto fica em cima.
- **Menu:** recolhe no botão sanduíche abaixo de 992px (`navbar-expand-lg`).

### CSS do design para o `style.css`

Vai no `style.css` depois do CSS da paleta. O `<link>` das fontes entra no `<head>` de cada HTML, antes do `style.css`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Lato:wght@400;700&display=swap">
```

Sem internet, o título cai para Georgia e o texto para a fonte do sistema. O Lato é carregado em 400 e 700; o `font-weight: 600` do selo e do `<dt>` aparece em 700.

```css
/* tipografia */
:root {
    --tvd-fonte-titulo: "Cinzel", Georgia, serif;
    --tvd-fonte-texto: "Lato", system-ui, sans-serif;
    --bs-body-font-family: var(--tvd-fonte-texto);
}

h1, h2, h3, h4, h5, h6,
.navbar-brand,
.modal-title,
.card-title,
.contagem {
    font-family: var(--tvd-fonte-titulo);
}

/* menu */
.navbar {
    --bs-navbar-color: var(--tvd-texto-secundario);
    --bs-navbar-hover-color: var(--tvd-texto);
    --bs-navbar-nav-link-padding-x: .75rem;
}

.navbar .nav-link.active {
    color: var(--tvd-texto);
    text-decoration: underline 2px var(--tvd-link);
    text-underline-offset: .5rem;
}

/* card de recurso: o <button> (ou o <a> da inicial) que envolve o .card */
.card-recurso {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: var(--bs-card-border-radius);
    background: none;
    color: inherit;
    text-align: start;
    text-decoration: none;
}

.card-recurso .card {
    --tvd-sombra: rgba(42, 26, 20, .14);
    height: 100%;
    border-color: transparent;
    box-shadow: 0 1px 3px var(--tvd-sombra), 0 6px 16px var(--tvd-sombra);
    transition: box-shadow .15s, transform .15s;
}

[data-bs-theme="dark"] .card-recurso .card {
    --tvd-sombra: rgba(0, 0, 0, .5);
}

.card-recurso:hover .card {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px var(--tvd-sombra), 0 12px 28px var(--tvd-sombra);
}

@media (prefers-reduced-motion: reduce) {
    .card-recurso .card {
        transition: none;
        transform: none !important;
    }
}

/* foto (img.card-img-top.foto-recurso) e iniciais no card */
.card-recurso .foto-recurso,
.card-recurso .iniciais {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius) 0 0;
}

.card-recurso .iniciais {
    font-size: 2.5rem;
}

/* pôster de temporada: sempre 2:3, ocupando a largura */
.card-recurso .foto-recurso.poster {
    aspect-ratio: 2 / 3;
}

.iniciais {
    display: grid;
    place-items: center;
    background-color: var(--tvd-destaque);
    color: var(--tvd-texto-destaque);
    font-family: var(--tvd-fonte-titulo);
    font-weight: 700;
    letter-spacing: .05em;
}

/* selo das famílias fundadoras e contagem da inicial */
.selo-fundadora {
    display: inline-block;
    padding: .125rem .5rem;
    border: 1px solid currentColor;
    border-radius: 50rem;
    color: var(--tvd-link);
    font-size: .75rem;
    font-weight: 600;
    letter-spacing: .05em;
    text-transform: uppercase;
}

.contagem {
    font-size: 2.25rem;
    line-height: 1;
}

/* modal (.modal-lg no desktop) */
.modal .foto-detalhe,
.modal .iniciais {
    width: 200px;
    max-width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: var(--bs-border-radius);
    font-size: 3rem;
}

/* <dl class="row"> com <dt class="col-sm-4"> e <dd class="col-sm-8"> */
.modal dt {
    color: var(--tvd-texto-secundario);
    font-weight: 600;
}
```

O anel de foco dos cards vem do bloco de foco da paleta: o `:focus-visible` desenha o contorno no `<button class="card-recurso">`, que acompanha o arredondamento do card.

As classes que o JavaScript precisa criar estão no `docs/plano.md`, seção 4 (`ui.js` e `inicio.js`).
