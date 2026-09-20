import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { Cta } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Trabalhos",
  description:
    "Casos reais com contexto, estratégia, leitura de resultados e print do gerenciador. Incluindo os que ainda não fecharam conclusão.",
  alternates: { canonical: "/cases" },
};

/**
 * Grammar de catálogo: objetos em uma coleção, com rótulo de museu.
 *
 * Todo item usa o mesmo esquema de rótulo — segmento, canal, objetivo, porque
 * é o esquema que transforma uma grade em coleção. O rótulo é fato, nunca
 * argumento de venda.
 */
export default function CasesPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Trabalhos", href: "/cases" }]} />

      <PageHeader
        kicker="Trabalhos"
        title="O que foi feito, e o que os dados disseram"
        trail={[{ name: "Trabalhos", href: "/cases" }]}
        standfirst={
          <>
            Cada caso tem contexto, estratégia, leitura de resultados e o print
            do gerenciador. Nenhum número aparece sem a imagem que o sustenta, e
            os casos que ainda não fecharam conclusão continuam aqui dizendo
            isso.
          </>
        }
      />

      <Chapter n="01" title="A coleção">
        <ul className="grid gap-0 border-t border-rule">
          {cases.map((caso) => (
            <li key={caso.slug}>
              <article className="grid gap-x-11 gap-y-6 border-b border-rule py-9 lg:grid-cols-[1fr_1fr]">
                <div>
                  <dl className="mb-5 grid gap-1.5 text-label text-ink-soft">
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0">Segmento</dt>
                      <dd className="text-ink">{caso.segmento}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0">Canal</dt>
                      <dd className="text-ink">{caso.canal}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-20 shrink-0">Objetivo</dt>
                      <dd className="text-ink">{caso.objetivo}</dd>
                    </div>
                  </dl>

                  <h2 className="text-h3">
                    <Link href={`/cases/${caso.slug}`} className="link">
                      {caso.title}
                    </Link>
                  </h2>

                  <p className="mt-4 max-w-measure text-ink-soft">
                    {caso.resumo}
                  </p>

                  <p className="mt-5">
                    <Link
                      href={`/cases/${caso.slug}`}
                      className="link font-medium"
                    >
                      Ler o case
                    </Link>
                  </p>
                </div>

                <figure>
                  <Image
                    src={caso.imagens[0].src}
                    alt={caso.imagens[0].alt}
                    width={1200}
                    height={720}
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="h-auto w-full border border-rule"
                  />
                  <figcaption className="mt-3 text-sm text-ink-soft">
                    {caso.imagens[0].legenda}
                  </figcaption>
                </figure>
              </article>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* O fechamento do catálogo é uma placa de consulta, tipografada como
          rótulo. Para o pedido ler como parte da coleção. */}
      <Chapter n="02" title="Consulta" ground="graphite">
        <div className="max-w-column">
          <dl className="grid gap-1.5 text-label text-ink-soft">
            <div className="flex gap-3">
              <dt className="w-20 shrink-0">Item</dt>
              <dd className="text-ink">Diagnóstico</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0">Duração</dt>
              <dd className="text-ink">30 a 40 minutos</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0">Custo</dt>
              <dd className="text-ink">Nenhum</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0">Resultado</dt>
              <dd className="text-ink">A ordem do que fazer primeiro</dd>
            </div>
          </dl>

          <div className="mt-9">
            <Cta origem="cases-fim" />
          </div>
        </div>
      </Chapter>
    </>
  );
}
