import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { Chapter, ChapterHead } from "@/components/chapter";
import { MarginNote } from "@/components/margin-note";
import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { ViewTracker } from "@/components/view-tracker";
import { SitesPortfolio } from "@/components/sites-portfolio";
import { BreadcrumbSchema, ServiceSchema } from "@/components/schema";
import { servicos, getServico } from "@/lib/servicos";
import { getCase } from "@/lib/cases";

export function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servico = getServico(slug);
  if (!servico) return {};

  return {
    title: servico.metaTitle,
    description: servico.metaDescription,
    alternates: { canonical: `/servicos/${servico.slug}` },
    openGraph: {
      title: servico.metaTitle,
      description: servico.metaDescription,
      url: `/servicos/${servico.slug}`,
      type: "article",
    },
  };
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const servico = getServico(slug);
  if (!servico) notFound();

  const relacionados = servico.casesRelacionados
    .map(getCase)
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <ViewTracker
        event="service_view"
        payload={{ origem: `servico-${servico.slug}`, item: servico.slug }}
      />
      <ServiceSchema
        name={servico.nome}
        description={servico.metaDescription}
        href={`/servicos/${servico.slug}`}
      />
      <BreadcrumbSchema
        trail={[
          { name: "Serviços", href: "/servicos" },
          { name: servico.nome, href: `/servicos/${servico.slug}` },
        ]}
      />

      <PageHeader
        kicker={`Etapa${servico.etapas.length > 1 ? "s" : ""} ${servico.etapas.join(" e ")} do método`}
        title={servico.headline}
        trail={[
          { name: "Serviços", href: "/servicos" },
          { name: servico.nome, href: `/servicos/${servico.slug}` },
        ]}
        standfirst={servico.standfirst}
      >
        <Cta origem={`servico-${servico.slug}-topo`} />
      </PageHeader>

      {/* --- O problema --- */}
      <Chapter n="01" title="O problema" ground="graphite" withMargin>
        <ChapterHead n="01">{servico.problema.titulo}</ChapterHead>

        <div className="max-w-column">
          {servico.problema.paragrafos.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lead" : "mt-5 text-ink-soft"}>
              {p}
            </p>
          ))}

          <MarginNote>{servico.nota}</MarginNote>
        </div>
      </Chapter>

      {/* --- O que entra e o que não entra --- */}
      <Chapter n="02" title="O escopo">
        <ChapterHead
          n="02"
          standfirst="Escopo aberto é onde nasce a maior parte do atrito em projeto de serviço. Por isso o que não está incluído aparece com o mesmo destaque do que está."
        >
          O que está, e o que não está, incluído
        </ChapterHead>

        <div className="mt-9 grid gap-11 lg:grid-cols-[1.5fr_1fr] lg:gap-13">
          <div>
            <p className="eyebrow mb-5">Entregáveis</p>
            <ul className="grid gap-0 border-t border-rule">
              {servico.entregaveis.map((e) => (
                <li key={e.titulo} className="border-b border-rule py-5">
                  <h3 className="text-h4">{e.titulo}</h3>
                  <p className="mt-2 max-w-measure text-ink-soft">{e.texto}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div>
              <p className="eyebrow mb-5">Não inclui</p>
              <ul className="grid gap-3">
                {servico.naoIncluso.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="text-rule">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-5">Para quem não serve</p>
              <ul className="grid gap-4">
                {servico.naoServe.map((item) => (
                  <li key={item} className="text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Chapter>

      {/* --- Portfólio de sites: só no serviço de sites --- */}
      {servico.slug === "sites-e-landing-pages" && (
        <Chapter n="03" title="Sites entregues" ground="graphite">
          <ChapterHead
            n="03"
            standfirst="Todos com endereço público. Clique e veja. É a única forma de portfólio que vale alguma coisa."
          >
            Trabalhos no ar
          </ChapterHead>

          <div className="mt-9">
            <SitesPortfolio />
          </div>
        </Chapter>
      )}

      {/* --- Cases relacionados --- */}
      {relacionados.length > 0 && (
        <Chapter
          n={servico.slug === "sites-e-landing-pages" ? "04" : "03"}
          title="Trabalhos relacionados"
          ground={servico.slug === "sites-e-landing-pages" ? "paper" : "graphite"}
        >
          <ChapterHead
            n={servico.slug === "sites-e-landing-pages" ? "04" : "03"}
            standfirst="Com a leitura de resultados e o print do gerenciador."
          >
            Onde isso apareceu na prática
          </ChapterHead>

          <div className="mt-9 grid gap-8 lg:grid-cols-2">
            {relacionados.map((caso) => (
              <article key={caso.slug} className="rule-top pt-6">
                <p className="eyebrow mb-3">
                  {caso.segmento} · {caso.objetivo}
                </p>
                <h3 className="text-h4">
                  <Link href={`/cases/${caso.slug}`} className="link">
                    {caso.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-measure text-ink-soft">{caso.resumo}</p>

                <Image
                  src={caso.imagens[0].src}
                  alt={caso.imagens[0].alt}
                  width={1200}
                  height={720}
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="mt-5 h-auto w-full border border-rule"
                />
              </article>
            ))}
          </div>
        </Chapter>
      )}

      {/* --- FAQ --- */}
      <Chapter
        n={servico.slug === "sites-e-landing-pages" ? "05" : "04"}
        title="Perguntas"
        ground={servico.slug === "sites-e-landing-pages" ? "graphite" : "paper"}
      >
        <Faq titulo="Perguntas que sempre aparecem" perguntas={servico.faq} />

        <div className="mt-11 max-w-column rule-top pt-8">
          <p className="text-lead">
            Se a sua pergunta não está aqui, ela cabe no diagnóstico.
          </p>
          <div className="mt-6">
            <Cta origem={`servico-${servico.slug}-fim`} />
          </div>
        </div>
      </Chapter>
    </>
  );
}
