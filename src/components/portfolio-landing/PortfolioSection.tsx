import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioItemProps {
  domain: string;
}

const PortfolioItem = ({ domain }: PortfolioItemProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-b border-border last:border-b-0">
    <span className="font-medium text-foreground text-sm sm:text-base break-all sm:break-normal">
      {domain}
    </span>
    <a
      href={`https://${domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium 
        border border-gold/50 text-gold bg-transparent rounded
        hover:bg-gold/10 hover:border-gold active:bg-gold/20 
        transition-colors duration-200 w-full sm:w-auto"
    >
      Acessar site
      <ExternalLink className="w-4 h-4" />
    </a>
  </div>
);

const portfolioItems = [
  "luizaosteopatia.lovable.app",
  "eduardobraz.lovable.app",
  "drleonarmayer.lovable.app",
  "duofisio.lovable.app",
  "studiocrpilates.lovable.app",
  "brillancedermatologia.lovable.app",
  "julianaalbanooftalmo.lovable.app",
  "psicologarenatagomes.lovable.app",
  "taxitatui.lovable.app",
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-dark py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-center text-primary">
          Sites e Landing Pages desenvolvidos por mim
        </h2>
        
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Abaixo estão alguns sites e landing pages que desenvolvi para projetos reais.
          As páginas foram criadas com foco em estrutura, clareza da proposta
          e adaptação para tráfego pago e uso comercial.
          Os links servem como referência de execução e organização — não como promessa de resultado.
        </p>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {portfolioItems.map((domain) => (
            <PortfolioItem key={domain} domain={domain} />
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center mt-8 max-w-xl mx-auto leading-relaxed">
          Os domínios exibidos representam diferentes contextos de negócio
          e níveis de maturidade digital.
          As páginas foram desenvolvidas respeitando o momento,
          o orçamento e o objetivo de cada projeto.
        </p>
      </div>
    </section>
  );
};

export default PortfolioSection;
