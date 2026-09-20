import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConsentBanner } from "@/components/consent";
import { OrganizationSchema } from "@/components/schema";

import "./globals.css";

/**
 * Playfair Display + Inter: as fontes do site original, preservadas.
 *
 * A diferença é como chegam. O site antigo carregava por <link> bloqueante do
 * Google Fonts, o que adiciona uma conexão externa ao caminho crítico e troca
 * a fonte na cara do visitante. Aqui o next/font hospeda no próprio domínio e
 * já entrega com `size-adjust`, então não há salto de layout.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.person} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.person} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.person} | ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Sem `icons` aqui de propósito: `app/icon.png` e `app/apple-icon.png` são
  // convenção de arquivo do App Router e já geram as tags, com hash de cache.
  other: {
    // Verificação de domínio da Meta — preservada do site antigo.
    "facebook-domain-verification": "jz5upzn3rbtc6te46lkfrd1ps9cv7v",
  },
};

export const viewport: Viewport = {
  themeColor: "#070606",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `data-scroll-behavior="smooth"` é obrigatório a partir do Next 16: o
    // framework deixou de sobrescrever `scroll-behavior` durante a navegação,
    // e sem este atributo cada troca de rota faz um scroll animado até o topo.
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* Aquece a conexão com o servidor de tags antes de o loader pedir o
            arquivo: economiza DNS, TCP e TLS no caminho crítico. */}
        <link rel="preconnect" href="https://ss.fintelmannd.com.br" crossOrigin="" />
        <link rel="dns-prefetch" href="https://ss.fintelmannd.com.br" />

        {/* ==================================================================
            MEDIÇÃO — dois scripts, nesta ordem, o mais alto possível.

            São `<script>` brutos, e não `next/script`, de propósito:

            1. `next/script` com `afterInteractive` (o padrão recomendado pelo
               Next para GTM) injeta o loader no FIM DO CORPO. Medido no HTML
               gerado: caía na posição 68.327, com o `</head>` em 5.291. Isso
               contraria a instrução do Stape e atrasa o disparo — quem sai em
               menos de um segundo não é contado.
            2. Script bruto renderiza exatamente onde está escrito, na ordem
               escrita. É o que garante que o consentimento venha ANTES do GTM,
               sem depender de como o framework ordena estratégias.

            O custo de performance aqui é baixo: o server-side roda em domínio
            próprio (`ss.fintelmannd.com.br`), então é first-party, não sofre
            bloqueio de extensão e reaproveita a conexão.
            ================================================================== */}

        {/* --- 1. Consent Mode v2: estado padrão, tudo negado ---------------
            Precisa rodar ANTES do GTM. Se rodar depois, as tags disparam uma
            vez antes de qualquer escolha e o consentimento vira formalidade. */}
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
          }}
        />

        {/* --- 2. Google Tag Manager, server-side em domínio próprio --------
            Snippet fornecido por Diego em 20/09/2026, conferido byte a byte.
            Container web: GTM-K3LD28KC. O container de servidor
            (GTM-5XWTVXWX) é configuração do Stape e NÃO vai no site.

            Trocar este endpoint derruba toda a medição já configurada. */}
        <script
          id="gtm-server-side"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://ss.fintelmannd.com.br/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K3LD28KC');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://ss.fintelmannd.com.br/ns.html?id=GTM-K3LD28KC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-[var(--canvas)]"
        >
          Pular para o conteúdo
        </a>

        <Header />
        <main id="conteudo">{children}</main>
        <Footer />

        <ConsentBanner />
        <OrganizationSchema />
      </body>
    </html>
  );
}
