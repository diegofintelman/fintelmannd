"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { mainNav, produtoNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

/**
 * Cabeçalho fixo.
 *
 * No topo ele é transparente e deixa o hero respirar inteiro. Ao rolar, ganha
 * fundo e um fio dourado: o visitante sabe onde está sem que a barra dispute
 * atenção com a primeira dobra.
 *
 * O logo usa a variante de fundo escuro — é a superfície em que o dourado
 * original foi desenhado para funcionar.
 */
export function Header() {
  const pathname = usePathname();
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Menu aberto trava a rolagem do corpo: sem isso, o fundo desliza atrás do
  // overlay no telefone e a experiência lê como bug.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const ativo = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          rolou || aberto
            ? "border-b border-rule bg-[var(--canvas)]/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="wrap-wide flex items-center justify-between gap-5 py-4">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${site.name} — início`}
          >
            <Image
              src="/brand/logo-grafite.png"
              alt=""
              width={898}
              height={390}
              priority
              className="h-7 w-auto sm:h-8"
            />
            <span className="sr-only">{site.name}</span>
          </Link>

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo(item.href) ? "page" : undefined}
                    className={cn(
                      "relative text-sm font-medium transition-colors duration-200",
                      "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-[width] after:duration-300",
                      ativo(item.href)
                        ? "text-gold after:w-full"
                        : "text-ink-soft after:w-0 hover:text-ink hover:after:w-full"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href={produtoNav.href}
                  className="flex items-center gap-2 rounded-full border border-gold-deep/60 px-3.5 py-1.5 text-sm font-medium text-gold transition-colors duration-200 hover:border-gold hover:text-gold-bright"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  {produtoNav.label}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={site.cta.href}
              onClick={() =>
                track("cta_diagnostico_click", {
                  origem: "cabecalho",
                  rotulo: site.cta.label,
                })
              }
              className="btn btn--gold hidden !px-5 !py-2.5 !text-sm sm:inline-flex"
            >
              {site.cta.label}
            </Link>

            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-movel"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              className="relative z-50 flex h-10 w-10 items-center justify-center xl:hidden"
            >
              <span className="sr-only">{aberto ? "Fechar" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-4 w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-6 bg-ink transition-transform duration-300",
                    aberto ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-0.5 w-6 bg-ink transition-opacity duration-200",
                    aberto ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-6 bg-ink transition-transform duration-300",
                    aberto ? "top-1.5 -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ---- Menu no telefone: sobreposição inteira ---------------------- */}
      <div
        id="menu-movel"
        hidden={!aberto}
        className={cn(
          "fixed inset-0 z-40 bg-[var(--canvas)] xl:hidden",
          aberto ? "animate-in" : ""
        )}
      >
        <nav
          aria-label="Navegação principal"
          className="wrap flex h-full flex-col justify-center gap-1 pb-16 pt-20"
        >
          {mainNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${i * 45}ms` }}
              className={cn(
                "border-b border-rule py-4 font-display text-2xl transition-colors",
                ativo(item.href) ? "text-gold" : "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={produtoNav.href}
            className="mt-2 flex items-center gap-2.5 border-b border-rule py-4 font-display text-2xl text-gold"
          >
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            {produtoNav.label}
          </Link>

          <Link
            href={site.cta.href}
            onClick={() =>
              track("cta_diagnostico_click", {
                origem: "menu-movel",
                rotulo: site.cta.label,
              })
            }
            className="btn btn--gold mt-7 w-full"
          >
            {site.cta.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
