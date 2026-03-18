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

        <div className="space-y-16 max-w-6xl mx-auto">
          {/* Diego */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <img
                  src={diegoImage}
                  alt="Diego Fintelman"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-60"></div>
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-3xl font-bold">Diego Fintelman</h3>
              <p className="text-primary font-semibold text-lg">Gestor de Tráfego Pago & Gestor de IAs</p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Especialista em estratégias de tráfego pago com foco em performance e ROI. 
                Domínio em Meta Ads, Google Ads e otimização de campanhas através de IA e análise de dados.
              </p>
            </div>
          </div>

          {/* Gabriela - Com tons de rosé */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center p-8 rounded-3xl border-2 border-[hsl(var(--rose-gold)_/_0.3)] bg-gradient-to-br from-[hsl(var(--rose-gold)_/_0.05)] to-transparent">
            <div className="w-full md:w-1/3">
              <div className="relative overflow-hidden rounded-2xl aspect-square ring-2 ring-[hsl(var(--rose-gold)_/_0.5)]">
                <img
                  src={gabrielaImage}
                  alt="Gabriela Fintelman"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--rose-muted))] via-transparent opacity-60"></div>
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-3xl font-bold text-gradient-rose">Gabriela Fintelman</h3>
              <p className="font-semibold text-lg" style={{ color: 'hsl(var(--rose-gold))' }}>
                Social Media, Copywriter, Design Criativo & Edição de Vídeos
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Especialista em criação de conteúdo estratégico e gestão de redes sociais. 
                Domínio em copywriting persuasivo que converte visitantes em clientes. 
                Expert em design criativo e edição de vídeos que capturam atenção e geram engajamento.
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
