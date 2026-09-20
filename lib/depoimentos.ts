/**
 * Depoimentos.
 *
 * REGRA DURA: só entra aqui o que foi lido na fonte original, com link. Nada
 * de depoimento sem origem verificável.
 *
 * Os três abaixo foram lidos por mim direto no perfil do Google Meu Negócio da
 * Fintelman em 20/09/2026, com o texto integral conferido. O perfil tem 12
 * avaliações e nota 5,0; entram aqui só as três que dizem alguma coisa.
 *
 * Deliberadamente FORA:
 *  - "marcos pinezi" e as demais: genéricas ("Excelente profissional, serviço
 *    de qualidade, recomendo") ou sem texto. Estrela sem argumento não
 *    convence decisor B2B e só dilui as que têm conteúdo.
 *  - A avaliação do próprio Diego no perfil da empresa.
 *  - "Marcos Oliveira" e "Juliana Santos", que constavam do site antigo: NÃO
 *    EXISTEM no perfil real. Eram fabricadas, como as de `Results.tsx`.
 */

export type Depoimento = {
  nome: string;
  /** Cargo e empresa. Só preencher quando confirmado com a pessoa. */
  papel?: string;
  texto: string;
  fonte: "Google";
  /** Link para a avaliação original. Sem link, não publica. */
  link: string;
  quando: string;
  /** Sinal de credibilidade do avaliador, quando houver. */
  contexto?: string;
};

export const depoimentos: Depoimento[] = [
  {
    nome: "Gilberto Júnior",
    // CONFIRMAR COM ELE ANTES DE PUBLICAR: o cargo foi informado por Diego,
    // não está escrito na avaliação. Ver docs/PENDENCIAS.md.
    papel: "Head de Projetos, O Novo Mercado",
    texto:
      "Trabalhei com o Diego em vários projetos ao longo de dois anos e o trabalho sempre foi impecável. O Diego sempre teve um envolvimento muito além de tráfego pago e nos ajudou muito na construção da estratégia em demais esferas. Eu o indicaria em qualquer ocasião, e dou a minha palavra por isso.",
    fonte: "Google",
    link: "https://www.google.com/maps/search/Fintelman+Neg%C3%B3cios+Digitais+Tatu%C3%AD",
    quando: "2026",
    contexto: "Local Guide, 89 avaliações",
  },
  {
    nome: "Thaís Coelho",
    texto:
      "Tive ótima experiência, o Diego é expert em tráfego e fez um excelente trabalho com meu low ticket, além disso foi sempre solícito e fez uma página de vendas pra mim e várias sugestões de copy para anúncios que não faziam parte do serviço contratado. Recomendo a empresa dele para qualquer pessoa começando com seu projeto digital.",
    fonte: "Google",
    link: "https://www.google.com/maps/search/Fintelman+Neg%C3%B3cios+Digitais+Tatu%C3%AD",
    quando: "2026",
  },
  {
    nome: "Jean Sbrissa",
    texto:
      "Trabalho excelente. Profissional de altíssima qualidade, indico de olhos fechados. Alavancou demais meu trabalho e meus negócios. Parabéns pelo trabalho impecável.",
    fonte: "Google",
    link: "https://www.google.com/maps/search/Fintelman+Neg%C3%B3cios+Digitais+Tatu%C3%AD",
    quando: "2024",
  },
];

/**
 * Nota sobre schema: NÃO emitir `aggregateRating` a partir destes dados.
 * A nota 5,0 é do perfil do Google, não de uma base de avaliações do site;
 * declará-la como se fosse do site é exatamente o tipo de coisa que rende
 * ação manual do Google.
 */
