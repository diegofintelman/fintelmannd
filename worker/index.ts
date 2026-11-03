// Worker da Cloudflare: equivalente ao middleware.ts usado na Vercel.
// - Responde aos caminhos especiais de /.well-known/ (auditorias de IA)
// - Entrega o llms-full.txt quando o agente pede Markdown (Accept: text/markdown)
// - Para o resto, serve os arquivos estáticos do build (SPA)

interface Env {
  ASSETS: { fetch: (request: Request | string) => Promise<Response> };
}

const LINK_HEADER = '</llms.txt>; rel="describedby"';

function withLink(response: Response): Response {
  const res = new Response(response.body, response);
  res.headers.set("Link", LINK_HEADER);
  return res;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const accept = request.headers.get("accept") || "";

    if (url.pathname === "/.well-known/api-catalog") {
      return withLink(
        new Response(JSON.stringify({ linkset: [] }), {
          status: 200,
          headers: { "Content-Type": "application/linkset+json; charset=utf-8" },
        })
      );
    }

    if (
      url.pathname === "/.well-known/openid-configuration" ||
      url.pathname === "/.well-known/oauth-authorization-server" ||
      url.pathname === "/.well-known/oauth-protected-resource"
    ) {
      return withLink(
        new Response(
          JSON.stringify({
            error: "not_supported",
            message: "This site does not offer APIs or OAuth authentication.",
          }),
          { status: 404, headers: { "Content-Type": "application/json; charset=utf-8" } }
        )
      );
    }

    if (accept.includes("text/markdown")) {
      const md = await env.ASSETS.fetch(new URL("/llms-full.txt", url.origin).toString());
      if (md.ok) {
        const content = await md.text();
        return withLink(
          new Response(content, {
            status: 200,
            headers: {
              "Content-Type": "text/markdown; charset=utf-8",
              "x-markdown-tokens": Math.round(content.length / 4).toString(),
            },
          })
        );
      }
    }

    return withLink(await env.ASSETS.fetch(request));
  },
};
