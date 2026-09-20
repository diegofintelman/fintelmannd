"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  diagnosticoSchema,
  montarMensagem,
  momentos,
  investimentos,
  type DiagnosticoCampos,
} from "@/lib/diagnostico";

/**
 * Formulário de diagnóstico. A conversão principal do site.
 *
 * ENTREGA, em dois canais independentes:
 *
 *  1. **WhatsApp**, sempre. Abre com as respostas já estruturadas na mensagem.
 *     É o canal por onde o atendimento de fato acontece, e não depende de
 *     nenhum serviço externo estar contratado.
 *  2. **E-mail**, quando houver `RESEND_API_KEY` configurada. O POST para
 *     `/api/diagnostico` é disparado sem bloquear o fluxo: se falhar, ou se a
 *     variável não existir, o item 1 já resolveu.
 *
 * A ordem importa. Um formulário cuja entrega depende de servidor de e-mail
 * ainda não contratado perde lead em silêncio, que é o pior modo de falha
 * possível para esta página.
 *
 * O campo `website` é uma armadilha para robô: humano não o vê e não o
 * preenche. Envio com ele preenchido é descartado, aqui e no servidor.
 */

type Erros = Partial<Record<keyof DiagnosticoCampos, string>>;

export function DiagnosticoForm() {
  const router = useRouter();
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const comecou = useRef(false);

  function aoComecar() {
    if (comecou.current) return;
    comecou.current = true;
    track("form_start", { origem: "formulario-diagnostico" });
  }

  function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Armadilha de robô.
    if (fd.get("website")) return;

    const bruto = Object.fromEntries(fd) as Record<string, string>;
    const resultado = diagnosticoSchema.safeParse(bruto);

    if (!resultado.success) {
      const novos: Erros = {};
      for (const issue of resultado.error.issues) {
        const campo = issue.path[0] as keyof DiagnosticoCampos;
        if (!novos[campo]) novos[campo] = issue.message;
      }
      setErros(novos);

      // Leva o foco para o primeiro campo com erro: sem isso, num formulário
      // longo no telefone, o erro fica fora da tela e o envio parece travado.
      const primeiro = Object.keys(novos)[0];
      form.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }

    setErros({});
    setEnviando(true);

    const dados = resultado.data;

    track("form_submit", { origem: "formulario-diagnostico" });
    track("diagnostico_submit", {
      origem: "formulario-diagnostico",
      item: dados.momento,
    });

    // Canal 2, sem bloquear: se o e-mail não estiver configurado, ou se a
    // rede cair, o WhatsApp abaixo já entregou. `keepalive` faz a requisição
    // sobreviver à navegação para /obrigado.
    void fetch("/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
      keepalive: true,
    }).catch(() => {
      /* silencioso de propósito: o canal 1 é o que conta */
    });

    // Canal 1, sempre. Precisa sair no mesmo tique do clique, ou o navegador
    // do telefone trata como pop-up e bloqueia.
    const url = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
      montarMensagem(dados)
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    router.push("/obrigado");
  }

  return (
    <form onSubmit={aoEnviar} onFocusCapture={aoComecar} noValidate className="grid gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Campo nome="nome" rotulo="Seu nome" erro={erros.nome} autoComplete="name" />
        <Campo
          nome="empresa"
          rotulo="Empresa"
          erro={erros.empresa}
          autoComplete="organization"
        />
        <Campo
          nome="email"
          rotulo="E-mail"
          tipo="email"
          erro={erros.email}
          autoComplete="email"
        />
        <Campo
          nome="telefone"
          rotulo="WhatsApp com DDD"
          tipo="tel"
          erro={erros.telefone}
          autoComplete="tel"
        />
      </div>

      <Campo
        nome="site"
        rotulo="Site ou Instagram"
        opcional
        erro={erros.site}
        autoComplete="url"
        dica="Se já existe. Olho antes da conversa."
      />

      <Selecao
        nome="momento"
        rotulo="Em que momento o negócio está"
        opcoes={momentos}
        erro={erros.momento}
      />

      <div>
        <Rotulo htmlFor="desafio">Qual é o desafio principal hoje</Rotulo>
        <textarea
          id="desafio"
          name="desafio"
          rows={5}
          aria-invalid={Boolean(erros.desafio)}
          aria-describedby={erros.desafio ? "erro-desafio" : undefined}
          className={campoClasses(Boolean(erros.desafio))}
        />
        <Erro id="erro-desafio" texto={erros.desafio} />
      </div>

      <Selecao
        nome="investimento"
        rotulo="Investimento mensal em mídia hoje"
        opcoes={investimentos}
        erro={erros.investimento}
      />

      {/* Armadilha de robô. Fora da ordem de tabulação e do leitor de tela. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="rule-top pt-7">
        <button type="submit" disabled={enviando} className="cta">
          <span className="cta__label">
            {enviando ? "Abrindo o WhatsApp…" : "Enviar e falar agora"}
          </span>
          <span aria-hidden="true" className="cta__rule" />
        </button>

        <p className="mt-5 max-w-measure text-sm text-ink-soft">
          Ao enviar, abre-se uma conversa no WhatsApp já com estas respostas
          preenchidas — você confere antes de mandar. Seus dados são usados só
          para responder este contato. Veja a{" "}
          <a href="/politica-de-privacidade" className="link">
            política de privacidade
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- campos -- */

function campoClasses(temErro: boolean) {
  return cn(
    "mt-2 w-full border bg-transparent px-4 py-3 text-base text-ink outline-none transition-colors duration-150 ease-out",
    "placeholder:text-ink-soft focus:border-[var(--accent)]",
    temErro ? "border-[var(--accent)]" : "border-rule"
  );
}

function Rotulo({
  htmlFor,
  children,
  opcional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  opcional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-label font-medium">
      {children}
      {opcional && <span className="ml-2 text-ink-soft">(opcional)</span>}
    </label>
  );
}

function Erro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-accent">
      {texto}
    </p>
  );
}

function Campo({
  nome,
  rotulo,
  tipo = "text",
  erro,
  opcional,
  dica,
  autoComplete,
}: {
  nome: string;
  rotulo: string;
  tipo?: string;
  erro?: string;
  opcional?: boolean;
  dica?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Rotulo htmlFor={nome} opcional={opcional}>
        {rotulo}
      </Rotulo>
      <input
        id={nome}
        name={nome}
        type={tipo}
        autoComplete={autoComplete}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? `erro-${nome}` : dica ? `dica-${nome}` : undefined}
        className={campoClasses(Boolean(erro))}
      />
      {dica && !erro && (
        <p id={`dica-${nome}`} className="mt-2 text-sm text-ink-soft">
          {dica}
        </p>
      )}
      <Erro id={`erro-${nome}`} texto={erro} />
    </div>
  );
}

function Selecao({
  nome,
  rotulo,
  opcoes,
  erro,
}: {
  nome: string;
  rotulo: string;
  opcoes: readonly string[];
  erro?: string;
}) {
  return (
    <fieldset>
      <legend className="text-label font-medium">{rotulo}</legend>
      <div className="mt-4 grid gap-2.5">
        {opcoes.map((opcao) => (
          <label
            key={opcao}
            className="flex cursor-pointer items-start gap-3 text-ink-soft transition-colors duration-150 ease-out hover:text-ink"
          >
            <input
              type="radio"
              name={nome}
              value={opcao}
              className="mt-1.5 shrink-0 accent-[var(--accent)]"
            />
            <span>{opcao}</span>
          </label>
        ))}
      </div>
      <Erro id={`erro-${nome}`} texto={erro} />
    </fieldset>
  );
}
