# Diários de Mystic Falls

Site multipágina sobre a série **The Vampire Diaries**, com personagens, episódios, temporadas, espécies e famílias. Os dados vêm da **tvd-api** e ficam guardados no navegador, para não repetir consultas.

Projeto Prático de **ARQCIWB**, IFSP Araraquara, 2026.

## Links

| | |
|---|---|
| Site publicado (branch `main`) | https://projetofinalciwb.vercel.app/ |
| Versão em teste (branch `dev`) | https://projetofinalciwb-git-dev-lilianeperim-ifsp.vercel.app/ |
| API usada | https://tvd-api.vercel.app/api |
| Código da API | https://github.com/alexsant22/tvd-api |

## A API: tvd-api

O enunciado sugere a SWAPI (Star Wars) ou a Hogwarts API (Harry Potter). A dupla escolheu The Vampire Diaries e criou a **tvd-api** no mesmo formato da SWAPI:

- toda lista é **paginada**, com 10 itens por página, e traz `count`, `next` e `previous`;
- as **relações entre recursos vêm como URL** (por exemplo, a espécie de um personagem é `.../api/species/2`), então o site precisa buscar essas URLs para mostrar os nomes;
- CORS liberado e publicada na Vercel.

Os desafios do enunciado continuam os mesmos: buscar todas as páginas (RF03), resolver as relações para mostrar os detalhes (RF05) e guardar tudo em cache (RN01 e RN02).

| Recurso | Itens | Páginas | Página do site |
|---|---|---|---|
| `characters` | 49 | 5 | Personagens |
| `episodes` | 171 | 18 | Episódios |
| `seasons` | 8 | 1 | Temporadas |
| `species` | 9 | 1 | Espécies |
| `families` | 10 | 1 | Famílias |

## O que o site faz

- **Página inicial** com uma apresentação e cinco atalhos, cada um com a quantidade de itens do recurso.
- **Uma página por recurso**, com menu, cabeçalho e rodapé em todas.
- **Lista completa ao abrir a página:** o site busca todas as páginas da API e mostra o progresso ("página 3 de 18").
- **Cards com o resumo:** foto (ou pôster), nome e um ou dois dados de cada item.
- **Modal com todos os dados** ao clicar num card, com as relações em nomes ("Humano, Doppelgänger, Vampiro" em vez de URLs).
- **Busca por nome enquanto se digita**, sem diferenciar maiúsculas nem acentos ("elena" acha "Elena", "hibrido" acha "Híbrido"), com aviso quando nada é encontrado.
- **Cache no `localStorage`:** depois da primeira visita, as páginas abrem sem nenhuma requisição à API. O botão **Limpar dados salvos**, no rodapé, apaga esse cache.
- **Modo claro e modo escuro:** a primeira visita segue o tema do sistema, e o botão no menu troca e guarda a escolha.
- **Aviso de erro** com o botão "Tentar novamente" quando a API não responde.
- Quando a foto de um personagem não existe ou não carrega, aparecem as **iniciais** do nome no lugar dela.

## Requisitos do enunciado

| Requisito | Onde está |
|---|---|
| RF01 Cabeçalho, menu e rodapé | `js/layout.js` monta o menu e o rodapé de todas as páginas |
| RF02 Uma página por recurso | `pages/`, com o menu ligando todas |
| RF03 Lista inicial completa | `buscarTodos` em `js/api.js` segue o `next` até a última página |
| RF04 Informações resumidas | Cards de `criarCard` em `js/ui.js` |
| RF05 Detalhes em modal do Bootstrap | `abrirModal` e `preencherModal` em `js/ui.js`, montados por cada página |
| RF06 Busca por nome | `configurarBusca` em `js/busca.js` |
| RF07 Resultado vazio | `Nenhum resultado para "..."` em `js/busca.js` |
| RN01 Dados no `localStorage` em JSON | `salvarCache` em `js/cache.js` |
| RN02 Consultar o cache antes de cada requisição | `buscarComCache` em `js/api.js` |
| RNF01 Responsividade | Grade do Bootstrap e menu sanduíche, testados em 375, 768 e 1280 px |
| RNF02 Acessibilidade básica | `header`, `nav`, `main` e `footer`; `label` na busca; `alt` nas fotos; cards como `<button>`; Lighthouse com 100 em Acessibilidade |
| RNF03 Organização do código | HTML, CSS e JS em pastas separadas; API, cache e busca num arquivo cada, usados por todas as páginas |
| RNF04 Tecnologias | HTML5, CSS3, JavaScript e Bootstrap 5.3.3; `fetch` com `async/await` |

## Como o site funciona por dentro

### Dados e cache

Só o `js/api.js` chama `fetch`. Toda requisição passa por `buscarComCache(url)`:

1. procura a URL no `localStorage` (a chave é a própria URL);
2. se achar, devolve o JSON guardado, sem ir à API (RN02);
3. se não achar, faz o `fetch`, guarda a resposta com `JSON.stringify` (RN01) e devolve os dados;
4. se a API não responder, devolve `null`, e a página mostra o aviso de erro.

`buscarTodos(recurso)` chama `buscarComCache` página por página, seguindo o campo `next` até ele vir `null` (RF03). Como cada página da API fica guardada separadamente, a página inicial e as páginas de recurso aproveitam o mesmo cache: abrir Episódios na primeira vez faz 18 requisições de episódios e 1 de temporadas, e recarregar não faz nenhuma.

O botão **Limpar dados salvos** apaga só as chaves que começam com o endereço da API, então a escolha do tema continua guardada.

### Relações em nomes

As relações chegam como URL. Para transformar `.../species/2` em "Vampiro", `buscarRelacionados(urls)` descobre o recurso pela URL, busca a lista inteira dele com `buscarTodos` (que, depois da primeira vez, sai do cache) e procura cada URL nessa lista. Assim, abrir vários modais seguidos não gera requisições novas.

O modal abre na hora, com um indicador de carregamento só nos campos que dependem de outra lista, e é preenchido quando os nomes chegam. Se a pessoa fechar o modal ou abrir outro item antes disso, o resultado antigo é descartado.

### Busca sem acento

A lista fica guardada numa variável da página, e a busca filtra essa lista, sem nova requisição. Antes de comparar, o termo e o nome passam por `normalizarTexto`:

```js
texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
```

O `normalize('NFD')` separa cada letra do seu acento ("é" vira "e" + acento), e o `replace` apaga a faixa de U+0300 a U+036F, onde ficam esses acentos soltos. Por isso "Éléna", "ELENA" e "elena" encontram a mesma personagem. Em Episódios, a busca é pelo título.

### Peças compartilhadas (`js/ui.js`)

Cada página só diz o que mostrar; o desenho fica no `ui.js`:

- `mostrarCarregando`, `esconderCarregando` e `mostrarErro`: o estado da lista (indicador, aviso e botão "Tentar novamente");
- `mostrarLista` e `criarCard`: a grade de cards, cada um um `<button>` alcançável pelo teclado;
- `criarIniciais`: as iniciais no lugar da foto ("EM" para Elijah Mikaelson);
- `abrirModal` e `preencherModal`: um modal do Bootstrap só, criado na primeira abertura e reaproveitado;
- `criarFotoDetalhe`, `criarDetalhesComFoto`, `criarListaDetalhes` e `criarListaDeNomes`: o conteúdo do modal;
- `formatarData`: as datas da API ("2009-09-10") no formato brasileiro.

### Páginas

| Página | Card | Modal |
|---|---|---|
| Personagens | Foto, nome e ator | Ator, espécies, família, número de episódios e descrição |
| Episódios | Título, temporada, número e data (sem imagem) | Cena do episódio, direção, roteiro, audiência, duração e resumo |
| Temporadas | Pôster, período e número de episódios | Datas e a lista numerada dos episódios |
| Espécies | Nome e número de personagens | Descrição e personagens |
| Famílias | Nome, selo "Fundadora" e número de personagens | Se é fundadora de Mystic Falls, descrição e personagens |

## Estrutura

```
Projeto_Final_CIWB/
├── index.html              página inicial
├── pages/                  uma página por recurso
│   ├── personagens.html
│   ├── episodios.html
│   ├── temporadas.html
│   ├── especies.html
│   └── familias.html
├── css/
│   └── style.css           cores, cards, modal e modo claro/escuro
├── js/
│   ├── tema.js             modo claro/escuro (carregado no <head>)
│   ├── cache.js            localStorage (RN01 e RN02)
│   ├── api.js              o único fetch do projeto
│   ├── busca.js            busca por nome (RF06 e RF07)
│   ├── ui.js               lista, cards, modal, carregando e erro
│   ├── layout.js           menu e rodapé
│   └── paginas/            um arquivo por página
├── img/                    logo e favicon
└── docs/                   plano do projeto e identidade visual
```

Os scripts são comuns (`<script src>` no fim do `<body>`, sem `import`/`export`) e entram nesta ordem: `cache.js` → `api.js` → `busca.js` → `ui.js` → `layout.js` → script da página, porque cada um usa funções dos anteriores.

## Como rodar

Não precisa instalar nada.

- **Pelo navegador:** acesse https://projetofinalciwb.vercel.app/.
- **No computador:** baixe o repositório e abra o `index.html` no navegador (ou use a extensão Live Server do VS Code). É preciso estar com internet, para carregar o Bootstrap, as fontes e os dados da API.

## Tecnologias

- HTML5, CSS3 e JavaScript
- Bootstrap 5.3.3 (via CDN)
- Fontes Cinzel e Lato (Google Fonts)
- Publicação na Vercel

## Dupla

| Nome | GitHub | Parte principal |
|---|---|---|
| Alexandre Santos | [@alexsant22](https://github.com/alexsant22) | tvd-api; cache, acesso à API, busca e peças compartilhadas (`cache.js`, `api.js`, `busca.js`, `ui.js`); páginas de Temporadas, Espécies e Famílias |
| Liliane Perim | [@lilianeperim-ifsp](https://github.com/lilianeperim-ifsp) | Identidade visual, logo e estilo (`style.css`); menu, rodapé e tema (`layout.js`, `tema.js`); página inicial e páginas de Personagens e Episódios; publicação na Vercel |

Cada pessoa trabalha na sua branch (`trabalho/<usuario>`), que vai para a `dev` por pull request com revisão da outra. Depois dos testes na `dev`, ela vai para a `main`, que é a versão publicada.
