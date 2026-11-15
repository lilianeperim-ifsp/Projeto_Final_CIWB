> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\02. Fundamentos do JavaScript.pdf`

# Aula 2 — Fundamentos do JavaScript

## Slide 1 — Fundamentos do JavaScript

Fundamentos do JavaScript

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — A tag &lt;script&gt;

- Em HTML, código JavaScript é inserido entre tags &lt;script&gt; e &lt;/script&gt;.
- Exemplos antigos de JavaScript podem usar um atributo type: &lt;script type="text/javascript"&gt;.
- O atributo type não é obrigatório.
- O JavaScript é a linguagem de script padrão no HTML.

```html
<script>
    alert("My First JavaScript");
</script>
```

## Slide 3 — JavaScript externo

- Scripts também podem ser colocados em arquivos externos.
- Scripts externos são práticos quando o mesmo código é usado em muitas páginas Web diferentes.
- Arquivos JavaScript têm a extensão .js.
- Para usar um script externo, coloque o nome do arquivo de script no atributo src (source) de uma tag &lt;script&gt;.

```html
<script src="myScript.js"></script>
```

## Slide 4 — Posicionamento do JavaScript

- Você pode colocar qualquer quantidade de scripts em um documento HTML.
- Os scripts podem ser colocados no &lt;body&gt;, na seção &lt;head&gt; de uma página HTML ou em ambos.
- O script se comportará como se estivesse localizado exatamente onde a tag &lt;script&gt; foi inserida.
- Colocar os scripts no final do elemento &lt;body&gt; melhora a velocidade de exibição, porque a interpretação do script desacelera a exibição.

## Slide 5 — JavaScript externo

- Vantagens:
  - Separa o HTML do código
  - Torna o HTML e o JavaScript mais fáceis de ler e manter
  - Arquivos JavaScript armazenados em cache podem acelerar o carregamento das páginas
- Para adicionar vários arquivos de script a uma página, use várias tags &lt;script&gt;:

```html
<script src="myScript1.js"></script>
<script src="myScript2.js"></script>
```

## Slide 6 — JavaScript externo

- Um script externo pode ser referenciado de 3 maneiras diferentes:
  - Com uma URL completa (um endereço web completo)

```html
<script src="https://www.myurl.com/js/myScript.js"></script>
```

  - Com um caminho de arquivo (como /js/)

```html
<script src="/js/myScript.js"></script>
```

  - Sem nenhum caminho

```html
<script src="myScript.js"></script>
```

## Slide 7 — Saída de dados

- O JavaScript pode "exibir" dados de diferentes maneiras:
  - Escrevendo em um elemento HTML, usando innerHTML ou innerText.
  - Escrevendo na saída HTML, usando document.write().
  - Escrevendo em uma caixa de alerta, usando window.alert().
  - Escrevendo no console do navegador, usando console.log().

## Slide 8 — Saída de dados - innerHTML

- Para acessar um elemento HTML, você pode usar o método document.querySelector("#id").
- Use o atributo id para identificar o elemento HTML.
- Em seguida, use a propriedade innerHTML para alterar o conteúdo HTML do elemento HTML:

```html
<p id="demo"></p>

<script>
document.querySelector("#demo").innerHTML = "<h1>Olá mundo!</h1>";
</script>
```

> Destaque: Use innerHTML quando você quiser alterar um elemento HTML. Use innerText quando você quiser alterar apenas o texto simples.

## Slide 9 — Saída de dados - document.write()

- Para fins de teste, é conveniente usar document.write().
- Usar document.write() depois que um documento HTML é carregado apagará todo o HTML existente.

```html
<!DOCTYPE html>
<html>
    <body>

        <h1>Título/h1>
        <p>parágrafo</p>

        <script>
        document.write(5 + 6);
        </script>

    </body>
</html>
```

## Slide 10 — Saída de dados - window.alert()

- Você pode usar uma caixa de alerta para exibir dados.
- É possível omitir a palavra-chave window.
- O objeto window é o objeto de escopo global.
  - Por padrão, variáveis, propriedades e métodos pertencem ao objeto window.
  - Especificar a palavra-chave window é opcional

```html
<!DOCTYPE html>
<html>
    <body>

        <h1>Título/h1>
        <p>parágrafo</p>

        <script>
        //window.alert(5 + 6);
        alert(5 + 6);
        </script>

    </body>
</html>
```

## Slide 11 — Saída de dados - console.log()

- Para fins de depuração, você pode chamar o método console.log() no navegador para exibir dados.
- Saída para o console da ferramenta de desenvolvimento do navegador.

```html
<!DOCTYPE html>
<html>
    <body>

        <script>
        console.log(5 + 6);
        </script>

    </body>
</html>
```

## Slide 12 — Entrada de dados (por enquanto…)

- O window.prompt() exibe uma caixa de diálogo com uma mensagem opcional solicitando ao usuário a entrada de algum texto.

```js
resultado = window.prompt(texto, valor);
```

- **resultado**: é uma cadeia de caracteres contendo o texto digitado pelo usuário, ou um valor nulo.
- **texto**: é uma cadeia de caracteres para exibir ao usuário. Este parâmetro é opcional e pode ser omitido se não há nada para mostrar na janela de prompt.
- **valor**: é uma cadeia de caracteres contendo o valor padrão exibido na caixa de entrada de texto. É um parâmetro opcional.

## Slide 13 — Ponto e vírgula

- Os pontos e vírgulas separam as declarações em JavaScript.
- Adicione um ponto e vírgula ao final de cada declaração executável.

```js
let a, b, c;
a = 5;
b = 6;
c = a + b;
```

> Destaque: Na web, você pode ver exemplos sem pontos e vírgulas. Encerrar as declarações com ponto e vírgula não é obrigatório, mas é altamente recomendado.

- Quando separadas por pontos e vírgulas, várias declarações em uma única linha são permitidas:

```js
a = 5; b = 6; c = a + b;
```

## Slide 14 — Comentários

- Comentários em JavaScript podem ser usados para explicar o código JavaScript e torná-lo mais legível.
- Comentários em JavaScript também podem ser usados para impedir a execução, ao testar códigos alternativos.
  - Comentários de uma única linha começam com //.
  - Comentários de múltiplas linhas começam com /* e terminam com */.

> Destaque: É mais comum usar comentários de uma única linha. Comentários em bloco são frequentemente usados para documentação formal.

## Slide 15 — Variáveis

- Variáveis em JavaScript podem ser declaradas de 4 maneiras:
  - Automaticamente
  - Usando var
  - Usando let
  - Usando const

> Imagem: cada forma ligada por uma seta ao seu exemplo de código, transcritos abaixo.

Automaticamente:

```js
x = 5;
y = 6;
z = x + y;
```

Usando var:

```js
var x = 5;
var y = 6;
var z = x + y;
```

Usando let:

```js
let x = 5;
let y = 6;
let z = x + y;
```

Usando const:

```js
const x = 5;
const y = 6;
const z = x + y;
```

## Slide 16 — Variáveis

- Variáveis em JavaScript podem ser declaradas de 4 maneiras:
  - Automaticamente
  - Usando var
  - Usando let
  - Usando const

**Quando usar var, let ou const?**

- Sempre declare variáveis
- Sempre use const se o valor não deve ser alterado
- Sempre use const se o tipo não deve ser alterado (Arrays e Objetos)
- Use let somente se não puder usar const
- Use var somente se for necessário suportar navegadores antigos

## Slide 17 — Variáveis

- Declaração
  - Criar uma variável em JavaScript é chamado de "declarar" uma variável.
  - Você declara uma variável JavaScript usando a palavra-chave var ou let.
  - Após a declaração, a variável não possui valor (tecnicamente, ela é undefined).

> Destaque: É uma boa prática de programação declarar todas as variáveis no início de um script.

## Slide 18 — Escopo de variáveis

- Escopo de Bloco
  - Antes do ES6 (2015), o JavaScript não possuía escopo de bloco.
  - O JavaScript tinha escopo global e escopo de função.
  - O ES6 introduziu duas novas palavras-chave no JavaScript: **let** e **const**.
  - Essas duas palavras-chave passaram a fornecer escopo de bloco no JavaScript.

```js
{
  let x = 2;
}
// x NÃO pode ser usado aqui
```

## Slide 19 — Escopo de variáveis

- Escopo Global
  - Variáveis declaradas com var sempre têm escopo global.
  - Variáveis declaradas com a palavra-chave var não podem ter escopo de bloco.

```js
{
  var x = 2;
}
// x PODE ser usado aqui
```

## Slide 20 — Const

- Variáveis const devem receber um valor no momento em que são declaradas.
- A palavra-chave const é um pouco enganosa.
  - Ela não define um valor constante. Ela define uma referência constante a um valor.
  - Por causa disso, você NÃO pode:
    - Reatribuir um valor constante
    - Reatribuir um array constante
    - Reatribuir um objeto constante
  - Mas você PODE:
    - Alterar os elementos de um array constante
    - Alterar as propriedades de um objeto constante

## Slide 21 — Operadores

- Existem diferentes tipos de operadores em JavaScript:
  - Operadores Aritméticos
  - Operadores de Atribuição
  - Operadores de Comparação
  - Operadores de Strings
  - Operadores Lógicos
  - Operadores Bit a Bit (Bitwise)
  - Operador Ternário
  - Operadores de Tipo

## Slide 22 — Operadores Aritméticos

- Operadores Aritméticos são usados para realizar operações aritméticas em números

| Operator | Description |
|---|---|
| + | Addition |
| - | Subtraction |
| * | Multiplication |
| ** | Exponentiation (ES2016) |
| / | Division |
| % | Modulus (Division Remainder) |
| ++ | Increment |
| -- | Decrement |

## Slide 23 — Adicionando Strings e números

- O + também pode ser usado para adicionar (concatenar) strings:

```js
let text1 = "John";
let text2 = "Doe";
let text3 = text1 + " " + text2;
```

```js
let x = 5 + 5; // 10
let y = "5" + 5; // 55
let z = "Hello" + 5; // Hello5
```

## Slide 24 — Operadores de atribuição

- Operadores de atribuição atribuem valores a variáveis em JavaScript.

| Operator | Example | Same As |
|---|---|---|
| = | x = y | x = y |
| += | x += y | x = x + y |
| -= | x -= y | x = x - y |
| *= | x *= y | x = x * y |
| /= | x /= y | x = x / y |
| %= | x %= y | x = x % y |
| **= | x **= y | x = x ** y |

## Slide 25 — Operadores de comparação

| Operator | Description |
|---|---|
| == | equal to |
| === | equal value and equal type |
| != | not equal |
| !== | not equal value or not equal type |
| > | greater than |
| < | less than |
| >= | greater than or equal to |
| <= | less than or equal to |
| ? | ternary operator |

Todos os operadores de comparação acima também podem ser usados em **strings**:

## Slide 26 — Operadores lógicos / Operadores de tipo

**Operadores lógicos**

| Operator | Description |
|---|---|
| && | logical and |
| \|\| | logical or |
| ! | logical not |

**Operadores de tipo**

| Operator | Description |
|---|---|
| typeof | Returns the type of a variable |
| instanceof | Returns true if an object is an instance of an object type |

## Slide 27 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
