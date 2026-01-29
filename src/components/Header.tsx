import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoNew from "@/assets/logo-new.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <img src={logoNew} alt="Diego Fintelman - Tráfego Pago" className="h-16 md:h-24" />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button onClick={() => scrollToSection("inicio")} className="text-foreground hover:text-primary transition-colors">
                Início
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("sobre")} className="text-foreground hover:text-primary transition-colors">
                Sobre Nós
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors">
                Serviços
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("nichos")} className="text-foreground hover:text-primary transition-colors">
                Nichos
              </button>
            </li>
            <li>
              <a 
                href="https://portifolio-fintelmannd.lovable.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                Portfólio para Agências
              </a>
            </li>
          </ul>

          <Button
            onClick={() => window.open("https://wa.me/5515997820279", "_blank")}
            className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Solicitar Orçamento
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button onClick={() => scrollToSection("inicio")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
              Início
            </button>
            <button onClick={() => scrollToSection("sobre")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
              Sobre Nós
            </button>
            <button onClick={() => scrollToSection("servicos")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
              Serviços
            </button>
            <button onClick={() => scrollToSection("nichos")} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">
              Nichos
            </button>
            <a 
              href="https://portifolio-fintelmannd.lovable.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Portfólio para Agências
            </a>
            <Button
              onClick={() => window.open("https://wa.me/5515997820279", "_blank")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Solicitar Orçamento
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
