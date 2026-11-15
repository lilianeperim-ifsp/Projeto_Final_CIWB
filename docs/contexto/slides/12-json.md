> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\12.JSON.pdf`

# Aula 12 — JSON

## Slide 1 — JSON

JSON

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — JSON

- Significa **JavaScript Object Notation** (Notação de Objeto JavaScript).
- É um formato de texto simples usado para armazenar e transportar dados.
- É semelhante à sintaxe usada para criar objetos em JavaScript.
- É utilizado para enviar, receber e armazenar dados.

Objeto JS:

```js
{"name":"John", "age":30, "car":null}
```

JSON string:

```js
'{"name":"John", "age":30, "car":null}'
```

## Slide 3 — JSON vs. XML

- XML (eXtensible Markup Language): O formato que dominava a troca de dados anteriormente.

> Imagem: o mesmo endereço em XML e em JSON, lado a lado.

XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<endereco>
    <cep>31270901</cep>
    <city>Belo Horizonte</city>
    <neighborhood>Pampulha</neighborhood>
    <service>correios</service>
    <state>MG</state>
    <street>Av. Presidente Antônio Carlos, 6627</street>
</endereco>
```

JSON:

```json
{
    "endereco": {
        "cep": "31270901",
        "city": "Belo Horizonte",
        "neighborhood": "Pampulha",
        "service": "correios",
        "state": "MG",
        "street": "Av. Presidente Antônio Carlos, 6627"
    }
}
```

## Slide 4 — JSON vs. XML

- XML (eXtensible Markup Language): O formato que dominava a troca de dados anteriormente.
- Principais Diferenças:
  - Verbosidade: JSON é muito mais conciso, resultando em arquivos menores e transferências de dados mais rápidas.
  - Sintaxe: JSON utiliza pares de chave-valor, semelhante a um objeto literal em JavaScript, enquanto XML utiliza tags de abertura e fechamento.
  - Parsing (Análise): JSON é analisado (parseado) de forma mais simples e rápida pela maioria das linguagens, especialmente pelo JavaScript.

## Slide 5 — JSON stringify

- Um uso comum do JSON é a troca de dados entre um cliente e um servidor web.
- Ao enviar dados para um servidor web, os dados precisam estar no formato de string.
- Você pode converter qualquer tipo de dado JavaScript em uma string usando JSON.stringify().

```js
const obj = {name: "John", age: 30, city: "New York"};
const myJSON = JSON.stringify(obj);
```

- O resultado será uma string seguindo a notação JSON.

## Slide 6 — JSON no mundo real

- No dia-a-dia do desenvolvimento web, utilizamos muito dados externos - por exemplo, recebidos através de um endpoint de uma API REST.
  - Ou seja, quando isso ocorre o sistema tem que esperar os dados "chegarem" antes de utilizar esse resultado.
- Costumamos chamar de programação assíncrona o ato de executar uma tarefa em "segundo plano", sem nosso controle direto disso.
  - O assíncrono no JavaScript vai separar seu código em duas partes: coisas que rodam agora, coisas que vão rodar depois de algo acontecer
- É para esse tipo de situação, que requer processamento assíncrono que existem as Promises, ou, literalmente, promessas.

## Slide 7 — async/await

- As palavras-chave async e await, implementadas a partir do ES2017, são uma sintaxe que simplifica a programação assíncrona.
- Definindo uma função como async, podemos utilizar a palavra-chave await antes de qualquer expressão que retorne uma promessa.
  - Dessa forma, a execução da função externa (a função async) será pausada até que a Promise seja resolvida.
- Vamos ver um exemplo prático…

## Slide 8 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
