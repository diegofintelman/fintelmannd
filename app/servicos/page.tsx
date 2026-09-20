import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Chapter, ChapterHead } from "@/components/chapter";
import { Cta } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { servicos } from "@/lib/servicos";
import { etapas } from "@/lib/metodo";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Tráfego pago, sites e landing pages, trackeamento, criativos e Google Meu Negócio — apresentados como partes de um sistema, com o que cada um não inclui.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Serviços", href: "/servicos" }]} />

      <PageHeader
        kicker="Serviços"
        title="Cada serviço é uma etapa do método"
        trail={[{ name: "Serviços", href: "/servicos" }]}
        standfirst={
          <>
            Dá para contratar uma peça isolada, e às vezes é exatamente o certo.
            O que não dá é contratar sem saber qual peça resolve o seu gargalo —
            e é para isso que existe o{" "}
            <Link href="/diagnostico" className="link">
              diagnóstico
            </Link>
            .
          </>
        }
      />

      <Chapter n="01" title="Os serviços">
        <div className="grid gap-0 border-t border-rule">
          {servicos.map((servico) => (
            <article
              key={servico.slug}
              className="grid gap-x-11 gap-y-5 border-b border-rule py-9 lg:grid-cols-[1fr_1.4fr]"
            >
              <div>
                <p className="eyebrow tabular mb-3">
                  Etapa{servico.etapas.length > 1 ? "s" : ""}{" "}
                  <span className="text-accent">
                    {servico.etapas.join(" e ")}
                  </span>
                </p>
                <h2 className="text-h3">
                  <Link href={`/servicos/${servico.slug}`} className="link">
                    {servico.nome}
                  </Link>
                </h2>
              </div>

              <div className="max-w-measure">
                <p className="text-lead">{servico.headline}</p>
                <p className="mt-3 text-ink-soft">{servico.standfirst}</p>

                <p className="mt-5 text-sm">
                  <span className="eyebrow mr-2">Não inclui</span>
                  <span className="text-ink-soft">
                    {servico.naoIncluso.slice(0, 2).join("; ")}.
                  </span>
                </p>

                <p className="mt-5">
                  <Link
                    href={`/servicos/${servico.slug}`}
                    className="link font-medium"
                  >
                    Ver o serviço
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter n="02" title="Onde cada um entra" ground="graphite">
        <ChapterHead
          n="02"
          standfirst="As etapas 02 e 06 — oferta e relacionamento: não são vendidas separadas: aparecem dentro do trabalho das outras, porque sozinhas não se sustentam como contrato."
        >
          As oito etapas, e quem cobre cada uma
        </ChapterHead>

        <ol className="mt-9 grid gap-0 border-t border-rule">
          {etapas.map((etapa) => {
            const cobertura = servicos.filter((s) =>
              s.etapas.includes(etapa.n)
            );
            return (
              <li
                key={etapa.n}
                className="grid gap-x-8 gap-y-2 border-b border-rule py-5 lg:grid-cols-[4rem_14rem_1fr]"
              >
                <span className="tabular text-sm text-accent">{etapa.n}</span>
                <span className="font-medium">{etapa.nome}</span>
                <span className="text-ink-soft">
                  {cobertura.length > 0 ? (
                    cobertura.map((s, i) => (
                      <span key={s.slug}>
                        {i > 0 && ", "}
                        <Link href={`/servicos/${s.slug}`} className="link">
                          {s.nome}
                        </Link>
                      </span>
                    ))
                  ) : (
                    <span className="text-sm">
                      Dentro do trabalho das demais etapas
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-11">
          <Cta origem="servicos-fim" />
        </div>
      </Chapter>
    </>
  );
}
