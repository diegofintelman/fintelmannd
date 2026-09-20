import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Chapter, ChapterHead } from "@/components/chapter";
import { MarginNote } from "@/components/margin-note";
import { Cta } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { etapas } from "@/lib/metodo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Estrutura digital: o método em oito etapas",
  description:
    "O método completo, etapa por etapa, com o que costuma dar errado em cada uma. Da definição da oferta à otimização, passando pela medição, que vem antes.",
  alternates: { canonical: "/estrutura-digital" },
};

/** O que costuma dar errado em cada etapa. É a parte que um concorrente não copia,
 *  porque exige ter passado por isso. */
const armadilhas: Record<string, string> = {
  "01": "Pular direto para “qual canal”. Canal é consequência de quem é o cliente e de quanto tempo ele leva para decidir. Escolher canal primeiro é escolher a resposta antes da pergunta.",
  "02": "Confundir oferta com preço. Oferta é o que a pessoa leva, em quanto tempo, com qual risco. Baixar o preço de uma oferta confusa só acelera a confusão.",
  "03": "Tratar o site como folheto. Se ele existe só para “ter site”, ele não sustenta nada, e a primeira coisa que um lead de indicação faz é procurar a empresa.",
  "04": "Julgar o canal pelos primeiros dez dias. Sem volume, o que se está lendo é ruído. E aumentar a verba para “acelerar o aprendizado” costuma só acelerar o gasto.",
  "05": "Achar que o trabalho termina no clique. Tempo de resposta no WhatsApp muda mais o resultado do mês do que a maioria dos ajustes de público.",
  "06": "Comprar o mesmo contato duas vezes. Sem base própria, quem não fechou volta a ser lead pago no mês seguinte, pelo mesmo preço.",
  "07": "Instalar tag sem plano. Um container com quarenta tags e nenhuma documentação é um sistema que ninguém audita e que mede a coisa errada em silêncio.",
  "08": "Otimizar pela métrica que aparece primeiro. CTR alto com conversão baixa costuma ser criativo que promete o que a página não entrega.",
};

export default function EstruturaDigitalPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[{ name: "Estrutura digital", href: "/estrutura-digital" }]}
      />

      <PageHeader
        kicker="O método"
        title="Estrutura digital, em oito etapas"
        trail={[{ name: "Estrutura digital", href: "/estrutura-digital" }]}
        standfirst={
          <>
            A ordem é o argumento. Cada etapa responde a uma pergunta, entrega
            uma coisa concreta e depende da anterior. É por isso que mensuração
            vem antes de otimização, e não porque soe mais organizado assim.
          </>
        }
      >
        <Cta origem="estrutura-digital-topo" />
      </PageHeader>

      <Chapter n="01" title="Por que a ordem importa" ground="graphite" withMargin>
        <ChapterHead
          n="01"
          standfirst="Porque cada etapa produz a matéria-prima da seguinte. Ligar tráfego antes de instalar medição não é atalho: é abrir mão de saber o que aconteceu com o primeiro mês de verba."
        >
          A ordem não é preferência organizacional
        </ChapterHead>

        <div className="max-w-column">
          <p className="text-lead">
            Um negócio que contrata as oito etapas fora de ordem não recebe um
            resultado pior. Recebe um resultado que não dá para interpretar, e
            um resultado ininterpretável não gera a decisão do ciclo seguinte.
          </p>

          <MarginNote>
            É a razão de eu recusar trabalho de tráfego quando não há medição e
            o cliente não quer instalar. Não é rigidez: é que eu não teria como
            defender, no segundo mês, por que mantive ou cortei alguma coisa.
          </MarginNote>

          <p className="mt-6 text-ink-soft">
            Na prática, quase todo projeto que chega já tem quatro ou cinco
            etapas feitas, de forma desigual, por fornecedores diferentes. O
            trabalho raramente é construir do zero. É descobrir qual etapa está
            faltando e por que as outras não compensam a ausência dela.
          </p>
        </div>
      </Chapter>

      <Chapter n="02" title="As oito etapas">
        <ChapterHead
          n="02"
          standfirst="Para cada uma: a pergunta que ela responde, o que entrega, e o erro que eu mais vejo."
        >
          As etapas, uma a uma
        </ChapterHead>

        <div className="mt-10 grid gap-0 border-t border-rule">
          {etapas.map((etapa) => (
            <article
              key={etapa.n}
              id={`etapa-${etapa.n}`}
              className="grid gap-x-11 gap-y-5 border-b border-rule py-9 lg:grid-cols-[14rem_1fr]"
            >
              <div>
                <p className="tabular text-sm text-accent">{etapa.n}</p>
                <h2 className="mt-2 text-h3">{etapa.nome}</h2>
                <p className="mt-2 text-sm italic text-ink-soft">
                  {etapa.pergunta}
                </p>
              </div>

              <div className="max-w-measure">
                <p>{etapa.descricao}</p>

                <p className="mt-5 text-sm">
                  <span className="eyebrow mr-2">Entrega</span>
                  {etapa.entrega}
                </p>

                <div className="mt-6 border-l-2 border-[var(--accent)] pl-5">
                  <p className="eyebrow mb-2">O que costuma dar errado</p>
                  <p className="text-ink-soft">{armadilhas[etapa.n]}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter n="03" title="Por onde começar" ground="graphite">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-13">
          <div>
            <ChapterHead
              n="03"
              standfirst="Quase nunca pelo começo. A conversa de diagnóstico existe para descobrir em qual etapa está o gargalo, e para dizer com franqueza quando o gargalo não é do meu escopo."
            >
              Não se começa pela etapa 01
            </ChapterHead>

            <div className="mt-8">
              <Cta origem="estrutura-digital-fim" />
            </div>
          </div>

          <div className="max-w-measure">
            <p className="eyebrow mb-4">Cada etapa tem um serviço por trás</p>
            <ul className="grid gap-3">
              <li>
                <Link href="/servicos/trafego-pago" className="link">
                  Tráfego pago
                </Link>{" "}
                <span className="text-ink-soft">— etapa 04</span>
              </li>
              <li>
                <Link href="/servicos/sites-e-landing-pages" className="link">
                  Sites e landing pages
                </Link>{" "}
                <span className="text-ink-soft">— etapas 03 e 05</span>
              </li>
              <li>
                <Link href="/servicos/trackeamento-e-dados" className="link">
                  Trackeamento e dados
                </Link>{" "}
                <span className="text-ink-soft">— etapas 07 e 08</span>
              </li>
              <li>
                <Link href="/servicos/criativos" className="link">
                  Criativos
                </Link>{" "}
                <span className="text-ink-soft">— etapa 04</span>
              </li>
              <li>
                <Link href="/servicos/google-meu-negocio" className="link">
                  Google Meu Negócio
                </Link>{" "}
                <span className="text-ink-soft">— etapa 03</span>
              </li>
            </ul>

            <p className="mt-7 text-sm text-ink-soft">
              As etapas 02 e 06 — oferta e relacionamento: não são vendidas
              separadas. Aparecem dentro do trabalho das outras, porque sozinhas
              não se sustentam como contrato.
            </p>
          </div>
        </div>
      </Chapter>
    </>
  );
}
