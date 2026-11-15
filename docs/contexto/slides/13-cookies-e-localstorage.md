> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\13.Cookies e localStorage.pdf`

# Aula 13 — Cookies e Local Storage

## Slide 1 — Cookies e Local Storage

Cookies e Local Storage

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Cookies e Local Storage

- O protocolo HTTP é *stateless* (não guarda estado). Cada requisição que um navegador faz a um servidor é independente da anterior.
- Sem uma forma de "lembrar" do usuário, teríamos que fazer login a cada nova página visitada.
  - Carrinhos de compra seriam esvaziados a cada clique.
- A Solução: Armazenar pequenas quantidades de dados no navegador do cliente para manter o estado, preferências e informações entre as sessões.
- Tecnologias que vamos ver:
  - Cookies
  - Web Storage API (LocalStorage e SessionStorage)

## Slide 3 — Cookies

- São pequenos arquivos de texto que um site envia para o navegador do usuário. O navegador então anexa esse cookie a cada requisição futura para o mesmo site.
- Principais Características:
  - Tamanho Limitado: Geralmente até 4KB.
  - Enviados a cada Requisição: Aumentam o tamanho de cada requisição HTTP, podendo impactar a performance.
  - Data de Expiração: Podem ter um tempo de vida definido. Se não for definido, são deletados ao fechar o navegador (tornando-se um "cookie de sessão").
  - Sintaxe Complexa: Manipulação via document.cookie é feita através de uma única string, o que a torna um pouco verbosa.

## Slide 4 — Manipulando Cookies

- **document.cookie** é uma única string que contém todos os cookies da página, separados por ;.
  - Para criar ou atualizar, você atribui uma nova string a ele.
- Criando um Cookie:
  - Define o nome, valor e, opcionalmente, a data de expiração e o caminho.

```js
// Cookie que expira em 7 dias
const dataExpiracao = new Date();
dataExpiracao.setDate(dataExpiracao.getDate() + 7);

document.cookie = `username=alunoADS; expires=${dataExpiracao.toUTCString()}; path=/`;

// Cookie de sessão (deletado ao fechar o navegador)
document.cookie = "tema=dark; path=/";
```

## Slide 5 — Manipulando Cookies

- Lendo Cookies:
  - É preciso "parsear" a string document.cookie.

```js
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
```

## Slide 6 — Manipulando Cookies

- Deletando um Cookie:
  - Basta definir sua data de expiração para uma data no passado.

```js
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

## Slide 7 — Local Storage

- É parte da Web Storage API, projetado para ser uma forma mais simples e robusta de armazenar dados do que os cookies.
- Principais Características:
  - Tamanho Maior: Geralmente entre 5MB e 10MB por domínio (muito mais que os cookies).
  - Não é enviado ao Servidor: Os dados ficam apenas no navegador, não sobrecarregando as requisições.
  - Persistência: Os dados não expiram. Ficam salvos até serem removidos explicitamente via JavaScript.
  - API Simples: Possui métodos fáceis de usar (setItem, getItem, removeItem, clear).
  - Armazena apenas Strings: Para salvar objetos ou arrays, é preciso usar JSON.stringify() e JSON.parse().

## Slide 8 — Manipulando Local Storage

- **localStorage** é um objeto global com métodos diretos.
- Salvando/Atualizando um item: setItem(chave, valor)

```js
localStorage.setItem('nomeUsuario', 'Maria Silva');
localStorage.setItem('curso', 'Análise e Desenvolvimento de Sistemas');

// Salvando um objeto (precisa converter para string)
const preferencias = { tema: 'dark', fonte: '14px' };
localStorage.setItem('preferenciasUsuario', JSON.stringify(preferencias));
```

## Slide 9 — Manipulando Local Storage

- Lendo um item: getItem(chave)

```js
const usuario = localStorage.getItem('nomeUsuario');
console.log(usuario); // "Maria Silva"

// Lendo o objeto (precisa converter de volta)
const prefsSalvas = JSON.parse(localStorage.getItem('preferenciasUsuario'));
console.log(prefsSalvas.tema); // "dark"
```

## Slide 10 — Manipulando Local Storage

- Lendo um item: getItem(chave)

```js
const usuario = localStorage.getItem('nomeUsuario');
console.log(usuario); // "Maria Silva"

// Lendo o objeto (precisa converter de volta)
const prefsSalvas = JSON.parse(localStorage.getItem('preferenciasUsuario'));
console.log(prefsSalvas.tema); // "dark"
```

## Slide 11 — Manipulando Local Storage

- Removendo um item específico: removeItem(chave)

```js
localStorage.removeItem('curso');
```

- Limpando todo o Local Storage do domínio: clear()

```js
localStorage.clear();
```

## Slide 12 — Quando usar cookies?

- Use Cookies para:
  - Autenticação e Sessão: Armazenar tokens de sessão que precisam ser validados no servidor a cada requisição.
  - Rastreamento (Tracking): Identificar um usuário entre diferentes visitas para fins de análise (Ex: Google Analytics).
  - Pequenas Preferências: Informações que o servidor precisa saber, como o idioma preferido do usuário.

## Slide 13 — Quando usar local storage?

- Use Local Storage para:
  - Salvar preferências da UI: Lembrar se o usuário prefere o tema claro ou escuro.
  - Manter estado da aplicação: Salvar o conteúdo de um carrinho de compras enquanto o usuário navega.
  - Dados de Aplicações Offline: Armazenar dados para que a aplicação funcione mesmo sem internet.
  - Salvar rascunho: Manter o texto de um formulário longo para que o usuário não perca o que digitou se fechar a aba.

## Slide 14 — Session storage

- localStorage é poderoso para guardar dados de forma persistente.
- Mas e se precisarmos de dados que durem apenas enquanto o usuário está navegando ativamente em nosso site, e que sejam descartados depois?
  - sessionStorage.
- A principal e mais fundamental diferença entre localStorage and sessionStorage é o ciclo de vida (lifetime) dos dados.

## Slide 15 — Session storage

- Os dados são DELETADOS quando a sessão da página termina.
- Uma sessão dura enquanto a aba (ou a janela) do navegador estiver aberta. Isso significa que:
  - Se o usuário recarregar a página (F5), os dados no sessionStorage permanecem.
  - Se o usuário fechar a aba e depois abrir uma nova aba para o mesmo site, os dados no sessionStorage TERÃO SIDO PERDIDOS.

## Slide 16 — Session storage

- Outra diferença crítica é o escopo:
  - localStorage: Os dados são compartilhados entre todas as abas e janelas da mesma origem (mesmo domínio). Se você salvar um item em uma aba, pode lê-lo em outra.
  - sessionStorage: Os dados são específicos para cada aba. Cada aba tem seu próprio sessionStorage isolado. O que você salva em uma aba não é visível em outra, mesmo que seja do mesmo site.
- A API é Idêntica! (destacado em amarelo no slide)

## Slide 17 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
