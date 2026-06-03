import { ArrowRight } from "lucide-react";

const SitesCTASection = () => {
  return (
    <section className="section-dark py-16 md:py-20 px-6">
      <div className="max-w-2xl mx-auto text-center border border-[hsl(var(--dark-border))] bg-[hsl(var(--dark-card))] p-8 md:p-10">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 text-gold">
          Também quer ver os sites desenvolvidos?
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Os sites e landing pages que desenvolvi estão organizados em uma página separada,
          para manter este portfólio focado em tráfego pago e estratégia digital.
        </p>
        <a
          href="https://sitesportifolio.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium 
            border border-gold/50 text-gold bg-transparent rounded
            hover:bg-gold/10 hover:border-gold transition-colors duration-200"
        >
          Ver portfólio de sites
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default SitesCTASection;
