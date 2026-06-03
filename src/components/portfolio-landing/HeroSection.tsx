import diego from "@/assets/diego.png";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[hsl(var(--dark-bg))]/75" />

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:block relative z-10 min-h-[90vh]">
        {/* Content - Left side, positioned at bottom */}
        <div className="absolute bottom-16 lg:bottom-24 left-8 lg:left-16 xl:left-24 max-w-xl lg:max-w-2xl">
          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 text-gold">
            Diego Fintelman
          </h1>
          <p className="text-xl lg:text-2xl font-light mb-6 text-[hsl(0,0%,85%)]">
            Gestor de Tráfego Pago
          </p>
          <p className="text-base lg:text-lg text-muted-foreground mb-8 leading-relaxed">
            Atuação prática em mídia paga com foco em dados, validação e execução. 
            Trabalho orientado por métricas e aprendizado contínuo.
          </p>

          {/* Badges */}
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 border border-gold/40 text-gold text-sm font-medium tracking-wide">
              Meta Ads
            </span>
            <span className="px-4 py-2 border border-gold/40 text-gold text-sm font-medium tracking-wide">
              Google Ads
            </span>
          </div>
        </div>

        {/* Photo - Absolute positioned, anchored to right and bottom */}
        <img 
          src={diego} 
          alt="Diego Fintelman" 
          className="absolute bottom-0 right-0 lg:right-8 xl:right-16 h-[85vh] w-auto object-contain"
        />
      </div>

      {/* Mobile Layout - Layered structure for depth */}
      <div className="md:hidden relative min-h-[85vh]">
        {/* Layer 2 - Professional Photo (above background, below gradient) */}
        <div className="absolute inset-0 z-[1] flex items-end justify-center overflow-hidden">
          <img 
            src={diego} 
            alt="Diego Fintelman" 
            className="h-[98%] w-auto max-w-none object-contain object-bottom"
          />
        </div>

        {/* Layer 3 - Gradient for text readability */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
        
        {/* Layer 4 - Text Content (top of everything) */}
        <div className="relative z-10 min-h-[85vh] flex flex-col items-center justify-end pb-12 px-6">
          <h1 className="font-display text-3xl font-semibold mb-3 text-gold text-center drop-shadow-lg">
            Diego Fintelman
          </h1>
          <p className="text-lg font-light mb-4 text-[hsl(0,0%,85%)] text-center drop-shadow-md">
            Gestor de Tráfego Pago
          </p>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed text-center max-w-xs mx-auto drop-shadow-sm">
            Atuação prática em mídia paga com foco em dados, validação e execução. 
            Trabalho orientado por métricas e aprendizado contínuo.
          </p>

          {/* Badges */}
          <div className="flex items-center justify-center gap-3">
            <span className="px-3 py-1.5 border border-gold/40 text-gold text-xs font-medium tracking-wide drop-shadow-sm">
              Meta Ads
            </span>
            <span className="px-3 py-1.5 border border-gold/40 text-gold text-xs font-medium tracking-wide drop-shadow-sm">
              Google Ads
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
