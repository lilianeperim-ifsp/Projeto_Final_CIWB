> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Códigos Exemplo\`

# Códigos de exemplo do professor (todas as aulas)

Na pasta de códigos, a numeração não é a mesma dos slides em `docs/contexto/slides/`:

| Pasta de código | Aula (slides) |
|---|---|
| `01.helloworld` | 1 — Introdução ao JavaScript |
| `02.fundamentos` | 2 — Fundamentos do JavaScript (e 3 — Tipos de dados, que não tem pasta própria) |
| `03.condicional_repeticao` | 4 — Estruturas condicionais e de repetição |
| `04.funcoes` | 5 — Funções |
| `05.strings` | 6 — Strings |
| `06.arrays` | 7 — Arrays |
| `07.objetos` | 8 — Objetos |
| `08.date` | 9 — Objeto Date |
| `09.eventos` | 10 — Eventos |
| `10.dom` | 11 — DOM |
| `11.json` | 12 — JSON |
| `12.cookies` e `13.webstorage` | 13 — Cookies e localStorage |
| `14.validacao` | 14 — Validação de Formulários |
| `15.regex` | 15 — Expressões Regulares |

Os códigos estão copiados como estão, inclusive com os erros de digitação do original (por exemplo, `console.lg` em `01.helloworld/index.html` e `id="nome"]` em `14.validacao/exemplo3.html`).

## Padrões do professor

O estilo que se repete nos exemplos e que o código do projeto deve seguir.

**Requisição com async/await e `resposta.ok`** (`11.json/cep`, `11.json/randomuser`): a função é `async`, o `fetch` vai para uma `const resposta`, o teste é `if (!resposta.ok)` com o caminho de erro primeiro e o `else` com `await resposta.json()`. O JSON recebido vai para uma variável com prefixo `json` (`jsonCEP`, `jsonUser`), e a montagem da tela fica numa função separada (`showUserData(usr)`).

```js
async function getUserData(){

    let url = 'https://randomuser.me/api/?nat=br';

    const resposta = await fetch(url);

    if (!resposta.ok){
        console.log('Erro ao acessar usuário');
    }
    else{

        const jsonUser = await resposta.json();

        showUserData(jsonUser.results[0]);
    }

}
```

**Seleção de elementos com `querySelector`** (todos os exemplos a partir de `09.eventos`), por id (`'#cadastrar'`) ou por tag (`'form'`, `'ul'`). `getElementById` e `getElementsBy...` aparecem só na demonstração de `10.dom/exemplo1` e em `10.dom/exemplo3`. Campos de formulário também são lidos pelo `name`: `form.logradouro.value`.

```js
const botCadastrar = document.querySelector('#cadastrar');
```

**Eventos por propriedade** (`botao.onclick = getUserData;`, `cep.onchange = getAddress;`, `csenha.oninput = function(){...}`, `form.onsubmit = function(e){...}`). `addEventListener` aparece em `09.eventos` e `14.validacao/exemplo3`. Atributos `onclick=` no HTML aparecem só em `09.eventos`. No `submit`, o padrão é `e.preventDefault()`.

```js
form.onsubmit = function(e){

    // interrompe o comportamento padrão do evento
    e.preventDefault();
    ...
};
```

**`window.onload`** para preparar o estado ao abrir a página (`13.webstorage/exemplo2`): confere se a chave existe no localStorage e cria se não existir.

```js
window.onload = function (){

    if (!localStorage.cadastro){
        const cadastro = [];
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
    }
};
```

**localStorage sempre com JSON** (`13.webstorage`): grava com `localStorage.setItem(chave, JSON.stringify(obj))` e lê com `JSON.parse(localStorage.getItem(chave))`. O ciclo é sempre ler, alterar e gravar de novo.

```js
const cadastro = JSON.parse(localStorage.getItem('cadastro'));
cadastro.push(novaPessoa);
localStorage.setItem('cadastro', JSON.stringify(cadastro));
```

**Montagem do DOM** com `createElement` + `textContent` + `appendChild`, limpando o contêiner antes com `innerHTML = ''`. Para percorrer arrays, `for...of`; texto montado com template string.

```js
divCadastrados.innerHTML = '';

for (let pessoa of cadastro){
    const p = document.createElement('p');
    let texto = `Nome: ${pessoa.nome} - Peso: ${pessoa.peso} - Idade: ${pessoa.idade}`;
    p.textContent = texto;
    divCadastrados.appendChild(p);
}
```

**Organização dos arquivos:** HTML com `<!DOCTYPE html>`, `lang="pt-BR"` (às vezes `pt-br`), `meta charset` e `viewport`; `header`/`main` nos exemplos maiores; `<label for>` em todo campo; `<script src>` comum no fim do `<body>` (nunca `type="module"`, `import` ou `export`); nos exemplos com pastas, o JS fica em `js/script.js`.

**Datas** (`08.date`): a data no formato `AAAA-MM-DD` é separada com `split('-')` e montada com `new Date(ano, mes - 1, dia)`, e a exibição usa `toLocaleDateString('pt-br')`.

```js
[ano, mes, dia] = nasc.split('-');

mes = mes - 1;

const meunasc = new Date(ano, mes ,dia);

console.log(meunasc.toLocaleDateString('pt-br'));
```

**Expressões regulares** (`15.regex`): literal `/padrao/flags` com `i` e `g`, âncoras `^...$` para validar (`/^\d{5}-\d{3}$/`), `test()` para validar e `replace()` com grupos `$1`, `$2` para reformatar.

**Entrada e saída nas primeiras aulas** (`02` a `08`): `prompt()`, `alert()` e `console.log()`, com `Number(...)` para converter o que vem do `prompt`. Template strings com `${...}` aparecem a partir de `05.strings` e arrow functions em callbacks curtos (`numerico.sort((a, b) => a - b)`).

**Nomes:** variáveis e funções em camelCase. Em português na maioria (`botCadastrar`, `divCadastrados`, `novaPessoa`, `imprimeMensagem`, `mudaCor`, `dataExpiracao`, `erroNome`). Em inglês quando o exemplo segue a API usada (`getAddress`, `getUserData`, `showUserData`, `getCookie`). Comentários em português, explicando cada etapa em minúsculas (`// obtém o JSON da Promise`). Indentação de 4 espaços, linha em branco depois de abrir a função e `else` em linha própria depois de `}`.

---

### 01.helloworld

Primeiro script: console.log em um <script> dentro do HTML (com o erro de digitação console.lg do original) e em um arquivo script.js separado.

`01.helloworld/index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello world</title>
</head>
<body>
    
    <script>
       console.lg('Hello world!'); 
    </script>

</body>
</html>
```

`01.helloworld/script.js`

```js
console.log('Hello!');
```

### 02.fundamentos/exemplo1

JavaScript externo: um console.log em um arquivo .js ligado pelo <script src>.

`02.fundamentos/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fundamentos</title>
</head>
<body>
 
    <!-- JS externo -->
    <script src="./exemplo1.js"></script>

    <!-- JS interno -->
    <script>
        console.log('JS interno');
    </script>

    <!-- Apenas o JS externo será executado  -->
    <script src="./exemplo1.js">
        console.log('JS interno');
    </script>

</body>
</html>
```

`02.fundamentos/exemplo1.js`

```js
console.log('JS externo');
```

### 02.fundamentos/exemplo2

Saída de dados (textContent, alert, console.log) e entrada com prompt, convertendo o valor com Number().

`02.fundamentos/exemplo2.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrada e saída de dados</title>
</head>
<body>
    
    <p id="msg"></p>

    <script src="./exemplo2.js"></script>
</body>
</html>
```

`02.fundamentos/exemplo2.js`

```js
// escrever em um elemento HTML
// document.querySelector('#msg').textContent = 'Olá';

// window.alert()
// window.alert('Olá alert!');
// alert('Olá sem window!');

// console.log()
// console.log('Olá console!');

// Entrada de dados

// window.prompt()
let idade = Number(prompt('Digite sua idade', 20));
alert(idade);
// função Number converte string para número


let nome = prompt('Qual é o seu nome?');
alert(nome);

```

### 02.fundamentos/exemplo3

Variáveis com let, var e const: escopo de bloco e alteração de elementos de um array const.

`02.fundamentos/exemplo3.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Variáveis</title>
</head>
<body>
    <script src="./exemplo3.js"></script>
</body>
</html>
```

`02.fundamentos/exemplo3.js`

```js
// Variáveis

// let

// let x; // undefined
// x = 45;

// let y = 34;

// let nome;

// {
//     nome = 'Maria';
// }

// alert(nome);

// let idade = Number(prompt('Digite sua idade',0));

// if (idade > 17){
//     var msg = 'Maior de idade';
// }

// alert(msg);

// const

// const x = 10;
// x = 20;

//const nome = prompt('Digite seu nome');

const frutas = ['banana', 'maçã', 'mamão'];
frutas[1] = 'abacate';

alert(frutas);
```

### 02.fundamentos/exemplo4

Operadores: exponenciação, + com strings e números e operador ternário.

`02.fundamentos/exemplo4.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Operadores</title>
</head>
<body>
    <script src="./exemplo4.js"></script>
</body>
</html>
```

`02.fundamentos/exemplo4.js`

```js
// exponenciação
let x = 2**3; // 8

// operador +
// let y = 4 + 7; // 11

// let codigo = 'ABC' + 5; //'ABC5'
// let msg = 4 + 'ever'; // '4ever'

// let nome = 'Joana';
// let sobrenome = 'Silva';

// msg = 'Olá, ' + nome + ' ' + sobrenome + '!';
// alert(msg); // 'Olá, Joana Silva!'

let idade = Number(prompt('Sua idade', 18));

alert(idade < 18 ? 'Menor de idade' : 'Maior de idade');
```

### 03.condicional_repeticao/exemplo1

if/else com Math.random() para trocar o href e o texto de um link selecionado com querySelector.

`03.condicional_repeticao/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Condicional</title>
</head>
<body>
    
    <a href="" id="meulink"></a>

    <script src="./exemplo1.js"></script>
</body>
</html>
```

`03.condicional_repeticao/exemplo1.js`

```js
// acessa o elemento <a> cujo atributo id = 'meulink'
let meulink = document.querySelector('#meulink');

// O método random gera um número aleatório no intervalo
// [0,1)
if (Math.random() < 0.5){
    meulink.href = 'http://www.globo.com';
    meulink.textContent = 'Globo.com';
}
else{
    meulink.href= 'http://www.uol.com.br';
    meulink.textContent = 'UOL';
}
```

### 03.condicional_repeticao/exemplo2

Jogo de dado: número aleatório de 1 a 6 com Math.floor e comparação com a aposta lida por prompt.

`03.condicional_repeticao/exemplo2.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo do dado</title>
</head>
<body>
   <script src="./exemplo2.js"></script> 
</body>
</html>
```

`03.condicional_repeticao/exemplo2.js`

```js
// gera um numero aleatório entre 1 e 6
let dado = Math.floor(Math.random()*6) + 1;
 
console.log(dado);

let aposta = Number(prompt('Digite sua aposta', 0));

if (dado == aposta){
    alert('Você acertou!');
}
else{
    alert('Você errou! O valor do dado é ' + dado);
}
```

### 04.funcoes/exemplo1

Declaração e invocação de funções, argumentos faltando (NaN) e valor padrão com o operador ??=.

`04.funcoes/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Funções</title>
</head>
<body>
    
    <script src="exemplo1.js"></script>

</body>
</html>
```

`04.funcoes/exemplo1.js`

```js
// function imprimeMsg(){
//     alert('Boa noite!');
// }

// // invocação da função
// imprimeMsg();


function soma(x, y){
    return x + y
}

function soma2(x, y){
    // nullish coalescing: se o valor de x for undefined ou nulo (null), x receberá o valor 5. 
    x ??= 5;
    y ??= 10;

    return x + y;
}

// alert(soma(2, 3)); // 5
// alert(soma(2)); // NaN: Not a Number
// alert(soma()); // NaN
// alert(soma(1, 2, 3)); // 3, ignora o 3o argumento

alert(soma2(8,6)); // 14
alert(soma2(8)); // 18
alert(soma2()); // 15
```

### 04.funcoes/exemplo2

Parâmetros rest, objeto arguments e passagem por valor (número) e por referência (array).

`04.funcoes/exemplo2.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Funções</title>
</head>
<body>
    <script src="./exemplo2.js"></script>
</body>
</html>
```

`04.funcoes/exemplo2.js`

```js
// parametros rest

// function nomeCompleto(...args){

//     let nome = '';
//     for(let n of args){
//         nome += n + ' ';
//     }

//     return nome;
// }

// objeto arguments

// function nomeCompleto(){

//     let nome = '';
//     // length: quantidade de argumentos passados para a função
//     for(let i = 0; i < arguments.length; i++){
//         nome += arguments[i] + ' ';
//     }

//     return nome;
// }

// alert(nomeCompleto('João', 'Silva')); // João Silva
// alert(nomeCompleto('Maria', 'Pereira', 'Alves')); // Maria Pereira Alves
// alert(nomeCompleto('José')); // José

function alteraVariavel(x){
    x = 10;
}

function alteraArray(x){
    x[0] = 'XPTO';
}

let a = 7;

alteraVariavel(a); 
alert(a); // 7

let b = ['banana', 'mamão', 'maçã'];
alteraArray(b);
alert(b); // XPTO,mamão,maçã
```

### 04.funcoes/exemplo3

Funções anônimas, arrow functions e callbacks: a mesma mensagem impressa por alert, console e DOM.

`04.funcoes/exemplo3.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Funções</title>
</head>
<body>
    <script src="./exemplo3.js"></script>
</body>
</html>
```

`04.funcoes/exemplo3.js`

```js
// funções anônimas

// function soma(a,b){
//     return a + b;
// }

// let soma = function(a,b){
//     return a + b;
// };

// let soma = (a, b) => a + b;

// console.log(soma(3,4));

// let concatena = soma;

// console.log(concatena('Arara', 'quara'));

// let msg = nome => {
//     texto = 'Olá, ';
//     texto += nome;
//     alert(texto);
// }

// msg('Neymar Jr.');


// Callback

function printAlert(msg){
    alert('Alert: ' + msg);
}

function printConsole(msg){
    console.log('Console: ' + msg);
}

function printDOM(msg){
    document.body.textContent = 'DOM: ' + msg;
}

function print(msg, printFunction){
    printFunction(msg);
}

print('Moraes', printConsole);
print('Oliva', printAlert);
print('Arnaldo', printDOM);

print('Boa noite', function(m){
    console.log('Anonimo: ' + m);
});

print('Olá seta!', m => {alert('Arrow: ' + m);});



```

### 05.strings/exemplo1

Template strings, acesso a caracteres ([], at, charAt), slice e substring, replace com regex, split, indexOf, match e endsWith.

`05.strings/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strings</title>
</head>
<body>
    <h1 id="titulo"></h1>
    <script src="./exemplo1.js"></script>
</body>
</html>
```

`05.strings/exemplo1.js`

```js
// const nome = 'João';
// const sobrenome = 'Pereira';

// let msg = `Olá, ${nome} ${sobrenome}. Seja bem-vindo!`;

// document.querySelector('#titulo').textContent = msg;

// let nome = 'Karina';

// nome[0] = 'M';

// console.log(nome);

// const carro = 'Opala';

// console.log(carro[2]); // a
// console.log(carro.at(3)); // l
// console.log(carro.charAt(1)); // p

// console.log(carro[6]); // undefined
// console.log(carro.at(6)); // undefined
// console.log(carro.charAt(6)); // string vazia

// console.log(carro[-1]); // undefined
// console.log(carro.at(-1)); // a
// console.log(carro.charAt(-1)); // string vazia

// // como imprimir o ultimo caractere utilizando []?
// console.log(carro[carro.length-1]);

// const nomeArquivo = 'churrasco.png';

// //const extensao = nomeArquivo.slice(10); // do 10 até o fim
// const extensao = nomeArquivo.slice(-3); // do -3 até o fim
// //const nomefoto = nomeArquivo.substring(0, 9);
// const nomefoto = nomeArquivo.substring(0, nomeArquivo.length-4);
// console.log(extensao);
// console.log(nomefoto);

// replace

const texto = `O tempo perguntou para o TEMPO: quanto Tempo o tempo tem?...`

// const novoTexto = texto.replace('tempo', 'clima');
//const novoTexto = texto.toLowerCase().replaceAll('tempo', 'clima');
// const novoTexto = texto.replace(/tempo/ig, 'clima');

// console.log(novoTexto);

// //const arrayTexto = texto.split("");
// // const arrayTexto = texto.split(" ");
// const arrayTexto = texto.split(":");

// console.log(arrayTexto);

// console.log(texto.indexOf('tempo'));// 2
// console.log(texto.lastIndexOf('tempo'));// 47

// console.log(texto.match(/tempo/ig));

let nomeArquivo = 'Trabalho.pdf';

if (nomeArquivo.endsWith('.pdf')){
    console.log('Esse arquivo está no formato PDF');
}
```

### 06.arrays/exemplo1

Métodos de array (reverse, sort, includes, splice, concat, push, pop, shift, unshift), montagem de lista HTML com for...of e sort numérico.

`06.arrays/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arrays</title>
</head>
<body>
    
    <h1>Arrays em JavaScript</h1>
    <hr>

    <ul id="frutas">

    </ul>

    <script src="./exemplo1.js"></script>

</body>
</html>
```

`06.arrays/exemplo1.js`

```js
// const frutas = ['Maçã', 'Tomate', 'Pera', 'Melancia', 'Banana'];

// console.log(frutas);

// frutas.reverse();

// console.log(frutas);

// frutas.sort();

// console.log(frutas);

// if (frutas.includes('Banana')){
//     alert('Temos banana no índice ' + frutas.indexOf('Banana'));
// }



// splice

// remover 2 elementos do array a partir da posição 1
// frutas.splice(1, 2);

// adicionar 2 elementos no array no indice 2
//frutas.splice(2, 0, 'Uva', 'Maracujá'); 

// substituir Pera e Melancia por Uva e Maracuja
//frutas.splice(2, 2, 'Uva', 'Maracujá')

// const outrasFrutas = ['Uva', 'Pêssego'];

// const novasFrutas = frutas.concat(outrasFrutas);

// console.log(novasFrutas);

// frutas.push('Banana');
// frutas.unshift('Morango');

// console.log(frutas.pop()); // Banana
// console.log(frutas.shift()); // Morango

// gerar a lista no HTML utilizando for

// let texto = '';

// // for(let i = 0; i < frutas.length; i++){

// //     texto += `<li>${frutas[i]}</li>`;
// // }

// //frutas.forEach((fruta) => {texto += `<li>${fruta}</li>`});

// for (let fruta of frutas){
//     texto += `<li>${fruta}</li>`;
// }


// // acessa a <ul> no HTML e coloca o texto dentro da tag
// document.querySelector('#frutas').innerHTML = texto;

const numerico = [4, 1, 8, 23, 45, 100, 10, 5];

console.log(numerico);

console.log(numerico.sort((a, b) => a - b)); // ascendente
console.log(numerico.sort((a, b) => b - a)); // descendente
```

### 07.objetos/exemplo1

Objeto literal com objeto aninhado e método, for...in, Object.entries, função construtora e classe com get e set.

`07.objetos/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Objetos JS</title>
</head>
<body>
    <script src="./exemplo1.js"></script>
</body>
</html>
```

`07.objetos/exemplo1.js`

```js
// const corinthians = {
//     nome: "Corinthians",
//     prefixo: "Sport Club",
//     sufixo: "Paulista",
//     timeTitular: {
//         goleiro: 'Hugo Souza',
//         zagueiro: 'Gabriel Paulista',
//         atacante: 'Memphis Depay'
//     },
//     nomeCompleto: function(){
//         return `${this.prefixo} ${this.nome} ${this.sufixo}`;
//     }
// };

// console.log(corinthians.timeTitular.goleiro);
// console.log(corinthians.timeTitular['zagueiro']);
// console.log(corinthians['timeTitular']['atacante']);

// for(let x in corinthians){
//     console.log(corinthians[x]);
// }

// for (let [prop, val] of Object.entries(corinthians)){
//     console.log(`${prop} --> ${val}`);
// }

// corinthians.hino = 'Salve o Corinthians ...';

// console.log(corinthians.nome);
// console.log(corinthians['hino']);

// let b = 'prefixo';

// console.log(corinthians[b]);

// console.log(corinthians.nomeCompleto());


// Função construtora

// function Time(nome, prefixo, sufixo){
//     this.nome = nome;
//     this.prefixo = prefixo;
//     this.sufixo = sufixo;

//     this.nomeCompleto = function(){
//         return `${this.prefixo} ${this.nome} ${this.sufixo}`.trim();
//     }
// }

class Time{

    constructor(nome, prefixo, sufixo){
        this.nome = nome;
        this.prefixo = prefixo;
        this.sufixo = sufixo;
        this.hino = '';
    }

    nomeCompleto(){
        return `${this.prefixo} ${this.nome} ${this.sufixo}`.trim();
    }

    get getHino(){
        return this.hino;
    }

    set setHino(x){

        this.hino = x.trim();
    }
}

const palmeiras = new Time('Palmeiras', 'Sociedade Esportiva', '');
const saopaulo = new Time('São Paulo', '', 'Futebol Clube');
const santos = new Time('Santos', '', 'Futebol Clube');
const corinthians = new Time('Corinthians', 'Sport Club', 'Paulista');

palmeiras.setHino = 'Quando surge o alviverde imponente...';

console.log(palmeiras.getHino);


// console.log(palmeiras.nomeCompleto());
// console.log(saopaulo.nomeCompleto());
// console.log(santos.nomeCompleto());
// console.log(corinthians.nomeCompleto());


```

### 08.date/exemplo1

Objeto Date: data de nascimento lida de um input date e separada com split, nomes de mês e dia da semana e cálculo de prazo de entrega com getTime().

`08.date/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Objeto Date</title>
</head>
<body>

    <label for="nasc">Data de nascimento</label><br>
    <input type="date" name="nasc" id="nasc">
    
    <script src="./exemplo1.js"></script>

</body>
</html>
```

`08.date/exemplo1.js`

```js
// Objeto Date

// const hoje = new Date();

// console.log(hoje);

// const data = new Date(1000000000000); 

// console.log(data);


function dataNascimento(){
    let nasc = document.querySelector('#nasc').value;

    console.log(nasc);

    // desestruturação
    [ano, mes, dia] = nasc.split('-');

    mes = mes - 1;
 
    //const meunasc = new Date(nasc);
    const meunasc = new Date(ano, mes ,dia);

    console.log(meunasc.toLocaleDateString('pt-br'));

    const meses = ['janeiro', 'fevereiro', 'março', 'abril',
                   'maio', 'junho', 'julho', 'agosto', 'setembro',
                   'outubro', 'novembro', 'dezembro'];

    let texto = `Você nasceu em ${meunasc.getDate()} de ${meses[meunasc.getMonth()]} de ${meunasc.getFullYear()}`;

    console.log(texto);

    const diassemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

    texto = `O dia em que você nasceu era ${diassemana[meunasc.getDay()]}`;

    console.log(texto);
}


const agora = new Date();

const prazoFrete = 7;

const entrega = new Date(agora.getTime() + (prazoFrete * 24 * 60 * 60 * 1000));

let texto = `A data da compra foi ${agora.toLocaleDateString('pt-br')}. A data da entrega será ${entrega.toLocaleDateString('pt-br')}`;

console.log(texto);
```

### 09.eventos/exemplo1

Eventos por atributo HTML (onclick, onmouseover, onmouseout, oninput), por addEventListener (dois manipuladores no mesmo click) e por propriedade (onmouseover), com o objeto de evento (e.target, evento.key).

`09.eventos/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eventos</title>
    <style>
        #div1{
            width: 200px;
            height: 200px;
            border: 1px solid black;
        }

        #div2{
            width: 100px;
            height: 100px;
            border: 1px solid black;
        }
    </style>
</head>
<body>
    
    <!-- <button onclick="alert('Você clicou no botão');"> -->
    <button onclick="imprimeMensagem();">
        Clique aqui!
    </button>

    <div id="div1" onmouseover="mudaCor();" onmouseout="restauraCor();">

    </div>

    <br><br>

    <input type="text" name="texto" id="texto" oninput="imprimeTexto();">

    <br><br>

    <div id="div2">

    </div>

    <script src="./exemplo1.js"></script>
</body>
</html>
```

`09.eventos/exemplo1.js`

```js
function imprimeMensagem(){

    alert('Mensagem na função JS');

}

function mudaCor(){

    document.querySelector('#div1').style.backgroundColor = 'purple';
}

function restauraCor(){

    document.querySelector('#div1').style.backgroundColor = 'white';
}

function imprimeTexto(){

    console.log(document.querySelector('#texto').value);
}

const div2 = document.querySelector('#div2');

div2.addEventListener('click', function(e){

    console.log(e.target);
    document.querySelector('#div2').style.borderColor = 'orange';
});

div2.addEventListener('click', function(){
    document.querySelector('#div2').style.backgroundColor = 'blue';
});

div2.onmouseover = function(){
    document.querySelector('#div2').style.width = '200px';
};

document.body.addEventListener('keydown', function(evento){
    console.log(evento.key);
});
```

### 10.dom/exemplo1

Formas de acessar elementos (getElementById, getElementsByTagName, getElementsByClassName, querySelector, querySelectorAll) e de modificá-los (style, textContent, href, target, className).

`10.dom/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM</title>
    <style>

        .realce{
            color: orange;
            font-weight: bold;
        }

    </style>

</head>
<body>
    
    <header>
        <h1>Manipulação do DOM</h1>
    </header>

    <main>

        <a href=""></a>

        <section id="primeira">

            <h2 id="sub1">Subtítulo 1</h2>

            <p class="destaque">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas a eligendi est quaerat neque minus sequi tenetur provident quod quisquam soluta rerum vel, accusantium exercitationem, nobis quam mollitia atque quasi!</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, eum corporis! Eveniet repudiandae culpa nemo est, rerum pariatur dignissimos amet, ad voluptates autem enim laudantium delectus natus ea quam perferendis!</p>

        </section>

        <section>
            <h2 class="destaque" id="sub2">Subtítulo 2</h2>

            <p class="destaque">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni cum nemo perspiciatis reiciendis distinctio, repudiandae voluptatum vel suscipit ipsa repellendus asperiores dolore eaque nisi, quis fugit placeat aspernatur, expedita molestias!</p>

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate alias reiciendis laudantium corporis quidem dolorem quia, quos aperiam asperiores laboriosam similique accusamus doloribus provident, nemo ex, earum voluptate modi porro!</p>
        </section>
    </main>

    <script src="./exemplo1.js"></script>

</body>
</html>
```

`10.dom/exemplo1.js`

```js
// 1) Métodos de acesso aos elementos do DOM

// 1.1) getElementById(): acessa elementos pelo atributo "id" da tag

// const subtitulo = document.getElementById('sub1');
// console.log(subtitulo.textContent);

// 1.2) getElementsByTagName(): acessa elementos pelo nome da tag
// Retorna um HTMLCollection (funciona parecido com array)

// const paragrafos = document.getElementsByTagName('p');

// for(let i = 0; i < paragrafos.length; i++){
//     console.log(paragrafos[i].textContent);
// }

// paragrafos[1].style.color = 'blue';
// paragrafos[3].style.backgroundColor = 'gray';

// 1.3) getElementsByClassName: acessa elementos de uma mesma classe. Também retorna uma HTMLCollection

// const destaques = document.getElementsByClassName('destaque');

// for (i = 0; i < destaques.length; i++){
//     destaques[i].style.color = 'red';
// }

// 1.4 querySelector(): acessa um elemento que corresponda ao seletor CSS especificado



const primeira = document.querySelector('#primeira');

primeira.style.fontFamily = 'Arial';

//const destaques = document.querySelector('.destaque');

// 1.5 querySelectorAll(): acessa todos os elementos que correspondam ao seletor CSS especificado

const destaques = document.querySelectorAll('.destaque');

for (i = 0; i < destaques.length; i++){
    destaques[i].style.color = 'green';
}

// 2. Modificando elementos

const link = document.querySelector('a');
link.textContent = 'Google';

//link.setAttribute('href', 'http://www.google.com');
link.href = 'http://www.google.com?q=IFSP';
link.target = '_blank';

const h1 = document.querySelector('h1');

h1.className = 'realce';

```

### 10.dom/exemplo2

Criar (createElement), inserir (appendChild, insertBefore), remover (removeChild) e substituir (replaceChild) itens de uma lista.

`10.dom/exemplo2.html`

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM</title>
</head>
<body>
    
    <h1>Escalação da seleção brasileira</h1>

    <ul>
       <li>Vanderson</li>
       <li>Otávio</li>
       <li>Jair</li> 
    </ul>

    <script src="./exemplo2.js"></script>
</body>
</html>
```

`10.dom/exemplo2.js`

```js
const ul = document.querySelector('ul');

// 1) Criar um novo elemento

const novoLi = document.createElement('li');
novoLi.textContent = 'Mauro Junior';

// 2) Adicionar um elemento ao DOM

// 2.1) appendChild(): adiciona um elemento como último filho
//ul.appendChild(novoLi); 

// 2.2) insertBefore():adiciona um elemento antes de um determinado filho

// Inserir como primeiro filho
// const primeiroFilho = document.querySelectorAll('li')[0];
// ul.insertBefore(novoLi, primeiroFilho);

// Inserir o novo elemento antes do Otavio

let filho;

const jogadores = document.querySelectorAll('li');

for(let i = 0; i < jogadores.length; i++){

    if (jogadores[i].textContent == 'Otávio'){
        filho = jogadores[i];
        break;
    }
}

//ul.insertBefore(novoLi, filho);
filho.parentNode.insertBefore(novoLi, filho);

// 3) Remover um nó

// removeChild(): remove um elemento a partir de seu pai
//ul.removeChild(filho);

// 4) Substituir um nó

// replaceChild(): substitui um elemento a partir de seu pai
const novoFilho = document.createElement('li');
novoFilho.textContent = 'Arthur Dias';

ul.replaceChild(novoFilho, filho);
```

### 10.dom/exemplo3

Botão que, no onclick, é substituído por um parágrafo criado com createElement, usando e.target e replaceChild.

`10.dom/exemplo3.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo DOM</title>
</head>
<body>
    
    <div id="container">

        <button id="botao">Clique aqui!</button>

    </div>

    <script src="./exemplo3.js"></script>

</body>
</html>
```

`10.dom/exemplo3.js`

```js

document.getElementById('botao').onclick = function(e){

    // cria um parágrafo
    const p = document.createElement('p');
    p.textContent = 'Olá, TSI!';

    // substituir o botao pelo paragrafo
    const botao = e.target; // target é o elemento vinculado ao evento
    botao.parentNode.replaceChild(p, botao);

};
```

### 11.json/exemplo1

form.onsubmit com e.preventDefault(), objeto montado com os valores do formulário e conversão com JSON.stringify e JSON.parse.

`11.json/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON</title>
</head>
<body>
    
    <form action="">

        <label for="nome">Nome</label><br>
        <input type="text" name="nome" id="nome">

        <br><br>

        <label for="sobrenome">Sobrenome</label><br>
        <input type="text" name="sobrenome" id="sobrenome">

        <br><br>

        <button type="submit">Enviar</button>
    </form>

    <script src="./exemplo1.js"></script>

</body>
</html>
```

`11.json/exemplo1.js`

```js
const form = document.querySelector('form');

form.onsubmit = function(e){

    // interrompe o comportamento padrão do evento
    e.preventDefault();

    let meuObj = {};

    // A propriedade value acessa o conteúdo do input do formulario
    meuObj.nome = form.nome.value;
    meuObj.sobrenome = form.sobrenome.value;

    console.log(meuObj);

    // converte objeto JavaScript para JSON string
    const meuJson = JSON.stringify(meuObj);

    console.log(meuJson);

    // converte de JSON string para objeto JavaScript
    const outroObj = JSON.parse(meuJson);

    console.log(outroObj);
};

```

### 11.json/cep

Consulta à API ViaCEP com async/await e fetch no onchange do campo, teste de resposta.ok e preenchimento do formulário com o JSON recebido.

`11.json/cep/index.html`

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CEP</title>
</head>
<body>
    
    <header>
        <h1>Consulta CEP</h1>
    </header>

    <main>

        <form>

            <p>
                <label for="cep">CEP</label><br>
                <input type="text" name="cep" id="cep">
            </p>

            <p>
                <label for="logradouro">Logradouro</label><br>
                <input type="text" name="logradouro" id="logradouro">
            </p>

            <p>
                <label for="complemento">Complemento</label><br>
                <input type="text" name="complemento" id="complemento">
            </p>

            <p>
                <label for="bairro">Bairro</label><br>
                <input type="text" name="bairro" id="bairro">
            </p>

            <p>
                <label for="cidade">Cidade</label><br>
                <input type="text" name="cidade" id="cidade">
            </p>

            <p>
                <label for="estado">Estado</label><br>
                <input type="text" name="estado" id="estado">
            </p>

            <button type="submit">Cadastrar</button>

        </form>

        <script src="./js/script.js"></script>

    </main>


</body>
</html>
```

`11.json/cep/js/script.js`

```js
const form = document.querySelector('form');


async function getAddress(){

    // constroi a url para consulta à API ViaCEP
    let url = `https://viacep.com.br/ws/${this.value}/json/`;

    console.log(url);

    // consulta a API ViaCEP
    const resposta = await fetch(url);

    // se a resposta não chegar ou o cep for inválido
    if (!resposta.ok){
        console.log('cep inválido');
    }
    else{

        // obtém o JSON da Promise
        let jsonCEP = await resposta.json();

        console.log(jsonCEP);

        form.logradouro.value = jsonCEP.logradouro;
        form.complemento.value = jsonCEP.complemento;
        form.bairro.value = jsonCEP.bairro;
        form.cidade.value = jsonCEP.localidade;
        form.estado.value = jsonCEP.estado;
    }

}


const cep = document.querySelector('#cep');

cep.onchange = getAddress;
```

### 11.json/randomuser

Consulta à API randomuser.me com async/await, teste de resposta.ok e montagem de imagem e parágrafo com createElement em uma função separada.

`11.json/randomuser/index.html`

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random User</title>
</head>
<body>
    
    <header>
        <h1>Random User</h1>
    </header>

    <main>
        <button id="botao">Carregar novo usuário</button>

        <div id="user">

        </div>

        <script src="./js/script.js"></script>
    </main>

</body>
</html>
```

`11.json/randomuser/js/script.js`

```js
function showUserData(usr){

    const divUsr = document.querySelector('#user');

    divUsr.innerHTML = '';

    const primeiroNome = usr.name.first;
    const ultimoNome = usr.name.last;
    const nomeCompleto = `${primeiroNome} ${ultimoNome}`;

    const foto = usr.picture.large;

    const img = document.createElement('img');
    img.src = foto;
    img.style.width = '200px';

    const p = document.createElement('p');
    p.textContent = nomeCompleto;


    divUsr.appendChild(img);
    divUsr.appendChild(p);

}


async function getUserData(){
    
    let url = 'https://randomuser.me/api/?nat=br';

    const resposta = await fetch(url);

    if (!resposta.ok){
        console.log('Erro ao acessar usuário');
    }
    else{

        const jsonUser = await resposta.json();

        showUserData(jsonUser.results[0]);
    }

}

const botao = document.querySelector('#botao');

botao.onclick = getUserData;
```

### 12.cookies

Criar cookies com e sem data de expiração, ler o valor de um cookie (getCookie) e remover um cookie com uma data no passado.

`12.cookies/index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookies</title>
</head>
<body>
    
    <script src="./script.js"></script>

</body>
</html>
```

`12.cookies/script.js`

```js
function getCookie(nomeCookie){

    let nome = nomeCookie + '=';

    let cookieArray = document.cookie.split(';');

    //console.log(cookieArray);

    for (let i = 0; i < cookieArray.length; i++){

        // trim remove espaços em branco do inicio e do fim da string
        let cookie = cookieArray[i].trim();
        //console.log(cookie);

        // verifica se a string começa com o nome do cookie procurado
        if (cookie.startsWith(nome)){
            return decodeURIComponent(cookie.substring(nome.length));
        }
    }

    return "";
}

// criar cookies
document.cookie = 'username=alunoTSI';
document.cookie = 'tema=dark';

console.log(document.cookie);

// data de expiração

document.cookie = 'username=alunoTSI; expires=Tue, 20 Oct 2026 23:59:00 UTC-3;'

const dataExpiracao = new Date(); // cria um objeto com a data atual
dataExpiracao.setDate(dataExpiracao.getDate() + 7);

document.cookie = `tema=dark; expires=${dataExpiracao.toUTCString()};`;

// ler o valor de um cookie

console.log(getCookie('tema'));
console.log(getCookie('username'));

// remover um cookie

const dataExpirada = new Date(0);
document.cookie = `tema=dark; expires=${dataExpirada.toUTCString()};`;




```

### 13.webstorage/exemplo1

setItem, getItem e removeItem do localStorage, guardando objetos com JSON.stringify e lendo com JSON.parse.

`13.webstorage/exemplo1/index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Local Storage</title>
</head>
<body>
    
    <script>

        const obj1 = {nome: 'João', sobrenome: 'Silva', idade: 30};
        const obj2 = {modelo: 'Marea', marca: 'Fiat', ano: 2000};

        // criando itens no local storage
        localStorage.setItem('curso', 'TSI');

        localStorage.setItem('cadastro', JSON.stringify(obj1));
        localStorage.setItem('automovel', JSON.stringify(obj2));


        // ler dados do local storage
        const curso = localStorage.getItem('curso');

        console.log(`Estou no primeiro ano do curso ${curso}`);

        // converte a string para o objeto JS
        const pessoa = JSON.parse(localStorage.getItem('cadastro'));

        console.log(`Olá ${pessoa.nome} ${pessoa.sobrenome}`);

        // remover um item do local storage
        localStorage.removeItem('cadastro');


    </script>

</body>
</html>
```

### 13.webstorage/exemplo2

Cadastro de pessoas guardado como array no localStorage: window.onload cria o array vazio se não existir, e os botões gravam e listam os cadastros.

`13.webstorage/exemplo2/index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Local Storage</title>
</head>
<body>
    
    <p>
        <label for="nome">Nome</label><br>
        <input type="text" name="nome" id="nome">
    </p>

    <p>
        <label for="peso">Peso</label><br>
        <input type="number" name="peso" id="peso" step="0.1">
    </p>

    <p>
        <label for="idade">Idade</label><br>
        <input type="number" name="idade" id="idade" step="1">
    </p>

    <button id="cadastrar">Cadastrar</button>

    <hr>

    <div id="cadastrados">

    </div>

    <button id="mostrar">Mostrar cadastrados</button>

    <script src="./script.js"></script>
</body>
</html>
```

`13.webstorage/exemplo2/script.js`

```js
window.onload = function (){

    // verificar se o cadastro de pessoas existe no localstorage
    // Se não existir, crio um cadastro vazio

    if (!localStorage.cadastro){
        const cadastro = [];
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
    }
};


const botCadastrar = document.querySelector('#cadastrar');

botCadastrar.onclick = function(){

    // recuperar os valores digitados em cada campo
    const nome = document.querySelector('#nome');
    const peso = document.querySelector('#peso');
    const idade = document.querySelector('#idade');

    // constroi um objeto com os valores digitados
    const novaPessoa = {'nome': nome.value, 'peso': peso.value, 'idade': idade.value};

    // obter o array que está no local storage
    const cadastro = JSON.parse(localStorage.getItem('cadastro'));

    // inserir o objeto no final da lista (cadastro)
    cadastro.push(novaPessoa);

    // armazenar o cadastro no local storage
    localStorage.setItem('cadastro', JSON.stringify(cadastro));

    // limpo os inputs após conclusão do cadastro
    nome.value = '';
    peso.value = '';
    idade.value = ''; 
};

const botMostrar = document.querySelector('#mostrar');

botMostrar.onclick = function(){

    const divCadastrados = document.querySelector('#cadastrados');

    divCadastrados.innerHTML = '';

    // recuperar o array de cadastrados no local storage
    const cadastro = JSON.parse(localStorage.getItem('cadastro'));

    for (let pessoa of cadastro){

        const p = document.createElement('p');

        let texto = `Nome: ${pessoa.nome} - Peso: ${pessoa.peso} - Idade: ${pessoa.idade}`;

        p.textContent = texto;

        divCadastrados.appendChild(p);

    }


};
```

### 14.validacao/exemplo1

Validação só com atributos HTML5: required, minlength, maxlength, pattern, min, max e step.

`14.validacao/exemplo1.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação</title>
</head>
<body>
    <h1>
        Validação com HTML5
    </h1>
    <hr>

    <form action="">

        <p>
            <label for="nome">Nome</label><br>
            <input type="text" name="nome" id="nome"
            required minlength="3" maxlength="10" 
            pattern="[a-zA-Z\s]+">
        </p>

        <p>
            <label for="peso">Peso</label><br>
            <input type="number" name="peso" id="peso"
            min="1.0" max="500.0" step="0.1">
        </p>


        <button type="submit">Enviar</button>

    </form>

</body>
</html>
```

### 14.validacao/exemplo2

Validação com JavaScript no oninput: confirmação de senha com a mensagem num span.

`14.validacao/exemplo2.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação</title>
</head>
<body>
    
    <h1>Validação com JS</h1>
    <hr>

    <form action="">

        <p>
            <label for="nsenha">Nova senha</label><br>
            <input type="password" name="nsenha" id="nsenha">
        </p>

        <p>
            <label for="csenha">Confirme a senha</label><br>
            <input type="password" name="csenha" id="csenha">
            <span id="erro-senha"></span>
        </p>

        <button type="submit">Cadastrar</button>
    </form>

    <script>

        const nsenha = document.querySelector('#nsenha');
        const csenha = document.querySelector('#csenha');
        const erroSenha = document.querySelector('#erro-senha');

        csenha.oninput = function(){

            erroSenha.textContent = '';

            // senhas iguais
            if (nsenha.value == csenha.value){
                erroSenha.style.color = 'green';
                erroSenha.textContent = 'Ok!';
            }
            else{
                erroSenha.style.color = 'red';
                erroSenha.textContent = 'Senhas não conferem!';
            }

        }


        //const form = document.querySelector('form');

        // form.addEventListener('submit', function(e){

        //     // interrompe a submissão do formulário
        //     e.preventDefault();

        //     // verifico se as senhas são iguais
        //     if (nsenha.value == csenha.value){
        //         // submete o formulário
        //         form.submit();
        //     }

        //     else{
        //         alert('Senhas não conferem!');
        //     }

        // });

    </script>


</body>
</html>
```

### 14.validacao/exemplo3

Constraint Validation API: validity.patternMismatch, setCustomValidity, noValidate e checkValidity no submit, com mensagens nas classes erro e acerto.

`14.validacao/exemplo3.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação</title>
    <style>
        .erro{
            color: red;
            font-size: small;
        }

        .acerto{
            color: green;
            font-size: small;
        }
    </style>
</head>
<body>
    
    <h1>Constraint Validation API</h1>
    <hr>

    <!-- <form action="" novalidate> -->
    <form action="">
        <p>
            <label for="nome">Nome</label><br>
            <input type="text" name="nome" id="nome"]
            pattern="[a-zA-Z\s]+">
            <span id="erro-nome"></span>
        </p>

        <p>
            <label for="idade">Idade</label><br>
            <input type="number" name="idade" id="idade"
            min="0" max="100" step="1">
            <span id="erro-idade"></span>
        </p>

        <p>
            <label for="senha">Senha</label><br>
            <input type="password" name="senha" id="senha"
            minlength="8" maxlength="20">
            <span id="erro-senha"></span>
        </p>

        <button type="submit">Enviar</button>

    </form>

    <script src="./exemplo3.js"></script>
</body>
</html>
```

`14.validacao/exemplo3.js`

```js

const nome = document.querySelector('#nome');
const erroNome = document.querySelector('#erro-nome');

nome.addEventListener('input', function(){

    erroNome.textContent = '';

    // houve um erro na validação do pattern
    if (nome.validity.patternMismatch){

        let msg = 'Use apenas letras e espaços em branco';

        erroNome.className = 'erro';
        erroNome.textContent = msg;

        nome.setCustomValidity(msg);
    }
    // verifico se o nome possui menos que 5 caracteres
    else if (nome.value.length < 5){
        let msg = 'O nome deve possuir mais do que 5 caracteres';

        erroNome.className = 'erro';
        erroNome.textContent = msg;

        nome.setCustomValidity(msg);
    }
    // se não tiver erro
    else{
        let msg = 'ok';

        erroNome.className = 'acerto';
        erroNome.textContent = msg;
        // string vazia sinaliza que não houve erro na validação
        nome.setCustomValidity('');
    }

});




const form = document.querySelector('form');
form.noValidate = true;

form.addEventListener('submit', function(e){

    e.preventDefault();

    if(form.checkValidity()){ // true
        //console.log('Formulário válido!');
        form.submit();
    }
    else{
        console.log('Formulário inválido');
    }

});
```

### 15.regex/exemplo1

Criação de regex literal com as flags i e g e os métodos replace, search, match, exec e test.

`15.regex/exemplo1.js`

```js
const texto = `Estou aprendendo a desenvolver sistemas no curso de Sistemas para Internet`;

// Duas formas de criar uma expressão regular

//const padrao = new RegExp('sistemas');
const padrao1 = /sistemas/;
const padrao2 = /Sistemas/;
const padrao3 = /SISTEMAS/;
const padrao4 = /SISTEMAS/i; // ignore case
const padrao5 = /SISTEMAS/ig; // ignore case + global

// replace() --> substituir o padrao
let novoTexto = texto.replace(padrao1, 'programas');
console.log(novoTexto);


// método search() --> retorna o índice da primeira ocorrência
//console.log(texto.search(padrao2)); // 52
//console.log(texto.search(padrao3)); // -1
//console.log(texto.search(padrao5)); // 31

// método match()
//console.log(texto.match(padrao1));
//console.log(texto.match(padrao5));

// método exec()
//console.log(padrao1.exec(texto));
//console.log(padrao3.exec(texto));
//console.log(padrao4.exec(texto));
//console.log(padrao5.exec(texto));
//console.log(padrao5.exec(texto));

// let resultado;

// while((resultado = padrao5.exec(texto)) != null){

//     console.log(`Encontrou ${resultado[0]} no índice ${resultado.index}`);
// }


// método test(): retorna true ou false
// console.log(padrao1.test(texto)); // true
// console.log(padrao2.test(texto)); // true
// console.log(padrao3.test(texto)); // false
// console.log(padrao4.test(texto)); // true




```

### 15.regex/exemplo2

Conjuntos com colchetes e validação de CEP com o padrão ancorado /^\d{5}-\d{3}$/.

`15.regex/exemplo2.js`

```js
// brackets []

// const padrao1 = /[0-9]/;
// const padrao2 = /[a-z]/;
// const padrao3 = /[a-zA-Z]/;// encontro qqer letra, maiuscula ou minuscula
// const padrao4 = /[A-Za-z0-9]/; // letras minusculas + digitos de 0 a 9

// let texto1 = 'a';
// let texto2 = '5';

// console.log(padrao1.test(texto1)); // false
// console.log(padrao1.test(texto2)); // true 

// console.log(padrao2.test(texto1)); // true
// console.log(padrao2.test(texto2)); // false 

const texto = 'Meu CEP é 12345-123';
const texto2 = '12349-098';

const padCEP = /^\d{5}-\d{3}$/;

console.log(padCEP.test(texto)); // false
console.log(padCEP.test(texto2)); // true

```

### 15.regex/exemplo3

Atributo pattern com regex para CEP, CPF, RG e prontuário, e formatação do CEP no blur com replace e grupos $1-$2.

`15.regex/exemplo3.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expressão regular</title>
</head>
<body>
    
    <h1>Validação de formulários com RegEx</h1>

    <hr>

    <form action="">

        <p>
            <label for="cep">CEP</label><br>
            <input type="text" name="cep" id="cep" 
            pattern="\d{5}-?\d{3}">
        </p>

        <p>
            <label for="cpf">CPF</label><br>
            <input type="text" name="cpf" id="cpf"
            pattern="(\d{3}\.?){2}\d{3}-?\d{2}">
        </p>

        <p>
            <label for="rg">RG</label><br>
            <input type="text" name="rg" id="rg" 
            pattern="\d{2}\.?\d{3}\.?\d{3}-?[\dxX]">
        </p>

        <p>
            <label for="prontuario">Prontuário</label>
            <input type="text" name="prontuario" id="prontuario"
            pattern="[a-zA-Z]{2}\d{6}[\dxX]">
        </p>

        <button type="submit">Enviar</button>
    </form>

    <script>

        const cep = document.querySelector('#cep');

        cep.addEventListener('blur', function(){


            const padrao = /^(\d{5})-?(\d{3})$/;

            cep.value = cep.value.replace(padrao, '$1-$2');

        });

    </script>

</body>
</html>
```

### 15.regex/exemplo4

Inversão de "Sobrenome, Nome" com grupos de captura e replace($2 $1).

`15.regex/exemplo4.js`

```js

const citacao = 'Silva, Marcos'; // --> Marcos Silva

const er = /^([a-zA-Z]+),\s([a-zA-Z]+)$/

const nome = citacao.replace(er, '$2 $1');

console.log(nome);
```
