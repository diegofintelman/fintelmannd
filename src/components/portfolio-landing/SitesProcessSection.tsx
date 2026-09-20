import { LayoutGrid, Smartphone, MessageSquareText, Globe } from "lucide-react";

const steps = [
  {
    icon: LayoutGrid,
    title: "Estrutura estratégica",
    description: "Organização das informações, seções, chamadas e ordem dos conteúdos.",
  },
  {
    icon: Smartphone,
    title: "Design responsivo",
    description:
      "Layout adaptado para celular, tablet e desktop, com prioridade para a experiência mobile.",
  },
  {
    icon: MessageSquareText,
    title: "Comunicação clara",
    description:
      "Textos objetivos para apresentar serviços, diferenciais e formas de contato.",
  },
  {
    icon: Globe,
    title: "Publicação e presença digital",
    description: "Site online com domínio configurado, links funcionais e estrutura profissional.",
  },
];

const SitesProcessSection = () => {
  return (
    <section className="section-dark py-20 md:py-28 px-6 border-t border-[hsl(var(--dark-border))]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 text-center text-gold">
          Como cada site é pensado
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div
              key={s.title}
              className="p-6 border border-[hsl(var(--dark-border))] bg-[hsl(var(--dark-card))] rounded-xl hover:border-gold/30 transition-colors"
            >
              <s.icon className="w-7 h-7 text-gold mb-4" />
              <h3 className="text-base font-medium mb-2 text-[hsl(0,0%,95%)]">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SitesProcessSection;
