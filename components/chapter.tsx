import { cn } from "@/lib/utils";
import { Revelar } from "@/components/motion";

/**
 * Camada de compatibilidade.
 *
 * As páginas internas foram escritas na direção editorial anterior, com
 * `Chapter`/`ChapterHead` e fundos "paper"/"graphite". Em vez de reescrever
 * dezesseis arquivos, estes dois componentes mantêm a mesma API e renderizam
 * no sistema visual atual: preto e grafite, com as revelações por scroll.
 *
 * Mapeamento: `paper` → fundo do site; `graphite` → superfície assentada.
 *
 * Ao reescrever uma página, prefira `Section`/`SectionHead` de
 * `components/section.tsx` — é a API que segue daqui pra frente.
 */
export function Chapter({
  n,
  title,
  ground = "paper",
  id,
  children,
  className,
  withMargin = false,
}: {
  n: string;
  title: string;
  ground?: "paper" | "graphite";
  id?: string;
  children: React.ReactNode;
  className?: string;
  withMargin?: boolean;
}) {
  return (
    <section
      id={id}
      data-chapter={n}
      data-chapter-title={title}
      className={cn(
        "relative overflow-hidden py-section",
        ground === "graphite" ? "bg-[var(--surface)]" : "bg-[var(--canvas)]",
        className
      )}
    >
      <div className={cn("wrap-wide relative", withMargin && "has-margin-notes")}>
        {children}
      </div>
    </section>
  );
}

export function ChapterHead({
  n,
  children,
  standfirst,
  className,
}: {
  n: string;
  children: React.ReactNode;
  standfirst?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-9 max-w-3xl", className)}>
      <Revelar>
        <p className="eyebrow tabular mb-5">{n}</p>
      </Revelar>

      <Revelar atraso={60} as="div">
        <h2 className="text-h2">{children}</h2>
      </Revelar>

      {standfirst ? (
        <Revelar atraso={120} as="div">
          <p className="mt-5 max-w-measure text-lead text-ink-soft">
            {standfirst}
          </p>
        </Revelar>
      ) : null}
    </header>
  );
}
