---
data: 2026-11-24
autor: Alexandre Santos
assunto: revisão e merge do PR #14 (L2)
---

## Resumo
A Liliane abriu o PR #14 ("feat: estilo final e página inicial (L2)", `trabalho/lilianeperim-ifsp` → `dev`) às 19:40. O PR muda `css/style.css`, `index.html` e `js/paginas/inicio.js`, além de trazer quatro memórias dela de 23/11. O Claude revisou o PR com o `/code-review`, e o Alexandre postou às 19:51 uma revisão pedindo alterações em seis pontos. A Liliane corrigiu tudo no commit `1c0bd7d` (19:57). O Claude revisou de novo e não achou problema novo. O Alexandre aprovou e fez o merge na `dev` às 20:03 (merge `b3f14a9`).

Depois disso:
- a `dev` local avançou direto até o `b3f14a9`;
- a `trabalho/alexsant22` não podia avançar direto, porque tinha o commit `aedcd3a` (memória), que a `dev` não tinha. O Alexandre rodou `git pull --no-edit origin dev` (merge `a5e1508`), e o Claude deu o push;
- o `/sincronizar-quadro` não moveu nenhum cartão. O L2 (t09) já estava em Feito com o PR 14, e a coluna "PR aberto" estava vazia. A lista de PRs do quadro foi atualizada com o #14, e os 14 PRs do repositório estão mergeados.

## Decisões tomadas
- **Os seis pontos da revisão foram corrigidos no próprio PR #14**, em vez de deixar os do cache para um PR separado do Alexandre:
  1. o sublinhado dourado do item ativo do menu (D7) usava o atalho `text-decoration: underline 2px …`, que o Safari descarta. Passou a usar `text-decoration-line`, `-thickness` e `-color`;
  2. o `lerCache` (`js/cache.js`) ganhou `try/catch` e devolve `null` quando o JSON guardado está corrompido ou o localStorage está bloqueado. Antes, o erro acontecia fora do `try` do `buscarComCache` e deixava a inicial presa em "Carregando contagens…";
  3. o `salvarCache` (`js/cache.js`) ganhou `try/catch`. Se o `setItem` falhar (armazenamento cheio), os dados da API continuam sendo usados. Antes, a falha caía no `catch` do `fetch` e aparecia como "Sem conexão";
  4. as cinco contagens da inicial agora são pedidas ao mesmo tempo: as Promises vão para um array, e um segundo `for` espera cada uma na ordem dos atalhos;
  5. `#menu .navbar-nav { --bs-nav-link-padding-x: .75rem; }`, para os links do menu não ficarem colados na borda abaixo de 992px. O Bootstrap só usa o `--bs-navbar-nav-link-padding-x` a partir do `lg`;
  6. a memória `2026-11-23-revisao-do-pr-12.md` mostrava a regex do `busca.js` com os caracteres combinantes invisíveis. Agora mostra `/[\u0300-\u036f]/g`.
- **Os itens 2 e 3 foram corrigidos no `cache.js`, e não no `api.js` nem no `inicio.js`.** Assim todas as páginas ficam protegidas, e o `api.js` não mudou. A ideia de tratar o erro só no `inicio.js` foi descartada.
- **O `Promise.all` foi trocado pelo array de Promises** (item 4), porque não aparece nos slides nem nos exemplos do professor (só `async/await` e Promise, RNF04).
- **Na segunda revisão foi conferido:** `node --check` sem erro em `cache.js`, `api.js`, `inicio.js` e `busca.js`; zero caracteres entre U+0300 e U+036F na memória e no `busca.js`; preview da Vercel montado sem erro.

## Erros e rejeições da IA
- Na primeira revisão, o Claude sugeriu `Promise.all` para as contagens. Antes de escrever o comentário do PR, ele conferiu `docs/contexto/` e trocou a sugestão por algo que segue o estilo do professor.
- A revisão do PR #14 aparece duas vezes no GitHub (19:51:11 e 19:51:51), com o mesmo texto. Provavelmente o Alexandre postou uma vez e depois pediu ao Claude para postar. O GitHub não deixa apagar uma revisão já enviada, mas a aprovação substituiu o status de "alterações pedidas".

## Pendências
- **Sublinhado no Safari:** a correção não foi testada num Safari ou iPhone de verdade.
- **Teste no navegador da página inicial:** o Claude só leu o código. Nesta sessão ninguém conferiu as contagens, o modo Offline nem o menu aberto no celular.
- **As pendências do PR #11 foram resolvidas.** A memória `2026-11-23-merge-do-pr-13-e-tarefas-livres.md` listava o "Sem conexão" causado pelo `salvarCache` e o `JSON.parse` fora do `try` no `lerCache`, e as duas foram corrigidas pelos itens 2 e 3 deste PR.
- **Cartão t12 da Liliane:** continua dependendo de a dupla combinar quando ele vai para Feito. O estado dele não foi conferido nesta sessão.

## Próximos passos
1. R1 (primeiro PR `dev` → `main`): o L2 já entrou na `dev`. A Liliane abre o PR, e o Alexandre revisa.
2. Página de Temporadas (`js/paginas/temporadas.js`, prazo 28/11), como descrito em `2026-11-23-merge-do-pr-13-e-tarefas-livres.md`.
