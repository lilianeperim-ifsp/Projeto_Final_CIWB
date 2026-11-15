> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\03. Tipos de dados.pdf`

# Aula 3 — Tipos de dados

## Slide 1 — Tipos de dados

Tipos de dados

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Tipos dinâmicos

- O JavaScript possui tipos dinâmicos. Isso significa que a mesma variável pode ser usada para armazenar diferentes tipos de dados:

```js
let x;         // Now x é undefined
x = 5;         // Now x é um Number
x = "John";    // Now x é uma String
```

## Slide 3 — Strings

- Uma string (ou cadeia de texto) é uma sequência de caracteres, como "John Doe".
- As strings são escritas entre aspas. Você pode usar aspas simples ou aspas duplas:

```js
// Aspas duplas:
let carName1 = "Volvo XC60";

// Aspas simples:
let carName2 = 'Volvo XC60';
```

## Slide 4 — Números

- Todos os números em JavaScript são armazenados como números decimais (ponto flutuante).
- Os números podem ser escritos com ou sem casas decimais:

```js
// Com decimais:
let x1 = 34.00;

// Sem decimais:
let x2 = 34;
```

> Destaque: A maioria das linguagens de programação possui vários tipos de números:
> - Números inteiros: byte (8 bits), short (16 bits), int (32 bits), long (64 bits)
> - Números reais (floating-point): float (32 bits), double (64 bits)
>
> Em JavaScript, os números são sempre de um único tipo:
> - double (ponto flutuante de 64 bits)

## Slide 5 — Números

- Todos os números em JavaScript são armazenados em um formato de ponto flutuante de 64 bits.
- O **BigInt** do JavaScript é um novo tipo de dado (ES2020) que pode ser usado para armazenar valores inteiros muito grandes, que não podem ser representados por um número normal do JavaScript.

```js
let x = BigInt("123456789012345678901234567890");
```

## Slide 6 — Números

- Números muito grandes ou muito pequenos podem ser escritos usando a notação científica (exponencial):

```js
let y = 123e5;    // 12300000
let z = 123e-5;   // 0.00123
```

## Slide 7 — Booleanos

- Os booleans são frequentemente usados em testes condicionais.

```js
let x = 5;
let y = 5;
let z = 6;
(x == y)       // Retorna true
(x == z)       // Retorna false
```

## Slide 8 — Arrays

- Os arrays em JavaScript são escritos com colchetes ([]).
- Os itens do array são separados por vírgulas.
- O código a seguir declara (cria) um array chamado *cars*, contendo três itens (nomes de carros):

```js
const cars = ["Saab", "Volvo", "BMW"];
```

- Os índices de um array começam em zero, o que significa que o primeiro item é [0], o segundo é [1], e assim por diante.

## Slide 9 — Objeto

- Os objetos em JavaScript são escritos com chaves {}.
- As propriedades de um objeto são escritas como pares nome:valor, separados por vírgulas.

```js
const pessoa = {nome:"João", sobrenome:"Silva", idade:50, peso:80.4};
```

- O objeto (pessoa) no exemplo acima possui 4 propriedades: nome, sobrenome, idade e peso.

## Slide 10 — undefined

- Em JavaScript, uma variável sem valor possui o valor undefined.
- O tipo também é undefined.

```js
let car;    // Valor é undefined, tipo é undefined
car = undefined;    // Valor é undefined, tipo é undefined
```

## Slide 11 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
