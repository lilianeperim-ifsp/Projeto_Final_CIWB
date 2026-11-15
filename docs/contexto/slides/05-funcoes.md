> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\05. Funções.pdf`

# Aula 5 — Funções

## Slide 1 — Funções

Funções

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Declarações condicionais

(O título do slide é "Declarações condicionais", mas o conteúdo é sobre funções.)

- Funções são blocos de construção fundamentais em toda programação.
- Funções permitem melhor organização do código, modularidade e eficiência.
- Funções são blocos de código reutilizáveis, projetados para executar uma tarefa específica.
- Funções são executadas quando são "chamadas" ou "invocadas".

## Slide 3 — Sintaxe da função

- Uma função é definida com a palavra-chave **function**, seguida pelo **nome da função**, seguida por **parênteses** ( ) e, depois, por **chaves** { }.
- O nome deve seguir as regras de nomenclatura de variáveis (letras, dígitos, ...).
- **Parâmetros** opcionais são listados dentro dos parênteses: (p1, p2, p3).
- O código a ser executado é colocado dentro das chaves: { código }.
- As funções podem, opcionalmente, retornar um valor para quem as "chamou".

```js
function name(p1, p2, p3) {
    // code
}
```

## Slide 4 — Invocação

- O código dentro da função será executado quando "algo" invocar (chamar) a função:
  - Quando for invocada (chamada) a partir de código JavaScript
  - Quando ocorre um evento (por exemplo, o usuário clicar em um botão)
  - Automaticamente (auto-invocada)
- O operador () invoca (chama) a função.

```js
function toCelsius(fahrenheit) {
  return (5/9) * (fahrenheit-32);
}

let valor = toCelsius(77);
```

## Slide 5 — Cuidado!

- Acessar uma função com parâmetros incorretos pode retornar uma resposta incorreta.

```js
function toCelsius(fahrenheit) {
  return (5/9) * (fahrenheit-32);
}

let valor = toCelsius();
```

→ `NaN`

- Acessar uma função sem () retorna a própria função e não o resultado da função.

```js
function toCelsius(fahrenheit) {
  return (5/9) * (fahrenheit-32);
}

let valor = toCelsius;
```

→ `function toCelsius(f) { return (5/9) * (f-32); }`

## Slide 6 — Parâmetros e argumentos da função

- Parâmetros de função são os nomes listados na definição da função.
- Argumentos de função são os valores reais passados para (e recebidos pela) função.
- Regras para parâmetros
  - As definições de função em JavaScript não especificam tipos de dados para os parâmetros.
  - As funções em JavaScript não realizam verificação de tipo nos argumentos passados.
  - As funções em JavaScript não verificam o número de argumentos recebidos.

## Slide 7 — Parâmetros padrão

- Se uma função for chamada com argumentos faltando (menos do que o declarado), os valores ausentes são definidos como undefined.
- Às vezes isso é aceitável, mas outras vezes é melhor atribuir um valor padrão ao parâmetro:

```js
function myFunction(x, y) {
  if (y === undefined) {
    y = 2;
  }
}
```

```js
function myFunction(x, y = 10) {
  return x + y;
}
myFunction(5);
```

## Slide 8 — Parâmetro rest

- O **parâmetro rest** (...) permite que uma função trate um número indefinido de argumentos como um array:

```js
function soma(...args) {
  let s = 0;
  for (let arg of args) s += arg;
  return s;
}

let x = soma(4, 9, 16, 25, 29, 100, 66, 77);
```

## Slide 9 — O objeto arguments

- As funções em JavaScript possuem um objeto interno chamado arguments.
  - arguments contém uma lista (semelhante a um array) com todos os argumentos usados quando a função foi chamada (invocada).

```js
x = findMax(1, 123, 500, 115, 44, 88);

function findMax() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}
```

## Slide 10 — Passagem por valor e por referência

- Argumentos são Passados por Valor
  - Em JavaScript, os argumentos são passados por valor: a função só recebe os valores, e não os endereços (locais) desses argumentos.
  - Se uma função altera o valor de um argumento, isso não altera o valor original do parâmetro.
  - As alterações feitas nos argumentos não são visíveis fora da função.
- Objetos são Passados por Referência
  - Em JavaScript, referências de objetos também são valores.
  - Por causa disso, os objetos se comportam como se fossem passados por referência:
  - Se uma função altera uma propriedade de um objeto, ela altera o valor original.
  - As alterações feitas nas propriedades de objetos são visíveis fora da função.

## Slide 11 — Function expression (funções anônimas)

- Uma função em JavaScript também pode ser definida usando uma expressão.
- Uma expressão de função pode ser armazenada em uma variável:

```js
const x = function (a, b) {return a * b};
let z = x(4, 3);
```

- Funções armazenadas em variáveis não precisam de nomes. Elas são sempre invocadas (chamadas) usando o nome da variável.
- A função acima termina com ponto e vírgula porque faz parte de uma instrução executável.

## Slide 12 — Arrow functions (funções seta)

- As arrow functions foram introduzidas no ES6.
- As arrow functions permitem escrever uma sintaxe de função mais curta.

```js
let myFunction = function(a, b) {return a * b}
```

↓

```js
let myFunction = (a, b) => a * b;
```

## Slide 13 — Arrow functions (funções seta)

- As arrow functions foram introduzidas no ES6.
- As arrow functions permitem escrever uma sintaxe de função mais curta.

```js
let hello = function() {
    return "Hello World!";
}
```

↓

```js
let hello = () => {
  return "Hello World!";
}
```

## Slide 14 — Arrow functions (funções seta)

- Se a função tiver apenas uma instrução que retorna um valor, você pode remover as chaves e a palavra-chave return.

```js
let hello = function() {
    return "Hello World!";
}
```

↓

```js
let hello = () => "Hello World!";
```

> Destaque: Isso funciona apenas se a função tiver apenas uma instrução!

## Slide 15 — Arrow functions (funções seta)

- Se você tiver parâmetros, deve passá-los dentro dos parênteses.

```js
let hello = (val) => "Hello " + val;
```

- Na verdade, se você tiver apenas um parâmetro, também pode omitir os parênteses.

```js
let hello = val => "Hello " + val;
```

## Slide 16 — Callbacks

- Uma callback é uma função passada como argumento para outra função.
- Essa técnica permite que uma função chame outra função.
- Uma função de callback pode ser executada após outra função ter terminado.

```js
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}

myCalculator(5, 5, myDisplayer);
```

## Slide 17 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
