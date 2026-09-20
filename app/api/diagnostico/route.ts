import { NextResponse } from "next/server";

import { diagnosticoSchema, montarMensagem } from "@/lib/diagnostico";
import { site } from "@/lib/site";

/**
 * Recebe o formulário de diagnóstico e envia por e-mail.
 *
 * COMO ISTO SE COMPORTA HOJE
 *
 * Sem `RESEND_API_KEY` configurada, a rota valida, responde `entregue: false` e
 * não falha. O formulário no cliente **não depende dela**: ele abre o WhatsApp
 * com as respostas estruturadas de qualquer jeito. Ou seja, nada se perde
 * enquanto o e-mail não estiver ligado, e o e-mail passa a funcionar no minuto
 * em que a variável existir, sem mexer em código.
 *
 * COMO LIGAR
 *
 *   1. Criar conta em resend.com e verificar o domínio fintelmannd.com.br
 *   2. No painel da hospedagem, em variáveis de ambiente:
 *        RESEND_API_KEY   = re_...
 *        DIAGNOSTICO_PARA = contato@fintelmannd.com.br   (opcional)
 *        DIAGNOSTICO_DE   = site@fintelmannd.com.br      (opcional)
 *   3. Redeploy.
 *
 * Trocar de provedor mexe só na função `enviarEmail` abaixo.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Limite por IP, em memória. Sobrevive só enquanto a instância viver, o que
 *  basta para conter envio repetido acidental e robô simples. Abuso sério pede
 *  proteção na borda, não aqui. */
const ultimoEnvio = new Map<string, number>();
const JANELA_MS = 30_000;

function identificar(request: Request) {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "desconhecido";
}

async function enviarEmail(assunto: string, corpo: string, responderPara: string) {
  const chave = process.env.RESEND_API_KEY;
  if (!chave) return false;

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.DIAGNOSTICO_DE ?? `Site <site@fintelmannd.com.br>`,
      to: [process.env.DIAGNOSTICO_PARA ?? site.contact.email],
      reply_to: responderPara,
      subject: assunto,
      text: corpo,
    }),
  });

  if (!resposta.ok) {
    // Log sem o conteúdo do formulário: o corpo tem dado pessoal e não deve
    // ir para o log de build nem para o painel de runtime.
    console.error(
      "Falha ao enviar o diagnóstico por e-mail:",
      resposta.status,
      resposta.statusText
    );
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

  // Armadilha de robô: humano não vê nem preenche este campo.
  if (
    typeof bruto === "object" &&
    bruto !== null &&
    "website" in bruto &&
    (bruto as { website?: unknown }).website
  ) {
    // Responde 200 de propósito: dizer ao robô que ele foi pego só melhora o robô.
    return NextResponse.json({ entregue: false });
  }

  const resultado = diagnosticoSchema.safeParse(bruto);
  if (!resultado.success) {
    return NextResponse.json(
      {
        erro: "Dados inválidos.",
        campos: resultado.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const ip = identificar(request);
  const agora = Date.now();
  const anterior = ultimoEnvio.get(ip);
  if (anterior && agora - anterior < JANELA_MS) {
    return NextResponse.json({ entregue: false, motivo: "repetido" });
  }
  ultimoEnvio.set(ip, agora);

  const dados = resultado.data;
  const entregue = await enviarEmail(
    `Diagnóstico: ${dados.empresa}`,
    montarMensagem(dados),
    dados.email
  );

  return NextResponse.json({ entregue });
}
