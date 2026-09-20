import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { WhatsAppLink } from "@/components/cta";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * Página de confirmação.
 *
 * `noindex` de propósito: ela não tem valor de busca e, indexada, apareceria em
 * resultado orgânico disparando conversão para quem nunca preencheu nada.
 *
 * É a única página do site em que o pageview PODE ser configurado como
 * conversão no GTM, e mesmo assim a recomendação é usar o evento
 * `diagnostico_submit`, que é mais preciso. Ver docs/MEDICAO.md.
 */
export const metadata: Metadata = {
  title: "Pedido recebido",
  description: "Confirmação de envio do pedido de diagnóstico.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <>
      <PageHeader
        kicker="Recebido"
        title="Pronto. Agora é comigo."
        standfirst={
          <>
            Se a janela do WhatsApp abriu, confira a mensagem e envie. É o que
            me chega primeiro. Se não abriu, o botão abaixo resolve.
          </>
        }
      >
        <p className="text-lead">
          <WhatsAppLink origem="obrigado">
            Abrir a conversa no WhatsApp
          </WhatsAppLink>
        </p>
      </PageHeader>

      <Chapter n="01" title="O que acontece agora" ground="graphite">
        <div className="grid gap-11 lg:grid-cols-[1fr_1fr] lg:gap-13">
          <div className="max-w-measure">
            <h2 className="text-h3">O que acontece agora</h2>
            <ol className="mt-7 grid gap-5">
              {[
                ["Eu olho o que existe", "Site, campanhas, perfil no Google. Chego na conversa já tendo visto."],
                ["Respondo em até um dia útil", "Com um horário sugerido, ou dizendo com franqueza que não é o meu escopo."],
                ["Conversamos por 30 a 40 minutos", "Você sai com a ordem do que fazer primeiro, contratando ou não."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="tabular shrink-0 text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-medium">{t}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-sm text-ink-soft">
              Se for urgente, escreva direto:{" "}
              <WhatsAppLink origem="obrigado-urgente">
                {site.contact.whatsappDisplay}
              </WhatsAppLink>
            </p>
          </div>

          {posts.length > 0 && (
            <div>
              <h2 className="eyebrow mb-5">Enquanto isso</h2>
              <ul className="grid gap-0 border-t border-rule">
                {posts.map((p) => (
                  <li key={p.slug} className="border-b border-rule py-5">
                    <h3 className="font-medium">
                      <Link href={`/blog/${p.slug}`} className="link">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-soft">
                      {p.description}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <Link href="/estrutura-digital" className="link">
                  Ou veja o método completo, em oito etapas
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </Chapter>
    </>
  );
}
