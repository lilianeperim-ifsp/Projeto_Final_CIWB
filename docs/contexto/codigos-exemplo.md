> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Códigos Exemplo\`

# Códigos de exemplo do professor (aulas 9 a 14)

Na pasta de códigos, a numeração é diferente da dos slides: `09.eventos` é a aula 10 (Eventos), `10.dom` a aula 11 (DOM), `11.json` a aula 12 (JSON), `12.cookies` e `13.webstorage` a aula 13 (Cookies e localStorage) e `14.validacao` a aula 14 (Validação de Formulários). Os exemplos das aulas 1 a 9 ficam de fora.

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

**Nomes:** variáveis e funções em camelCase. Em português na maioria (`botCadastrar`, `divCadastrados`, `novaPessoa`, `imprimeMensagem`, `mudaCor`, `dataExpiracao`, `erroNome`). Em inglês quando o exemplo segue a API usada (`getAddress`, `getUserData`, `showUserData`, `getCookie`). Comentários em português, explicando cada etapa em minúsculas (`// obtém o JSON da Promise`). Indentação de 4 espaços, linha em branco depois de abrir a função e `else` em linha própria depois de `}`.

---

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
