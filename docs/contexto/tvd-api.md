> Origem: seção "A API: tvd-api" do prompt de planejamento do projeto (sessão de 2026-11-15).

## A API: tvd-api

Feita por nós para este projeto, no formato da SWAPI. Express, publicada na Vercel, CORS liberado.

- **Base**: `https://tvd-api.vercel.app/api`
- **Código**: https://github.com/alexsant22/tvd-api
- `GET /api` devolve as URLs dos cinco recursos.

### Formato

Toda lista é paginada, com 10 itens por página:

```json
{ "count": 49, "next": "https://tvd-api.vercel.app/api/characters?page=2", "previous": null, "results": [ ... ] }
```

- `?page=N`: página da lista. Página que não existe responde 404.
- `?name=texto`: filtra pelo nome (ou pelo título, nos episódios), sem diferenciar maiúsculas nem acentos.
- `GET /api/{recurso}/{id}`: o item sozinho.
- **Relações entre recursos vêm como URL**, igual à SWAPI. Para mostrar "Vampiro" no lugar de `.../species/2`, o site precisa buscar essa URL (e ela também entra no cache).

### Recursos e campos

| Recurso | Itens | Páginas | Campos |
|---|---|---|---|
| `characters` | 49 | 5 | `id`, `name`, `actor`, `species` (lista de URLs), `family` (URL), `description`, `image`, `episodeCount`, `url` |
| `episodes` | 171 | 18 | `id`, `title`, `season` (URL), `number`, `airDate`, `directedBy`, `writtenBy`, `usViewers` (milhões), `productionCode`, `runtime` (min), `summary` (em português), `image`, `url` |
| `seasons` | 8 | 1 | `id`, `name` ("Temporada 1"), `premiereDate`, `endDate`, `image`, `episodeCount`, `episodes` (lista de URLs), `url` |
| `species` | 9 | 1 | `id`, `name`, `description`, `characters` (lista de URLs), `url` |
| `families` | 10 | 1 | `id`, `name`, `founding` (true nas cinco fundadoras de Mystic Falls), `description`, `characters` (lista de URLs), `url` |

Exemplo de personagem:

```json
{
  "id": 1,
  "name": "Elena Gilbert",
  "actor": "Nina Dobrev",
  "species": ["https://tvd-api.vercel.app/api/species/1", "https://tvd-api.vercel.app/api/species/8", "https://tvd-api.vercel.app/api/species/2"],
  "family": "https://tvd-api.vercel.app/api/families/2",
  "description": "Protagonista da série. Doppelgänger de Katherine, se apaixona por Stefan e depois por Damon.",
  "image": "https://static.tvmaze.com/uploads/images/medium_portrait/0/1494.jpg",
  "episodeCount": 134,
  "url": "https://tvd-api.vercel.app/api/characters/1"
}
```

Personagens, episódios e temporadas têm imagem (da TVMaze). Espécies e famílias não têm.
