> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Slides\14. Validação de Formulários.pdf`

# Aula 14 — Validação de Formulários

## Slide 1 — Validação de Formulários

Validação de Formulários

Prof. José Arnaldo Mascagni de Holanda
arnaldomh@ifsp.edu.br

## Slide 2 — Por que validar?

> Imagem: caixa de diálogo de erro do Windows com o título "Error", o texto "An error occurred." e os botões OK e Cancel.

- Experiência do Usuário (UX): Frustração, abandono de carrinho, cadastros incompletos.
- Integridade dos Dados (Backend): "Garbage in, garbage out" (Lixo entra, lixo sai). Dados ruins (ex: um CPF no campo de telefone) poluem o banco de dados.
- Segurança: Prevenir entradas maliciosas (embora o foco principal disso seja no backend).

## Slide 3 — Cliente vs. Servidor

- Validação no Cliente (Client-Side)
  - Onde: No navegador (JavaScript).
  - Por quê: Feedback rápido para o usuário (UX). Evita uma viagem desnecessária ao servidor.
  - É uma barreira de conveniência.
- Validação no Servidor (Server-Side) - A Validação Real
  - Onde: No backend (Node.js, Java, C#, PHP).
  - Por quê: Segurança e Integridade dos Dados.
  - É a barreira de segurança.
- NUNCA CONFIE NOS DADOS VINDOS DO CLIENTE!

## Slide 4 — Validação com HTML5

- O navegador faz o trabalho pesado por nós usando atributos.
  - required: O campo não pode estar vazio.
  - type="email": O valor deve ser um e-mail válido.
  - type="number": O valor deve ser um número (aceita min, max, step).
  - minlength / maxlength: Define o mínimo/máximo de caracteres para campos de texto.
  - pattern="[a-z]{4,8}": O valor deve bater com uma Expressão Regular (Regex).

## Slide 5 — Validação com HTML5

```html
<!-- Exemplo de código -->
<form>
  <label>Email:</label>
  <input type="email" required>

  <label>Senha (min. 8 caracteres):</label>
  <input type="password" required minlength="8">

  <label>Username (só letras minúsculas):</label>
  <input type="text" pattern="[a-z]+">

  <button type="submit">Cadastrar</button>
</form>
```

## Slide 6 — Validação com HTML5 - problemas

- As mensagens de erro padrão ("bolhas") são genéricas.
- Elas não são customizáveis (ex: "Preencha este campo").
- O visual delas é diferente em cada navegador (Chrome, Firefox, Safari).
- Não conseguimos controlar quando a validação ocorre (geralmente só no submit).

## Slide 7 — Constraint Validation API

- É a API de JavaScript que nos dá acesso e controle sobre a validação HTML5.
- Podemos continuar usando os atributos HTML5 (required, pattern, etc.) como base, mas podemos usar JavaScript para controlar as mensagens e o comportamento.
- Como funciona:
  - Adicionamos o atributo novalidate ao formulário.
  - Isso desliga as "bolhas" de erro padrão do navegador.
  - O controle fica com o JS.

```html
<!-- O 'novalidate' é a chave! -->
<form id="meu-form" novalidate>
  ...
</form>
```

## Slide 8 — Verificando a Validade

- Podemos verificar o formulário inteiro ou campo por campo.
  - **form.checkValidity():** Retorna true se o formulário inteiro for válido. (Útil no submit).
  - **input.checkValidity():** Retorna true se um campo específico for válido. (Útil no blur ou input).
  - O Objeto **input.validity:** O coração da API. É um objeto que descreve por que um campo é inválido.

## Slide 9 — Verificando a validade

```js
const form = document.getElementById('meu-form');

form.addEventListener('submit', (event) => {
    // Impede o envio padrão
    event.preventDefault();

    if (form.checkValidity()) {
        console.log('Formulário VÁLIDO! Enviando...');
        // form.submit(); // aqui enviaria de verdade
    } else {
        console.log('Formulário INVÁLIDO. Mostre os erros.');
        // Chamar a função que mostra os erros
    }
});
```

## Slide 10 — O Objeto validity

- Todo elemento de formulário (input, textarea, select) tem uma propriedade **.validity**.
- É um objeto **ValidityState** que contém flags booleanas.
- Propriedades mais úteis:
  - **validity.valueMissing**: true se o campo required estiver vazio.
  - **validity.typeMismatch**: true se o type="email" ou type="url" não bater.
  - **validity.patternMismatch**: true se o atributo pattern não bater.
  - **validity.tooShort**: true se o valor for menor que minlength.
  - **validity.rangeOverflow** / **rangeUnderflow**: true se o valor estiver acima/abaixo de max/min em campos numéricos.
  - **validity.valid**: true se todas as outras forem falsas.

## Slide 11 — Customizando as Mensagens

- Combinando o .**validity** com **setCustomValidity()**.
- **input.setCustomValidity(mensagem)**:
  - Se mensagem for uma string vazia (""), o campo é considerado VÁLIDO (em termos de erro customizado).
  - Se mensagem for qualquer outra coisa (ex: "Sua senha é muito curta!"), o campo é marcado como INVÁLIDO, e essa será a mensagem de erro.
- **input.validationMessage**: Lê a mensagem de erro atual (seja a padrão ou a que definimos).

## Slide 12 — Juntando tudo

```html
<input type="email" id="email" required> <span id="email-error-span" class="error"></span>
```

```js
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error-span');

emailInput.addEventListener('input', () => {
  // Limpa erros antigos enquanto o usuário digita
  emailError.textContent = '';
  emailInput.setCustomValidity('');

  if (emailInput.validity.typeMismatch) {
    const errorMsg = 'Por favor, insira um formato de e-mail válido.';
    emailInput.setCustomValidity(errorMsg);
    emailError.textContent = errorMsg; // Mostra no nosso span
  }

  if (emailInput.validity.valueMissing) {
    const errorMsg = 'O campo de e-mail não pode estar vazio.';
    emailInput.setCustomValidity(errorMsg);
    emailError.textContent = errorMsg;
  }
});
```

## Slide 13 — Validação 100% Manual

- E quando o HTML5 não tem um atributo para o que queremos?
- Exemplo clássico: O campo "Confirmar Senha" deve ser igual ao campo "Senha".
- Não existe type="confirm_password".
- Solução: Usamos lógica JavaScript pura e o setCustomValidity().

```js
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirma-senha');

confirmaSenha.addEventListener('input', () => {
  if (senha.value !== confirmaSenha.value) {
    confirmaSenha.setCustomValidity('As senhas não conferem!');
  } else {
    // CAMPO VÁLIDO! Limpe a mensagem.
    confirmaSenha.setCustomValidity('');
  }
});
```

## Slide 14 — Resumo

- Valide no Cliente E no Servidor. Sempre.
- Use HTML5 primeiro. Deixe o navegador trabalhar por você (required, type, pattern).
- Use a Constraint Validation API para assumir o controle.
  - novalidate no &lt;form&gt;.
  - event.preventDefault() e form.checkValidity() no submit.
  - Verifique o input.validity para saber o tipo de erro.
  - Use setCustomValidity() para definir mensagens de erro personalizadas.
- Dê feedback claro e imediato. Não espere o submit para erros simples. Use os eventos input ou blur.

## Slide 15 — Bibliografia

The modern JavaScript Tutorial (javascript.info) · MDN Web docs · W3 Schools

DUCKETT J. **Javascript e Jquery: desenvolvimento de interfaces web interativas.** Alta Books, 2016. 640 p.

FLANAGAN, D. **JavaScript: o guia definitivo**. 6. ed. Porto Alegre: Bookman, 2013. 1062 p.

SILVA, M. S. Web Design Responsivo. Novatec, 2014. 336 p.
