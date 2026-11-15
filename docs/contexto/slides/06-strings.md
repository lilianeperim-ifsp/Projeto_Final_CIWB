> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\06. Strings.pdf`

# Aula 6 — Strings

## Slide 1 — Strings

Strings

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Declarações condicionais

(O título do slide é "Declarações condicionais", mas o conteúdo é sobre strings.)

- Strings são usadas para armazenar texto
- Strings são escritas com aspas
- Strings também podem ser escritas com Templates Strings (ou Template literals)

## Slide 3 — String Templates

- Usam crases () em vez de aspas ("") para definir uma string.
- Permitem tanto aspas simples quanto aspas duplas dentro de uma string.
- Permitem strings em várias linhas.

```js
let texto = `Olá Mundo!`;
```

```js
let texto =
`The quick
brown fox
jumps over
the lazy dog`;
```

```js
let texto = `Jonatas também é conhecido como "Johnny"`;
```

## Slide 4 — Interpolação

- Template Strings permitem o uso de variáveis dentro de strings.

```js
let firstName = "John";
let lastName = "Doe";

let text = `Welcome ${firstName}, ${lastName}!`;
```

## Slide 5 — Métodos de String

- As strings em JavaScript são primitivas e imutáveis
  - Todos os métodos de string produzem uma nova string sem alterar a string original.

| | |
|---|---|
| String length | String isWellFormed() |
| String charAt() | String toWellFormed() |
| String charCodeAt() | String trim() |
| String codePointAt() | String trimStart() |
| String concat() | String trimEnd() |
| String at() | String padStart() |
| String [ ] | String padEnd() |
| String slice() | String repeat() |
| String substring() | String replace() |
| String substr() | String replaceAll() |
| String toUpperCase() | String split() |
| String toLowerCase() | |

## Slide 6 — String length

- A propriedade length retorna o tamanho de uma string.

```js
let texto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let tamanho = text.length;
```

## Slide 7 — Extraindo caracteres de uma string

- Existem 3 métodos para extrair caracteres de uma string:
  - O método at(position)
  - O método charAt(position)
  - Usando acesso por índice [], como em arrays

> Destaque:
> - O método at() é uma adição recente ao JavaScript.
> - Ele permite o uso de índices negativos, enquanto o charAt() não permite.
> - [] Faz as strings parecerem arrays (mas elas não são).
> - Se nenhum caractere for encontrado, [] retorna undefined, enquanto charAt() retorna uma string vazia.
> - É somente leitura. str[0] = "A" não gera erro (mas também não funciona!).

```js
let text = "HELLO WORLD";
let char = text.charAt(0); // H
let letter = text.at(1); // E
let c = text[2]; // L
```

## Slide 8 — Concatenação

- O método concat() pode ser usado em vez do operador de adição (+).

```js
text = "Hello" + " " + "World!";
text = "Hello".concat(" ", "World!");
```

## Slide 9 — Extraindo partes da String

- Existem 3 métodos para extrair uma parte de uma string:
  - slice(início, fim) → aceita parâmetro negativo
  - substring(início, fim)
  - substr(início, tamanho)

```js
let texto = "Apple, Banana, Kiwi";
let part1 = texto.slice(7, 13); // Banana
let part2 = texto.slice(-12, -6); // Banana
let part3 = texto.substring(7, 13); // Banana
let part4 = texto.substr(7, 6); // Banana
```

## Slide 10 — Conversão para maíusculas e minúsculas

- Uma string é convertida para maiúsculas com toUpperCase()
- Uma string é convertida para minúsculas com toLowerCase()

```js
let text1 = "Hello World!";
let text2 = text1.toUpperCase(); // HELLO WORLD!
let text3 = text1.toLowerCase(); // hello world!
```

## Slide 11 — Substituindo conteúdo

- O método replace() substitui um valor específico por outro valor dentro de uma string
- Por padrão, o método replace() substitui apenas a primeira ocorrência

```js
let text = "Please visit Microsoft and Microsoft!";
let newText1 = text.replace("Microsoft", "W3Schools");
let newText2 = text.replace(/MICROSOFT/i, "W3Schools"); // ER com case insensitive (i)
let newText3 = text.replace(/Microsoft/g, "W3Schools"); // ER para todas as ocorrências'
```

Em 2021, o JavaScript introduziu o método de string **replaceAll()**:

## Slide 12 — Convertendo uma String em um Array

- Uma string pode ser convertida em um array com o método split():
- Se o separador for omitido, o array retornado conterá a string inteira no índice [0].
- Se o separador for "", o array retornado será um array de caracteres individuais:

```js
text.split(",")    // separa nas vírgulas
text.split(" ")    // separa nos espaços
text.split("|")    // separa nos "pipes"
text.split("")     // retorna array de catacteres simples
```

## Slide 13 — Busca na string - indexOf()

- O método indexOf() retorna o índice (posição) da primeira ocorrência de uma string dentro de outra string, ou retorna -1 se a string não for encontrada:

```js
let text = "Please locate where 'locate' occurs!";
let index = text.indexOf("locate"); // 7
```

Veja também **lastIndexOf()** e **search()**

## Slide 14 — Busca na string - match()

- O método match() retorna um array contendo os resultados da correspondência de uma string com outra string (ou com uma expressão regular).

```js
let text = "The rain in SPAIN stays mainly in the plain";
text.match("ain"); // ain
text.match(/ain/g); // Array(3) [ "ain", "ain", "ain" ]
```

## Slide 15 — Busca na string - includes()

- O método includes() retorna true se uma string contiver um valor especificado.
- Caso contrário, retorna false.

```js
let text = "Hello world, welcome to the universe.";
text.includes("world"); // true
```

## Slide 16 — startsWith() e endsWith()

- O método startsWith() retorna true se uma string começar com um valor especificado.
- O método endsWith() retorna true se uma string terminar com um valor especificado.

```js
let arquivo = 'ifsp.jpg';
arquivo.startsWith('ifsp'); // true
arquivo.endsWith('jpg'); // true
```

## Slide 17 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
