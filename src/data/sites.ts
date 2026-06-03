export type SiteCategory =
  | "Médico"
  | "Fisioterapia"
  | "Osteopatia / Quiropraxia"
  | "Pilates"
  | "Psicologia / Psiquiatria";

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
    nome: "Leonar Luis",
    categoria: "Médico",
    url: "https://drleonarmayer.grupov2w.com.br/",
    descricao: "Site médico estruturado para fortalecer presença digital e facilitar o contato.",
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
];

export const categories: ("Todos" | SiteCategory)[] = [
  "Todos",
  "Médico",
  "Fisioterapia",
  "Osteopatia / Quiropraxia",
  "Pilates",
  "Psicologia / Psiquiatria",
];
