/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Há um package-lock.json solto na pasta do usuário que faz o Turbopack
  // procurar a raiz do projeto fora do repositório. Fixar a raiz elimina o aviso.
  turbopack: { root: import.meta.dirname },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // As rotas antigas já estão indexadas. Mantê-las vivas com 301 preserva o
      // histórico de SEO e qualquer link que já tenha sido compartilhado.
      { source: "/trafego", destination: "/servicos/trafego-pago", permanent: true },
      { source: "/site", destination: "/portfolio", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "Link", value: '</llms.txt>; rel="describedby"' },
        ],
      },
    ];
  },
};

export default nextConfig;
