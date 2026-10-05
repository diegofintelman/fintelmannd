export type SiteCategory =
  | "Médico"
  | "Odontologia"
  | "Fisioterapia"
  | "Osteopatia / Quiropraxia"
  | "Pilates"
  | "Psicologia / Psiquiatria"
  | "Terapia Ocupacional"
  | "Veterinária"
  | "Imóveis"
  | "Construção Civil";

export interface SiteProject {
  nome: string;
  categoria: SiteCategory;
  url: string;
  descricao: string;
}

export const sites: SiteProject[] = [
  {
    nome: "Luiza Wilmsen",
    categoria: "Osteopatia / Quiropraxia",
    url: "https://draluizawwitt.grupov2w.com.br/",
    descricao: "Site profissional para apresentação de serviços em osteopatia e quiropraxia.",
  },
  {
    nome: "Eduardo Braz",
    categoria: "Médico",
    url: "https://lp.dreduardobraz.com.br/",
    descricao: "Landing page médica com foco em autoridade, clareza e apresentação premium.",
  },
  {
    nome: "Clínica Balen Odontologia",
    categoria: "Odontologia",
    url: "https://balenodontologia.com.br",
    descricao: "Site institucional otimizado com SEO e apresentação profissional da clínica e do profissional.",
  },
  {
    nome: "Lucas Hoffmann e Dennis",
    categoria: "Fisioterapia",
    url: "https://duofisio.grupov2w.com.br/",
    descricao: "Site para fisioterapia com apresentação clara dos serviços e posicionamento profissional.",
  },
  {
    nome: "Maria da Conceição",
    categoria: "Pilates",
    url: "https://studiocrpilates.grupov2w.com.br/",
    descricao: "Site para estúdio de pilates com foco em apresentação, confiança e contato.",
  },
  {
    nome: "Leticia Motta - Brilliance",
    categoria: "Médico",
    url: "https://brilliancedermatologia.grupov2w.com.br/",
    descricao: "Site para clínica dermatológica com estética profissional e navegação objetiva.",
  },
  {
    nome: "Juliana Albano",
    categoria: "Médico",
    url: "https://julianaalbanooftalmo.grupov2w.com.br/",
    descricao: "Site médico voltado para oftalmologia, com comunicação clara e visual institucional.",
  },
  {
    nome: "Renata Alves Gomes",
    categoria: "Psicologia / Psiquiatria",
    url: "https://psicologarenatagomes.grupov2w.com.br/",
    descricao: "Site profissional para apresentação de atendimento psicológico/psiquiátrico.",
  },
  {
    nome: "Nélio e Cristiane",
    categoria: "Médico",
    url: "https://institutoidepe.grupov2w.com.br/",
    descricao: "Site institucional médico com foco em estrutura, especialidades e autoridade.",
  },
  {
    nome: "Felipe Esdras",
    categoria: "Fisioterapia",
    url: "https://felipeesdrasfisio.grupov2w.com.br/",
    descricao: "Site para fisioterapeuta com apresentação profissional dos serviços.",
  },
  {
    nome: "Júlio Sol",
    categoria: "Médico",
    url: "https://drjuliosol.grupov2w.com.br/",
    descricao: "Site médico com foco em presença digital, credibilidade e contato direto.",
  },
  {
    nome: "Irineu Caixeta",
    categoria: "Pilates",
    url: "https://studiopilatesbrasilia.grupov2w.com.br/",
    descricao: "Site para estúdio de pilates com apresentação institucional e visual limpo.",
  },
  {
    nome: "Felipe Trindade",
    categoria: "Fisioterapia",
    url: "https://clinicatrindade.grupov2w.com.br/",
    descricao: "Site para clínica de fisioterapia com estrutura objetiva e profissional.",
  },
  {
    nome: "Thaiane Lage",
    categoria: "Médico",
    url: "https://thaianelage.grupov2w.com.br/",
    descricao: "Site médico com comunicação profissional, responsiva e orientada ao contato.",
  },
  {
    nome: "Caroline Segalin",
    categoria: "Osteopatia / Quiropraxia",
    url: "https://carolinesegalin.grupov2w.com.br/",
    descricao: "Site profissional para osteopatia/quiropraxia com foco em autoridade e atendimento.",
  },
  {
    nome: "Instituto Shiwa",
    categoria: "Fisioterapia",
    url: "https://institutoshiwa.grupov2w.com.br/",
    descricao: "Site para centro de saúde integrada em Guarulhos, com fisioterapia, odontologia, pilates terapêutico e cuidado da apneia do sono.",
  },
  {
    nome: "Nigel Coriolano",
    categoria: "Fisioterapia",
    url: "https://drnigelcoriolano.grupov2w.com.br/",
    descricao: "Landing page para fisioterapeuta especialista em coluna e dor crônica, com método de tratamento e agendamento direto.",
  },
  {
    nome: "João Paulo Ribeiro",
    categoria: "Osteopatia / Quiropraxia",
    url: "https://joaopauloribeiro.grupov2w.com.br/",
    descricao: "Site premium de quiropraxia, massoterapia e acupuntura em Petrópolis/RJ, com foco em agendamento pelo WhatsApp.",
  },
  {
    nome: "Melissa Toyonaga",
    categoria: "Pilates",
    url: "https://pilatesmelissa.grupov2w.com.br/",
    descricao: "Site para instituto de fisioterapia e pilates terapêutico especializado em dor nas costas e escoliose.",
  },
  {
    nome: "Stael Andrade",
    categoria: "Médico",
    url: "https://drastaelandrade.grupov2w.com.br/",
    descricao: "Landing page para dermatologista estética com foco em resultados naturais e agendamento via WhatsApp.",
  },
  {
    nome: "Daiane Flores",
    categoria: "Osteopatia / Quiropraxia",
    url: "https://daianeflores.grupov2w.com.br/",
    descricao: "Site institucional para osteopatia, pilates, fisioterapia e harmonização facial, com apresentação premium da profissional.",
  },
  {
    nome: "Renata Santos",
    categoria: "Fisioterapia",
    url: "https://renatasantosfisio.grupov2w.com.br/",
    descricao: "Site para fisioterapeuta com atendimento domiciliar em São Paulo nas áreas neurológica, ortopédica e geriátrica.",
  },
  {
    nome: "Pronto Kids",
    categoria: "Médico",
    url: "https://prontokids.grupov2w.com.br/",
    descricao: "Site para pronto atendimento pediátrico e especialidades infantis em Porto Alegre, com caminhos claros para contato.",
  },
  {
    nome: "Centro da Coluna",
    categoria: "Osteopatia / Quiropraxia",
    url: "https://centrodacoluna.grupov2w.com.br/",
    descricao: "Landing page para clínica de quiropraxia em Itajaí/SC, com visual sofisticado e conversão direta pelo WhatsApp.",
  },
  {
    nome: "Espaço Base",
    categoria: "Pilates",
    url: "https://espacobase.grupov2w.com.br/",
    descricao: "Site institucional para estúdio de pilates e fisioterapia em Piracicaba/SP, com design editorial e minimalista.",
  },
  {
    nome: "Aline Paz",
    categoria: "Terapia Ocupacional",
    url: "https://alinepaz.grupov2w.com.br/",
    descricao: "Site para terapeuta ocupacional especializada em terapia da mão e membro superior, em Santo André/SP.",
  },
  {
    nome: "Flexus Fitness",
    categoria: "Pilates",
    url: "https://flexusfitness.grupov2w.com.br/",
    descricao: "Landing page premium para centro de pilates, treino de força e programas híbridos em pequenos grupos.",
  },
  {
    nome: "DorCare Salvino",
    categoria: "Fisioterapia",
    url: "https://dorcaresalvino.grupov2w.com.br/",
    descricao: "Site para fisioterapeuta especialista em dor, com avaliação individualizada, depoimentos em vídeo e SEO local.",
  },
  {
    nome: "Coluna + Saúde",
    categoria: "Osteopatia / Quiropraxia",
    url: "https://colunamaissaude.grupov2w.com.br/",
    descricao: "Landing page para quiropraxista em Santana da Vargem, com foco em avaliação individualizada e contato direto.",
  },
  {
    nome: "Clínica Mathitha",
    categoria: "Fisioterapia",
    url: "https://mathithafisio.grupov2w.com.br/",
    descricao: "Site para clínica de fisioterapia, pilates e treino funcional no Campeche, com turmas reduzidas e método próprio.",
  },
  {
    nome: "Reab Animal",
    categoria: "Veterinária",
    url: "https://reabanimal.grupov2w.com.br/",
    descricao: "Site para fisioterapia e reabilitação veterinária de cães e gatos em São Paulo, conduzida por médicas-veterinárias.",
  },
  {
    nome: "Jean-Pierre",
    categoria: "Fisioterapia",
    url: "https://jeanpierrefisio.grupov2w.com.br/",
    descricao: "Site para fisioterapeuta especialista em coluna em Cuiabá, com foco em hérnia de disco e dores agudas ou crônicas.",
  },
  {
    nome: "Clínica Cristina Linhares",
    categoria: "Psicologia / Psiquiatria",
    url: "https://cristinalinhares.grupov2w.com.br/",
    descricao: "Site para clínica de psicologia e psiquiatria em Salvador, com atendimento presencial e online.",
  },
  {
    nome: "Kelly Belem",
    categoria: "Imóveis",
    url: "https://kellybelem.com",
    descricao: "Site profissional para corretora de imóveis de alto padrão na Flórida, EUA, com foco em propriedades premium para compradores exigentes.",
  },
  {
    nome: "Consteell",
    categoria: "Construção Civil",
    url: "https://constell.com.br",
    descricao: "Site institucional para empresa de estrutura metálica, telhados, calhas, rufos e fachadas com atendimento a obras residenciais, comerciais e industriais.",
  },
];

export const categories: ("Todos" | SiteCategory)[] = [
  "Todos",
  "Médico",
  "Odontologia",
  "Fisioterapia",
  "Osteopatia / Quiropraxia",
  "Pilates",
  "Psicologia / Psiquiatria",
  "Terapia Ocupacional",
  "Veterinária",
  "Imóveis",
  "Construção Civil",
];
