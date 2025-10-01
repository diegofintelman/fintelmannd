import diegoImage from "@/assets/diego-fintelman.png";
import gabrielaImage from "@/assets/gabriela-fintelman.png";

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Conheça os <span className="text-gradient-gold">Fundadores</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A união de estratégia, criatividade e persuasão em um só time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Diego */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl aspect-square">
              <img
                src={diegoImage}
                alt="Diego Fintelman"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-60"></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold">Diego Fintelman</h3>
              <p className="text-primary font-semibold">Gestor de Tráfego Pago & Gestor de IAs</p>
              <p className="text-muted-foreground leading-relaxed">
                Especialista em estratégias de tráfego pago com foco em performance e ROI. 
                Domínio em Meta Ads, Google Ads e otimização de campanhas através de IA e análise de dados. 
                Transformou dezenas de negócios através de estratégias inteligentes e mensuráveis.
              </p>
            </div>
          </div>

          {/* Gabriela */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl aspect-square">
              <img
                src={gabrielaImage}
                alt="Gabriela Fintelman"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-60"></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold">Gabriela Fintelman</h3>
              <p className="text-primary font-semibold">Social Media & Copywriter</p>
              <p className="text-muted-foreground leading-relaxed">
                Especialista em criação de conteúdo estratégico e gestão de redes sociais. 
                Domínio em copywriting persuasivo que converte visitantes em clientes. 
                Responsável por campanhas que geraram milhões em vendas através de textos que vendem.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center max-w-3xl mx-auto p-8 border border-primary/20 rounded-2xl bg-muted/50">
          <p className="text-lg leading-relaxed">
            <span className="text-primary font-semibold">Nossa missão</span> é transformar negócios através de estratégias 
            digitais inteligentes, unindo tráfego pago de alta performance, conteúdo criativo e copywriting persuasivo 
            para gerar resultados reais e mensuráveis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
