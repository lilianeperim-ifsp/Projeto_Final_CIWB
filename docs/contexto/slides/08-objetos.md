> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\08. Objetos.pdf`

# Aula 8 — Objetos

## Slide 1 — Objetos

Objetos

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Objetos

- Um objeto é uma variável que pode armazenar muitas variáveis.
- Objetos são coleções de pares chave–valor, onde cada chave (também chamada de nome da propriedade) possui um valor.
- Os objetos podem descrever qualquer coisa, como casas, carros, pessoas, animais ou qualquer outro assunto.

> Imagem: foto de um Fiat 500 branco ("Car Object") ao lado de uma tabela.

| Car Properties | Car Methods |
|---|---|
| car.name = Fiat | car.start() |
| car.model = 500 | car.drive() |
| car.weight = 850kg | car.brake() |
| car.color = white | car.stop() |

## Slide 3 — Objetos - declaração

- Um **objeto literal** é uma forma concisa de criar um objeto.
- Um **objeto literal** é uma lista de pares chave:valor colocados entre chaves { }
- Em termos de objetos, os pares chave:valor são as propriedades do objeto.

```js
const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
```

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```

```js
const person = {};

person.firstName = "John";
person.lastName = "Doe";
person.age = 50;
person.eyeColor = "blue";
```

## Slide 4 — Objetos - propriedades

- Você pode acessar as propriedades de um objeto de três maneiras:

```js
person.lastName;
person["lastName"];
let c = 'lastname';
person[c]
```

- Você pode adicionar novas propriedades a um objeto existente simplesmente atribuindo um valor a elas:

```js
person.nationality = "English";
```

## Slide 5 — Objetos - métodos

- Métodos de objeto são ações que podem ser realizadas em objetos.
- Os métodos de objeto são definições de funções armazenadas como valores de propriedades:

```js
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```

- No exemplo acima, **this** se refere ao objeto person
- **this.firstName** significa a propriedade **firstName** do objeto person.

## Slide 6 — Objetos - funções construtoras

- Às vezes, precisamos criar muitos objetos do mesmo tipo.
- Para criar um tipo de objeto, usamos uma função construtora de objetos.
- É considerado uma boa prática nomear funções construtoras com a primeira letra maiúscula.

```js
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}
```

```js
const myFather = new Person("John", "Doe", 50, "blue");
const myMother = new Person("Sally", "Rally", 48, "green");
const mySister = new Person("Anna", "Rally", 18, "green");
const mySelf = new Person("Johnny", "Rally", 22, "green");
```

## Slide 7 — Objetos - classes

- Classes em JavaScript são introduzidas no ECMAScript 2015
- Classes em JavaScript provêm uma maneira mais simples e clara de criar objetos e lidar com herança.
- Declararações de funções são *hoisted* e declarações de classes não são

```js
class Person {
  constructor(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
  }

  fullName() {
    return this.firstName + " " + this.lastName;
  }
}

const me = new Person("José", "Holanda", 43, "black");
```

## Slide 8 — Classes aninhadas

- Os valores das propriedades de um objeto podem ser outros objetos:

```js
myObj = {
  name:"John",
  age:30,
  myCars: {
    car1:"Ford",
    car2:"BMW",
    car3:"Fiat"
  }
}

myObj.myCars.car2;
myObj.myCars["car2"];
myObj["myCars"]["car2"];
```

## Slide 9 — Laço for .. in

- As propriedades de um objeto podem ser percorridas em um loop:
- Você deve usar **person[x]** no loop.
- **person.x não** funcionará (porque x é a variável do loop).

```js
const person = {
  name: "John",
  age: 30,
  city: "New York"
};

let text = "";
for (let x in person) {
  text += person[x] + " ";
};
```

## Slide 10 — Object.entries()

- O **Object.entries()** facilita o uso de objetos em loops:

```js
const fruits = {Bananas:300, Oranges:200, Apples:500};

let text = "";
for (let [fruit, value] of Object.entries(fruits)) {
  text += fruit + ": " + value + "<br>";
}
```

## Slide 11 — Desestruturação

- A sintaxe de atribuição via desestruturação desempacota as propriedades de um objeto em variáveis:

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50
};

let {firstName, lastName} = person;
```

## Slide 12 — Get/Set

- Getters e setters permitem que você aceda (obtenha ou defina) as propriedades de um objeto.

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "en",
  get lang() {
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  }
};
```

## Slide 13 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
