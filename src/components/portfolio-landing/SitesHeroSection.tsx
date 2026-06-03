import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_URL =
  "https://wa.me/5515997820279?text=" +
  encodeURIComponent("Olá! Gostaria de solicitar um orçamento de site.");

const SitesHeroSection = () => {
  return (
    <section
      className="relative min-h-[88vh] md:min-h-[92vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[hsl(var(--dark-bg))]/85" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at top right, hsl(var(--gold) / 0.18), transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <span className="inline-block px-3 py-1 mb-6 text-xs tracking-[0.2em] uppercase text-gold border border-gold/40 rounded-full">
          Portfólio de Sites
        </span>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[hsl(0,0%,98%)] mb-6">
          Sites profissionais criados para transmitir{" "}
          <span className="text-gold">autoridade, clareza e confiança</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          Uma seleção de páginas desenvolvidas para profissionais e negócios que precisam
          de uma presença digital mais estratégica, organizada e preparada para gerar
          percepção de valor.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gold text-primary-foreground font-medium rounded-md hover:bg-gold-light transition-colors"
          >
            Solicitar orçamento de site
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gold/50 text-gold font-medium rounded-md hover:bg-gold/10 transition-colors"
          >
            Ver portfólio
          </a>
        </div>
      </div>
    </section>
  );
};

export default SitesHeroSection;
