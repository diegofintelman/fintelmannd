const tools = [
  "Meta Ads",
  "Google Ads",
  "Google Tag Manager",
  "Lovable",
];

const ToolsSection = () => {
  return (
    <section className="section-dark py-16 md:py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8 text-gold">
          Ferramentas
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool) => (
            <span 
              key={tool}
              className="px-5 py-2 border border-[hsl(var(--dark-border))] text-sm text-[hsl(0,0%,75%)] hover:border-gold/30 hover:text-gold transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
