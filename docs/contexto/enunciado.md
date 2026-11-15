> Origem: `C:\Users\Alexandre Santos\Documents\TSI - IFSP\2º Semestre\ARQCIWB\Material de Aula\Projeto Prático 2026.pdf`

> Imagem: logo do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo, Campus Araraquara, no topo das duas páginas.

# Projeto Prático - ARQCIWB

Os fãs de duas grandes franquias estão pedindo a sua ajuda! Eles descobriram que existem APIs públicas com detalhes sobre seus universos preferidos e querem um website que apresente esses dados de forma organizada e acessível.

Você deve escolher uma das APIs abaixo para o seu projeto:

| Opção | Franquia | API |
|---|---|---|
| A | Star Wars | SWAPI, [swapi.dev](https://swapi.dev) |
| B | Harry Potter | Hogwarts API, [hogwarts-api.com](https://hogwarts-api.com) |

## Objetivo

Desenvolver um website multipágina que consuma a API escolhida, apresente os dados em listas, exiba os detalhes de cada item e reduza o número de requisições por meio de cache local.

Use sua criatividade e os recursos de HTML, CSS, JavaScript e Bootstrap para a construção do site.

## Requisitos funcionais

**RF01. Estrutura das páginas:** cada página deve conter cabeçalho, menu de navegação e rodapé.

**RF02. Páginas por recurso:** cada página do site deve ser dedicada a um tipo de conteúdo diferente (por exemplo: personagens, planetas, veículos). O menu deve permitir navegar entre todas elas.

**RF03. Listagem inicial:** ao carregar uma página, o sistema deve exibir automaticamente a lista de todos os itens daquele recurso. Se a API paginar os resultados, o site deve obter todas as páginas.

**RF04. Informações resumidas:** a listagem deve mostrar apenas informações básicas de cada item (por exemplo, o nome e mais um ou dois campos). Os dados completos não devem aparecer na lista.

**RF05. Detalhes do item:** ao clicar em um item da lista, o sistema deve exibir todas as suas informações em um modal do Bootstrap, preenchido dinamicamente com JavaScript.

**RF06. Busca por nome:** cada página deve ter um campo de busca que filtre os itens da lista pelo nome, de forma que o usuário veja o resultado enquanto digita ou ao acionar um botão.

**RF07. Resultado vazio:** quando a busca não encontrar nenhum item, o sistema deve exibir uma mensagem informativa ao usuário.

## Requisitos de armazenamento (cache)

**RN01**. Para tornar o acesso mais eficiente e diminuir as consultas à API, os dados recebidos devem ser armazenados em localStorage, no formato JSON.

**RN02**. Antes de cada requisição, o sistema deve verificar se os dados já existem no localStorage. Se existirem, deve usá-los em vez de consultar a API novamente.

## Requisitos não funcionais

**RNF01**. Responsividade: o site deve usar o Bootstrap e funcionar bem em celulares, tablets e desktops.

**RNF02**. Acessibilidade básica: use HTML semântico (header, nav, main, footer), rótulos nos campos de formulário e textos alternativos em imagens, quando houver.

**RNF03**. Organização do código: separe HTML, CSS e JavaScript em pastas e arquivos distintos. Evite repetir código: as funções de acesso à API, de cache e de busca devem ser reutilizadas entre as páginas.

**RNF04**. Tecnologias: HTML5, CSS3, JavaScript e Bootstrap. Os dados devem ser obtidos com fetch (usando async/await ou Promise).

**Prazo para apresentação e entrega: 08 de dezembro de 2026** (em vermelho, no PDF)
