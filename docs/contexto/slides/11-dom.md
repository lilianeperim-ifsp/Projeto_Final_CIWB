> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\11. DOM.pdf`

# Aula 11 — Document Object Model

## Slide 1 — Document Object Model

Document Object Model

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — JavaScript HTML DOM

- Quando uma página da web é carregada, o navegador cria um Modelo de Objeto de Documento (DOM) da página.
- O modelo HTML DOM é construído como uma árvore de Objetos:

> Imagem: árvore do DOM. `Document` → `Root element: <html>`, que tem dois filhos: `Element: <head>` → `Element: <title>` → `Text: "My title"`; e `Element: <body>`, que tem `Element: <a>` (com `Attribute: "href"` e `Text: "My link"`) e `Element: <h1>` → `Text: "My header"`.

## Slide 3 — O que é DOM HTML?

- O HTML DOM é um modelo de objeto e uma interface de programação padrão para HTML. Ele define:
  - Os elementos HTML como objetos
  - As **propriedades** de todos os elementos HTML
  - Os **métodos** para acessar todos os elementos HTML
  - Os **eventos** de todos os elementos HTML
  - Em outras palavras: o HTML DOM é um padrão que define como obter, alterar, adicionar ou excluir elementos HTML.

## Slide 4 — Métodos e propriedades do DOM

- O HTML DOM pode ser acessado com JavaScript (e também com outras linguagens de programação).
- No DOM, todos os elementos HTML são definidos como objetos.
- A interface de programação é composta pelas propriedades e métodos de cada objeto.
- Uma propriedade é um valor que você pode obter ou definir (como alterar o conteúdo de um elemento HTML).
- Um método é uma ação que você pode executar (como adicionar ou excluir um elemento HTML).

## Slide 5 — Encontrando elementos HTML

| Método | Descrição |
|---|---|
| document.getElementById(*id*) | Encontra um elemento pelo **id** |
| document.getElementsByTagName(*nome*) | Encontra um elemento pelo nome da **tag** |
| document.getElementsByClassName(*nome*) | Encontra elementos pelo nome da **classe** |
| document.querySelector(*seletor*) | Encontra elementos pelo **seletor** CSS |

## Slide 6 — Mudando elementos HTML

| Propriedade | Descrição |
|---|---|
| element.innerHTML = new html content | Change the inner HTML of an element |
| element.attribute = new value | Change the attribute value of an HTML element |
| element.style.property = new style | Change the style of an HTML element |

| Método | Descrição |
|---|---|
| element.setAttribute(attribute, value) | Change the attribute value of an HTML element |

## Slide 7 — Adicionando e removendo elementos HTML

| Propriedade | Descrição |
|---|---|
| document.createElement(element) | Cria um elemento HTML |
| document.removeChild(element) | Remove um elemento HTML |
| document.appendChild(element) | Adiciona um elemento HTML |
| document.replaceChild(new, old) | Substitui um elemento HTML |

## Slide 8 — Elementos (Nós) do DOM HTML

- Criando novos elementos HTML (nós)
  - Para adicionar um novo elemento ao DOM HTML, você deve primeiro criar o elemento (nó do elemento) e, em seguida, anexá-lo a um elemento existente.

```html
<div id="div1">
    <p id="p1">Este é um parágrafo.</p>
    <p id="p2">Este é outro parágrafo.</p>
</div>

<script>
    const para = document.createElement("p");
    const node = document.createTextNode("Este é novo.");
    para.appendChild(node);

    const element = document.getElementById("div1");
    element.appendChild(para);
</script>
```

## Slide 9 — Elementos (Nós) do DOM HTML

- Criando novos elementos HTML (nós)
  - O método appendChild() no exemplo anterior adicionou o novo elemento como o último filho do elemento pai.
  - Se você não quiser isso, pode usar o método insertBefore():

```html
<div id="div1">
    <p id="p1">Este é um parágrafo.</p>
    <p id="p2">Este é outro parágrafo.</p>
</div>

<script>
    const element = document.getElementById("div1");
    const child = document.getElementById("p1");
    element.insertBefore(para, child);
</script>
```

## Slide 10 — Elementos (Nós) do DOM HTML

- Removendo elementos HTML existentes
  - Para remover um elemento HTML, use o método remove():
  - O método remove() não funciona em navegadores mais antigos.

```html
<div id="div1">
    <p id="p1">Este é um parágrafo.</p>
    <p id="p2">Este é outro parágrafo.</p>
</div>

<script>
    const elmnt = document.getElementById("p1");
    elmnt.remove();
</script>
```

## Slide 11 — Elementos (Nós) do DOM HTML

- Removendo um nó filho
  - Para navegadores que não suportam o método remove(), você precisa localizar o nó pai para remover um elemento

```html
<div id="div1">
    <p id="p1">Este é um parágrafo.</p>
    <p id="p2">Este é outro parágrafo.</p>
</div>

<script>
    const parent = document.getElementById("div1");
    const child = document.getElementById("p1");
    parent.removeChild(child);
</script>
```

## Slide 12 — Elementos (Nós) do DOM HTML

- Substituindo elementos HTML
  - Para substituir um elemento no DOM HTML, use o método replaceChild():

```html
<div id="div1">
    <p id="p1">Este é um parágrafo.</p>
    <p id="p2">Este é outro parágrafo.</p>
</div>

<script>
    const para = document.createElement("p");
    const node = document.createTextNode("Este é novo.");
    para.appendChild(node);

    const parent = document.getElementById("div1");
    const child = document.getElementById("p1");
    parent.replaceChild(para, child);
</script>
```

## Slide 13 — Elementos (Nós) do DOM HTML

- O objeto HTMLCollection
  - O método getElementsByTagName() retorna um objeto HTMLCollection.
  - Um objeto HTMLCollection é uma lista (coleção) de elementos HTML semelhante a um array.

```js
const myCollection = document.getElementsByTagName("p");
for (let i = 0; i < myCollection.length; i++) {
    myCollection[i].style.color = "red";
}
```

**Uma HTMLCollection NÃO é um array!**

- Uma HTMLCollection pode parecer um array, mas não é.
- Você pode percorrer a lista e acessar os elementos por número (assim como em um array).
- No entanto, você não pode usar métodos de array como valueOf(), pop(), push() ou join() em uma HTMLCollection.

## Slide 14 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
