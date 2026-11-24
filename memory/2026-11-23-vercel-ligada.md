---
data: 2026-11-23
autor: lilianeperim-ifsp
assunto: Vercel ligada (cartão V)
---

## Resumo
Continuação da sessão registrada em `2026-11-23-revisao-do-pr-12.md`. A Liliane ligou o repositório na Vercel da conta dela, seguindo a seção 1c do `docs/plano.md`. O site de produção está em https://projetofinalciwb.vercel.app/. Depois, o `/sincronizar-quadro` não conseguiu abrir o quadro kanban, e nada foi escrito nele. O PR #13 (Famílias), aprovado pela Liliane, foi mergeado pelo Alexandre na `dev` às 21:10.

## Decisões tomadas
- **Importação na Vercel (plano Hobby, conta da Liliane):** *Add New… → Project* → `Projeto_Final_CIWB`, com *Framework Preset* **Other**, sem *Build Command* e com o *Output Directory* na raiz. O repositório não precisou de nenhuma mudança: o site é estático, sem `vercel.json` nem build.
- **Produção na `main`:** na versão atual da Vercel, a branch de produção não fica em *Settings → Git*, e sim em *Settings → Environments → Production → Branch Tracking*. Ela está em `main`, com o domínio `projetofinalciwb.vercel.app`. O Claude também conferiu pelo conteúdo: o site publicado tem 123 bytes, o mesmo `index.html` da `main` (só a linha de comentário do esqueleto), e o da `dev` tem mais de 1.500.
- **Previews liberados:** a Vercel Authentication foi desligada em *Settings → Deployment Protection*, para o Alexandre e o professor abrirem os links de preview sem serem membros do projeto.
- **Site em branco na produção é o esperado:** a `main` ainda está no PR #6 (16/11), só com o esqueleto vazio. O conteúdo aparece no primeiro PR `dev` → `main` (R1), previsto para 25/11, como a memória `2026-11-15-atualizacao-da-main.md` já tinha avisado.

## Erros e rejeições da IA
- O Claude indicou *Settings → Git* para conferir a *Production Branch*, mas a Vercel mudou esse campo para *Settings → Environments*. A Liliane não achou o campo e mandou o print, e o Claude corrigiu o caminho.

## Pendências
- **Preview sem login ainda não conferido:** o endereço `projetofinalciwb-git-dev-lilianeperim-ifsps-projects.vercel.app` dava 404 porque a Vercel ainda não tinha gerado nenhum deploy da `dev` (na importação, ela publica só a produção). O merge do #13 deve ter gerado o primeiro preview. Falta abrir o link numa janela anônima e ver se abre sem pedir login.
- **README:** a Liliane precisa mandar o domínio https://projetofinalciwb.vercel.app/ ao Alexandre, que coloca no README.
- **Quadro kanban inacessível para a Liliane:** o link https://claude.ai/artifact/8eX7Hr9PHAKpmuvBBtaS7r dá "não encontrado" na conta dela, e o quadro não aparece entre os artefatos compartilhados com ela. O Alexandre precisa compartilhar com permissão de edição, ou mover ele mesmo os cartões:
  - t11 (Famílias, PR #13): a rotina das 9h move sozinha, porque o PR está ligado ao cartão;
  - V (Vercel): sem PR, precisa ir à mão para Feito;
  - t12 ("Revisar e fazer merge do A2 e de Famílias", da Liliane): as duas revisões estão feitas, e os dois PRs foram mergeados.
- **L2:** `css/style.css` final e `js/paginas/inicio.js`, prazo em 24/11.

## Próximos passos
1. `/atualizar-branch`, para trazer o merge do #13 (Famílias) e o `ui.js` e o `busca.js` corrigidos.
2. Abrir o preview da `dev` sem login e testar Espécies e Famílias no navegador: o selo, o modo Offline com o cache limpo e o teclado (Tab, Enter e Esc, com o foco voltando ao card).
3. Seguir o L2.
4. Pedir ao Alexandre acesso de edição ao quadro.
