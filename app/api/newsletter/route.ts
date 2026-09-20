import { NextResponse } from "next/server";
import { z } from "zod";

import { site } from "@/lib/site";

/**
 * Cadastro de newsletter.
 *
 * COMO SE COMPORTA HOJE
 *
 * Sem `RESEND_API_KEY` configurada, a rota valida e responde
 * `registrado: false`. O formulário exibe uma mensagem honesta ("recebi seu
 * contato") em vez de "inscrição confirmada", porque não houve inscrição
 * nenhuma.
 *
 * Com a chave configurada, envia o contato por e-mail para você. É o suficiente
 * enquanto a lista for pequena e não houver ferramenta de e-mail marketing
 * escolhida.
 *
 * QUANDO ESCOLHER A FERRAMENTA (Brevo, Mailchimp, RD Station...), trocar só a
 * função `registrar` abaixo. O formulário não muda.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().email().max(200),
  nome: z.string().trim().max(120).optional(),
  origem: z.string().trim().max(80).optional(),
});

const ultimoEnvio = new Map<string, number>();
const JANELA_MS = 20_000;

async function registrar(email: string, nome?: string, origem?: string) {
  const chave = process.env.RESEND_API_KEY;
  if (!chave) return false;

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.DIAGNOSTICO_DE ?? "Site <site@fintelmannd.com.br>",
      to: [process.env.DIAGNOSTICO_PARA ?? site.contact.email],
      subject: `Newsletter: ${email}`,
      text: [
        "Novo cadastro na newsletter.",
        "",
        `E-mail: ${email}`,
        nome ? `Nome: ${nome}` : null,
        `Origem: ${origem ?? "não informada"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!resposta.ok) {
    console.error("Falha ao registrar newsletter:", resposta.status);
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  let bruto: unknown;
  try {
    bruto = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  if (
    typeof bruto === "object" &&
    bruto !== null &&
    "website" in bruto &&
    (bruto as { website?: unknown }).website
  ) {
    return NextResponse.json({ registrado: false });
  }

  const resultado = schema.safeParse(bruto);
  if (!resultado.success) {
    return NextResponse.json({ erro: "E-mail inválido." }, { status: 422 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "desconhecido";
  const agora = Date.now();
  const anterior = ultimoEnvio.get(ip);
  if (anterior && agora - anterior < JANELA_MS) {
    return NextResponse.json({ registrado: false, motivo: "repetido" });
  }
  ultimoEnvio.set(ip, agora);

  const { email, nome, origem } = resultado.data;
  const registrado = await registrar(email, nome, origem);

  return NextResponse.json({ registrado });
}
