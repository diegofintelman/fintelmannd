import { depoimentos } from "@/lib/depoimentos";
import { Revelar, Halo } from "@/components/motion";
import { ExternalLink } from "@/components/cta";

/**
 * Depoimentos verificados.
 *
 * Três decisões que valem a pena registrar:
 *
 *  - **Sem carrossel.** O original girava sozinho a cada 5s, o que tira do
 *    leitor o controle e esconde dois terços da prova. Três depoimentos cabem
 *    lado a lado; prova escondida não convence ninguém.
 *  - **Sem estrelinhas desenhadas.** Cinco estrelas em SVG é o enfeite que
 *    todo site tem e que ninguém acredita. O link para a avaliação original
 *    vale mais que qualquer ícone.
 *  - **Sem `aggregateRating` no schema.** A nota 5,0 é do perfil do Google, não
 *    de uma base de avaliações deste site.
 */
export function Depoimentos() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {depoimentos.map((d, i) => (
        <Revelar key={d.nome} atraso={i * 90} as="div">
          <Halo as="article" className="flex h-full flex-col p-8">
            {/* Aspas como elemento gráfico, não como ícone de biblioteca. */}
            <span
              aria-hidden="true"
              className="font-display text-5xl leading-none text-gold-deep"
            >
              &ldquo;
            </span>

            <blockquote className="mt-3 flex-1">
              <p className="text-ink-soft">{d.texto}</p>
            </blockquote>

            <footer className="mt-7 border-t border-rule pt-5">
              <p className="font-medium text-ink">{d.nome}</p>
              {d.papel && (
                <p className="mt-0.5 text-sm text-gold">{d.papel}</p>
              )}
              <p className="mt-2 text-xs text-ink-soft">
                {d.contexto ? `${d.contexto} · ` : ""}
                <ExternalLink
                  href={d.link}
                  origem={`depoimento-${d.nome.toLowerCase().replace(/\s+/g, "-")}`}
                  className="!text-ink-soft"
                >
                  Ver no Google
                </ExternalLink>
              </p>
            </footer>
          </Halo>
        </Revelar>
      ))}
    </div>
  );
}
