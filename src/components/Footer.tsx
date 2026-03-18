import { Instagram, MessageCircle } from "lucide-react";
import logoFooter from "@/assets/logo-footer.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src={logoFooter} alt="Fintelman Negócios Digitais" className="h-12" />
            <p className="text-sm text-muted-foreground">
              Estratégia e inteligência em marketing digital para negócios que querem crescer online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Serviços
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Redes Sociais</h3>
            <div className="flex gap-4">
              <button
                onClick={() => window.open("https://wa.me/5515997820279", "_blank")}
                className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-primary group-hover:text-[hsl(var(--rose-gold))] transition-colors" />
              </button>
              <button
                onClick={() => window.open("https://instagram.com", "_blank")}
                className="w-10 h-10 bg-primary/10 hover:bg-[hsl(var(--rose-gold)_/_0.1)] rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary group-hover:text-[hsl(var(--rose-gold))] transition-colors" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              (15) 99782-0279<br />
              contato@fintelman.com.br
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/20 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Fintelman Negócios Digitais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
