import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";
import digitalMarketingImage from "@/assets/digital-marketing.webp";

const Contact = () => {
  return (
    <section id="contato" className="py-24 bg-card relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={digitalMarketingImage}
          alt="Marketing Digital"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pronto para <span className="text-gradient-gold">Crescer?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Solicite seu orçamento personalizado e descubra como podemos escalar seu negócio
            </p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-sm text-muted-foreground">(15) 99782-0279</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">contato@fintelman.com.br</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Atendimento imediato</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/20 text-center space-y-6">
              <p className="text-lg">
                Não perca tempo! Entre em contato agora e receba uma análise gratuita do seu negócio.
              </p>
              
              <Button
                size="lg"
                onClick={() => window.open("https://wa.me/5515997820279", "_blank")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-12 py-6 shadow-[var(--shadow-gold)] hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="mr-2" />
                Solicitar Orçamento no WhatsApp
              </Button>

              <p className="text-sm text-muted-foreground">
                Resposta em até 2 horas • Sem compromisso • Atendimento personalizado
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24h</div>
              <p className="text-sm text-muted-foreground">Resposta Máxima</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <p className="text-sm text-muted-foreground">Personalizado</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">Zero</div>
              <p className="text-sm text-muted-foreground">Compromisso Inicial</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
