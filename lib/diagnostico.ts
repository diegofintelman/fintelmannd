import { z } from "zod";

/**
 * Contrato do formulário de diagnóstico, compartilhado entre cliente e
 * servidor.
 *
 * Vive fora do componente de propósito: a rota de API valida com exatamente o
 * mesmo esquema. Validação só no cliente não é validação, é conveniência de
 * interface.
 */

export const momentos = [
  "Ainda não invisto em mídia",
  "Invisto, mas não sei medir o retorno",
  "Invisto e meço, quero escalar",
  "Tenho campanhas rodando e o resultado caiu",
  "Sou agência e quero um parceiro de execução",
] as const;

export const investimentos = [
  "Ainda não invisto",
  "Até R$ 2 mil por mês",
  "De R$ 2 mil a R$ 10 mil por mês",
  "Acima de R$ 10 mil por mês",
  "Prefiro falar sobre isso na conversa",
] as const;

export const diagnosticoSchema = z.object({
  nome: z.string().trim().min(2, "Escreva seu nome.").max(120),
  empresa: z.string().trim().min(2, "Escreva o nome da empresa.").max(160),
  email: z.string().trim().email("Confira o e-mail.").max(200),
  telefone: z.string().trim().min(10, "Inclua o DDD.").max(40),
  site: z.string().trim().max(300).optional(),
  // Grupo de rádio sem escolha não chega no FormData. Sem `required_error`, o
  // Zod cai no erro de tipo e mostra "Required" em inglês na tela.
  momento: z
    .string({ required_error: "Escolha uma opção." })
    .min(1, "Escolha uma opção."),
  desafio: z
    .string()
    .trim()
    .min(20, "Descreva em pelo menos uma frase.")
    .max(4000),
  investimento: z
    .string({ required_error: "Escolha uma opção." })
    .min(1, "Escolha uma opção."),
});

export type DiagnosticoCampos = z.infer<typeof diagnosticoSchema>;

/**
 * A mesma mensagem serve para o WhatsApp e para o corpo do e-mail: um formato
 * só evita que os dois canais divirjam quando alguém mexer em um deles.
 */
export function montarMensagem(dados: DiagnosticoCampos) {
  return [
    "Diagnóstico, pedido pelo site",
    "",
    `Nome: ${dados.nome}`,
    `Empresa: ${dados.empresa}`,
    `E-mail: ${dados.email}`,
    `Telefone: ${dados.telefone}`,
    dados.site ? `Site: ${dados.site}` : null,
    "",
    `Momento: ${dados.momento}`,
    `Investimento em mídia: ${dados.investimento}`,
    "",
    "Desafio principal:",
    dados.desafio,
  ]
    .filter((linha) => linha !== null)
    .join("\n");
}
