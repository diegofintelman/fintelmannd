import type { MetadataRoute } from "next";

import { site, services } from "@/lib/site";
import { cases } from "@/lib/cases";
import { getAllPosts } from "@/lib/blog";
import { landingPages } from "@/lib/landing-pages";

/**
 * O sitemap antigo tinha três URLs, apontava para o domínio sem `www`, que
 * responde 307 para o `www`, e não tinha `lastmod`. Este é gerado do mesmo
 * lugar de onde as páginas nascem, então não há como uma rota existir e ficar
 * de fora.
 *
 * Páginas fora do índice de propósito: /obrigado (página de conversão, não tem
 * valor de busca) e as LPs marcadas como `noindex`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const hoje = new Date().toISOString().split("T")[0];

  const estaticas: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "monthly" },
    { path: "/estrutura-digital", priority: 0.9, changeFrequency: "monthly" },
    { path: "/servicos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/cases", priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
    { path: "/presenca-digital-lucrativa", priority: 0.8, changeFrequency: "monthly" },
    { path: "/para-agencias", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sobre", priority: 0.7, changeFrequency: "yearly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/diagnostico", priority: 0.9, changeFrequency: "yearly" },
    { path: "/contato", priority: 0.6, changeFrequency: "yearly" },
    { path: "/politica-de-privacidade", priority: 0.2, changeFrequency: "yearly" },
    { path: "/politica-de-cookies", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...estaticas.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: hoje,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),

    ...services.map((s) => ({
      url: `${site.url}${s.href}`,
      lastModified: hoje,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...cases.map((c) => ({
      url: `${site.url}/cases/${c.slug}`,
      lastModified: hoje,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),

    ...getAllPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.updated ?? p.published,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),

    ...landingPages
      .filter((lp) => lp.indexavel)
      .map((lp) => ({
        url: `${site.url}/lp/${lp.slug}`,
        lastModified: hoje,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ];
}
