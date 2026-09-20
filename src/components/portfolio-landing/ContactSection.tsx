import logo from "@/assets/logo.png";
import { MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="section-dark py-20 md:py-28 px-6 border-t border-[hsl(var(--dark-border))]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-gold">
          Vamos Conversar
        </h2>
        
        <p className="text-muted-foreground mb-10 text-lg">
          Vamos entender como posso contribuir com seus projetos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a 
            href="https://wa.me/5515997820279" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-primary-foreground font-medium hover:bg-gold-light transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
          
          <a 
            href="https://instagram.com/diego.fintelman" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold font-medium hover:bg-gold hover:text-primary-foreground transition-colors"
          >
            @diego.fintelman
          </a>
        </div>

        {/* Footer Logo */}
        <div className="pt-8 border-t border-[hsl(var(--dark-border))]">
          <img 
            src={logo} 
            alt="Diego Fintelman" 
            className="h-10 w-auto mx-auto opacity-60"
          />
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} Diego Fintelman. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
