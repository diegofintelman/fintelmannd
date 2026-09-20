"use client";

import { useMemo, useState } from "react";

import { sites, categories, type SiteCategory } from "@/lib/sites";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Halo } from "@/components/motion";

/**
 * Portfólio de sites.
 *
 * Cada item tem URL pública verificável — é o que faz este bloco valer como
 * prova em vez de vitrine. O filtro é progressivo: sem JavaScript a lista
 * inteira aparece, que é exatamente o que o buscador enxerga.
 */
export function SitesPortfolio() {
  const [filtro, setFiltro] = useState<"Todos" | SiteCategory>("Todos");

  const visiveis = useMemo(
    () =>
      filtro === "Todos" ? sites : sites.filter((s) => s.categoria === filtro),
    [filtro]
  );

  // Contagem por categoria: um filtro que leva a lista vazia é frustração
  // desnecessária, e o número já responde antes do clique.
  const contagem = useMemo(() => {
    const mapa = new Map<string, number>();
    for (const s of sites) mapa.set(s.categoria, (mapa.get(s.categoria) ?? 0) + 1);
    return mapa;
  }, []);

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar por segmento"
        className="mb-9 flex flex-wrap justify-center gap-2.5"
      >
        {categories.map((cat) => {
          const n = cat === "Todos" ? sites.length : contagem.get(cat) ?? 0;
          if (n === 0) return null;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFiltro(cat)}
              aria-pressed={filtro === cat}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                filtro === cat
                  ? "border-gold bg-gold text-gold-ink"
                  : "border-rule text-ink-soft hover:border-gold-deep hover:text-ink"
              )}
            >
              {cat}
              <span
                className={cn(
                  "tabular ml-2 text-xs",
                  filtro === cat ? "text-gold-ink/70" : "text-ink-soft"
                )}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((s) => (
          <li key={s.url}>
            <Halo className="group h-full">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("external_link_click", {
                    origem: "portfolio-sites",
                    destino: s.url,
                    item: s.nome,
                  })
                }
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
          </li>
        ))}
      </ul>
    </div>
  );
}
