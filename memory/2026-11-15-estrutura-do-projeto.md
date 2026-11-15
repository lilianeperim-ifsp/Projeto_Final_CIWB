---
data: 2026-11-15
autor: Alexandre Santos
assunto: estrutura do projeto
---

## Resumo
Sessão de planejamento do Projeto Prático de CIWB (site de The Vampire Diaries consumindo a tvd-api). O Claude leu o enunciado, os slides das aulas 10 a 14 e os códigos de exemplo das aulas 9 a 14, e conferiu a tvd-api ao vivo. Depois, montou o plano de estrutura do site, revisado em duas rodadas até a aprovação. Com o plano aprovado, foi feito o primeiro passo: transcrição do contexto em `docs/contexto/` (enunciado, tvd-api, slides 10 a 14 e `codigos-exemplo.md` com a seção "Padrões do professor"), as skills `salvar-memoria` e `atualizar-branch`, o `CLAUDE.md` e o `.gitignore`. As branches `dev` e `trabalho/alexsant22` foram criadas.

## Decisões tomadas
- **Estrutura de pastas:** a estrutura de partida foi mantida (`index.html` na raiz, páginas em `pages/`, `css/style.css`, JS compartilhado em `js/` e um arquivo por página em `js/paginas/`). Entrou um `.gitignore` com `.claude/settings.local.json`, para as permissões pessoais de cada um no Claude Code não irem para o repositório. A pasta `css/paginas/` só será criada se alguma página precisar.
- **Página inicial (D1):** mantida, com apresentação e cinco cards com a contagem de cada recurso. Falta o Alexandre confirmar com o professor, porque o RF02 diz que cada página é dedicada a um recurso. Se o professor recusar, o `index.html` vira a página de Personagens.
- **Layout (RF01/RF02):** as tags `header`/`nav`/`main`/`footer` ficam escritas em cada HTML, e o `layout.js` preenche o menu e o rodapé. Assim o menu fica num lugar só e a semântica aparece no código-fonte. Descartado: repetir o menu nos seis HTMLs.
- **Scripts (D3):** `<script>` comum no fim do `<body>`, como nos exemplos do professor, na ordem cache → api → busca → ui → layout → página. Descartado: `import`/`export`, que impede abrir o site pelo `file://` e foge do que foi ensinado.
- **Cache (RN01/RN02):** a chave no localStorage é a URL exata de cada requisição. `buscarComCache(url)` em `api.js` é o único `fetch` do projeto e consulta `lerCache` antes de qualquer requisição. As listas paginadas guardam cada página na sua URL. Medido: todos os dados da API somam cerca de 203 KB, bem abaixo do limite de 5 MB.
- **Relações (D2):** URL → nome se resolve pela lista inteira do recurso (`buscarRelacionados` chama `buscarTodos`), e não item por item. O modal da espécie "Humano" custa 5 requisições em vez de 24, ou nenhuma se a lista já estiver no cache.
- **Busca (RF06/RF07):** o filtro roda sobre a lista que já está na memória, com `oninput`, ignorando acentos com `normalize('NFD')` e uma regex da faixa de acentos combinantes, escrita com os códigos Unicode para poder ser explicada na apresentação. Descartado: o `?name=` da API, que faria uma requisição a cada termo e contraria o RN02.
- **Personagem sem foto (D5):** mostra as iniciais (`role="img"`). A regra é por item (`image` preenchido mostra a foto, `null` mostra as iniciais), para continuar funcionando se a tvd-api ganhar mais fotos. Descartado: `img/sem-foto.png`.
- **Outras decisões aprovadas:** botão "Limpar dados salvos" no rodapé (D4); cards de episódio sem imagem (D6); tema escuro com vermelho-sangue (D7); Bootstrap 5.3.3 pela CDN do jsDelivr; seção "Contexto" no `CLAUDE.md` apontando para `docs/contexto/` e `memory/` (D9).
- **Divisão dos compartilhados (D8):** cada arquivo tem um dono só.
  - **Alexandre:** `cache.js`, `api.js`, `busca.js`, `ui.js` e a página de Espécies como banco de testes.
  - **Liliane:** os 6 HTMLs, `layout.js`, `style.css`, `img/logo.png`, `img/favicon.png`, `index.html` e `inicio.js`.
  - O contrato entre as duas partes (funções, IDs do HTML e classes `.card-recurso` e `.iniciais`) está no plano. Descartado: uma pessoa só fazer todos os compartilhados enquanto a outra espera.
- **Páginas (D11):** Temporadas passou da Liliane para o Alexandre, para equilibrar a carga. O Alexandre fica com Espécies, Famílias (22/11, logo depois do A2) e Temporadas (28/11). A Liliane fica com Personagens e Episódios.
- **Famílias em 22/11:** fica em commit local até o merge do A2, porque um push no mesmo dia entraria no PR aberto do A2. Push e PR em 23/11.
- **Calendário:** o trabalho pesado do Alexandre fica em 21–22/11 e 28–29/11. Nada dele marcado em 19/11 (Engenharia de Software), 27/11 (entrega de Orientação a Objetos), 29/11 e 30/11 (prova de Inglês), 03/12 e 04/12 (apresentação de Orientação a Objetos). PR final `dev` → `main` em 02–03/12, ensaio em 05–06/12, entrega em 08/12.
- **Vercel:** a Liliane importa o projeto na Vercel dela até 24/11 (o repositório é público e é dela). Ela precisa desligar a "Vercel Authentication" dos previews, para o Alexandre e o professor conseguirem abrir os links.

## Erros e rejeições da IA
- **Matt Donovan como personagem sem foto:** na primeira versão do plano, o Claude usou o Matt Donovan como exemplo de personagem sem foto, mas ele tem foto na API. O Alexandre percebeu na revisão. Corrigido com uma nova consulta à API: os testes passaram a usar Silas (id 21, sem foto e sem família) e Elijah Mikaelson (id 12, sem foto, com família).
- **Regex de acentos invisível:** ao gravar o plano, os códigos Unicode da regex viraram caracteres combinantes invisíveis. O Alexandre pediu a regex com os códigos, para conseguir explicá-la. O Claude corrigiu o arquivo com um script e acrescentou ao plano a conferência do `busca.js` com `grep` depois de gravado.
- **Primeira versão do plano rejeitada em parte:** os compartilhados ficavam todos com o Alexandre; faltava definir quem liga a Vercel; o calendário não considerava as outras entregas dele. A dupla redefiniu a divisão, e o Claude refez as seções de ordem, divisão e calendário.
- **Carga desequilibrada:** o Claude apontou que a divisão das páginas pedida pela dupla deixava a Liliane sobrecarregada e propôs a D11. Foi aceita, com ajuste do Alexandre nas datas.

## Pendências
- Confirmar o usuário do GitHub da Liliane (os comandos dela usam `trabalho/<usuario-da-liliane>`).
- Confirmar com o professor se a página inicial pode existir (D1).
- Liliane: criar a branch dela, revisar e fazer merge do PR do primeiro passo, ligar a Vercel até 24/11.
- Plano completo: `C:\Users\Alexandre Santos\.claude\plans\siga-o-prompt-abaixo-memoized-garden.md`. Está fora do repositório, então a Liliane só tem acesso às decisões por esta memória e pelo `docs/contexto/`.

## Próximos passos
- Alexandre: commit, push e PR do primeiro passo para a `dev`.
- Alexandre, manhã de 17/11: PR A1 (`cache.js` + `api.js`), testado no console com uma página temporária.
- Liliane, de 16 a 20/11: PR L1 (esqueleto dos 6 HTMLs, `layout.js`, `style.css` base, imagens e os `js/paginas/*.js` mínimos).
