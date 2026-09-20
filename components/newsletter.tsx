"use client";

import { useRef, useState } from "react";
import { z } from "zod";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Cadastro de newsletter.
 *
 * ENTREGA: posta em `/api/newsletter`, que grava o contato onde estiver
 * configurado. Sem provedor configurado a rota responde `registrado: false` e
 * o formulário **avisa** em vez de fingir sucesso — cadastro que exibe "pronto!"
 * e joga o e-mail fora é a pior falha possível numa captura.
 *
 * O campo `website` é armadilha de robô: humano não o vê e não o preenche.
 */

const schema = z.object({
  email: z.string().trim().email("Confira o e-mail."),
  nome: z.string().trim().max(120).optional(),
});

type Estado = "parado" | "enviando" | "ok" | "pendente" | "erro";

export function NewsletterForm({
  origem,
  compacto = false,
}: {
  origem: string;
  compacto?: boolean;
}) {
  const [estado, setEstado] = useState<Estado>("parado");
  const [erro, setErro] = useState<string | null>(null);
  const comecou = useRef(false);

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return;

    const resultado = schema.safeParse({
      email: fd.get("email"),
      nome: fd.get("nome") || undefined,
    });

    if (!resultado.success) {
      setErro(resultado.error.issues[0]?.message ?? "Confira os dados.");
      setEstado("erro");
      return;
    }

    setErro(null);
    setEstado("enviando");

    try {
      const resposta = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...resultado.data, origem }),
      });
      const dados = (await resposta.json()) as { registrado?: boolean };

      track("newsletter_subscribe", { origem });
      setEstado(dados.registrado ? "ok" : "pendente");
    } catch {
      setEstado("erro");
      setErro("Não consegui enviar agora. Tente de novo em instantes.");
    }
  }

  if (estado === "ok" || estado === "pendente") {
    return (
      <div
        role="status"
        className="rounded-lg border border-gold-deep/60 bg-[var(--surface)] p-6 text-center"
      >
        <p className="font-display text-xl text-gold">Pronto.</p>
        <p className="mt-2 text-ink-soft">
          {estado === "ok"
            ? "Você entrou na lista. Vou avisar assim que abrir."
            : "Recebi seu contato. Assim que a lista estiver ativa, você é avisado."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={aoEnviar}
      onFocusCapture={() => {
        if (comecou.current) return;
        comecou.current = true;
        track("form_start", { origem: `newsletter-${origem}` });
      }}
      noValidate
      className="w-full"
    >
      <div
        className={cn(
          "flex gap-2.5",
          compacto ? "flex-row" : "flex-col sm:flex-row"
        )}
      >
        <label htmlFor={`email-${origem}`} className="sr-only">
          Seu e-mail
        </label>
        <input
          id={`email-${origem}`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="seu@email.com.br"
          aria-invalid={estado === "erro"}
          aria-describedby={erro ? `erro-${origem}` : undefined}
          className={cn(
            "min-w-0 flex-1 rounded-md border bg-[var(--canvas)] px-4 py-3 text-base text-ink outline-none transition-colors duration-200",
            "placeholder:text-ink-soft focus:border-gold",
            estado === "erro" ? "border-gold" : "border-rule"
          )}
        />

        {/* Armadilha de robô. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`website-${origem}`}>Não preencha</label>
          <input id={`website-${origem}`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={estado === "enviando"}
          className="btn btn--gold shrink-0 disabled:opacity-70"
        >
          {estado === "enviando" ? "Enviando…" : "Quero ser avisado"}
        </button>
      </div>

      {erro && (
        <p id={`erro-${origem}`} role="alert" className="mt-2.5 text-sm text-gold">
          {erro}
        </p>
      )}

      <p className="mt-3 text-xs text-ink-soft">
        Só o aviso do lançamento e conteúdo sobre presença digital. Sem spam, e
        você sai quando quiser.
      </p>
    </form>
  );
}
