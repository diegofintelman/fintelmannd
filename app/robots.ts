import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * O robots.txt do site antigo já era bom — liberava explicitamente GPTBot,
 * ClaudeBot, PerplexityBot e OAI-SearchBot e declarava Content-Signal. Isso é
 * preservado aqui, agora gerado a partir da constante do domínio, para o
 * sitemap não voltar a apontar para o host errado.
 *
 * A escolha de deixar os bots de IA entrarem é deliberada: o objetivo do
 * projeto é autoridade, e ser citado por um assistente é distribuição.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/obrigado", "/api/"],
      },
      // Buscadores de IA: liberados de propósito.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
