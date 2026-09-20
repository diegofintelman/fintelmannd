import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { PageHeader } from "@/components/page-header";
import { Chapter, ChapterHead } from "@/components/chapter";
import { MarginNote } from "@/components/margin-note";
import { Cta } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Diego Fintelman",
  description:
    "Como eu trabalho, no que acredito sobre estrutura digital, e o que eu recuso fazer. Sem biografia genérica.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Sobre", href: "/sobre" }]} />

      <PageHeader
        kicker="Sobre"
        title="Eu não entrego apenas anúncios"
        trail={[{ name: "Sobre", href: "/sobre" }]}
        standfirst={
          <>
            Ajudo a construir a estrutura que transforma atenção em oportunidade
            de negócio. Esta página é sobre como eu trabalho e o que eu recuso
            fazer. É mais útil, para quem está avaliando um fornecedor, do que
            uma linha do tempo de carreira.
          </>
        }
      />

      <Chapter n="01" title="Como eu cheguei aqui" withMargin>
        <div className="grid gap-11 lg:grid-cols-[1.3fr_1fr] lg:gap-13">
          <div className="max-w-measure">
            <ChapterHead n="01">Por que estrutura, e não tráfego</ChapterHead>

            <p className="text-lead">
              Comecei fazendo o que quase todo mundo faz: gestão de campanha.
              Meta Ads, Google Ads, otimização dentro da plataforma.
            </p>

            <p className="mt-5 text-ink-soft">
              O padrão que apareceu foi sempre o mesmo. As métricas da campanha
              melhoravam, e o cliente continuava insatisfeito. Não porque
              estivesse sendo injusto: porque o que ele precisava que
              acontecesse acontecia depois do clique, num lugar que eu não
              tinha sido contratado para olhar.
            </p>

            <MarginNote>
              A primeira vez que isso ficou óbvio foi num projeto em que a
              análise de funil mostrou que o gargalo estava no checkout. Mais
              tráfego em cima daquilo teria sido dinheiro jogado fora, e era
              exatamente o que estava para ser contratado.
            </MarginNote>

            <p className="mt-5 text-ink-soft">
              A partir daí eu parei de vender mídia isolada. Não por
              posicionamento de marketing — por não conseguir mais defender uma
              entrega cujo resultado dependia de cinco coisas que estavam fora
              do meu escopo.
            </p>

            <p className="mt-5 text-ink-soft">
              Hoje o trabalho começa pela pergunta de qual etapa está faltando.
              Às vezes a resposta é tráfego. Com frequência não é, e dizer isso
              custa um contrato no curto prazo e evita um cliente insatisfeito
              no médio.
            </p>
          </div>

          <figure>
            <Image
              src="/brand/diego.jpg"
              alt="Diego Fintelman"
              width={900}
              height={1100}
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="h-auto w-full border border-rule"
            />
            <figcaption className="mt-3 text-sm text-ink-soft">
              Diego Fintelman. Operação em {site.region}, atendimento remoto em
              todo o Brasil.
            </figcaption>
          </figure>
        </div>
      </Chapter>

      <Chapter n="02" title="Como eu trabalho" ground="graphite">
        <ChapterHead
          n="02"
          standfirst="São regras de operação, não valores de institucional. Cada uma delas já custou dinheiro em algum momento, e é por isso que estão escritas."
        >
          Seis regras que eu sigo
        </ChapterHead>

        <ol className="mt-9 grid gap-0 border-t border-rule">
          {[
            [
              "Auditar antes de mexer",
              "Nenhuma tag nova antes de mapear as que existem. Nenhuma campanha pausada antes de entender o que ela aprendeu. O histórico foi pago; descartar é desperdício.",
            ],
            [
              "Não prometer número",
              "Não trabalho com garantia de resultado. Quem garante ROI está garantindo o comportamento de um mercado que não controla, ou pretende escolher a métrica depois.",
            ],
            [
              "Não publicar o que não posso provar",
              "Nenhuma métrica neste site existe sem print. Nenhum depoimento aparece sem link para a avaliação original. É o motivo de o site ter menos números que o dos concorrentes.",
            ],
            [
              "Entregar a documentação",
              "Plano de medição, nomenclatura, o que foi testado e por quê. Fica com o cliente. Um fornecedor que é insubstituível porque só ele entende o próprio trabalho não é um bom fornecedor.",
            ],
            [
              "Acesso no nome do cliente",
              "Conta de anúncio, domínio, hospedagem e container sempre no nome de quem paga. Eu entro como usuário. É o tipo de coisa que só vira problema no dia em que a relação termina.",
            ],
            [
              "Dizer quando não é comigo",
              "Se o gargalo está em preço, produto, time comercial ou operação, eu digo — mesmo quando havia proposta na mesa.",
            ],
          ].map(([titulo, texto], i) => (
            <li key={titulo} className="flex gap-5 border-b border-rule py-6">
              <span className="tabular shrink-0 text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h4">{titulo}</h3>
                <p className="mt-2 max-w-measure text-ink-soft">{texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter n="03" title="A operação">
        <div className="grid gap-11 lg:grid-cols-2 lg:gap-13">
          <div className="max-w-measure">
            <ChapterHead n="03">Quem faz o trabalho</ChapterHead>

            <p>
              A operação é conduzida por mim. Estratégia, mídia, medição e
              construção de páginas passam pela minha mão. Não existe camada de
              atendimento entre você e quem executa.
            </p>

            <p className="mt-5 text-ink-soft">
              Para as frentes de conteúdo, design e edição, conto com{" "}
              <strong className="font-medium text-ink">Gabriela Fintelman</strong>,
              que responde por social media, copywriting, design criativo e
              edição de vídeo. Quando o escopo pede produção que está fora
              disso, eu contrato e coordeno, e digo que estou contratando.
            </p>

            <p className="mt-5 text-ink-soft">
              Não é uma agência, e não finge ser. A vantagem de trabalhar assim
              é que a pessoa que vende é a mesma que executa e a mesma que
              responde quando algo dá errado. A limitação é o volume: há um
              número finito de contas que dá para atender bem ao mesmo tempo.
            </p>
          </div>

          <div className="max-w-measure">
            <p className="eyebrow mb-5">Com quem eu trabalho</p>
            <ul className="grid gap-0 border-t border-rule">
              {[
                ["Empresas B2B", "Que vendem para outras empresas, com ciclo de decisão real e ticket que justifica estrutura."],
                ["Negócios locais com ticket alto", "Clínicas, consultórios e serviços especializados que dependem de ser encontrados na região."],
                ["Agências", "Como parceiro de execução, sob a marca delas."],
                ["Infoprodutos com operação séria", "Não lançamento de promessa; produto com entrega e suporte."],
              ].map(([t, d]) => (
                <li key={t} className="border-b border-rule py-4">
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{d}</p>
                </li>
              ))}
            </ul>

            <p className="mt-7">
              <Link href="/para-agencias" className="link font-medium">
                A parceria com agências funciona assim
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-11 max-w-column rule-top pt-8">
          <Cta origem="sobre-fim" />
        </div>
      </Chapter>
    </>
  );
}
