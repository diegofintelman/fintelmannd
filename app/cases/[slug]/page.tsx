import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { Cta } from "@/components/cta";
import { ViewTracker } from "@/components/view-tracker";
import { BreadcrumbSchema, CaseSchema } from "@/components/schema";
import { cases, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCase(slug);
  if (!caso) return {};

  const title = `${caso.title} — ${caso.segmento}, ${caso.canal}`;
  return {
    title,
    description: caso.resumo,
    alternates: { canonical: `/cases/${caso.slug}` },
    openGraph: {
      title,
      description: caso.resumo,
      url: `/cases/${caso.slug}`,
      type: "article",
      images: [{ url: caso.imagens[0].src }],
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caso = getCase(slug);
  if (!caso) notFound();

  const outros = cases.filter((c) => c.slug !== caso.slug).slice(0, 3);

  return (
    <>
      <ViewTracker
        event="case_view"
        payload={{ origem: `case-${caso.slug}`, item: caso.slug }}
      />
      <CaseSchema
        title={caso.title}
        description={caso.resumo}
        slug={caso.slug}
      />
      <BreadcrumbSchema
        trail={[
          { name: "Trabalhos", href: "/cases" },
          { name: caso.title, href: `/cases/${caso.slug}` },
        ]}
      />

      <PageHeader
        kicker={`${caso.segmento} · ${caso.canal} · ${caso.objetivo}`}
        title={caso.title}
        trail={[
          { name: "Trabalhos", href: "/cases" },
          { name: caso.title, href: `/cases/${caso.slug}` },
        ]}
        standfirst={caso.resumo}
      />

      <Chapter n="01" title="Contexto e estratégia">
        <div className="grid gap-11 lg:grid-cols-[1fr_1.15fr] lg:gap-13">
          <div className="max-w-measure">
            <section>
              <h2 className="eyebrow mb-3">Contexto</h2>
              <p className="text-lead">{caso.contexto}</p>
            </section>

            <section className="mt-9">
              <h2 className="eyebrow mb-3">Estratégia</h2>
              <p>{caso.estrategia}</p>
            </section>

            <section className="mt-9">
              <h2 className="eyebrow mb-3">Leitura de resultados</h2>
              <p>{caso.leitura}</p>
            </section>

            <section className="mt-9 border-l-2 border-[var(--accent)] pl-5">
              <h2 className="eyebrow mb-3">O aprendizado</h2>
              <p className="text-ink-soft">{caso.aprendizado}</p>
            </section>
          </div>

          <div>
            <h2 className="eyebrow mb-5">Evidência visual</h2>
            <div className="grid gap-8">
              {caso.imagens.map((img) => (
                <figure key={img.src}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1400}
                    height={840}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full border border-rule"
                  />
                  <figcaption className="mt-3 text-sm text-ink-soft">
                    {img.legenda}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-7 text-sm text-ink-soft">
              Os prints são do Gerenciador de Anúncios da conta do cliente,
              exibidos com autorização. Valores absolutos de investimento e de
              faturamento foram omitidos por confidencialidade. O que está
              visível é o que sustenta a leitura acima.
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter n="02" title="Outros trabalhos" ground="graphite">
        <div className="flex flex-wrap items-baseline justify-between gap-5">
          <h2 className="text-h3">Outros trabalhos</h2>
          <Link href="/cases" className="link text-label uppercase tracking-[0.1em]">
            Ver todos
          </Link>
        </div>

        <ul className="mt-8 grid gap-0 border-t border-rule">
          {outros.map((outro) => (
            <li
              key={outro.slug}
              className="grid gap-x-8 gap-y-2 border-b border-rule py-5 lg:grid-cols-[18rem_1fr]"
            >
              <h3 className="font-medium">
                <Link href={`/cases/${outro.slug}`} className="link">
                  {outro.title}
                </Link>
              </h3>
              <p className="max-w-measure text-sm text-ink-soft">
                {outro.resumo}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-11 max-w-column">
          <p className="text-lead">
            Quer saber o que a leitura dos seus dados diria?
          </p>
          <div className="mt-6">
            <Cta origem={`case-${caso.slug}-fim`} />
          </div>
        </div>
      </Chapter>
    </>
  );
}
