/**
 * O método — oito etapas.
 *
 * É a página comercialmente mais importante do projeto: é o que separa a
 * operação de um prestador de serviço isolado. O número da etapa importa,
 * porque a ordem é o argumento.
 */

export type Etapa = {
  n: string;
  nome: string;
  pergunta: string;
  descricao: string;
  /** O que existe de concreto ao fim da etapa. */
  entrega: string;
};

export const etapas: Etapa[] = [
  {
    n: "01",
    nome: "Estratégia",
    pergunta: "Quem precisa comprar, e por quê agora?",
    descricao:
      "Antes de escolher canal, define-se quem é o cliente que vale a pena, qual é o ciclo de decisão dele e o que ele precisa acreditar para avançar. Sem isso, toda campanha vira teste sem hipótese.",
    entrega: "Público, ciclo de compra e hipótese comercial escritos.",
  },
  {
    n: "02",
    nome: "Oferta",
    pergunta: "O que exatamente está sendo oferecido?",
    descricao:
      "A maior parte do que se chama de problema de tráfego é problema de oferta. Se o que está na mesa não é claro, o anúncio só faz mais gente descobrir que não está claro.",
    entrega: "Oferta, promessa e condições descritas em uma página.",
  },
  {
    n: "03",
    nome: "Presença digital",
    pergunta: "O que a empresa é quando alguém procura por ela?",
    descricao:
      "Site, páginas de serviço, perfil no Google, conteúdo indexável. É o que existe quando o anúncio está pausado, e é o que decide se um lead vindo de indicação fecha ou desiste.",
    entrega: "Site e páginas que sustentam a oferta sem depender de anúncio.",
  },
  {
    n: "04",
    nome: "Aquisição",
    pergunta: "Como a demanda chega?",
    descricao:
      "Aqui entram tráfego pago, busca e distribuição de conteúdo. É a etapa mais visível e a mais superestimada: ela amplifica o que já existe, não corrige o que falta.",
    entrega: "Campanhas rodando com hipótese, verba e critério de corte.",
  },
  {
    n: "05",
    nome: "Conversão",
    pergunta: "O que acontece depois do clique?",
    descricao:
      "Página de destino, formulário, WhatsApp, tempo de resposta. É onde a maior parte do investimento em mídia evapora, e é a etapa que quase nenhum fornecedor de tráfego considera responsabilidade sua.",
    entrega: "Caminho de conversão definido, testado e cronometrado.",
  },
  {
    n: "06",
    nome: "Relacionamento",
    pergunta: "E quem não comprou hoje?",
    descricao:
      "A maior parte do mercado não está pronta para comprar no dia em que vê o anúncio. Sem e-mail, remarketing e conteúdo próprio, esse contato é pago uma vez e perdido.",
    entrega: "Base própria e cadência de contato para quem não fechou ainda.",
  },
  {
    n: "07",
    nome: "Mensuração",
    pergunta: "Como se sabe o que funcionou?",
    descricao:
      "Tags, eventos, conversões nomeadas e documentadas. Sem isso, a decisão de onde investir no mês seguinte é feita por impressão, e a impressão costuma favorecer o canal mais barulhento, não o mais rentável.",
    entrega: "Eventos implementados e documentados, com conversão separada de microconversão.",
  },
  {
    n: "08",
    nome: "Otimização",
    pergunta: "O que muda no próximo ciclo?",
    descricao:
      "Leitura dos dados, corte do que não paga, reforço do que paga. É a etapa que só existe de verdade se a sétima foi feita, e é por isso que ela é a última.",
    entrega: "Decisão de alocação para o ciclo seguinte, com o porquê registrado.",
  },
];
