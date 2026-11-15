> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\04. Estruturas condicionais e de repetição.pdf`

# Aula 4 — Estruturas condicionais e de repetição

## Slide 1 — Estruturas condicionais e de repetição

Estruturas condicionais e de repetição

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Declarações condicionais

- No JavaScript temos as seguintes declarações condicionais:
  - **if** para especificar um bloco de código a ser executado, se uma condição especificada for verdadeira
  - **else** para especificar um bloco de código a ser executado, se a mesma condição for falsa
  - **else if** para especificar uma nova condição a ser testada, se a primeira condição for falsa
  - **switch** para especificar vários blocos alternativos de código a serem executados

## Slide 3 — Declaração if

- Use a instrução if para especificar um bloco de código JavaScript a ser executado se uma condição for verdadeira.

```js
if (condição) {
  //  bloco de código a ser executado se a condição for verdadeira
}
```

Exemplo:

```js
if (hora < 18) {
  cumprimento = "Boa tarde";
}
```

## Slide 4 — Declaração else

- Use a instrução else para especificar um bloco de código a ser executado se a condição for falsa.

```js
if (condição) {
  // bloco de código a ser executado se a condição for verdadeira
} else {
  // bloco de código a ser executado se a condição for falsa
}
```

Exemplo:

```js
if (hora < 18) {
  cumprimento = "Boa tarde";
} else {
  cumprimento = "Boa noite";
}
```

## Slide 5 — Declaração else if

- Use a instrução else if para especificar uma nova condição se a primeira condição for falsa.

```js
if (condição1) {
  //  bloco de código a ser executado se condição1 for verdadeira
} else if (condição2) {
  //  bloco de código a ser executado se condição1 for falsa e condição2 for verdadeira
} else {
  // bloco de código a ser executado se condição1 for falsa e condição2 for falsa
}
```

Exemplo:

```js
if (hora < 12) {
  cumprimento = "Bom dia";
} else if (hora < 18) {
  cumprimento = "Boa tarde";
} else {
  cumprimento = "Boa noite";
}
```

## Slide 6 — Exemplo

- Este exemplo escreverá um link para o IFSP Campus Araraquara ou para o IFSP (reitoria).
  - Usando um número aleatório, há 50% de chance para cada um dos links!

```js
let texto;

if (Math.random() < 0.5) {
  texto = "<a href='https://www.arq.ifsp.edu.br/'>IFSP Campus Araraquara</a>";
} else {
  texto = "<a href='https://www.ifsp.edu.br/'>IFSP</a>";
}

document.querySelector("#acesso").innerHTML = texto;
```

## Slide 7 — Declaração switch

- Com base em uma condição, switch seleciona um ou mais blocos de código para serem executados.
- switch executa os blocos de código que correspondem a uma expressão.
- switch é frequentemente usado como uma alternativa mais legível para várias instruções if...else if...else, especialmente quando se lida com múltiplos valores possíveis.

## Slide 8 — Declaração switch

Sintaxe

```js
switch(expressão) {
  case x:
    // bloco de código
    break;
  case y:
    // bloco de código
    break;
  default:
    // bloco de código
}
```

É assim que funciona:

- A expressão do switch é avaliada uma vez.
- O valor da expressão é comparado com os valores de cada case.
- Se houver correspondência, o bloco de código associado é executado.
- Se não houver correspondência, nenhum código é executado.

> Destaque: A palavra-chave **break** é crucial para evitar o "*fall-through*". Sem o **break**, o código continuará a executar os próximos blocos case (e o bloco default, se estiver presente), mesmo que seus valores não correspondam à expressão.

## Slide 9 — Exemplo

```js
switch (new Date().getDay()) {
  case 0:
    dia = "Domingo";
    break;
  case 1:
    dia = "Segunda-feira";
    break;
  case 2:
     dia = "Terça-feira";
    break;
  case 3:
    dia = "Quarta-feira";
    break;
  case 4:
    dia = "Quinta-feira";
    break;
  case 5:
    dia = "Sexta-feira";
    break;
  case 6:
    dia = "Sábado";
}

document.querySelector("#msg").innerHTML = "Hoje é " + dia;
```

> Destaque: **método getDay() retorna o dia da semana como um número entre 0 e 6.** *(Domingo = 0, Segunda-feira = 1, Terça-feira = 2 ...)*

## Slide 10 — Loops

- Loops podem executar um bloco de código várias vezes..

| Tipo do loop | Description |
|---|---|
| for | Itera sobre valores e expressões |
| while | Itera sobre uma condição |
| do...while | Itera sobre uma condição |
| for...in | Itera sobre as propriedades de um objeto |
| for...of | Itera sobre arrays como objetos |
| forEach() | Itera sobre cada elemento em um Array |

## Slide 11 — Loop For

- A instrução for cria um loop com 3 expressões opcionais:
  - **exp1** é executada uma vez antes da execução do bloco de código.
  - **exp2** define a condição para executar o bloco de código.
  - **exp3** é executada toda vez que o bloco de código é executado.

```js
for (exp1; exp2; exp3) {
  // bloco de código a ser executado
}
```

## Slide 12 — Exemplo

```js
for (let i = 0; i < 5; i++) {
  text += "O número é " + i + "<br>";
}
```

- **exp1** define uma variável antes do início do loop (let i = 0).
- **exp2** define a condição para o loop ser executado (i deve ser menor que 5).
- **exp3** incrementa um valor (i++) cada vez que o bloco de código é executado.

## Slide 13 — Loop While

- O loop while percorre um bloco de código enquanto uma condição especificada for verdadeira.

```js
while (condição) {
  // bloco de código a ser executado
}
```

## Slide 14 — Exemplo

- No exemplo a seguir, o código dentro do loop será executado repetidamente enquanto uma variável (i) for menor que 10:

```js
while (i < 10) {
  texto += "O número é " + i;
  i++;
}
```

- Se você esquecer de aumentar a variável usada na condição, o loop nunca terminará.
  - Isso fará com que seu navegador trave.

## Slide 15 — Loop Do while

- O loop do while é uma variante do loop while.
- O loop do while executará o bloco de código uma vez, antes de verificar se a condição é verdadeira, e depois repetirá o loop enquanto a condição for verdadeira.

```js
do {
  // bloco de código a ser executado
}
while (condição);
```

## Slide 16 — Exemplo

- O do while é executado pelo menos uma vez, mesmo que a condição seja falsa desde o início.
- Isso ocorre porque o bloco de código é executado antes que a condição seja testada

```js
do {
  texto += "O número é " + i;
  i++;
}
while (i < 10);
```

## Slide 17 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
