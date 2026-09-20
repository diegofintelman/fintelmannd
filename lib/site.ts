/**
 * Fonte única de verdade para dados do negócio.
 *
 * Nada de telefone, e-mail ou URL escrito à mão dentro de componente. Se um
 * dado aparece em duas páginas, ele mora aqui.
 */

export const site = {
  name: "Fintelman Negócios Digitais",
  shortName: "Fintelman ND",
  person: "Diego Fintelman",

  /**
   * Canônico com `www`. O apex responde 307 para cá — verificado em produção
   * em 19/09/2026. Trocar isto sem trocar o DNS quebra o sitemap.
   */
  url: "https://www.fintelmannd.com.br",

  locale: "pt-BR",
  region: "Tatuí, SP",

  /**
   * Dados cadastrais, para as páginas legais.
   *
   * O CNPJ foi localizado em consulta pública e **confere com a cidade**:
   * registro em Tatuí/SP, aberto em 11/12/2023, situação ativa. Havia um
   * segundo CNPJ no mesmo nome, em Votorantim/SP — descartado justamente por
   * não bater com a cidade informada por Diego.
   *
   * ⚠️ Confirme antes de publicar as políticas: é dado que entra em peça
   * jurídica. Ver docs/PENDENCIAS.md.
   */
  cadastro: {
    razaoSocial: "53.163.894 Diego Fintelman de Souza",
    cnpj: "53.163.894/0001-05",
    cidade: "Tatuí",
    uf: "SP",
  },

  tagline: "Estrutura digital para aquisição, autoridade e crescimento",

  description:
    "Diego Fintelman constrói a estrutura digital que transforma atenção em oportunidade comercial: sites, landing pages, tráfego pago, criativos e trackeamento desenhados como um sistema só.",

  contact: {
    /** Confirmado por Diego em 19/09/2026: o domínio correto é o do próprio
     *  site, com dois "n". O site antigo exibia @fintelman.com.br, que estava
     *  errado e mandava resposta de cliente para um domínio inexistente. */
    email: "contato@fintelmannd.com.br",
    whatsapp: "5515997820279",
    whatsappDisplay: "(15) 99782-0279",

    /**
     * Perfil informado por Diego e verificado como **público** em 20/09/2026:
     * 575 seguidores, bio e posts visíveis, com link de volta para o site.
     *
     * Atenção ao que eu havia testado antes e estava errado: @diegofintelman
     * (sem ponto) e @fintelmannd são outros perfis, ambos privados. O correto
     * leva ponto.
     *
     * Deixar `null` aqui remove o link do colofão, da página de contato e do
     * `sameAs` do schema, tudo de uma vez.
     */
    instagram: "https://www.instagram.com/diego.fintelman/" as string | null,
    instagramHandle: "@diego.fintelman",
  },

  /** Um rótulo por intenção. Não existe "Fale conosco" numa seção e
   *  "Solicite um orçamento" na outra. */
  cta: {
    label: "Pedir diagnóstico",
    href: "/diagnostico",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const services: NavItem[] = [
  {
    label: "Tráfego pago",
    href: "/servicos/trafego-pago",
    description: "Meta Ads e Google Ads conectados a oferta, página e mensuração.",
  },
  {
    label: "Sites e landing pages",
    href: "/servicos/sites-e-landing-pages",
    description: "Páginas que cumprem uma função no processo de aquisição.",
  },
  {
    label: "Trackeamento e dados",
    href: "/servicos/trackeamento-e-dados",
    description: "GTM, GA4, Pixel e server-side. Saber o que aconteceu depois do clique.",
  },
  {
    label: "Criativos",
    href: "/servicos/criativos",
    description: "Ângulos, ganchos e variações desenhados por etapa de funil.",
  },
  {
    label: "Google Meu Negócio",
    href: "/servicos/google-meu-negocio",
    description: "Visibilidade local para quem depende de ser encontrado na região.",
  },
];

export const mainNav: NavItem[] = [
  { label: "Serviços", href: "/servicos" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Resultados", href: "/cases" },
  { label: "Método", href: "/estrutura-digital" },
  { label: "Para agências", href: "/para-agencias" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
];

/**
 * Produto de entrada, com tratamento visual próprio no menu.
 *
 * Fica separado de `mainNav` porque não é navegação institucional: é oferta.
 * Misturar os dois na mesma lista faz o item sumir entre os vizinhos.
 */
export const produtoNav: NavItem = {
  label: "Presença Digital",
  href: "/presenca-digital-lucrativa",
  description: "Curso de entrada para colocar o negócio no mapa digital da cidade.",
};

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Serviços",
    items: services,
  },
  {
    title: "Navegação",
    items: [
      { label: "Portfólio de sites", href: "/portfolio" },
      { label: "Resultados", href: "/cases" },
      { label: "Método", href: "/estrutura-digital" },
      { label: "Para agências", href: "/para-agencias" },
      { label: "Presença Digital", href: "/presenca-digital-lucrativa" },
      { label: "Blog", href: "/blog" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Política de privacidade", href: "/politica-de-privacidade" },
      { label: "Política de cookies", href: "/politica-de-cookies" },
    ],
  },
];
