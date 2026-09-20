import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Imagem de compartilhamento.
 *
 * O site antigo apontava `og:image` para a arte genérica da plataforma em que
 * tinha sido montado. Resultado: todo link compartilhado no WhatsApp ou no
 * LinkedIn exibia a marca de outra empresa, para todo prospect que recebia.
 *
 * Esta é gerada no build, no mesmo sistema tipográfico do site.
 */

export const alt = `${site.person} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f0e7",
          color: "#17150f",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 40, height: 2, backgroundColor: "#7a5c28" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#575144",
            }}
          >
            {site.person}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 940,
          }}
        >
          Tráfego não conserta estrutura fraca.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #d9d2c2",
            paddingTop: 28,
            fontSize: 24,
            color: "#575144",
          }}
        >
          <div style={{ display: "flex", maxWidth: 640 }}>
            Estrutura digital para aquisição, autoridade e crescimento
          </div>
          <div style={{ display: "flex", color: "#7a5c28" }}>
            fintelmannd.com.br
          </div>
        </div>
      </div>
    ),
    size
  );
}
