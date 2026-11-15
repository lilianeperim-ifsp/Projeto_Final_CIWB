> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\07. Arrays.pdf`

# Aula 7 — Arrays

## Slide 1 — Arrays

Arrays

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Arrays

- Um Array é um tipo de objeto projetado para armazenar coleções de dados.
- As principais características dos arrays em JavaScript são:
  - Elementos: Um array é uma lista de valores, chamados de elementos.
  - Ordenados: Os elementos de um array são organizados com base no seu índice.
  - Indexação a partir de zero: O primeiro elemento está no índice 0, o segundo no índice 1 e assim por diante.
  - Tamanho dinâmico: Arrays podem crescer ou diminuir conforme elementos são adicionados ou removidos.
  - Heterogêneos: Arrays podem armazenar elementos de diferentes tipos de dados (números, strings, objetos e até outros arrays).

## Slide 3 — Criar um array

- É uma prática comum declarar arrays com a palavra-chave const.

```js
const cars = ["Saab", "Volvo", "BMW"];
```

```js
const cars = [
  "Saab",
  "Volvo",
  "BMW"
];
```

## Slide 4 — Acesso e atualização de valores

- Você acessa ou modifica um elemento de um array referindo-se ao número do índice:

```js
const cars = ["Saab", "Volvo", "BMW"];
let car = cars[0];
cars[0] = "Opel";
```

## Slide 5 — Acessando o array com laços

- Uma maneira de percorrer um array é usando um loop for

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fLen = fruits.length;

let text = "<ul>";
for (let i = 0; i < fLen; i++) {
  text += "<li>" + fruits[i] + "</li>";
}
text += "</ul>";
```

## Slide 6 — Acessando o array com laços

- Você também pode usar a função Array.forEach():

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];

let text = "<ul>";
fruits.forEach(myFunction);
text += "</ul>";

function myFunction(value) {
  text += "<li>" + value + "</li>";
}
```

> Destaque: A função pode receber 3 argumentos, nesta sequência:
> - O valor do item
> - O índice do item
> - O próprio array

## Slide 7 — Acessando o array com laços

- Outra maneira de percorrer um array usando **for of**

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fLen = fruits.length;

let text = "<ul>";

for (let f of fruits){
  text += "<li>" + f + "</li>";
}
text += "</ul>";
```

## Slide 8 — Adicionando elementos ao array

- O método **push**() adiciona um elemento ao final do array.
- O método **unshift**() adiciona novos elementos ao início de um array.

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi"); // adiciona após "Mango"
fruits.unshift("Lemon"); // adiciona antes de "Banana"
```

## Slide 9 — Removendo elementos do array

- O método **pop**() remove o último elemento de um array.
- O método **shift**() remove o primeiro elemento de um array e "desloca" todos os outros elementos para um índice inferior.
- Ambos os métodos retornam o valor que foi removido do array.

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop();  // retira "Mango"
fruits.shift(); // retira "Banana"
```

## Slide 10 — at()

- O método **at**() retorna um elemento de um array a partir de um índice.
- O método **at**() retorna o mesmo que [].
- Possibilita o uso de índices negativos

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.at(2); // Apple
fruits.at(-1); // Mango
```

## Slide 11 — delete()

- Usar **delete**() deixa lacunas indefinidas no array.
- Use **pop**() ou **shift**() em seu lugar.

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
delete fruits[1];
```

> Imagem: console do navegador mostrando `fruits` como `Array(4) [ "Banana", <1 empty slot>, "Apple", "Mango" ]`, com os índices 0, 2 e 3 e `length: 4`.

## Slide 12 — Concatenação

- O método **concat**() cria um novo array ao mesclar (concatenar) arrays existentes.

```js
const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];

const myChildren = myGirls.concat(myBoys); //  [ "Cecilie", "Lone", "Emil", "Tobias", "Linus" ]
```

## Slide 13 — Splice

- O método **splice**() adiciona novos itens a um array.
- Você pode usar **splice**() para remover elementos sem deixar "lacunas" no array

```js
const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
fruits.splice(2, 0, "Limão", "Kiwi"); // [ "Banana", "Laranja", "Limão", "Kiwi", "Maçã", "Manga" ]
fruits.splice(2, 2, "Melão", "Jabuticaba"); // [ "Banana", "Laranja", "Melão", "Jabuticaba", "Maçã", "Manga" ]
fruits.splice(0, 1); // [ "Laranja", "Melão", "Jabuticaba", "Maçã", "Manga" ]
```

## Slide 14 — Busca no array

- **indexOf**(): pesquisa um array por um valor de elemento e retorna sua posição.
- **lastIndexOf**(): é igual ao **indexOf**(), mas retorna a posição da última ocorrência do elemento especificado.
- **includes**(): permite verificar se um elemento está presente em um array (incluindo NaN, ao contrário do **indexOf**)

## Slide 15 — sort() e reverse()

- O método **sort**() ordena um array em ordem alfabética
- O método **reverse**() inverte a ordem dos elementos em um array

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();
fruits.reverse();
```

ver também toSorted() e toReversed()

## Slide 16 — sort() numérico

- Por padrão, a função **sort**() ordena os valores como strings.
- Se os números forem ordenados como strings, "25" é maior que "100", porque "2" é maior que "1".
- Você pode corrigir isso fornecendo uma função de comparação

```js
const points = [40, 100, 1, 5, 25, 10];
//ascendente
points.sort(function(a, b){return a - b});
// descendente
points.sort(function(a, b){return b - a});
```

- Se o resultado for negativo, a é ordenado antes de b.
- Se o resultado for positivo, b é ordenado antes de a.
- Se o resultado for 0, nenhuma mudança é feita na ordem de a e b.

## Slide 17 — Foreach()

- O método **forEach**() chama uma função (uma função de callback) uma vez para cada elemento do array.

```js
const numbers = [45, 4, 9, 16, 25];
let txt = "";
numbers.forEach(myFunction);

function myFunction(value) {
  txt += value + "<br>";
}
```

## Slide 18 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
