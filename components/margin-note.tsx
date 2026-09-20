"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Nota do praticante.
 *
 * O comentário técnico que normalmente fica de fora de um site de vendas —
 * "aqui o custo sobe e quase ninguém mede". É o que faz a página parecer
 * escrita por quem faz o trabalho, e não por um redator.
 *
 * Na direção anterior ela vivia na margem da coluna de texto. No layout atual,
 * que é mais largo e em grade, margem flutuante brigaria com os cartões. Aqui
 * ela é um bloco assentado, com o fio dourado à esquerda, que entra no fluxo e
 * funciona igual no telefone e no desktop.
 */
export function MarginNote({
  children,
  side,
}: {
  children: React.ReactNode;
  /** Mantido por compatibilidade com as páginas antigas; não é mais usado. */
  side?: "right" | "left";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);
  void side;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisivel(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );

    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <aside
      ref={ref}
      className={cn(
        "my-9 max-w-measure border-l-2 border-gold-deep bg-[var(--surface)]/60 py-5 pl-6 pr-5",
        "transition-[opacity,transform] duration-700 ease-out",
        visivel ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
      )}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        Nota de quem executa
      </p>
      <p className="text-ink-soft">{children}</p>
    </aside>
  );
}
