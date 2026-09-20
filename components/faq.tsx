/**
 * FAQ.
 *
 * As perguntas ficam abertas por padrão — são conteúdo indexável e o leitor
 * B2B lê antes de decidir. Accordion aqui esconderia justamente o que responde
 * objeção.
 *
 * O schema FAQPage só é emitido porque o conteúdo aparece na página. Declarar
 * FAQPage para conteúdo oculto é o tipo de coisa que rende ação manual.
 */
export function Faq({
  titulo,
  perguntas,
  comSchema = true,
}: {
  titulo: string;
  perguntas: { p: string; r: string }[];
  comSchema?: boolean;
}) {
  return (
    <section aria-labelledby="faq-titulo">
      <h2 id="faq-titulo" className="text-h2 max-w-[18ch]">
        {titulo}
      </h2>

      <dl className="mt-9 grid gap-0 border-t border-rule">
        {perguntas.map((item) => (
          <div
            key={item.p}
            className="grid gap-x-9 gap-y-2 border-b border-rule py-6 lg:grid-cols-[22rem_1fr]"
          >
            <dt className="text-h4">{item.p}</dt>
            <dd className="max-w-measure text-ink-soft">{item.r}</dd>
          </div>
        ))}
      </dl>

      {comSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: perguntas.map((item) => ({
                "@type": "Question",
                name: item.p,
                acceptedAnswer: { "@type": "Answer", text: item.r },
              })),
            }),
          }}
        />
      )}
    </section>
  );
}
