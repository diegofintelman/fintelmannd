"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Consentimento de cookies, com Google Consent Mode v2.
 *
 * Ordem que importa: o estado padrão (tudo negado, menos o necessário) é
 * definido em `app/layout.tsx` por um script que roda ANTES do GTM. Se o padrão
 * for definido depois, as tags disparam uma vez antes de qualquer escolha, e
 * o consentimento vira formalidade.
 *
 * Aqui acontece só a atualização: a escolha da pessoa vira um `consent update`
 * e fica guardada neste navegador.
 */

const CHAVE = "fnd-consent";
const VERSAO = 1;

type Escolha = "aceito" | "recusado";
type Guardado = { escolha: Escolha; versao: number; em: string };

function ler(): Guardado | null {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const dados = JSON.parse(bruto) as Guardado;
    return dados.versao === VERSAO ? dados : null;
  } catch {
    // Janela anônima, armazenamento bloqueado: trata como sem escolha.
    return null;
  }
}

function gravar(escolha: Escolha) {
  try {
    localStorage.setItem(
      CHAVE,
      JSON.stringify({ escolha, versao: VERSAO, em: new Date().toISOString() })
    );
  } catch {
    // Sem persistência, o aviso reaparece na próxima visita. É o degradar correto.
  }
}

function aplicar(escolha: Escolha) {
  const concedido = escolha === "aceito" ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];

  // O Consent Mode lê o objeto `arguments`, não um objeto literal: um push de
  // `{0:'consent', 1:'update'}` não é reconhecido. Por isso a chamada precisa
  // passar por uma função que empurre o próprio `arguments`.
  function gtag(...args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    void args;
  }

  gtag("consent", "update", {
    ad_storage: concedido,
    ad_user_data: concedido,
    ad_personalization: concedido,
    analytics_storage: concedido,
  });

  // Evento separado, para o GTM poder usar como gatilho.
  window.dataLayer.push({ event: "consent_update", consent_state: escolha });
}

export function ConsentBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const guardado = ler();
    if (guardado) {
      aplicar(guardado.escolha);
      return;
    }
    setVisivel(true);

    const aoResetar = () => setVisivel(true);
    window.addEventListener("fnd:consent-reset", aoResetar);
    return () => window.removeEventListener("fnd:consent-reset", aoResetar);
  }, []);

  if (!visivel) return null;

  function decidir(escolha: Escolha) {
    gravar(escolha);
    aplicar(escolha);
    setVisivel(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-titulo"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-[var(--canvas)]"
    >
      <div className="wrap flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-9">
        <div className="max-w-measure">
          <h2 id="consent-titulo" className="text-label font-medium uppercase tracking-[0.1em]">
            Cookies
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Uso cookies de análise e de publicidade para entender o que funciona
            no site e medir campanhas. Sem eles, o site continua funcionando
            normalmente. Detalhes na{" "}
            <Link href="/politica-de-cookies" className="link">
              política de cookies
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-3">
          {/* Recusar tem o mesmo peso visual de aceitar: esconder a recusa
              num link pequeno é o padrão escuro que a LGPD desautoriza. */}
          <button
            type="button"
            onClick={() => decidir("recusado")}
            className="text-label font-medium uppercase tracking-[0.1em] text-ink-soft underline decoration-1 underline-offset-[0.35em] transition-colors duration-150 ease-out hover:text-ink"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decidir("aceito")}
            className="text-label font-medium uppercase tracking-[0.1em] text-ink underline decoration-[var(--accent)] decoration-2 underline-offset-[0.35em]"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

/** Botão da política de cookies, para a pessoa rever a escolha. */
export function ConsentReset() {
  const [feito, setFeito] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem(CHAVE);
        } catch {
          /* sem persistência: nada a limpar */
        }
        window.dispatchEvent(new Event("fnd:consent-reset"));
        setFeito(true);
      }}
      className="cta"
    >
      <span className="cta__label">
        {feito ? "Pronto — escolha de novo abaixo" : "Rever minha escolha"}
      </span>
      <span aria-hidden="true" className="cta__rule" />
    </button>
  );
}
