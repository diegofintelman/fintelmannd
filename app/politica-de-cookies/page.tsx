import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Legal, LegalSection } from "@/components/legal";
import { BreadcrumbSchema } from "@/components/schema";
import { ConsentReset } from "@/components/consent";
import { site } from "@/lib/site";

/**
 * ⚠️ RASCUNHO — NÃO PUBLICAR SEM REVISÃO JURÍDICA.
 * Os nomes e prazos de cookie abaixo precisam ser conferidos contra o que o
 * container GTM efetivamente dispara. Ver docs/PENDENCIAS.md.
 */

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Quais cookies este site usa, para que servem, quanto tempo duram e como recusar ou mudar sua escolha.",
  alternates: { canonical: "/politica-de-cookies" },
};

const cookies = [
  {
    categoria: "Necessários",
    consentimento: "Dispensam consentimento",
    exemplos: "Preferência de consentimento do próprio aviso de cookies.",
    finalidade:
      "Fazem o site funcionar e guardam a sua escolha sobre os demais cookies. Sem eles, o aviso reapareceria a cada página.",
    duracao: "Até 6 meses",
  },
  {
    categoria: "Análise",
    consentimento: "Só com o seu consentimento",
    exemplos: "Google Analytics 4 (_ga, _ga_*), via Google Tag Manager.",
    finalidade:
      "Contam quantas pessoas visitam, quais páginas leem e por onde chegaram. São usados de forma agregada, para entender o que funciona no site.",
    duracao: "Até 2 anos",
  },
  {
    categoria: "Publicidade",
    consentimento: "Só com o seu consentimento",
    exemplos: "Meta Pixel (_fbp), Google Ads (_gcl_*).",
    finalidade:
      "Medem o resultado dos anúncios e permitem exibir anúncios a quem já visitou o site. É o que chamamos de remarketing.",
    duracao: "Até 90 dias (Meta) e até 90 dias (Google Ads)",
  },
];

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[{ name: "Política de cookies", href: "/politica-de-cookies" }]}
      />

      <PageHeader
        kicker="Legal"
        title="Política de cookies"
        trail={[{ name: "Política de cookies", href: "/politica-de-cookies" }]}
        standfirst="O que cada cookie faz, quanto tempo dura, e como mudar a sua escolha a qualquer momento."
      />

      <Legal atualizadoEm="19 de setembro de 2026">
        <LegalSection n="01" titulo="O que são cookies">
          <p>
            Cookies são pequenos arquivos que um site guarda no seu navegador.
            Alguns são indispensáveis para o site funcionar; outros servem para
            medir audiência ou para publicidade, e esses só são ativados se você
            concordar.
          </p>
        </LegalSection>

        <LegalSection n="02" titulo="Quais cookies este site usa">
          <div className="not-prose mt-2 grid gap-0 border-t border-rule">
            {cookies.map((c) => (
              <div key={c.categoria} className="border-b border-rule py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <h3 className="text-h4 text-ink">{c.categoria}</h3>
                  <p className="text-label text-accent">{c.consentimento}</p>
                </div>
                <p className="mt-3">{c.finalidade}</p>
                <dl className="mt-4 grid gap-1.5 text-sm">
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 text-ink-soft">Exemplos</dt>
                    <dd>{c.exemplos}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-24 shrink-0 text-ink-soft">Duração</dt>
                    <dd>{c.duracao}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </LegalSection>

        <LegalSection n="03" titulo="Como mudar a sua escolha">
          <p>
            A sua decisão fica guardada neste navegador. Para revê-la, use o
            botão abaixo. O aviso reaparece e você escolhe de novo.
          </p>
          <div className="pt-2">
            <ConsentReset />
          </div>
          <p>
            Você também pode bloquear ou apagar cookies pelas configurações do
            seu navegador. Bloquear os necessários pode fazer o aviso reaparecer
            a cada visita.
          </p>
        </LegalSection>

        <LegalSection n="04" titulo="Cookies de terceiros">
          <p>
            Os cookies de análise e de publicidade são definidos por Google e
            Meta, que atuam como operadores desses dados. O tratamento que cada
            um faz é regido também pelas políticas de privacidade deles.
          </p>
        </LegalSection>

        <LegalSection n="05" titulo="Mais informações">
          <p>
            O tratamento de dados pessoais em geral está descrito na{" "}
            <Link href="/politica-de-privacidade" className="link">
              política de privacidade
            </Link>.
            Dúvidas:{" "}
            <a className="link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        </LegalSection>
      </Legal>
    </>
  );
}
