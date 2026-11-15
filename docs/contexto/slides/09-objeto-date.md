> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\09. Objeto Date.pdf`

# Aula 9 — Objeto Date

## Slide 1 — Date

Date

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Objeto Date

- Objetos Date são estáticos.
- O relógio do computador está sempre "andando", mas os objetos Date não.
- Por padrão, o JavaScript usará o fuso horário do navegador e exibirá uma data como uma string completa:

**Mon Sep 29 2025 16:37:15 GMT-0300 (Horário Padrão de Brasília)**

## Slide 3 — Objeto Date

- **new Date()** cria um objeto Date com a data e hora atuais:

```js
const d = new Date();
```

- **new Date(dataString)** cria um objeto Date a partir de uma string de data:

```js
const d = new Date("October 13, 2014 11:13:00");
const s = new Date("2022-03-25");
```

- **new Date(ano, mês, ...)** cria um objeto Date com uma data e hora especificadas.
  - 7 números especificam ano, mês, dia, hora, minuto, segundo e milissegundo (nessa ordem):

```js
const d = new Date(2018, 11, 24, 10, 33, 30, 0);
```

## Slide 4 — Objeto Date

- O JavaScript armazena datas como número de milissegundos desde 1º de janeiro de 1970.
- O tempo zero é 1º de janeiro de 1970, 00:00:00 UTC.
- Um dia (24 horas) equivale a 86.400.000 milissegundos.

```js
const c = new Date(100000000000);
```

↓

**Sat Mar 03 1973 06:46:40 GMT-0300 (Horário Padrão de Brasília)**

## Slide 5 — Objeto Date - formatos

- Geralmente, existem 3 tipos de formatos de entrada de datas em JavaScript:

| Type | Example |
|---|---|
| ISO Date | "2015-03-25" (The International Standard) |
| Short Date | "03/25/2015" |
| Long Date | "Mar 25 2015" or "25 Mar 2015" |

- O formato ISO segue um padrão estrito no JavaScript.
- Os outros formatos não são tão bem definidos e podem variar dependendo do navegador.

## Slide 6 — Objeto Date - métodos

| Method | Description |
|---|---|
| getFullYear() | Get **year** as a four digit number (yyyy) |
| getMonth() | Get **month** as a number (0-11) |
| getDate() | Get **day** as a number (1-31) |
| getDay() | Get **weekday** as a number (0-6) |
| getHours() | Get **hour** (0-23) |
| getMinutes() | Get **minute** (0-59) |
| getSeconds() | Get **second** (0-59) |
| getMilliseconds() | Get **millisecond** (0-999) |
| getTime() | Get **time** (milliseconds since January 1, 1970) |

## Slide 7 — Objeto Date - métodos

| Method | Description |
|---|---|
| setDate() | Set the day as a number (1-31) |
| setFullYear() | Set the year (yyyy) |
| setHours() | Set the hour (0-23) |
| setMilliseconds() | Set the milliseconds (0-999) |
| setMinutes() | Set the minutes (0-59) |
| setMonth() | Set the month (0-11) |
| setSeconds() | Set the seconds (0-59) |
| setTime() | Set the time (milliseconds since January 1, 1970) |

## Slide 8 — Objeto Date

- Comparação de datas

```js
let text = "";
const today = new Date();
const someday = new Date();
someday.setFullYear(2100, 0, 14);

if (someday > today) {
  text = "Today is before January 14, 2100.";
} else {
  text = "Today is after January 14, 2100.";
```

## Slide 9 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
