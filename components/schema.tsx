import { site, services } from "@/lib/site";

/**
 * Dados estruturados. O site antigo não tinha uma única linha de JSON-LD.
 *
 * Regra que vale para tudo aqui: não declarar em schema nada que não apareça
 * na página. Sem `aggregateRating` (não há base de avaliações verificada),
 * sem `review` de depoimento não confirmado, sem FAQPage onde não existe FAQ
 * visível.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é gerado no servidor a partir de constantes do próprio
      // repositório. Não há entrada de usuário neste caminho.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfessionalService",
            "@id": `${site.url}/#organizacao`,
            name: site.name,
            alternateName: site.shortName,
            url: site.url,
            description: site.description,
            email: site.contact.email,
            telephone: `+${site.contact.whatsapp}`,
            areaServed: { "@type": "Country", name: "Brasil" },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tatuí",
              addressRegion: "SP",
              addressCountry: "BR",
            },
            founder: { "@id": `${site.url}/#diego` },
            // `sameAs` so entra se houver perfil publico: declarar um perfil
            // privado nao ajuda desambiguacao de entidade e fica pendurado no grafo.
            ...(site.contact.instagram
              ? { sameAs: [site.contact.instagram] }
              : {}),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Serviços",
              itemListElement: services.map((s) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: s.label,
                  description: s.description,
                  url: `${site.url}${s.href}`,
                },
              })),
            },
          },
          {
            "@type": "Person",
            "@id": `${site.url}/#diego`,
            name: site.person,
            url: `${site.url}/sobre`,
            jobTitle: "Consultor de estrutura digital",
            worksFor: { "@id": `${site.url}/#organizacao` },
            knowsAbout: [
              "Tráfego pago",
              "Meta Ads",
              "Google Ads",
              "Landing pages",
              "Google Tag Manager",
              "Mensuração e trackeamento",
              "Google Analytics 4",
            ],
            ...(site.contact.instagram
              ? { sameAs: [site.contact.instagram] }
              : {}),
          },
          {
            "@type": "WebSite",
            "@id": `${site.url}/#site`,
            url: site.url,
            name: site.name,
            inLanguage: "pt-BR",
            publisher: { "@id": `${site.url}/#organizacao` },
          },
        ],
      }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Início", href: "/" },
          ...trail,
        ].map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.href}`,
        })),
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${site.url}${href}`,
        serviceType: name,
        provider: { "@id": `${site.url}/#organizacao` },
        areaServed: { "@type": "Country", name: "Brasil" },
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  slug,
  published,
  updated,
}: {
  title: string;
  description: string;
  slug: string;
  published: string;
  updated?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: `${site.url}/blog/${slug}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${slug}` },
        datePublished: published,
        dateModified: updated ?? published,
        inLanguage: "pt-BR",
        author: { "@id": `${site.url}/#diego` },
        publisher: { "@id": `${site.url}/#organizacao` },
      }}
    />
  );
}

export function CaseSchema({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${site.url}/cases/${slug}`,
        inLanguage: "pt-BR",
        author: { "@id": `${site.url}/#diego` },
        publisher: { "@id": `${site.url}/#organizacao` },
      }}
    />
  );
}
