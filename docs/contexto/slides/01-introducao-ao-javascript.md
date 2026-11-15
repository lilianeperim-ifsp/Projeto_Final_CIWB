> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\01. Introdução_ao_JavaScript.pdf`

# Aula 1 — Introdução ao JavaScript

## Slide 1 — Introdução ao JavaScript

Introdução ao JavaScript

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — O que é JavaScript?

- JavaScript foi inicialmente criado para "tornar as páginas da web vivas".
- Os programas nessa linguagem são chamados de scripts.
- Os scripts são fornecidos e executados como texto simples.
  - Não precisam de preparação especial ou compilação para serem executados.
- Nesse aspecto, o JavaScript é muito diferente de outra linguagem chamada Java.

## Slide 3 — Por que é chamado de JavaScript?

- Quando o JavaScript foi criado pela Netscape, inicialmente tinha outro nome: "LiveScript".
- Java era muito popular naquela época, então foi decidido que posicionar uma nova linguagem como um "irmão mais novo" de Java ajudaria.
- Mas, à medida que evoluiu, o JavaScript tornou-se uma linguagem totalmente independente com sua própria especificação chamada ECMAScript, e agora não tem nenhuma relação com o Java.

## Slide 4 — Especificação

- A especificação ECMA-262 contém as informações mais aprofundadas, detalhadas e formalizadas sobre JavaScript. Ela define a linguagem.
- Uma nova versão de especificação é lançada a cada ano.
  - Entre esses lançamentos, a especificação mais recente está em https://tc39.es/ecma262/ .

## Slide 5 — Motores JavaScript

- Hoje, o JavaScript pode ser executado não apenas no navegador, mas também no servidor (ou em qualquer dispositivo que tenha um programa especial chamado *JavaScript engine*).
- O navegador possui um *engine* incorporado, às vezes chamado de "máquina virtual JavaScript".
- Motores diferentes têm "codinomes" diferentes. Por exemplo:
  - V8 – no Chrome, Opera e Edge.
  - SpiderMonkey – no Firefox.
  - "Chakra" para IE,
  - "JavaScriptCore", "Nitro" e "SquirrelFish" para Safari, etc.

> Imagem: logos dos motores V8 e SpiderMonkey.

## Slide 6 — Como funcionam os motores?

1. O motor (embutido se for um navegador) lê ("analisa") o script.
2. Em seguida, ele converte ("compila") o script em código de máquina.
3. O código da máquina é executado, bem rápido.

- O motor aplica otimizações em cada etapa do processo.
  - Ele observa o script compilado enquanto ele é executado, analisa os dados que fluem por ele e otimiza ainda mais o código da máquina com base nesse conhecimento.

> Imagem: diagrama "How V8 Works" (por @addyosmani): "We take your JS" → "Parse it" → "turn that into an Abstract Syntax Tree" → "Generate bytecode" → "Get feedback for speculative optimisations" → "Optimize & Compile it" (TurboFan) → Intel, ARM, MIPS → "then run your optimized code!".

## Slide 7 — O que o JavaScript no navegador pode fazer?

- O JavaScript moderno é uma linguagem de programação "segura".
  - Não fornece acesso de baixo nível à memória ou à CPU, pois foi criado inicialmente para navegadores que não o exigem.
- Os recursos do JavaScript dependem muito do ambiente em que está sendo executado.
  - Node.js oferece suporte a funções que permitem que o JavaScript leia/escreva arquivos arbitrários, execute solicitações de rede etc.
- O JavaScript no navegador pode fazer tudo relacionado à manipulação da página da web, , além da interação com o usuário e com o servidor Web.

## Slide 8 — O que o JavaScript no navegador pode fazer?

- Adicionar novo HTML à página, alterar o conteúdo existente, modificar estilos.
- Reagir às ações do usuário, executar procedimentos a partir de cliques do mouse, movimentos do ponteiro, pressionamentos de teclas.
- Enviar solicitações pela rede para servidores remotos, fazer download e upload de arquivos (as chamadas tecnologias AJAX e COMET).
- Obter e definir cookies, fazer perguntas ao visitante, mostrar mensagens.
- Lembrar-se dos dados no lado do cliente (armazenamento local).

## Slide 9 — O que o JavaScript do navegador NÃO PODE fazer?

- As habilidades do JavaScript no navegador são limitadas para proteger a segurança do usuário.
- As restrições incluem:
  - O JavaScript em uma página da Web pode não ler/gravar arquivos arbitrários no disco rígido, copiá-los ou executar programas. Não tem acesso direto às funções do sistema operacional.
  - Os navegadores modernos permitem que ele trabalhe com arquivos, mas o acesso é limitado e fornecido apenas se o usuário realizar determinadas ações, como "soltar" um arquivo em uma janela do navegador ou selecioná-lo por meio de uma tag &lt;input&gt;.
  - Existem maneiras de interagir com a câmera/microfone e outros dispositivos, mas elas exigem permissão explícita do usuário.

## Slide 10 — O que o JavaScript do navegador NÃO PODE fazer?

- Diferentes guias/janelas geralmente não se conhecem. O JavaScript de uma página pode não acessar a outra página se vier de sites diferentes (de um domínio, protocolo ou porta diferente).
- O JavaScript pode se comunicar facilmente pela rede com o servidor de onde veio a página atual. Mas sua capacidade de receber dados de outros sites/domínios é prejudicada. Embora possível, requer consentimento explícito (expresso em cabeçalhos HTTP) do lado remoto.

## Slide 11 — Linguagens "sobre" JavaScript

- Novas linguagens transpiladas - convertidas para JavaScript antes de serem executadas no navegador.
- As ferramentas modernas tornam a transpilação muito rápida e transparente, permitindo que os desenvolvedores codifiquem em outro idioma e convertam-no automaticamente.
- Exemplos:
  - CoffeeScript
  - TypeScript (Microsoft)
  - O Flow (Facebook)
  - Dart (Google)
  - Brython (Python)

## Slide 12 — Manuais

- MDN (Mozilla) JavaScript Reference é o manual principal com exemplos e outras informações. É ótimo obter informações aprofundadas sobre funções individuais de linguagem, métodos, etc.
- Você pode encontrá-lo em https://developer.mozilla.org/pt-BR/docs/Web/JavaScript .
- No entanto, geralmente é melhor usar uma pesquisa na Internet. Basta usar "MDN [termo]" na consulta, por exemplo,

## Slide 13 — Tabelas de compatibilidade

- JavaScript é uma linguagem em desenvolvimento, novos recursos são adicionados regularmente.
  - Para ver o suporte entre mecanismos baseados em navegador e outros, consulte: https://caniuse.com
  - Tabela com recursos de linguagem e mecanismos que suportam ou não: https://kangax.github.io/compat-table

## Slide 14 — IDE e Editores

- **Visual Studio Code (cross-platform, gratuito).**
- WebStorm (cross-platform, pago).
- Sublime Text (cross-platform, shareware).
- Notepad++ (Windows, grátis).
- Vim e Emacs também são legais se você souber como usá-los.

> Imagem: logos do VS Code, WebStorm, Sublime Text, Notepad++, Vim e Emacs.

## Slide 15 — Console do desenvolvedor

- Código é propenso a erros. Muito provavelmente irá cometê-los!
- No navegador, os usuários não veem erros por padrão.
  - Se algo der errado no script, não veremos o que está errado e não poderemos consertá-lo.
- Para ver erros e obter muitas outras informações úteis sobre scripts, as **ferramentas do desenvolvedor** foram incorporadas aos navegadores.
- As ferramentas do desenvolvedor são potentes; elas têm muitos recursos.
  - Para começar, aprenderemos como abri-los, verificar erros e executar comandos JavaScript.

## Slide 16 — Console do desenvolvedor

- Digite o seguinte código e abra em seu navegador:

```html
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  There is an error in the script on this page.
  <script>
    lalala
  </script>

</body>

</html>
```

## Slide 17 — Console do desenvolvedor

- Há um erro no código JavaScript nele. Ele está oculto aos olhos de um visitante regular, então vamos abrir as ferramentas do desenvolvedor para vê-lo.
- Pressione F12
- As ferramentas do desenvolvedor serão abertas na guia Console por padrão.

> Imagem: DevTools do Chrome em português, guia Console, com o erro `Uncaught ReferenceError: lalala is not defined at bug.html:12:5` e o link `bug.html:12`.

## Slide 18 — Console do desenvolvedor

- Aqui podemos ver a mensagem de erro em vermelho. Nesse caso, o script contém um comando "lalala" desconhecido.
- À direita, há um link clicável para a fonte bug.html:12 com o número da linha onde ocorreu o erro.
- Abaixo da mensagem de erro, há um >símbolo azul. Ele marca uma "linha de comando" onde podemos digitar comandos JavaScript.
  - Pressione Enter para executá-los.

> Imagem: a mesma guia Console, com o erro em vermelho e o prompt `>` azul abaixo.

## Slide 19 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
