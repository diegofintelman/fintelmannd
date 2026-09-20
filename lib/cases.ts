/**
 * Os cases.
 *
 * Texto migrado integralmente de `/trafego` do site antigo, que é o melhor
 * conteúdo que existia: contexto → estratégia → leitura de resultados →
 * evidência visual, com print real do gerenciador e sem uma métrica inventada.
 *
 * REGRA DURA: nenhum número entra aqui sem print correspondente e sem
 * autorização do cliente. "Leitura de resultados" é leitura — inclui o que não
 * funcionou. Um case que diz "ainda está em validação" vale mais que dez que
 * dizem "+300%".
 */

export type CaseStudy = {
  slug: string;
  title: string;
  /** Rótulo curto de catálogo. Fato, não pitch. */
  segmento: string;
  canal: string;
  objetivo: string;
  /** Resumo de uma linha, para listagem e meta description. */
  resumo: string;
  contexto: string;
  estrategia: string;
  leitura: string;
  aprendizado: string;
  imagens: { src: string; alt: string; legenda: string }[];
};

export const cases: CaseStudy[] = [
  {
    slug: "clinica-de-estetica",
    title: "Clínica de estética",
    segmento: "Negócio local",
    canal: "Meta Ads",
    objetivo: "Contatos por WhatsApp",
    resumo:
      "Campanha de mensagens superou engajamento puro, e público por interesse específico bateu segmentação ampla.",
    contexto:
      "Clínica de estética com foco em procedimentos locais. O objetivo era aumentar visibilidade e gerar contatos por WhatsApp, com orçamento limitado e necessidade de retorno rápido em agendamentos.",
    estrategia:
      "Campanhas de engajamento e de mensagens para WhatsApp, com segmentação geográfica. Criativos focados em resultado visual dos procedimentos e em ofertas sazonais. Testes de público por interesse e lookalike de clientes.",
    leitura:
      "A campanha de mensagens teve performance melhor que a de engajamento puro. Públicos por interesse específico — estética, beleza — performaram melhor que segmentação ampla.",
    aprendizado:
      "Criativo que mostra transformação real carrega a campanha. Quando o criativo não mostra o resultado do procedimento, nenhuma segmentação salva o custo por conversa.",
    imagens: [
      {
        src: "/cases/case-clinica.png",
        alt: "Gerenciador de Anúncios da Meta mostrando o desempenho comparado das campanhas de mensagem e de engajamento da clínica de estética",
        legenda: "Gerenciador de Anúncios — comparação entre os objetivos de campanha.",
      },
    ],
  },
  {
    slug: "mentoria-de-carreiras",
    title: "Mentoria de carreiras",
    segmento: "Infoproduto",
    canal: "Meta Ads",
    objetivo: "Geração de leads",
    resumo:
      "Lead de formulário nativo saiu mais barato, com qualificação variável. A clareza da oferta no criativo decidiu o resto.",
    contexto:
      "Mentoria individual para profissionais em transição de carreira. Produto de ticket médio, vendido por call de vendas. O objetivo era gerar lead qualificado para conversão posterior.",
    estrategia:
      "Campanhas de leads com formulário nativo da Meta. Tráfego para o perfil do Instagram para aquecimento. Criativos construídos sobre dores específicas do público — insatisfação profissional, busca por propósito.",
    leitura:
      "Leads do formulário nativo tiveram custo menor, mas qualificação variável. O tráfego para perfil ajudou no aquecimento, porém depende de conteúdo orgânico acontecendo em paralelo.",
    aprendizado:
      "A qualificação do lead depende muito mais da clareza da oferta no criativo do que do ajuste fino de público. Formulário fácil demais enche a lista de gente que não vai para a call.",
    imagens: [
      {
        src: "/cases/case-mentoria.png",
        alt: "Gerenciador de Anúncios da Meta com o custo por lead das campanhas da mentoria de carreiras",
        legenda: "Gerenciador de Anúncios — custo por lead por conjunto de anúncios.",
      },
    ],
  },
  {
    slug: "low-ticket-em-validacao",
    title: "Low ticket em validação",
    segmento: "Infoproduto",
    canal: "Meta Ads",
    objetivo: "Teste de product-market fit",
    resumo:
      "Projeto ainda em validação. Os dados servem para refinar a próxima iteração. Não para declarar sucesso.",
    contexto:
      "Produto digital de baixo valor em fase de teste. O projeto estava em validação, buscando entender product-market fit por meio de tráfego pago, com várias variações de criativo e público rodando ao mesmo tempo.",
    estrategia:
      "Estrutura de testes A/B com variação de headline, formato de criativo e público. Análise das métricas intermediárias — CTR, CPC, hook rate. Para identificar padrão antes de olhar para a conversão final.",
    leitura:
      "Criativos com gancho emocional tiveram CTR superior. Públicos mais nichados mostraram CPC mais alto, mas potencial de conversão maior.",
    aprendizado:
      "Este projeto ainda está em validação. Os dados servem para refinar a próxima iteração, não para declarar sucesso. Publicar um resultado agora seria inventar uma conclusão que o volume ainda não sustenta.",
    imagens: [
      {
        src: "/cases/case-lowticket-1.png",
        alt: "Gerenciador de Anúncios da Meta com as variações de criativo testadas no produto low ticket",
        legenda: "Gerenciador de Anúncios — variações de criativo em teste.",
      },
      {
        src: "/cases/case-lowticket-2.png",
        alt: "Gerenciador de Anúncios da Meta com as métricas intermediárias de CTR e CPC por conjunto",
        legenda: "Métricas intermediárias por conjunto: CTR, CPC e hook rate.",
      },
    ],
  },
  {
    slug: "material-para-concurso",
    title: "Material para concurso público",
    segmento: "Infoproduto",
    canal: "Meta Ads",
    objetivo: "Venda direta",
    resumo:
      "A análise de funil encontrou o gargalo no checkout. O problema não era tráfego. Era a página de vendas.",
    contexto:
      "Produto digital de material de estudo para concurso público. O objetivo principal era venda direta pela página de vendas, com foco secundário em crescimento de base e visibilidade.",
    estrategia:
      "Campanhas de purchase otimizadas para conversão. Análise completa de funil: visualização de página, início de checkout, compra. Criativos que comunicam autoridade e resultado de aprovados.",
    leitura:
      "A análise de funil revelou gargalo no checkout — foram necessários ajustes na página de vendas, além do trabalho de tráfego. Públicos de retargeting, formados por quem já tinha visitado o site, tiveram ROAS superior.",
    aprendizado:
      "Tráfego e página de vendas precisam trabalhar juntos. Sem a leitura do funil inteiro, o diagnóstico teria sido 'a campanha não converte', e o dinheiro teria ido para mais tráfego em cima do mesmo gargalo.",
    imagens: [
      {
        src: "/cases/case-revisalei-1.png",
        alt: "Gerenciador de Anúncios da Meta com o desempenho das campanhas de conversão",
        legenda: "Gerenciador de Anúncios — campanhas otimizadas para compra.",
      },
      {
        src: "/cases/case-revisalei-2.png",
        alt: "Análise de funil mostrando a queda entre início de checkout e compra",
        legenda: "Funil: visualização de página, início de checkout e compra.",
      },
    ],
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
