import Link from "next/link";
import { cn } from "@/lib/utils";
import { Revelar } from "@/components/motion";

/**
 * Abertura das páginas internas.
 *
 * Compensa a altura do cabeçalho fixo com `pt` generoso e traz o brilho
 * dourado difuso, para a primeira dobra da página interna não parecer um
 * documento solto sobre o preto.
 */
export function PageHeader({
  kicker,
  title,
  standfirst,
  trail,
  children,
  className,
}: {
  kicker?: string;
  title: string;
  standfirst?: React.ReactNode;
  trail?: { name: string; href: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-rule pb-13 pt-13 lg:pt-13",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="glow -top-52 left-1/3 h-[30rem] w-[40rem]"
      />

      <div className="wrap-wide relative">
        {trail && trail.length > 0 && (
          <nav aria-label="Trilha de navegação" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Início
                </Link>
              </li>
              {trail.map((item, i) => (
                <li key={item.href} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-gold-deep">
                    /
                  </span>
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-gold"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {kicker && (
          <Revelar>
            <p className="eyebrow mb-6">{kicker}</p>
          </Revelar>
        )}

        <Revelar atraso={70} as="div">
          <h1 className="text-h1 max-w-[20ch]">{title}</h1>
        </Revelar>

        {standfirst && (
          <Revelar atraso={140} as="div">
            <div className="mt-6 max-w-measure text-lead text-ink-soft">
              {standfirst}
            </div>
          </Revelar>
        )}

        {children && (
          <Revelar atraso={210} as="div">
            <div className="mt-9">{children}</div>
          </Revelar>
        )}
      </div>
    </header>
  );
}
