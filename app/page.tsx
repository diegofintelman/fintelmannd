import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Section, SectionHead } from "@/components/section";
import { Revelar, Parallax, Halo, Contador } from "@/components/motion";
import { Cta, WhatsAppLink } from "@/components/cta";
import { Depoimentos } from "@/components/depoimentos";
import { cases } from "@/lib/cases";
import { etapas } from "@/lib/metodo";
import { sites } from "@/lib/sites";
import { services, site, produtoNav } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.person} | ${site.tagline}`,
  description:
    "Tráfego pago, sites que convertem e trackeamento confiável para empresas que precisam vender mais. Estratégia e execução conduzidas por Diego Fintelman.",
  alternates: { canonical: "/" },
};

/* Nichos: preservados do site original, com a linguagem ajustada. */
const nichos = [
  {
    titulo: "Negócios locais e consultórios",
    texto:
      "Quem depende de ser encontrado na região: clínicas, consultórios, estúdios, escolas, comércio e prestadores de serviço.",
    itens: [
      "Clínicas e consultórios",
      "Odontologia e estética",
      "Fisioterapia e pilates",
      "Escolas e cursos presenciais",
      "Comércio e lojas",
      "Prestadores de serviço",
    ],
  },
  {
    titulo: "Empresas e infoprodutos",
    texto:
      "Quem vende para outras empresas ou opera produto digital com entrega séria, ciclo de decisão real e ticket que justifica estrutura.",
    itens: [
      "Indústria e distribuição",
      "Serviços B2B",
      "Consultorias e assessorias",
      "Cursos e mentorias",
      "Comunidades e assinaturas",
      "Software e ferramentas",
    ],
  },
];

export default function Home() {
  const anosDeOperacao = new Date().getFullYear() - 2023;

  return (
    <>
      {/* ================== HERO ================== */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-24">
        {/* Camada de fundo: move mais devagar que a rolagem, o que lê como
            distância. O `scale` extra evita borda vazia no topo do curso. */}
        <Parallax velocidade={0.22} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 scale-110">
            <Image
              src="/img/chess-pieces.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
          </div>
        </Parallax>

        {/* Véus: escurecem onde o texto se apoia e devolvem contraste à foto
            no resto do quadro. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--canvas)] via-[var(--canvas)]/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[var(--canvas)] to-transparent"
        />
        <div aria-hidden="true" className="glow -left-40 top-1/4 h-[34rem] w-[34rem]" />

        <div className="wrap-wide relative grain">
          <div className="max-w-4xl">
            <Revelar>
              <p className="eyebrow mb-7">{site.region} · Atendimento em todo o Brasil</p>
            </Revelar>

            <Revelar atraso={90} as="div">
              <h1 className="text-title">
                Estratégia e inteligência para{" "}
                <span className="text-gold-gradient">crescer online</span>
              </h1>
            </Revelar>

            <Revelar atraso={190} as="div">
              <p className="mt-7 max-w-measure text-lead text-ink-soft">
                Tráfego pago, sites que convertem e mensuração confiável,
                desenhados como um sistema só. Porque anúncio sozinho não
                sustenta crescimento: ele amplifica o que já existe.
              </p>
            </Revelar>

            <Revelar atraso={290} as="div">
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Cta origem="hero" />
                <WhatsAppLink
                  origem="hero"
                  className="btn btn--ghost !no-underline"
                >
                  Falar no WhatsApp
                </WhatsAppLink>
              </div>
            </Revelar>

            {/* Números reais, e só. Anos de operação sai da data de abertura
                do CNPJ; projetos sai da contagem do próprio portfólio. */}
            <Revelar atraso={390} as="div">
              <dl className="mt-13 grid max-w-2xl grid-cols-3 gap-6 border-t border-rule pt-7">
                <div>
                  <dt className="sr-only">Anos de operação</dt>
                  <dd className="font-display text-3xl text-gold">
                    <Contador ate={anosDeOperacao} sufixo="+" />
                  </dd>
                  <p className="mt-1 text-sm text-ink-soft">anos de operação</p>
                </div>
                <div>
                  <dt className="sr-only">Sites entregues</dt>
                  <dd className="font-display text-3xl text-gold">
                    <Contador ate={sites.length} />
                  </dd>
                  <p className="mt-1 text-sm text-ink-soft">sites no ar</p>
                </div>
                <div>
                  <dt className="sr-only">Avaliação no Google</dt>
                  <dd className="font-display text-3xl text-gold">5,0</dd>
                  <p className="mt-1 text-sm text-ink-soft">no Google</p>
                </div>
              </dl>
            </Revelar>
          </div>
        </div>
      </section>

      {/* ================== O PROBLEMA / POSICIONAMENTO ================== */}
      <Section tom="surface" comBrilho>
        <SectionHead
          olho="O que muda o jogo"
          titulo="Tráfego não conserta"
          destaque="estrutura fraca"
          descricao="Na maior parte dos casos o gargalo não está na mídia. Está no que acontece depois do clique — e é por isso que trocar de gestor de tráfego raramente resolve."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "O anúncio manda para a página errada",
              "A campanha promete uma coisa e a home responde com um menu de seis itens. O clique foi pago, a atenção se perdeu no primeiro parágrafo.",
            ],
            [
              "A conversão não aparece no relatório",
              "Sem evento configurado, a venda não existe no painel. E a verba do mês seguinte é decidida no escuro.",
            ],
            [
              "O lead some no WhatsApp",
              "Sem origem, sem hora, sem acompanhamento. Em três dias ninguém lembra se veio do anúncio ou de indicação.",
            ],
            [
              "O site não aparece no Google",
              "Porque não há conteúdo indexável — ou porque o conteúdo só existe depois que o JavaScript roda.",
            ],
            [
              "Quem não comprou hoje é perdido",
              "Sem base própria e sem remarketing, cada contato é comprado uma vez e descartado.",
            ],
            [
              "Tudo depende do Instagram",
              "Uma conta que você não controla, com alcance que você não define, numa plataforma que muda a regra quando quiser.",
            ],
          ].map(([titulo, texto], i) => (
            <Revelar key={titulo} atraso={i * 70} as="div">
              <Halo className="h-full p-7">
                <h3 className="font-display text-xl text-ink">{titulo}</h3>
                <p className="mt-3 text-ink-soft">{texto}</p>
              </Halo>
            </Revelar>
          ))}
        </div>

        <Revelar atraso={120} as="div">
          <p className="mt-11 text-center text-lead">
            Nenhum desses é problema de mídia.{" "}
            <Link href="/estrutura-digital" className="link text-gold">
              Veja o método completo, em oito etapas
            </Link>
            .
          </p>
        </Revelar>
      </Section>

      {/* ================== SERVIÇOS ================== */}
      <Section id="servicos">
        <SectionHead
          olho="O que eu faço"
          titulo="Nossos"
          destaque="serviços"
          descricao="Cada frente resolve uma etapa da estrutura. Dá para contratar uma peça isolada — desde que seja a peça que resolve o seu gargalo."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((servico, i) => (
            <Revelar key={servico.href} atraso={i * 70} as="div">
              <Halo as="article" className="group h-full p-8">
                <p className="eyebrow mb-5 text-xs">
                  Etapa {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl text-ink">
                  {servico.label}
                </h3>
                <p className="mt-3 text-ink-soft">{servico.description}</p>
                <Link
                  href={servico.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-bright"
                >
                  Ver detalhes
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Halo>
            </Revelar>
          ))}

          {/* Sexto cartão: a oferta de entrada, em tratamento distinto. */}
          <Revelar atraso={350} as="div">
            <Halo
              as="article"
              className="h-full border-gold-deep/50 bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface)] p-8"
            >
              <p className="eyebrow mb-5 text-xs">Produto de entrada</p>
              <h3 className="font-display text-2xl text-gold-gradient">
                {produtoNav.label} Lucrativa
              </h3>
              <p className="mt-3 text-ink-soft">
                Prefere começar sozinho? O curso ensina a colocar o negócio no
                mapa digital da cidade, passo a passo, sem contratar agência.
              </p>
              <Link
                href={produtoNav.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-bright"
              >
                Conhecer o curso
                <span aria-hidden="true">→</span>
              </Link>
            </Halo>
          </Revelar>
        </div>
      </Section>

      {/* ================== MÉTODO, RESUMIDO ================== */}
      <Section tom="surface">
        <div className="grid gap-13 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHead
              olho="O método"
              titulo="Oito etapas,"
              destaque="nesta ordem"
              alinhamento="esquerda"
              descricao="A ordem é o argumento. Cada etapa entrega uma coisa concreta e depende da anterior — é por isso que mensuração vem antes de otimização."
              className="mb-8"
            />
            <Revelar atraso={160}>
              <Link href="/estrutura-digital" className="btn btn--ghost">
                Ver o método em detalhe
              </Link>
            </Revelar>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-lg border border-rule bg-[var(--rule)] sm:grid-cols-2">
            {etapas.map((etapa, i) => (
              <Revelar
                key={etapa.n}
                atraso={i * 55}
                as="li"
                className="bg-[var(--surface)] p-5 transition-colors duration-300 hover:bg-[var(--surface-2)]"
              >
                <p className="tabular font-display text-sm text-gold">
                  {etapa.n}
                </p>
                <h3 className="mt-1.5 font-medium text-ink">{etapa.nome}</h3>
                <p className="mt-1 text-sm text-ink-soft">{etapa.pergunta}</p>
              </Revelar>
            ))}
          </ol>
        </div>
      </Section>

      {/* ================== PORTFÓLIO DE SITES ================== */}
      <Section id="portfolio" comBrilho>
        <SectionHead
          olho="Portfólio"
          titulo="Sites no ar, com"
          destaque="endereço público"
          descricao={
            <>
              <strong className="text-ink">{sites.length} projetos entregues</strong>,
              todos acessíveis. Clique e veja — é a única forma de portfólio que
              vale alguma coisa.
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.slice(0, 9).map((s, i) => (
            <Revelar key={s.url} atraso={(i % 3) * 70} as="div">
              <Halo className="group h-full">
                {/* O cartão inteiro é clicável, mas o link é UM só: âncora
                    dentro de âncora é HTML inválido e quebra a navegação por
                    teclado. `after:absolute inset-0` estende a área de clique
                    do link para o cartão todo. */}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-full flex-col p-6 !no-underline after:absolute after:inset-0 after:content-['']"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-gold">
                    {s.categoria}
                  </p>
                  <h3 className="mt-2.5 font-display text-lg text-ink">
                    {s.nome}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">
                    {s.descricao}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold transition-transform duration-300 group-hover:translate-x-1">
                    Visitar site <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </Halo>
            </Revelar>
          ))}
        </div>

        <Revelar atraso={140} as="div">
          <div className="mt-11 text-center">
            <Link href="/portfolio" className="btn btn--ghost">
              Ver os {sites.length} sites
            </Link>
          </div>
        </Revelar>
      </Section>

      {/* ================== RESULTADOS / CASES ================== */}
      <Section tom="surface" id="resultados">
        <SectionHead
          olho="Resultados"
          titulo="O que os dados"
          destaque="disseram"
          descricao="Com o print do gerenciador ao lado. Inclusive a leitura dos projetos que ainda não fecharam conclusão — porque é isso que permite avaliar um fornecedor."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {cases.map((caso, i) => (
            <Revelar key={caso.slug} atraso={(i % 2) * 90} as="div">
              <Halo as="article" className="group h-full overflow-hidden">
                <Link href={`/cases/${caso.slug}`} className="block">
                  <div className="relative aspect-[16/7] overflow-hidden border-b border-rule bg-[var(--canvas)]">
                    <Image
                      src={caso.imagens[0].src}
                      alt={caso.imagens[0].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover object-top opacity-80 transition-[transform,opacity] duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  </div>

                  <div className="p-7">
                    <p className="flex flex-wrap gap-x-3 text-xs uppercase tracking-[0.14em] text-gold">
                      <span>{caso.segmento}</span>
                      <span aria-hidden="true" className="text-ink-soft">·</span>
                      <span>{caso.canal}</span>
                    </p>
                    <h3 className="mt-3 font-display text-2xl text-ink">
                      {caso.title}
                    </h3>
                    <p className="mt-3 text-ink-soft">{caso.resumo}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold">
                      Ler o case
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Halo>
            </Revelar>
          ))}
        </div>
      </Section>

      {/* ================== NICHOS ================== */}
      <Section>
        <SectionHead
          olho="Para quem"
          titulo="Nossos"
          destaque="nichos"
          descricao="Trabalho com mercados que entendo a fundo. É o que permite chegar na primeira conversa já sabendo onde costuma estar o gargalo."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {nichos.map((nicho, i) => (
            <Revelar key={nicho.titulo} atraso={i * 110} as="div">
              <Halo className="h-full p-9">
                <div className="hairline mb-7 w-16 opacity-80" />
                <h3 className="font-display text-2xl text-ink">
                  {nicho.titulo}
                </h3>
                <p className="mt-3 text-ink-soft">{nicho.texto}</p>
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {nicho.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
                      />
                      <span className="text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </Halo>
            </Revelar>
          ))}
        </div>
      </Section>

      {/* ================== DEPOIMENTOS ================== */}
      <Section tom="surface" comBrilho>
        <SectionHead
          olho="Quem já trabalhou comigo"
          titulo="O que dizem sobre"
          destaque="o meu trabalho"
          descricao="Avaliações públicas no Google, com link para o original. Nenhuma foi escrita por mim."
        />
        <Depoimentos />
      </Section>

      {/* ================== FUNDADORES ================== */}
      <Section id="sobre">
        <SectionHead
          olho="Quem faz"
          titulo="Conheça os"
          destaque="fundadores"
          descricao="Não é agência, e não finge ser. Quem vende é quem executa e quem responde quando algo dá errado."
        />

        <div className="mx-auto grid max-w-5xl gap-13">
          {/* Diego */}
          <div className="grid items-center gap-9 md:grid-cols-[0.85fr_1.15fr]">
            <Revelar direcao="esquerda" as="div">
              <Parallax velocidade={0.08}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-rule">
                  <Image
                    src="/brand/diego.jpg"
                    alt="Diego Fintelman"
                    fill
                    sizes="(max-width: 768px) 100vw, 34vw"
                    className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--canvas)] to-transparent"
                  />
                </div>
              </Parallax>
            </Revelar>

            <Revelar direcao="direita" atraso={90} as="div">
              <h3 className="font-display text-3xl text-ink">
                {site.person}
              </h3>
              <p className="mt-2 font-medium text-gold">
                Estratégia, tráfego pago e mensuração
              </p>
              <p className="mt-5 text-ink-soft">
                Comecei fazendo o que quase todo mundo faz: gestão de campanha.
                O padrão que apareceu foi sempre o mesmo — as métricas da
                campanha melhoravam e o cliente continuava insatisfeito, porque
                o que ele precisava acontecia depois do clique, num lugar que eu
                não tinha sido contratado para olhar.
              </p>
              <p className="mt-4 text-ink-soft">
                Hoje o trabalho começa pela pergunta de qual etapa está
                faltando. Às vezes a resposta é tráfego. Com frequência não é, e
                dizer isso custa um contrato no curto prazo e evita um cliente
                insatisfeito no médio.
              </p>
              <Link href="/sobre" className="link mt-6 inline-block text-gold">
                Como eu trabalho, e o que eu recuso fazer
              </Link>
            </Revelar>
          </div>

          {/* Gabriela */}
          <div className="grid items-center gap-9 md:grid-cols-[1.15fr_0.85fr]">
            <Revelar direcao="esquerda" as="div" className="md:order-2">
              <Parallax velocidade={0.08}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-rule">
                  <Image
                    src="/img/gabriela.jpg"
                    alt="Gabriela Fintelman"
                    fill
                    sizes="(max-width: 768px) 100vw, 34vw"
                    className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--canvas)] to-transparent"
                  />
                </div>
              </Parallax>
            </Revelar>

            <Revelar direcao="direita" atraso={90} as="div" className="md:order-1">
              <h3 className="font-display text-3xl text-ink">
                Gabriela Fintelman
              </h3>
              <p className="mt-2 font-medium text-gold">
                Conteúdo, copywriting e design
              </p>
              <p className="mt-5 text-ink-soft">
                Responde pelas frentes de social media, copywriting, design
                criativo e edição de vídeo. É quem transforma a estratégia em
                peça: o criativo que roda no anúncio, o texto que sustenta a
                página, o vídeo que prende nos três primeiros segundos.
              </p>
              <p className="mt-4 text-ink-soft">
                Quando o escopo pede produção fora disso, eu contrato e coordeno
                — e digo que estou contratando.
              </p>
            </Revelar>
          </div>
        </div>
      </Section>

      {/* ================== PARA AGÊNCIAS ================== */}
      <Section tom="surface">
        <div className="relative overflow-hidden rounded-xl border border-gold-deep/40 bg-[var(--canvas)] p-9 lg:p-13">
          <div
            aria-hidden="true"
            className="glow -right-20 -top-20 h-[26rem] w-[26rem]"
          />
          <div className="relative grid gap-9 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Revelar>
                <p className="eyebrow mb-5">Para agências</p>
              </Revelar>
              <Revelar atraso={70} as="div">
                <h2 className="text-h2">
                  Quando a agência precisa de mão,{" "}
                  <span className="text-gold-gradient">não de concorrente</span>
                </h2>
              </Revelar>
              <Revelar atraso={140} as="div">
                <p className="mt-5 max-w-measure text-ink-soft">
                  Executo tráfego, páginas e trackeamento sob a marca da
                  agência. A relação comercial é com você; o cliente final
                  continua sendo seu, e isso entra no contrato.
                </p>
              </Revelar>
            </div>

            <Revelar atraso={200} as="div">
              <ul className="grid gap-3.5">
                {[
                  "Não prospecto o seu cliente, nem depois",
                  "A entrega sai com a sua marca",
                  "Você escolhe se eu falo com o cliente",
                  "A documentação fica com você",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    />
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/para-agencias" className="btn btn--ghost mt-8">
                Como funciona a parceria
              </Link>
            </Revelar>
          </div>
        </div>
      </Section>

      {/* ================== CONTATO ================== */}
      <Section id="contato" comBrilho>
        <div className="mx-auto max-w-3xl text-center">
          <Revelar className="flex justify-center">
            <p className="eyebrow eyebrow--center mb-6">Próximo passo</p>
          </Revelar>

          <Revelar atraso={70} as="div">
            <h2 className="text-h2">
              Pronto para <span className="text-gold-gradient">crescer?</span>
            </h2>
          </Revelar>

          <Revelar atraso={140} as="div">
            <p className="mx-auto mt-5 max-w-measure text-lead text-ink-soft">
              Uma conversa de 30 a 40 minutos sobre o que já existe no seu
              digital. Você sai com a ordem do que fazer primeiro, contratando
              alguma coisa ou não.
            </p>
          </Revelar>

          <Revelar atraso={210} as="div">
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Cta origem="home-fim" />
              <WhatsAppLink
                origem="home-fim"
                className="btn btn--ghost !no-underline"
              >
                {site.contact.whatsappDisplay}
              </WhatsAppLink>
            </div>
          </Revelar>

          <Revelar atraso={280} as="div">
            <p className="mt-7 text-sm text-ink-soft">
              Resposta em até um dia útil. Sem compromisso.
            </p>
          </Revelar>
        </div>
      </Section>
    </>
  );
}
