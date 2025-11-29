import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import chessImage from "@/assets/chess-pieces.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={chessImage}
          alt="Estratégia e Inteligência"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Estratégia e Inteligência para{" "}
            <span className="text-gradient-gold">Crescer Online</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Tráfego Pago, Social Media e Copywriting para Negócios Locais e Infoprodutos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              onClick={() => window.open("https://wa.me/5515997820279", "_blank")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-[var(--shadow-gold)] hover:shadow-xl transition-all duration-300"
            >
              Peça seu Orçamento no WhatsApp
              <ArrowRight className="ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
