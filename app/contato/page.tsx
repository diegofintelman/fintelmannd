import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { WhatsAppLink, Cta, ExternalLink } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "WhatsApp, e-mail e o que esperar de cada canal. Atendimento remoto para todo o Brasil, com base em Tatuí, SP.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Contato", href: "/contato" }]} />

      <PageHeader
        kicker="Contato"
        title="Onde falar comigo"
        trail={[{ name: "Contato", href: "/contato" }]}
        standfirst={
          <>
            Se o assunto for contratar, o caminho mais curto é o{" "}
            <Link href="/diagnostico" className="link">
              diagnóstico
            </Link>
            : as respostas do formulário fazem a primeira conversa render. Para
            qualquer outra coisa, os canais estão abaixo.
          </>
        }
      />

      <Chapter n="01" title="Canais">
        <dl className="grid gap-0 border-t border-rule">
          {[
            {
              termo: "WhatsApp",
              valor: <WhatsAppLink origem="contato">{site.contact.whatsappDisplay}</WhatsAppLink>,
              nota: "O canal mais rápido. Respondo em horário comercial, de segunda a sexta.",
            },
            {
              termo: "E-mail",
              valor: (
                <a className="link" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              ),
              nota: "Para proposta, contrato, nota fiscal e qualquer coisa que precise ficar registrada.",
            },
            ...(site.contact.instagram
              ? [
                  {
                    termo: "Instagram",
                    valor: (
                      <ExternalLink
                        href={site.contact.instagram}
                        origem="contato"
                      >
                        {site.contact.instagramHandle}
                      </ExternalLink>
                    ),
                    nota: "Bastidor do trabalho. Não é canal de atendimento comercial.",
                  },
                ]
              : []),
            {
              termo: "Base",
              valor: <span>{site.region}</span>,
              nota: "Atendimento remoto para todo o Brasil. Presencial na região, quando o projeto justifica.",
            },
          ].map((item) => (
            <div
              key={item.termo}
              className="grid gap-x-9 gap-y-2 border-b border-rule py-6 lg:grid-cols-[10rem_18rem_1fr]"
            >
              <dt className="eyebrow">{item.termo}</dt>
              <dd className="text-h4">{item.valor}</dd>
              <dd className="max-w-measure text-sm text-ink-soft">{item.nota}</dd>
            </div>
          ))}
        </dl>
      </Chapter>

      <Chapter n="02" title="Antes de escrever" ground="graphite">
        <div className="grid gap-11 lg:grid-cols-2 lg:gap-13">
          <div className="max-w-measure">
            <h2 className="text-h3">Três coisas que ajudam a primeira resposta</h2>
            <ul className="mt-7 grid gap-5">
              {[
                ["O endereço do seu site ou perfil", "Eu olho antes de responder. Muda completamente a qualidade da primeira conversa."],
                ["O que você já tentou", "Saber o que não funcionou economiza uma reunião inteira."],
                ["Se já existe campanha rodando", "E há quanto tempo. O histórico é informação, não constrangimento."],
              ].map(([t, d]) => (
                <li key={t}>
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-measure">
            <h2 className="text-h3">O que eu não faço</h2>
            <p className="mt-5 text-ink-soft">
              Para poupar o seu tempo: não trabalho com garantia de resultado em
              número, não compro nem produzo avaliação, não faço gestão de
              redes sociais orgânicas como serviço isolado e não assumo conta de
              anúncio registrada no meu nome.
            </p>
            <p className="mt-5 text-ink-soft">
              Se o seu gargalo está em preço, produto ou time comercial, eu digo,
             e quando der, indico quem faz.
            </p>

            <div className="mt-8">
              <Cta origem="contato-fim" />
            </div>
          </div>
        </div>
      </Chapter>
    </>
  );
}
