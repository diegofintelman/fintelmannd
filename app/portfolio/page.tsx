import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Section, SectionHead } from "@/components/section";
import { SitesPortfolio } from "@/components/sites-portfolio";
import { Revelar, Halo } from "@/components/motion";
import { Cta } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { sites } from "@/lib/sites";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfólio de sites",
  description: `${sites.length} sites entregues e no ar, com endereço público para conferir. Sites institucionais e landing pages para clínicas, consultórios, imobiliárias e indústria.`,
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  const segmentos = new Set(sites.map((s) => s.categoria));

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Portfólio", href: "/portfolio" }]} />

      {/* ItemList com os projetos: ajuda o Google a entender a página como
          uma coleção, não como um texto com muitos links externos. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Portfólio de sites — Fintelman Negócios Digitais",
            numberOfItems: sites.length,
            itemListElement: sites.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.nome,
              url: s.url,
            })),
          }),
        }}
      />

      <PageHeader
        kicker="Portfólio"
        title="Sites entregues, com endereço público"
        trail={[{ name: "Portfólio", href: "/portfolio" }]}
        standfirst={
          <>
            <strong className="text-ink">{sites.length} projetos no ar</strong>,
            em {segmentos.size} segmentos. Todos acessíveis: clique e veja. É a
            única forma de portfólio que vale alguma coisa.
          </>
        }
      >
        <Cta origem="portfolio-topo" />
      </PageHeader>

      <Section>
        <SitesPortfolio />
      </Section>

      <Section tom="surface" comBrilho>
        <SectionHead
          olho="Como eu construo"
          titulo="O que vai junto em"
          destaque="todo site"
          descricao="Não é lista de recurso: é o que decide se a página cumpre função no processo de aquisição ou se é só um folheto bonito."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "HTML que o Google lê",
              "O conteúdo sai pronto do servidor. Sem isso, o site só existe para quem já sabia o endereço.",
            ],
            [
              "Metadados por página",
              "Título, descrição e URL canônica próprios. Páginas diferentes param de competir entre si.",
            ],
            [
              "Medição de fábrica",
              "Eventos de clique e de formulário nomeados e documentados no dia em que a página entra no ar.",
            ],
            [
              "Peso controlado",
              "Imagem otimizada, fonte auto-hospedada e nada de script que não sirva para nada.",
            ],
          ].map(([titulo, texto], i) => (
            <Revelar key={titulo} atraso={i * 80} as="div">
              <Halo className="h-full p-7">
                <h3 className="font-display text-lg text-ink">{titulo}</h3>
                <p className="mt-2.5 text-sm text-ink-soft">{texto}</p>
              </Halo>
            </Revelar>
          ))}
        </div>

        <Revelar atraso={140} as="div">
          <p className="mt-11 text-center text-lead">
            Detalhes do serviço em{" "}
            <Link href="/servicos/sites-e-landing-pages" className="link text-gold">
              sites e landing pages
            </Link>
            .
          </p>
        </Revelar>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Revelar as="div">
            <h2 className="text-h2">
              Quer o seu site nessa{" "}
              <span className="text-gold-gradient">lista?</span>
            </h2>
          </Revelar>
          <Revelar atraso={90} as="div">
            <p className="mx-auto mt-5 max-w-measure text-lead text-ink-soft">
              A conversa começa pelo que a página precisa fazer, não por quantas
              páginas você quer. Em metade dos casos é a primeira vez que alguém
              faz essa pergunta.
            </p>
          </Revelar>
          <Revelar atraso={160} as="div">
            <div className="mt-9 flex justify-center">
              <Cta origem="portfolio-fim" />
            </div>
          </Revelar>
          <Revelar atraso={220} as="div">
            <p className="mt-6 text-sm text-ink-soft">
              Ou escreva para{" "}
              <a className="link" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </p>
          </Revelar>
        </div>
      </Section>
    </>
  );
}
