import { cn } from "@/lib/utils";
import { Revelar } from "@/components/motion";

/**
 * Seção padrão do site.
 *
 * `tom` alterna a superfície entre o preto do fundo e o grafite dos blocos
 * assentados. É a mesma lógica do site original, que alternava `bg-background`
 * e `bg-card` para dar ritmo sem precisar de fio divisório em toda quebra.
 */
export function Section({
  id,
  tom = "canvas",
  children,
  className,
  comBrilho = false,
}: {
  id?: string;
  tom?: "canvas" | "surface";
  children: React.ReactNode;
  className?: string;
  /** Mancha dourada difusa ao fundo. Usar com parcimônia: uma por dobra. */
  comBrilho?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-section",
        tom === "surface" ? "bg-[var(--surface)]" : "bg-[var(--canvas)]",
        className
      )}
    >
      {comBrilho && (
        <div
          aria-hidden="true"
          className="glow -top-40 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2"
        />
      )}
      <div className="wrap-wide relative">{children}</div>
    </section>
  );
}

/**
 * Cabeçalho de seção.
 *
 * Centralizado por padrão, como no site original. `alinhamento="esquerda"`
 * existe para as seções em que a copy divide espaço com mídia — centralizar
 * tudo é o que faz uma página inteira ler como um bloco só.
 */
export function SectionHead({
  olho,
  titulo,
  destaque,
  descricao,
  alinhamento = "centro",
  className,
}: {
  olho?: string;
  titulo: string;
  /** Trecho do título que recebe o degradê dourado. */
  destaque?: string;
  descricao?: React.ReactNode;
  alinhamento?: "centro" | "esquerda";
  className?: string;
}) {
  const centro = alinhamento === "centro";

  return (
    <header
      className={cn(
        "mb-11",
        centro ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      {olho && (
        <Revelar className={cn("mb-5", centro && "flex justify-center")}>
          <p className={cn("eyebrow", centro && "eyebrow--center")}>{olho}</p>
        </Revelar>
      )}

      <Revelar atraso={60} as="div">
        <h2 className="text-h2">
          {titulo}
          {destaque && (
            <>
              {" "}
              <span className="text-gold-gradient">{destaque}</span>
            </>
          )}
        </h2>
      </Revelar>

      {descricao && (
        <Revelar atraso={130} as="div">
          <div
            className={cn(
              "mt-5 text-lead text-ink-soft",
              centro && "mx-auto max-w-measure"
            )}
          >
            {descricao}
          </div>
        </Revelar>
      )}
    </header>
  );
}
