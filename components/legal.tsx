import { cn } from "@/lib/utils";

/** Texto legal: coluna estreita, hierarquia simples, numeração visível. */
export function Legal({
  atualizadoEm,
  children,
}: {
  atualizadoEm: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wrap pb-section">
      <div className="max-w-column">
        <p className="rule-top pt-6 text-sm text-ink-soft">
          Última atualização: {atualizadoEm}
        </p>
        <div className="mt-9 grid gap-9">{children}</div>
      </div>
    </div>
  );
}

export function LegalSection({
  n,
  titulo,
  children,
  className,
}: {
  n: string;
  titulo: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("grid gap-3", className)}>
      <h2 className="text-h4">
        <span className="tabular mr-3 text-accent">{n}</span>
        {titulo}
      </h2>
      <div className="grid gap-4 text-ink-soft [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-2">
        {children}
      </div>
    </section>
  );
}
