> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\15. Expressões Regulares.pdf`

# Aula 15 — Expressões Regulares

## Slide 1 — Expressões Regulares

Expressões Regulares

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — O que é uma Expressão Regular?

- É um objeto que descreve um padrão de caracteres.
- Não é exclusivo do JavaScript; é um conceito de ciência da computação usado em muitas linguagens.
- Para que serve?
  1. Validar (Testar): O texto corresponde ao padrão?
     - Ex: "Isso é um e-mail válido?"
  2. Procurar (Buscar): Onde está o padrão no texto?
     - Ex: "Encontre a palavra 'sistema'".
  3. Substituir (Substituir): Trocar o padrão por outro texto.
     - Ex: "Censure todos os números de telefone".

## Slide 3 — Como Criar uma Regex?

- 1. O "Literal" (Mais comum)
  - A sintaxe é **/padrao/modificadores**
  - O padrão fica entre duas barras.

```js
let regexLiteral = /mundo/i;
```

- 2. O Construtor RegExp (Mais dinâmico)
  - A sintaxe é **new RegExp("padrao", "modificadores")**
  - Útil quando o padrão é variável (vem de um input do usuário, por exemplo).

```js
let regexConstrutor = new RegExp("mundo", "i");
```

## Slide 4 — Modificadores (flags)

- 2 principais modificadores mudam o comportamento da busca:
  - i (ignore case): Ignora maiúsculas e minúsculas.
    - /abc/i encontra "abc", "Abc", "ABC", etc.
  - g (global): Não para no primeiro "match". Encontra todas as ocorrências.
    - Essencial para um "substituir todos".

## Slide 5 — Método 1: test() - O Validador

- É o método mais simples.
  - Pergunta: "O padrão existe neste texto?"
- Retorna true (sim) ou false (não).
- É um método do objeto Regex.

```js
// O texto que queremos analisar
const texto = "Bem-vindo ao curso de Análise e Desenvolvimento de Sistemas.";

// O padrão: a palavra "Sistemas" existe?
const padrao = /Sistemas/;

// O teste:
console.log( padrao.test(texto) ); // Output: true

// E se errarmos a capitalização?
const padraoMinusculo = /sistemas/;
console.log( padraoMinusculo.test(texto) ); // Output: false

// E se usarmos o modificador 'i'?
const padraoIgnoraCase = /sistemas/i;
console.log( padraoIgnoraCase.test(texto) ); // Output: true
```

## Slide 6 — Método 2: exec() - O Detetive

- É mais poderoso que o test(). Ele retorna detalhes sobre o "match".
- Retorna um array com informações (ou null se não encontrar).
- Se usado com a flag g (global), ele pode ser chamado várias vezes para encontrar os próximos "matches".

```js
const texto = "O JavaScript é incrível. O JavaScript é popular.";
const padrao = /JavaScript/g; // Note o 'g'

let match = padrao.exec(texto);
console.log(match);
// Output: ["JavaScript", index: 2, ...] (Mostra o primeiro)

match = padrao.exec(texto);
console.log(match);
// Output: ["JavaScript", index: 27, ...] (Mostra o segundo)

match = padrao.exec(texto);
console.log(match);
// Output: null (Não há mais matches)
```

## Slide 7 — Métodos de String

- Em vez de chamar **regex.metodo(string)**, podemos chamar **string.metodo(regex)**.
  - string.match(regex): O mais direto. Retorna um array com todos os "matches".
    - (Se não usar a flag g, se comporta como exec()).
  - string.search(regex): Retorna o índice (posição) do primeiro "match". Retorna -1 se não encontrar.
  - string.replace(regex, "novo_texto"): O mais útil. Procura e substitui.

## Slide 8 — Exemplo: match() e replace()

```js
const texto = "Meu gato é cinza e meu cachorro é marrom. Eu amo gato!";

// Usando match() para encontrar todas as ocorrências
const padraoGato = /gato/gi; // 'g' (global) e 'i' (ignore case)
const matches = texto.match(padraoGato);
console.log(matches); // Output: ["gato", "gato"]

// Usando replace() para trocar TODAS as ocorrências
const novoTexto = texto.replace(padraoGato, "coelho");
console.log(novoTexto);
// Output: "Meu coelho é cinza e meu cachorro é marrom. Eu amo coelho!"
```

## Slide 9 — Brackets [ ] (Conjuntos)

- Usados para definir um conjunto de caracteres que queremos "dar match".
- [abc]: Encontra "a" OU "b" OU "c".
- [a-z]: Encontra qualquer letra minúscula.
- [A-Z]: Encontra qualquer letra maiúscula.
- [0-9]: Encontra qualquer dígito.
- [^abc]: O ^ (circunflexo) dentro dos brackets significa NEGAÇÃO.
  - Encontra qualquer coisa que NÃO seja "a", "b" ou "c".

```js
let texto = "O número é 7. A nota é 9.";
let padraoNumeros = /[0-9]/g; // Encontre qualquer dígito
console.log(texto.match(padraoNumeros)); // Output: ["7", "9"]

let padraoLetras = /[a-zA-Z]/g; // Encontre qualquer letra
// (Isso vai encontrar muitas coisas!)
```

## Slide 10 — Metacaracteres (Atalhos)

- Atalhos para os conjuntos mais comuns.
  - \d: Um dígito. (Equivalente a [0-9])
  - \D: Um NÃO-dígito. (Equivalente a [^0-9])
  - \w: Caractere de "palavra". (Letras, números e _. Equivalente a [A-Za-z0-9_])
  - \W: Um NÃO-caractere de "palavra".
  - \s: Um caractere de espaço em branco (espaço, tab, etc).
  - \S: Um NÃO-caractere de espaço.
  - . (Ponto): O Coringa! Encontra QUALQUER caractere (exceto quebra de linha).

## Slide 11 — Quantificadores

- Definem quantas vezes o caractere anterior deve ocorrer.
  - +: Um ou mais (1+).
  - *: Zero ou mais (0+).
  - ?: Zero ou um. (Torna o caractere opcional).
  - {n}: Exatamente n vezes.
    - Ex: \d{5} encontra 5 dígitos.
  - {n,}: n ou mais vezes.
    - Ex: \d{5,} encontra 5 ou mais dígitos.
  - {n,m}: De n até m vezes.
    - Ex: \d{2,4} encontra de 2 a 4 dígitos.

## Slide 12 — Desafio: Validar um CEP (Formato Brasileiro)

- Vamos criar um padrão para o formato 12345-678.
- Análise:
  - Queremos 5 dígitos.
  - Depois, um hífen.
  - Depois, 3 dígitos.
- Construção:
  - 5 dígitos: \d{5}
  - Hífen: -
  - 3 dígitos: \d{3}
- O Padrão: /\d{5}-\d{3} /

```js
const cepValido = "12345-678";
const cepInvalido1 = "12345678";
const cepInvalido2 = "abcde-fgh";

const padraoCEP = /\d{5}-\d{3}/;

console.log( padraoCEP.test(cepValido) );    // Output: true
console.log( padraoCEP.test(cepInvalido1) ); // Output: false
console.log( padraoCEP.test(cepInvalido2) ); // Output: false
```

## Slide 13 — Âncoras: ^ e $

- O ^ (circunflexo) fora dos brackets significa "Início do texto".
- O $ (cifrão) significa "Fim do texto".
- Problema:
  - O nosso validador de CEP falha se o texto for "abc 12345-678 def".
  - O test() retorna true porque o padrão existe dentro do texto.
- Solução: "Ancorar" o padrão.

```js
const textoSujo = "Meu CEP é 12345-678, pode enviar.";
const padraoCEP = /\d{5}-\d{3}/; // Padrão solto
const padraoCEPAncorado = /^\d{5}-\d{3}$/; // Padrão ancorado

// O padrão solto encontra o CEP dentro do texto
console.log( padraoCEP.test(textoSujo) ); // Output: true

// O padrão ancorado falha, pois o texto NÃO É *EXATAMENTE* um CEP
console.log( padraoCEPAncorado.test(textoSujo) ); // Output: false

// O padrão ancorado só funciona para o texto limpo:
console.log( padraoCEPAncorado.test("12345-678") ); // Output: true
```

## Slide 14 — Grupos ( ) e Captura

- Parênteses () criam um "grupo de captura".
- Eles têm duas funções:
  - Agrupar quantificadores. (Ex: /(abc)+/ encontra "abcabcabc").
  - "Capturar" o texto que deu match dentro deles.
- Isso é muito poderoso no replace()!
- No replace(), podemos nos referir aos grupos capturados usando $1, $2, $3, etc.

## Slide 15 — Grupos ( ) e Captura

```js
// Exemplo: Inverter Nomes (Formato "Sobrenome, Nome")
const textoNomes = "Silva, Joao\nCosta, Maria";
// Padrão:
// 1. Início da linha (^)
// 2. Um ou mais caracteres de palavra (\w+) -> Capturar (Grupo 1)
// 3. Uma vírgula e um espaço (, )
// 4. Um ou mais caracteres de palavra (\w+) -> Capturar (Grupo 2)
// 5. Fim da linha ($)
const padraoNome = /^(\w+), (\w+)$/gm; // 'g' global, 'm' multiline

const textoFormatado = textoNomes.replace(padraoNome, "$2 $1");
// $2 é o Grupo 2 ("João")
// $1 é o Grupo 1 ("Silva")

console.log(textoFormatado);
// Output:
// João Silva
// Maria Costa
```

## Slide 16 — Resumo

- Regex é um objeto que descreve padrões (/padrao/m).
- test() para validar (true/false).
- match(), search(), replace() para buscar e manipular strings.
- Blocos: Brackets [], Metacaracteres \d \w \s ., Quantificadores + * ? {}.
- Âncoras: ^ (início) e $ (fim) para validação precisa.
- Grupos: () para capturar e usar com $1, $2 no replace().

## Slide 17 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
