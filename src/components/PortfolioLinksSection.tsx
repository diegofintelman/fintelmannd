import { TrendingUp, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const PortfolioLinksSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-2xl border border-primary/15 bg-card/40 backdrop-blur-sm px-6 py-8 md:px-10 md:py-10 text-center shadow-sm">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Explore nossos <span className="text-gradient-gold">portfólios</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-xl mx-auto leading-relaxed">
            Veja exemplos práticos de projetos em tráfego pago, estratégia digital e sites profissionais desenvolvidos para fortalecer a presença online de diferentes negócios.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/trafego"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <TrendingUp className="w-4 h-4" />
              Portfólio de Tráfego Pago
            </Link>
            <Link
              to="/site"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary/30 bg-background/60 text-foreground font-medium hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Monitor className="w-4 h-4" />
              Portfólio de Sites
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioLinksSection;