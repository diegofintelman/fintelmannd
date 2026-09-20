import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Chapter, ChapterHead } from "@/components/chapter";
import { MarginNote } from "@/components/margin-note";
import { Cta, WhatsAppLink } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Para agências: execução white-label de tráfego, páginas e tracking",
  description:
    "Sou contratado por agências para executar tráfego pago, landing pages e trackeamento sob a marca delas. Entrada discreta, entrega documentada, sem disputa pelo cliente.",
  alternates: { canonical: "/para-agencias" },
};

export default function ParaAgenciasPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Para agências", href: "/para-agencias" }]} />

      <PageHeader
        kicker="Parceria"
        title="Quando a agência precisa de mão, não de concorrente"
        trail={[{ name: "Para agências", href: "/para-agencias" }]}
        standfirst={
          <>
            Executo tráfego pago, landing pages e trackeamento para agências, sob
            a marca delas. A relação comercial é com a agência; o cliente final é
            da agência, e continua sendo.
          </>
        }
      >
        <Cta origem="para-agencias-topo" label="Conversar sobre parceria" />
      </PageHeader>

      {/* --- O problema específico de quem toca agência --- */}
      <Chapter n="01" title="O gargalo" ground="graphite" withMargin>
        <ChapterHead
          n="01"
          standfirst="Quase toda agência pequena e média chega em um ponto em que a demanda existe, o time não cabe, e contratar alguém fixo para uma disciplina específica não fecha a conta."
        >
          Três situações em que costumo ser chamado
        </ChapterHead>

        <div className="max-w-column">
          <ol className="grid gap-0 border-t border-rule">
            {[
              [
                "A conta chegou e o time está cheio",
                "Você não quer recusar, mas colocar mais uma conta na fila do mesmo gestor significa entregar as duas pior. A alternativa é uma mão a mais que entra pronta, sem treinar.",
              ],
              [
                "O cliente pediu uma coisa que não é o seu forte",
                "A agência é boa em conteúdo e branding, e o cliente quer mensuração server-side. Contratar alguém fixo para isso não se paga; terceirizar sim.",
              ],
              [
                "A campanha não performa e ninguém sabe por quê",
                "Às vezes o que falta não é gente, é um segundo par de olhos que leia o funil inteiro e diga onde está o gargalo — inclusive quando o gargalo é a página que a própria agência fez.",
              ],
            ].map(([titulo, texto], i) => (
              <li key={titulo} className="flex gap-5 border-b border-rule py-6">
                <span className="tabular shrink-0 text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h4">{titulo}</h3>
                  <p className="mt-2 text-ink-soft">{texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <MarginNote>
            O terceiro caso é o mais delicado, porque o diagnóstico honesto às
            vezes aponta para um trabalho que a agência já entregou. Eu reporto
            isso para a agência, nunca para o cliente final.
          </MarginNote>
        </div>
      </Chapter>

      {/* --- As regras da parceria: é o que tira o medo --- */}
      <Chapter n="02" title="As regras">
        <ChapterHead
          n="02"
          standfirst="O receio legítimo de toda agência ao terceirizar é perder a conta para o fornecedor. Estas são as regras que eu opero, e elas entram no contrato. Não ficam no boca a boca."
        >
          O que está combinado desde o começo
        </ChapterHead>

        <div className="mt-9 grid gap-0 border-t border-rule">
          {[
            [
              "Não prospecto o seu cliente",
              "Nem durante, nem depois. Se o cliente final me procurar diretamente, eu devolvo para você. Isso vale por escrito e sem prazo de validade.",
            ],
            [
              "A entrega sai com a sua marca",
              "Relatório, documentação e apresentação no template da agência. Onde eu apareço, e se eu apareço, é decisão sua.",
            ],
            [
              "Você escolhe se eu falo com o cliente",
              "Tem agência que prefere me colocar na call como especialista do time. Tem agência que prefere que eu não exista. As duas funcionam, desde que esteja claro antes de começar.",
            ],
            [
              "Acesso pelo mínimo necessário",
              "Usuário nomeado nas contas de anúncio e no GTM, com o nível de permissão que o trabalho exige. Sem senha compartilhada, sem login genérico.",
            ],
            [
              "A documentação fica com você",
              "Plano de medição, nomenclatura de campanha, o que foi testado e o porquê. Se a parceria acabar, a sua equipe consegue assumir sem arqueologia.",
            ],
            [
              "Prazo e escopo por escrito, por projeto",
              "Nada começa em conversa de WhatsApp. O que está dentro, o que está fora e quando entrega ficam num documento antes da primeira linha de trabalho.",
            ],
          ].map(([titulo, texto]) => (
            <article
              key={titulo}
              className="grid gap-x-9 gap-y-2 border-b border-rule py-6 lg:grid-cols-[20rem_1fr]"
            >
              <h3 className="text-h4">{titulo}</h3>
              <p className="max-w-measure text-ink-soft">{texto}</p>
            </article>
          ))}
        </div>
      </Chapter>

      {/* --- O que dá para terceirizar --- */}
      <Chapter n="03" title="O escopo" ground="graphite">
        <ChapterHead
          n="03"
          standfirst="Disciplinas inteiras ou peças avulsas. O mais comum é a agência manter estratégia e relacionamento e terceirizar a execução técnica."
        >
          O que costuma ser terceirizado
        </ChapterHead>

        <div className="mt-9 grid gap-9 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">Execução contínua</p>
            <ul className="grid gap-4">
              {[
                ["Gestão de tráfego pago", "Meta Ads e Google Ads, da estruturação à otimização mensal."],
                ["Manutenção de medição", "GTM, GA4 e conversões, com o container sob auditoria."],
                ["Produção de landing pages", "Páginas de campanha com medição instalada de fábrica."],
              ].map(([t, d]) => (
                <li key={t}>
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Projeto pontual</p>
            <ul className="grid gap-4">
              {[
                ["Implantação de trackeamento", "Do plano de medição à validação, com documentação entregue."],
                ["Auditoria de campanha", "Segundo par de olhos em uma conta que não performa."],
                ["Site institucional ou LP", "Construção, com SEO técnico e medição já resolvidos."],
                ["Migração de medição", "Quando o container herdado não é mais confiável."],
              ].map(([t, d]) => (
                <li key={t}>
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-measure text-ink-soft">
          O modelo comercial varia: retainer mensal por conta, valor fechado por
          projeto, ou hora técnica para apoio pontual. Qual faz sentido depende
          do volume e da previsibilidade, e é o tipo de coisa que se resolve em
          uma conversa, não em uma tabela de preço genérica.
        </p>
      </Chapter>

      <Chapter n="04" title="Conversar">
        <div className="max-w-column">
          <ChapterHead
            n="04"
            standfirst="Uma conversa para entender o volume, o tipo de conta e o modelo que faz sentido. Se houver NDA da sua parte, assino antes de qualquer detalhe de cliente entrar na conversa."
          >
            Próximo passo
          </ChapterHead>

          <div className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-5">
            <Cta origem="para-agencias-fim" label="Conversar sobre parceria" />
            <p className="text-sm text-ink-soft">
              Ou direto no{" "}
              <WhatsAppLink origem="para-agencias">
                {site.contact.whatsappDisplay}
              </WhatsAppLink>
            </p>
          </div>

          <p className="mt-9 text-sm text-ink-soft">
            Se você chegou aqui procurando contratar para a sua própria empresa,
            e não para clientes,{" "}
            <Link href="/servicos" className="link">
              os serviços estão aqui
            </Link>
            .
          </p>
        </div>
      </Chapter>
    </>
  );
}
