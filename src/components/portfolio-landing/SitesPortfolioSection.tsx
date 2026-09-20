import { useMemo, useState } from "react";
import { sites, categories } from "@/data/sites";
import SiteCard from "./SiteCard";

const SitesPortfolioSection = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("Todos");

  const filtered = useMemo(
    () => (active === "Todos" ? sites : sites.filter((s) => s.categoria === active)),
    [active],
  );

  return (
    <section id="portfolio" className="section-dark py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-gold">
            Portfólio de Sites
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aqui estão alguns dos sites desenvolvidos para profissionais de diferentes áreas.
            Cada projeto foi pensado para apresentar serviços com clareza, fortalecer a autoridade
            do profissional e facilitar o contato do visitante com a empresa.
          </p>
          <p className="text-sm text-muted-foreground/80 max-w-xl mx-auto mt-4 italic">
            Os projetos abaixo representam diferentes estilos, nichos e necessidades,
            sempre com foco em uma experiência simples, responsiva e profissional.
          </p>
        </header>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filtrar projetos por categoria"
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--dark-bg))] ${
                  isActive
                    ? "bg-gold text-primary-foreground border-gold"
                    : "border-[hsl(var(--dark-border))] text-[hsl(0,0%,80%)] hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((site) => (
            <SiteCard key={site.url} site={site} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">
            Nenhum projeto nesta categoria por enquanto.
          </p>
        )}
      </div>
    </section>
  );
};

export default SitesPortfolioSection;
