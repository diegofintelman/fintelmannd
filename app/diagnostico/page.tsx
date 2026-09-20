import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { DiagnosticoForm } from "@/components/diagnostico-form";
import { WhatsAppLink } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pedir diagnóstico",
  description:
    "Uma conversa de 30 a 40 minutos sobre o que já existe no seu digital: página, campanha, medição e o caminho do lead depois do clique.",
  alternates: { canonical: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Diagnóstico", href: "/diagnostico" }]} />

      <PageHeader
        kicker="Diagnóstico"
        title="Uma conversa antes de qualquer proposta"
        trail={[{ name: "Diagnóstico", href: "/diagnostico" }]}
        standfirst={
          <>
            30 a 40 minutos olhando o que já existe. Você sai com a ordem do que
            precisa ser feito, tenha contratado alguma coisa ou não. Se o que
            você precisa não for o que eu faço, eu digo na própria conversa.
          </>
        }
      />

      <Chapter n="01" title="O formulário">
        <div className="grid gap-11 lg:grid-cols-[1.25fr_1fr] lg:gap-13">
          <div>
            <DiagnosticoForm />
          </div>

          <aside className="lg:pt-2">
            <div className="rule-top pt-7">
              <h2 className="eyebrow mb-5">O que acontece depois</h2>
              <ol className="grid gap-5">
                {[
                  [
                    "Eu leio e olho o que existe",
                    "Site, campanhas ativas, perfil no Google. Chego na conversa já tendo visto.",
                  ],
                  [
                    "Respondo em até um dia útil",
                    "Com horário sugerido, ou dizendo que não é meu escopo, e para quem faz sentido levar.",
                  ],
                  [
                    "A conversa acontece",
                    "Por chamada de vídeo, com tela compartilhada quando ajuda.",
                  ],
                  [
                    "Proposta, se fizer sentido",
                    "Com escopo, prazo e o que fica sob sua responsabilidade. Nada começa antes disso por escrito.",
                  ],
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
            </div>

            <div className="rule-top mt-9 pt-7">
              <h2 className="eyebrow mb-4">Prefere não preencher?</h2>
              <p className="text-sm text-ink-soft">
                Escreva direto no WhatsApp{" "}
                <WhatsAppLink origem="diagnostico-aside">
                  {site.contact.whatsappDisplay}
                </WhatsAppLink>{" "}
                ou por e-mail em{" "}
                <a className="link" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
                .
              </p>
              <p className="mt-4 text-sm text-ink-soft">
                O formulário existe porque as respostas dele fazem a conversa
                render, não porque eu precise do seu dado.
              </p>
            </div>
          </aside>
        </div>
      </Chapter>
    </>
  );
}
