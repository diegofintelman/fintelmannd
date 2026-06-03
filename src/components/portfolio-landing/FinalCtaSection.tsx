import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5515997820279?text=" +
  encodeURIComponent("Olá! Quero solicitar um orçamento para criação de site.");

const FinalCtaSection = () => {
  return (
    <section className="section-dark py-20 md:py-28 px-6 border-t border-[hsl(var(--dark-border))]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-5 text-gold">
          Quer um site profissional para apresentar melhor o seu negócio?
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
          Se você precisa de uma página clara, moderna e bem estruturada para fortalecer
          sua presença digital, solicite um orçamento.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-primary-foreground font-medium rounded-md hover:bg-gold-light transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Solicitar orçamento pelo WhatsApp
        </a>
      </div>
    </section>
  );
};

export default FinalCtaSection;
