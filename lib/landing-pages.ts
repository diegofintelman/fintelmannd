/**
 * Sistema de landing pages.
 *
 * O relatório pede "criação rápida de LPs para campanhas, com componentes
 * reutilizáveis, não código duplicado". Aqui uma LP é um objeto de dados: a
 * rota `/lp/[slug]` monta os blocos na ordem declarada. Criar uma LP nova é
 * acrescentar um item a este arquivo. Não copiar uma página.
 *
 * Nem toda LP precisa de todos os blocos. Blocos ausentes simplesmente não
 * renderizam.
 */

export type Bloco =
  | { tipo: "problema"; titulo: string; itens: { titulo: string; texto: string }[] }
  | { tipo: "solucao"; titulo: string; texto: string; itens: string[] }
  | { tipo: "processo"; titulo: string; passos: { titulo: string; texto: string }[] }
  | { tipo: "prova"; titulo: string; caseSlugs: string[] }
  | { tipo: "faq"; titulo: string; perguntas: { p: string; r: string }[] };

export type LandingPage = {
  slug: string;
  /** Título interno, para o time. Não aparece na página. */
  campanha: string;
  headline: string;
  subheadline: string;
  /** Rótulo do CTA. Um por LP, usado em todos os pontos da página. */
  ctaLabel: string;
  /** Contexto que viaja na mensagem do WhatsApp e no dataLayer. */
  origem: string;
  metaTitle: string;
  metaDescription: string;
  /**
   * LP de campanha fria costuma ficar fora do índice para não competir com a
   * página de serviço pelo mesmo termo. LP que também recebe orgânico entra.
   */
  indexavel: boolean;
  blocos: Bloco[];
};

export const landingPages: LandingPage[] = [
  {
    slug: "estrutura-digital",
    campanha: "Meta Ads · público frio B2B · estrutura",
    headline: "Antes de aumentar a verba, vale saber onde o dinheiro está vazando",
    subheadline:
      "Um diagnóstico de 30 a 40 minutos sobre o que já existe no seu digital: página, campanha, medição e o caminho que o lead percorre depois do clique.",
    ctaLabel: "Pedir diagnóstico",
    origem: "lp-estrutura-digital",
    metaTitle: "Diagnóstico de estrutura digital para empresas",
    metaDescription:
      "Onde o investimento em mídia está vazando: página, oferta, medição e o caminho do lead depois do clique. Diagnóstico de 30 a 40 minutos.",
    indexavel: false,
    blocos: [
      {
        tipo: "problema",
        titulo: "Os sintomas costumam ser estes",
        itens: [
          {
            titulo: "O custo por lead subiu e ninguém sabe dizer por quê",
            texto:
              "Sem leitura do funil inteiro, a única alavanca visível é a verba, e ela é a mais cara.",
          },
          {
            titulo: "O relatório mostra conversão que o comercial não viu chegar",
            texto:
              "Evento disparando em pageview, conversão contada duas vezes, ou lead que nunca foi repassado.",
          },
          {
            titulo: "A campanha manda para a home",
            texto:
              "O anúncio fez uma promessa específica e a página responde com um menu de seis itens.",
          },
        ],
      },
      {
        tipo: "solucao",
        titulo: "O que o diagnóstico cobre",
        texto:
          "Não é uma auditoria de 40 páginas. É uma conversa com a tela compartilhada, olhando o que já existe, e uma ordem do que fazer primeiro.",
        itens: [
          "O caminho do lead, do anúncio até a resposta comercial",
          "A página de destino: se ela responde à promessa do anúncio",
          "A medição: o que está sendo contado como conversão, e se confere",
          "O que dá para resolver sem gastar mais em mídia",
          "A ordem do que fazer, com o que é obrigatório separado do que é melhoria",
        ],
      },
      {
        tipo: "prova",
        titulo: "Como eu leio um funil na prática",
        caseSlugs: ["material-para-concurso", "low-ticket-em-validacao"],
      },
      {
        tipo: "faq",
        titulo: "Antes de você perguntar",
        perguntas: [
          {
            p: "O diagnóstico é cobrado?",
            r: "Não. É uma conversa. Se ao fim dela fizer sentido trabalharmos juntos, eu envio proposta; se não fizer, eu digo isso na própria conversa.",
          },
          {
            p: "Preciso dar acesso às minhas contas antes?",
            r: "Não antes. Na conversa, compartilhar a tela do Gerenciador e do Analytics ajuda muito, mas dá para fazer sem.",
          },
          {
            p: "Vocês atendem fora de Tatuí?",
            r: "Sim. A operação é remota e atende clientes em todo o Brasil.",
          },
          {
            p: "E se o meu problema não for tráfego?",
            r: "Melhor ainda: é exatamente o que o diagnóstico serve para descobrir. Se não for o meu escopo, eu digo, e quando possível indico quem faz.",
          },
        ],
      },
    ],
  },
  {
    slug: "trackeamento",
    campanha: "Meta Ads + Google Ads · público quente · mensuração",
    headline: "Se a conversão não está no relatório, a decisão do mês que vem é chute",
    subheadline:
      "Implantação de medição para quem já investe em mídia: GTM, GA4, Pixel e conversões nomeadas, com documentação do que cada evento significa.",
    ctaLabel: "Pedir diagnóstico",
    origem: "lp-trackeamento",
    metaTitle: "Implantação de trackeamento: GTM, GA4 e Pixel",
    metaDescription:
      "Eventos nomeados, conversão separada de microconversão e documentação do que cada número significa. Para quem já investe em mídia e não confia no relatório.",
    indexavel: true,
    blocos: [
      {
        tipo: "problema",
        titulo: "Sinais de que a medição está quebrada",
        itens: [
          {
            titulo: "O número da plataforma não bate com o do Analytics",
            texto:
              "E nenhum dos dois bate com o que o comercial recebeu. Normalmente é janela de atribuição, evento duplicado, ou os três medindo coisas diferentes.",
          },
          {
            titulo: "Tudo é conversão",
            texto:
              "Clique em WhatsApp, visita à página de preço e envio de formulário contados juntos. O resultado é um número grande que não serve para decidir nada.",
          },
          {
            titulo: "Ninguém sabe dizer o que o evento significa",
            texto:
              "Um container com quarenta tags e nenhuma documentação é um sistema que só a pessoa que saiu da empresa entendia.",
          },
        ],
      },
      {
        tipo: "processo",
        titulo: "Como é feito",
        passos: [
          {
            titulo: "Auditoria do que já existe",
            texto:
              "Antes de instalar qualquer tag nova, o que está no ar é mapeado. Tag duplicada é mais comum que tag faltando.",
          },
          {
            titulo: "Plano de medição escrito",
            texto:
              "Lista de eventos, com nome, quando dispara e se é conversão ou microconversão. O plano vem antes do código.",
          },
          {
            titulo: "Implantação",
            texto:
              "GTM, GA4, Pixel e conversões de Google Ads. Server-side quando o caso justifica.",
          },
          {
            titulo: "Validação e documentação",
            texto:
              "Cada evento é testado disparando de verdade. A documentação fica com você, não comigo.",
          },
        ],
      },
      {
        tipo: "faq",
        titulo: "Antes de você perguntar",
        perguntas: [
          {
            p: "Vocês mexem no meu container atual ou criam um novo?",
            r: "Depende do estado dele. Se houver estrutura aproveitável, é ajustada. Recriar do zero só quando reorganizar custa mais que refazer, e nesse caso eu mostro o porquê antes.",
          },
          {
            p: "Isso inclui server-side?",
            r: "Inclui quando o caso justifica. Server-side resolve perda de sinal por bloqueio de navegador, mas tem custo de infraestrutura; não é resposta automática.",
          },
          {
            p: "Preciso ter tráfego rodando para contratar?",
            r: "Não, e instalar a medição antes de ligar a verba é a ordem correta. Ligar mídia sem medição é pagar para não saber.",
          },
        ],
      },
    ],
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((lp) => lp.slug === slug);
}
