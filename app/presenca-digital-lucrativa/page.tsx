import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Section, SectionHead } from "@/components/section";
import { Revelar, Halo } from "@/components/motion";
import { Faq } from "@/components/faq";
import { WhatsAppLink } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { NewsletterForm } from "@/components/newsletter";

export const metadata: Metadata = {
  title: "Presença Digital Lucrativa — curso para aparecer no Google",
  description:
    "Curso de entrada para dono de negócio colocar a empresa no mapa digital da cidade: Google Meu Negócio, página que vende, anúncios locais e atendimento no WhatsApp.",
  alternates: { canonical: "/presenca-digital-lucrativa" },
};

/**
 * Página do produto de entrada.
 *
 * ⚠️ O produto ainda está em produção: não há link de checkout. Por isso a
 * página captura interesse por e-mail em vez de vender, e diz isso na cara em
 * vez de fingir um botão de compra que não leva a lugar nenhum.
 *
 * Quando o checkout existir (Hotmart), trocar `NewsletterForm` pelo botão de
 * compra e ajustar o bloco de preço. Ver docs/PENDENCIAS.md.
 */

const modulos = [
  {
    n: "01",
    nome: "A nova regra do jogo",
    texto: "Por que o cliente mudou de lugar, e onde ele procura você agora.",
  },
  {
    n: "02",
    nome: "Google Meu Negócio",
    texto: "Criação, otimização e avaliações. O canal mais barato que existe para quem atende na região.",
  },
  {
    n: "03",
    nome: "Página que vende",
    texto: "A estrutura de uma landing page que converte, com template pronto para usar.",
  },
  {
    n: "04",
    nome: "Anúncios pagos",
    texto: "Meta Ads do começo, com segmentação local e verba sob controle.",
  },
  {
    n: "05",
    nome: "Atendimento",
    texto: "Script de WhatsApp e o que fazer para o contato não esfriar na fila.",
  },
  {
    n: "06",
    nome: "Crescimento",
    texto: "A rotina semanal que mantém tudo funcionando sem virar um segundo emprego.",
  },
];

const metodo = [
  ["M", "Mapear", "como o seu cliente procura por aquilo que você vende"],
  ["E", "Estruturar", "a presença digital mínima para ser encontrado"],
  ["T", "Trazer", "tráfego pago local, com verba pequena e controlada"],
  ["A", "Atender", "e converter no WhatsApp, sem perder o contato"],
];

export default function PresencaDigitalPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Presença Digital Lucrativa", href: "/presenca-digital-lucrativa" },
        ]}
      />

      <PageHeader
        kicker="Produto de entrada"
        title="Seu negócio aparece no Google hoje?"
        trail={[
          { name: "Presença Digital Lucrativa", href: "/presenca-digital-lucrativa" },
        ]}
        standfirst="Um curso direto ao ponto para colocar o seu negócio no mapa digital da cidade e começar a atrair clientes, sem contratar agência e sem depender de ninguém."
      >
        <div className="flex flex-wrap items-center gap-4">
          <a href="#avisar" className="btn btn--gold">
            Quero ser avisado do lançamento
          </a>
          <WhatsAppLink
            origem="presenca-digital-topo"
            className="btn btn--ghost !no-underline"
          >
            Tirar uma dúvida
          </WhatsAppLink>
        </div>
      </PageHeader>

      {/* ---- Para quem é ---- */}
      <Section tom="surface" comBrilho>
        <SectionHead
          olho="Para quem é"
          titulo="Se você já tentou e"
          destaque="não funcionou"
          descricao="É para dono de negócio, comerciante e profissional que atende na sua região: clínica, consultório, estúdio, loja, oficina, escritório."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Não consigo atrair cliente pela internet",
            "Já tentei anúncio e só gastei dinheiro",
            "Meu negócio não aparece quando procuram no Google",
            "Não sei por onde começar",
            "Não tenho tempo nem conhecimento técnico",
            "Tenho medo de perder dinheiro com tráfego",
          ].map((dor, i) => (
            <Revelar key={dor} atraso={i * 70} as="div">
              <Halo className="h-full p-6">
                <p className="text-ink">
                  <span aria-hidden="true" className="mr-2 text-gold">
                    &ldquo;
                  </span>
                  {dor}
                </p>
              </Halo>
            </Revelar>
          ))}
        </div>
      </Section>

      {/* ---- O método ---- */}
      <Section>
        <SectionHead
          olho="O caminho"
          titulo="Método"
          destaque="M.E.T.A. Local"
          descricao="Quatro passos, nesta ordem. Não é teoria de marketing: é a sequência de coisas que você vai fazer, uma de cada vez."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {metodo.map(([letra, verbo, resto], i) => (
            <Revelar key={letra} atraso={i * 90} as="div">
              <Halo className="h-full p-8">
                <p className="font-display text-5xl leading-none text-gold-gradient">
                  {letra}
                </p>
                <h3 className="mt-5 font-display text-xl text-ink">{verbo}</h3>
                <p className="mt-2 text-sm text-ink-soft">{resto}</p>
              </Halo>
            </Revelar>
          ))}
        </div>
      </Section>

      {/* ---- Conteúdo ---- */}
      <Section tom="surface">
        <div className="grid gap-13 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead
              olho="O que tem dentro"
              titulo="Seis módulos e os"
              destaque="materiais prontos"
              alinhamento="esquerda"
              descricao="Vídeo curto em cada módulo, mais os arquivos que você usa no mesmo dia."
              className="mb-8"
            />

            <Revelar atraso={150}>
              <ul className="grid gap-3">
                {[
                  "Guia em PDF",
                  "Checklist do Google Meu Negócio",
                  "Template de landing page",
                  "Modelos de anúncio",
                  "Script de atendimento no WhatsApp",
                  "Planilha de controle",
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
            </Revelar>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-lg border border-rule bg-[var(--rule)]">
            {modulos.map((m, i) => (
              <Revelar
                key={m.n}
                atraso={i * 60}
                as="li"
                className="bg-[var(--surface)] p-6 transition-colors duration-300 hover:bg-[var(--surface-2)]"
              >
                <div className="flex gap-5">
                  <span className="tabular font-display text-sm text-gold">
                    {m.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{m.nome}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{m.texto}</p>
                  </div>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---- Captura ---- */}
      <Section id="avisar" comBrilho>
        <div className="mx-auto max-w-2xl text-center">
          <Revelar className="flex justify-center">
            <p className="eyebrow eyebrow--center mb-6">Em produção</p>
          </Revelar>

          <Revelar atraso={70} as="div">
            <h2 className="text-h2">
              O curso está sendo{" "}
              <span className="text-gold-gradient">gravado</span>
            </h2>
          </Revelar>

          <Revelar atraso={140} as="div">
            <p className="mx-auto mt-5 max-w-measure text-lead text-ink-soft">
              Prefiro avisar isso do que fingir um botão de compra que não leva
              a lugar nenhum. Deixe seu e-mail e você recebe o aviso no dia em
              que abrir, com condição de quem entrou antes.
            </p>
          </Revelar>

          <Revelar atraso={210} as="div">
            <div className="mt-9">
              <NewsletterForm origem="presenca-digital" />
            </div>
          </Revelar>

          <Revelar atraso={280} as="div">
            <p className="mt-9 text-sm text-ink-soft">
              Com pressa?{" "}
              <Link href="/diagnostico" className="link text-gold">
                Peça um diagnóstico
              </Link>{" "}
              e a gente resolve direto, sem esperar o curso.
            </p>
          </Revelar>
        </div>
      </Section>

      {/* ---- Perguntas ---- */}
      <Section tom="surface">
        <Faq
          titulo="Perguntas que sempre aparecem"
          perguntas={[
            {
              p: "Preciso entender de tecnologia?",
              r: "Não. O curso parte do zero e cada passo é mostrado na tela. Se você usa WhatsApp e consegue publicar uma foto, consegue fazer.",
            },
            {
              p: "Quanto vou precisar investir em anúncio?",
              r: "O módulo de anúncios trabalha com verba pequena e controlada, de propósito: a ideia é você aprender a ler o resultado antes de aumentar. O curso ensina a definir o valor, não estipula um.",
            },
            {
              p: "Isso substitui contratar um gestor de tráfego?",
              r: "Para quem está começando e tem mais tempo que dinheiro, sim. Quando o volume crescer e o seu tempo passar a valer mais que a economia, aí faz sentido terceirizar. O curso inclusive diz quando esse momento chega.",
            },
            {
              p: "Funciona para o meu tipo de negócio?",
              r: "Funciona para quem atende gente da própria região e depende de ser encontrado: clínica, consultório, estúdio, loja, oficina, escritório, prestador de serviço. Para quem vende só pela internet, sem recorte geográfico, o método rende menos.",
            },
            {
              p: "Quando abre?",
              r: "Ainda não tem data. Quem deixar o e-mail é avisado primeiro, e com condição melhor que a de abertura.",
            },
          ]}
        />
      </Section>
    </>
  );
}
