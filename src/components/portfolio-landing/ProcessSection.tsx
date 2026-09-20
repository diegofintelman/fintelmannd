const steps = [
  {
    number: "01",
    title: "Entendimento",
    description: "Compreensão do negócio, objetivos, limitações e contexto atual.",
  },
  {
    number: "02",
    title: "Estruturação",
    description: "Planejamento e configuração das campanhas com base no diagnóstico inicial.",
  },
  {
    number: "03",
    title: "Monitoramento",
    description: "Acompanhamento constante de métricas e identificação de padrões.",
  },
  {
    number: "04",
    title: "Otimização",
    description: "Ajustes graduais baseados em dados, não em achismos.",
  },
  {
    number: "05",
    title: "Comunicação",
    description: "Relatórios claros e alinhamentos frequentes sobre o que está acontecendo.",
  },
];

const ProcessSection = () => {
  return (
    <section className="section-dark py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 text-center text-gold">
          Forma de Trabalho
        </h2>

        <div className="space-y-6">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="flex gap-6 items-start p-6 border border-[hsl(var(--dark-border))] bg-[hsl(var(--dark-card))]"
            >
              <span className="text-gold font-display text-2xl font-semibold shrink-0">
                {step.number}
              </span>
              <div>
                <h3 className="text-lg font-medium mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
