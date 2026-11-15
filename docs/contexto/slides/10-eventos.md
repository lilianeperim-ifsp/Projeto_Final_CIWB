> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\10. Eventos.pdf`

# Aula 10 — Eventos

## Slide 1 — Eventos

Eventos

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Eventos

- Eventos são ações ou ocorrências que acontecem no sistema que o JavaScript pode detectar e responder.
- Exemplos:
  - Clique do usuário em um botão (onclick).
  - Movimento do mouse sobre um elemento (onmouseover).
  - Pressionamento de uma tecla (onkeydown).
  - Mudança no valor de um campo de entrada (onchange).

## Slide 3 — Eventos

- Um evento HTML pode ser algo que o navegador faz ou algo que o usuário faz.
- Aqui estão alguns exemplos de eventos HTML:
  - Uma página da web HTML terminou de carregar
  - Um campo de entrada HTML foi alterado
  - Um botão HTML foi clicado
- Com frequência, quando eventos acontecem, você pode querer executar alguma ação.
- O JavaScript permite que você execute código quando os eventos são detectados.
- O HTML permite adicionar atributos manipuladores de eventos, com código JavaScript, aos elementos HTML.

## Slide 4 — Associando eventos a elementos HTML

- Atributos HTML: Adicionar código JavaScript diretamente nos atributos dos elementos.

```html
<button onclick="alert('Botão clicado!')">Clique-me</button>
```

## Slide 5 — Associando eventos a elementos HTML

- Métodos JavaScript: Utilizar métodos como addEventListener para associar eventos.

```js
document.getElementById("meuBotao").addEventListener("click", function() {
  alert('Botão clicado!');
});
```

- Vantagens do addEventListener:
  - Permite múltiplos manipuladores para o mesmo evento.
  - Oferece controle sobre a fase de propagação do evento.

## Slide 6 — Tipos Comuns de Eventos

- Eventos de Mouse:
  - **onclick**: Clique do mouse.
  - **onmouseover**: Mouse sobre o elemento.
  - **onmouseout**: Mouse fora do elemento.
- Eventos de Teclado:
  - **onkeydown**: Tecla pressionada.
  - **onkeyup**: Tecla liberada.
- Eventos de Formulário:
  - **onchange**: Mudança no valor de um campo.
  - **onsubmit**: Envio de um formulário.
- Eventos de Carregamento:
  - **onload**: Página ou imagem carregada.
  - **onunload**: Página ou janela fechada.

## Slide 7 — Objetos de evento

- Objetos que contêm informações sobre o evento ocorrido.
- Propriedades Comuns:
  - event.target: Elemento que disparou o evento.
  - event.type: Tipo do evento.
  - event.currentTarget: Elemento ao qual o manipulador de eventos está anexado.

```js
document.getElementById("meuBotao").addEventListener("click", function(event) {
  console.log(event.target);
});
```

## Slide 8 — Exercício

Crie uma página interativa utilizando eventos.

Instruções:

- Criar um botão que, ao ser clicado, exibe a data e hora atual.
- Alterar a cor de fundo da página ao passar o mouse sobre um parágrafo.
- Mostrar um alerta quando uma tecla for pressionada.

## Slide 9 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
