# Identidade visual (D7)

Decidida pela dupla em 2026-11-18. Vale para todas as páginas e é a base do `style.css`, do logo e do favicon (PR L1).

## Nome do site

**Diários de Mystic Falls**

- Na marca do menu (ao lado do logo) e no rodapé.
- No fim do `<title>` de cada página: `Personagens | Diários de Mystic Falls`. Na inicial, só `Diários de Mystic Falls`.

## Paleta "Grimório"

Vinho com dourado. O site tem **modo claro e modo escuro**, trocados pelo atributo `data-bs-theme` do Bootstrap 5.3.3 (`"light"` e `"dark"`) no `<html>`. O vermelho-vinho do destaque é o mesmo nos dois modos, e no modo claro os links passam a dourado escuro, porque o dourado claro não teria contraste no fundo de pergaminho.

| Variável | Uso | Claro | Escuro |
|---|---|---|---|
| `--tvd-fundo` | fundo da página (`body`) | `#f6efe4` | `#140c0e` |
| `--tvd-superficie` | menu, cards, modal e rodapé | `#fffaf2` | `#22151a` |
| `--tvd-borda` | bordas e divisórias | `#e0d0bb` | `#43303a` |
| `--tvd-texto` | texto principal | `#2a1a14` | `#f1e6dc` |
| `--tvd-texto-secundario` | ator, data, legendas | `#6e5a4b` | `#bfae9e` |
| `--tvd-destaque` | botões e item ativo do menu | `#8a1526` | `#8a1526` |
| `--tvd-texto-destaque` | texto dos botões | `#fff7ec` | `#f7ecd9` |
| `--tvd-link` | links e "Ver detalhes" | `#7a5612` | `#d9b26a` |
| `--tvd-foco` | anel de foco do teclado | `#a07a1f` | `#e8c36f` |
| `--tvd-carregando` | spinner (`role="status"`) | `#8a1526` | `#d9b26a` |
| `--tvd-erro-fundo` | aviso de erro (`role="alert"`) | `#fbe3e0` | `#3d1016` |
| `--tvd-erro-texto` | texto do aviso de erro | `#8a1a14` | `#ffb3ae` |

### Contraste (WCAG 2.1, nível AA)

Mínimo de 4,5:1 para texto e de 3:1 para o anel de foco e o spinner. Tudo passa nos dois modos.

| Par | Mínimo | Claro | Escuro |
|---|---|---|---|
| Texto no fundo | 4,5 | 14,6 | 15,7 |
| Texto no card | 4,5 | 16,1 | 14,4 |
| Texto secundário no card | 4,5 | 6,3 | 8,2 |
| Texto secundário no fundo | 4,5 | 5,7 | 9,0 |
| Texto do botão | 4,5 | 8,9 | 8,1 |
| Link no fundo | 4,5 | 5,8 | 9,7 |
| Link no card | 4,5 | 6,4 | 8,8 |
| Anel de foco no fundo | 3 | 3,5 | 11,5 |
| Spinner no fundo | 3 | 8,3 | 9,7 |
| Texto do erro | 4,5 | 7,7 | 9,6 |

Quem mudar uma cor confere de novo o par dela nesta tabela.

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
    --bs-focus-ring-color: rgba(160, 122, 31, 0.5);
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
    --tvd-destaque: #8a1526;
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
    --bs-focus-ring-color: rgba(232, 195, 111, 0.5);
    --bs-danger-bg-subtle: var(--tvd-erro-fundo);
    --bs-danger-text-emphasis: var(--tvd-erro-texto);
}
```

Os botões, o item ativo do menu, as `.iniciais` e o spinner usam as variáveis `--tvd-*` direto no `style.css` (por exemplo, `background-color: var(--tvd-destaque)`), sem trocar as classes do Bootstrap.

## Modo claro e modo escuro

- **Primeira visita:** o site segue o tema do sistema (`prefers-color-scheme`). Quem usa o sistema no escuro vê o modo escuro; quem usa no claro vê o modo claro.
- **Botão de tema no menu:** troca entre claro e escuro e salva a escolha no `localStorage`, na chave `tema` (valor `"light"` ou `"dark"`). Depois do clique, vale a escolha salva, em qualquer página.
- **"Limpar dados salvos" não apaga o tema:** o `limparCache()` só remove as chaves que começam com `https://tvd-api.vercel.app/api`.
- **Sem piscar na abertura:** o tema é aplicado pelo `js/tema.js`, carregado no `<head>` logo depois do `style.css`, sem `defer`. Assim o atributo `data-bs-theme` já está certo antes de a página aparecer. Se o script ficasse no fim do `<body>` com os outros, a página abriria no tema errado e trocaria na frente da pessoa.
- **Acessibilidade:** o botão diz o que faz, com `aria-label="Ativar modo claro"` ou `aria-label="Ativar modo escuro"`, e o texto do rótulo troca junto com o tema.

O contrato do `tema.js` e do botão está no `docs/plano.md`, seção 4, "Parte da Liliane".
