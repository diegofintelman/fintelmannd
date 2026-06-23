Atualizar `src/data/sites.ts` com três mudanças pontuais:

## 1. Remover projeto
- Excluir o card "Leonar Luis" (drleonarmayer.grupov2w.com.br).

## 2. Adicionar dois novos projetos ao array `sites`
- **Kelly Belem** — categoria "Imóveis", URL https://kellybelem.com  
  "Site profissional para corretora de imóveis de alto padrão na Flórida, EUA, com foco em propriedades premium para compradores exigentes."
- **Consteell** — categoria "Construção Civil", URL https://constell.com.br  
  "Site institucional para empresa de estrutura metálica, telhados, calhas, rufos e fachadas com atendimento a obras residenciais, comerciais e industriais."

## 3. Atualizar filtros / tipos
- Estender o tipo `SiteCategory` adicionando `"Imóveis"` e `"Construção Civil"`.
- Adicionar essas duas entradas ao array `categories`, mantendo a ordem atual:  
  `Todos | Médico | Fisioterapia | Osteopatia / Quiropraxia | Pilates | Psicologia / Psiquiatria | Imóveis | Construção Civil`.

## Restrições
- Nenhuma outra alteração em cards, rotas, componentes ou estrutura. Os componentes que consomem `sites` e `categories` continuarão funcionando sem mudanças, já que apenas estendemos os dados.
