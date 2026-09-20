import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Chapter, ChapterHead } from "@/components/chapter";
import { Cta, WhatsAppLink } from "@/components/cta";
import { Faq } from "@/components/faq";
import { landingPages, getLandingPage, type Bloco } from "@/lib/landing-pages";
import { getCase } from "@/lib/cases";
import { site } from "@/lib/site";

/**
 * Sistema de landing pages.
 *
 * Uma LP é um objeto de dados em lib/landing-pages.ts; esta rota monta os
 * blocos na ordem declarada. Criar uma LP nova é acrescentar um item àquele
 * arquivo. Não duplicar uma página.
 *
 * LP de campanha fria nasce `noindex` para não competir com a página de
 * serviço pelo mesmo termo. A que também recebe orgânico entra no índice, e
 * entra no sitemap pelo mesmo campo.
 */

export function generateStaticParams() {
  return landingPages.map((lp) => ({ slug: lp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lp = getLandingPage(slug);
  if (!lp) return {};

  return {
    title: lp.metaTitle,
    description: lp.metaDescription,
    alternates: { canonical: `/lp/${lp.slug}` },
    robots: lp.indexavel ? undefined : { index: false, follow: true },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lp = getLandingPage(slug);
  if (!lp) notFound();

  return (
    <>
      {/* Capa: mesma gramática da home — tipo no papel, sem mídia acima da dobra. */}
      <section className="wrap pb-section pt-11">
        <div className="max-w-spread">
          <p className="eyebrow mb-7">{site.person}</p>
          <h1 className="text-h1 max-w-[18ch]">{lp.headline}</h1>
          <p className="mt-7 max-w-measure text-lead">{lp.subheadline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-5">
            <Cta origem={lp.origem} label={lp.ctaLabel} />
            <p className="text-sm text-ink-soft">
              Ou fale no{" "}
              <WhatsAppLink origem={lp.origem}>WhatsApp</WhatsAppLink>.
            </p>
          </div>
        </div>
      </section>

      {lp.blocos.map((bloco, i) => (
        <BlocoLP
          key={`${bloco.tipo}-${i}`}
          bloco={bloco}
          n={String(i + 1).padStart(2, "0")}
          ground={i % 2 === 0 ? "graphite" : "paper"}
          origem={lp.origem}
        />
      ))}

      {/* Fechamento: uma vez só, sem botão flutuante competindo. */}
      <Chapter
        n={String(lp.blocos.length + 1).padStart(2, "0")}
        title="Próximo passo"
        ground={lp.blocos.length % 2 === 0 ? "graphite" : "paper"}
      >
        <div className="max-w-column">
          <h2 className="text-h2">Vamos olhar o seu caso</h2>
          <p className="mt-5 text-lead text-ink-soft">
            Uma conversa de 30 a 40 minutos. Você sai com a ordem do que fazer
            primeiro, contratando alguma coisa ou não.
          </p>
          <div className="mt-8">
            <Cta origem={`${lp.origem}-fim`} label={lp.ctaLabel} />
          </div>
        </div>
      </Chapter>
    </>
  );
}

function BlocoLP({
  bloco,
  n,
  ground,
  origem,
}: {
  bloco: Bloco;
  n: string;
  ground: "paper" | "graphite";
  origem: string;
}) {
  if (bloco.tipo === "problema") {
    return (
      <Chapter n={n} title={bloco.titulo} ground={ground}>
        <ChapterHead n={n}>{bloco.titulo}</ChapterHead>
        <ul className="mt-8 grid gap-0 border-t border-rule">
          {bloco.itens.map((item) => (
            <li key={item.titulo} className="border-b border-rule py-6">
              <h3 className="text-h4">{item.titulo}</h3>
              <p className="mt-2 max-w-measure text-ink-soft">{item.texto}</p>
            </li>
          ))}
        </ul>
      </Chapter>
    );
  }

  if (bloco.tipo === "solucao") {
    return (
      <Chapter n={n} title={bloco.titulo} ground={ground}>
        <div className="grid gap-11 lg:grid-cols-[1fr_1fr] lg:gap-13">
          <div>
            <ChapterHead n={n}>{bloco.titulo}</ChapterHead>
            <p className="max-w-measure text-lead">{bloco.texto}</p>
          </div>
          <ul className="grid gap-0 border-t border-rule lg:mt-2">
            {bloco.itens.map((item) => (
              <li key={item} className="flex gap-4 border-b border-rule py-4">
                <span aria-hidden="true" className="shrink-0 text-accent">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Chapter>
    );
  }

  if (bloco.tipo === "processo") {
    return (
      <Chapter n={n} title={bloco.titulo} ground={ground}>
        <ChapterHead n={n}>{bloco.titulo}</ChapterHead>
        <ol className="mt-8 grid gap-0 border-t border-rule">
          {bloco.passos.map((passo, i) => (
            <li key={passo.titulo} className="flex gap-5 border-b border-rule py-6">
              <span className="tabular shrink-0 text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h4">{passo.titulo}</h3>
                <p className="mt-2 max-w-measure text-ink-soft">{passo.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>
    );
  }

  if (bloco.tipo === "prova") {
    const casos = bloco.caseSlugs
      .map(getCase)
      .filter((c): c is NonNullable<typeof c> => Boolean(c));

    return (
      <Chapter n={n} title={bloco.titulo} ground={ground}>
        <ChapterHead
          n={n}
          standfirst="Com o print do gerenciador ao lado. Nenhum número aqui existe sem a imagem que o sustenta."
        >
          {bloco.titulo}
        </ChapterHead>

        <div className="mt-9 grid gap-9 lg:grid-cols-2">
          {casos.map((caso) => (
            <article key={caso.slug} className="rule-top pt-6">
              <p className="eyebrow mb-3">
                {caso.segmento} · {caso.objetivo}
              </p>
              <h3 className="text-h4">
                <Link href={`/cases/${caso.slug}`} className="link">
                  {caso.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-measure text-ink-soft">{caso.leitura}</p>
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
    );
  }

  // FAQ
  return (
    <Chapter n={n} title={bloco.titulo} ground={ground}>
      <Faq titulo={bloco.titulo} perguntas={bloco.perguntas} />
      <p className="mt-9 text-sm text-ink-soft">
        Outra dúvida? Escreva no{" "}
        <WhatsAppLink origem={`${origem}-faq`}>WhatsApp</WhatsAppLink>.
      </p>
    </Chapter>
  );
}
