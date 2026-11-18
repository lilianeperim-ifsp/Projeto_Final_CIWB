---
data: 2026-11-17
autor: Alexandre Santos
assunto: quadro kanban e roadmap
---

## Resumo
A sessão criou um quadro kanban compartilhado para a dupla acompanhar as tarefas do plano (`docs/plano.md`, seção 7). O quadro é um artefato do claude.ai: https://claude.ai/artifact/8eX7Hr9PHAKpmuvBBtaS7r.

- **Aba Quadro:**
  - colunas A fazer, Fazendo, PR aberto e Feito;
  - cabeçalho com dias até a entrega, tarefas feitas, atrasadas e esperando outra tarefa;
  - dependências entre cartões, com os selos "bloqueada" e "liberada";
  - filtros por busca, responsável, fase e situação;
  - seção "Atualizações", com o histórico e notas da dupla, e seção "PRs do repositório".
- **Aba Roadmap:** linha do tempo horizontal com a ordem de execução, o "por quê" de cada tarefa e as tarefas que podem ser feitas em conjunto.

Também foram criados:
- uma conferência automática na nuvem, que move para Feito os cartões cujo PR foi mergeado;
- a skill `/sincronizar-quadro` (PR #7, já mergeado na `dev`);
- três tarefas novas de design.

A `trabalho/alexsant22` foi atualizada com a `dev` depois do merge do PR #7, sem commit de merge.

## Decisões tomadas
- **O quadro é um artefato do claude.ai com banco de dados, não um arquivo do repositório.** Assim as mudanças de um aparecem para o outro na hora, e o Claude consegue ler e gravar as tarefas. Descartado: página com `localStorage`, que não compartilha nada entre os dois.
- **O quadro começou com as 25 tarefas do plano** (A1, L1, A2, L2, V, R1, as páginas, os checklists e a entrega), com responsável, prazo, fase e dependências tiradas do plano. Exemplos de dependência: o L2 espera o A1 porque o `inicio.js` usa o `buscarComCache`, e o A2 espera o merge do L1.
- **A conferência automática só move cartões de PR mergeado.**
  - Ela roda às 09h, 13h, 17h e 21h (rotina `trig_01F8kZeNbjsDZFst1jBLRpge`). Cada cartão tem o campo "Nº do PR no GitHub", e o cartão em "PR aberto" sem número fica com o selo "sem nº do PR" e não é movido.
  - Descartado: mover para Feito todo cartão em "PR aberto", mesmo sem merge.
- **A rotina só lê o GitHub.** Nunca faz commit, push, PR ou merge, seguindo as regras do `CLAUDE.md`.
- **Skill `.claude/skills/sincronizar-quadro/SKILL.md`:** faz a mesma conferência na hora. Ela só roda quando alguém digita o comando, como a `atualizar-branch`.
- **Visual:** a dupla testou um visual azul com um cartão por fase no topo. Voltou para o vermelho-sangue (Space Grotesk e Inter) com o cabeçalho dos quatro números, mantendo o painel de conferência, as seções recolhíveis e os filtros.
- **Tarefas de design novas:**
  - D7 "Nome do site e paleta de cores": Dupla, 18/11;
  - "Design das páginas: tipografia, cards, modal e menu": Dupla, 20/11;
  - "Logo e favicon": Liliane, 20/11.

  Com elas, o L1 passou a depender da paleta e do logo, e o L2 do design, porque o `style.css` e as imagens dependem das cores (decisão D7 do plano: tema escuro com vermelho-sangue).
- **Ordem do Roadmap:** sai das dependências e, entre as tarefas livres ao mesmo tempo, do prazo mais cedo. Cada tarefa tem um campo "por quê", editável no cartão.
- **"Em conjunto":** tarefas na mesma onda de dependências (nenhuma depende da outra) e com prazos a até 3 dias de distância. Elas ficam no mesmo passo da linha do tempo. Descartado: juntar qualquer tarefa sem dependência entre si, o que sugeriria, por exemplo, os slides junto com o A1.
- **Layout do Roadmap:** linha do tempo horizontal no estilo de um infográfico, com os passos alternando acima e abaixo da linha. Cada tarefa mostra só o nome, o responsável, a situação e o botão "Ver no quadro". O "por quê" aparece num painel ao clicar no nome. Descartados: a lista vertical, a grade de dias com faixas por pessoa e o texto do "por quê" dentro de cada item.
- **Compartilhamento com a Liliane:** convite pelo e-mail dela, como Editor, sem link público. O link público tiraria a edição de quem está fora da organização.
- **Guia para outros projetos:** o guia de como montar o quadro com roadmap ficou em `Documents/guia-quadro-roadmap/`, fora deste repositório, porque é para outro projeto.

## Erros e rejeições da IA
- **Caracteres invisíveis na faixa de acentos:** a sequência de escape usada na regex de acentos, a do `normalizarTexto`, foi gravada como os próprios caracteres de acento, que não aparecem na tela.
  - Aconteceu na página do quadro e no cartão "Ensaio da apresentação", duas vezes, o mesmo problema que o plano já tinha registrado para o `busca.js`.
  - Foi percebido com `grep` no arquivo e lendo o cartão no banco.
  - Corrigido montando a faixa com `String.fromCharCode` no código e escrevendo "U+0300 a U+036F" no texto do cartão.
- **Visual azul rejeitado:** a dupla pediu para voltar ao tema vermelho e ao cabeçalho anterior.
- **O Roadmap foi refeito três vezes:**
  - a lista vertical foi trocada por uma linha do tempo horizontal;
  - a grade de dias com faixas por pessoa foi trocada pelo modelo de infográfico enviado pelo Alexandre;
  - o texto do "por quê" saiu dos itens, que ganharam o botão "Ver no quadro".

## Pendências
- **Teste da conferência automática:** o cartão "Skill sincronizar-quadro" (PR #7, já mergeado) foi deixado em "PR aberto" para a conferência das 21h movê-lo. Falta confirmar que ela moveu, porque é o primeiro teste da parte que consulta o GitHub. Se não tiver movido, olhar o registro da rotina.
- **Liliane:**
  - conferir se consegue mover cartões, ou se aparece o aviso de modo de leitura;
  - rodar `/atualizar-branch` para receber a skill.
- **Rotina:**
  - recebeu todos os conectores da conta (Gmail, Drive etc.), que ela não usa, e ainda não foram removidos;
  - não tem data para acabar: desativar depois de 08/12.
- **Ainda pendente de antes:** trocar `<usuario-da-liliane>` por `lilianeperim-ifsp` no `docs/plano.md`, no PR do A1.
- **Professor:** confirmar se a página inicial pode existir (D1). No quadro, essa confirmação está marcada como em conjunto com a Vercel, em 24/11.

## Próximos passos
- **Alexandre, manhã de 18/11:**
  - A1 (`js/cache.js` + `js/api.js`), que está com prazo vencido no quadro;
  - a paleta de cores com a Liliane (D7).
- **Liliane:** L1, que agora espera a paleta e o logo.
- **Ao abrir cada PR:** mover o cartão para "PR aberto" e preencher o número do PR, para a conferência levar o cartão para Feito depois do merge.
