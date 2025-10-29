import { Target, Users, PenTool, TrendingUp, Search, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Target,
    title: "Gestão de Tráfego Pago",
    description: "Estratégias completas em Meta Ads, Google Ads, YouTube Ads e TikTok Ads. Campanhas otimizadas para máximo ROI e resultados mensuráveis.",
    features: ["Meta Ads (Facebook & Instagram)", "Google Ads", "YouTube Ads", "TikTok Ads"],
  },
  {
    icon: Users,
    title: "Social Media",
    description: "Criação de conteúdos estratégicos e gestão completa de redes sociais. Conteúdo que engaja, converte e constrói autoridade.",
    features: ["Planejamento de Conteúdo", "Gestão de Redes", "Design Criativo", "Edição de Vídeos"],
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textos persuasivos que vendem. Copy estratégico para anúncios, sites, landing pages e funis de vendas.",
    features: ["Copy para Anúncios", "Landing Pages", "E-mails de Vendas", "Scripts de Vídeo"],
  },
  {
    icon: Search,
    title: "Google Meu Negócio",
    description: "Otimização completa do seu perfil no Google. Apareça nas primeiras posições quando clientes procurarem seu negócio.",
    features: ["Otimização de Perfil", "Gestão de Avaliações", "Posts Estratégicos", "Análise de Desempenho"],
  },
  {
    icon: TrendingUp,
    title: "Consultoria de Tráfego",
    description: "Análise profunda do seu negócio e estratégias personalizadas. Aprenda a escalar suas campanhas com inteligência.",
    features: ["Auditoria de Campanhas", "Estratégia Personalizada", "Análise de Concorrência", "Plano de Ação"],
  },
  {
    icon: Megaphone,
    title: "Programa Faça Você Mesmo",
    description: "Treinamentos práticos para você gerenciar suas próprias campanhas. Aprenda estratégias validadas e comece do zero.",
    features: ["Treinamento Prático", "Material Didático", "Suporte Individual", "Atualizações Constantes"],
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient-gold">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em marketing digital para escalar seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const isGabiService = index === 1 || index === 2; // Social Media & Copywriting
            return (
              <Card
                key={index}
                className={`bg-card transition-all duration-300 group ${
                  isGabiService 
                    ? 'border-[hsl(var(--rose-gold)_/_0.3)] hover:border-[hsl(var(--rose-gold)_/_0.5)] hover:shadow-[var(--shadow-rose)]' 
                    : 'border-primary/20 hover:border-primary/40 hover:shadow-[var(--shadow-gold)]'
                }`}
              >
                <CardContent className="p-8 space-y-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors ${
                    isGabiService
                      ? 'bg-[hsl(var(--rose-gold)_/_0.1)] group-hover:bg-[hsl(var(--rose-gold)_/_0.2)]'
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <service.icon className={`w-8 h-8 ${isGabiService ? 'text-[hsl(var(--rose-gold))]' : 'text-primary'}`} />
                  </div>
                  
                  <h3 className={`text-2xl font-bold ${isGabiService ? 'text-gradient-rose' : ''}`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 pt-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          isGabiService ? 'bg-[hsl(var(--rose-gold))]' : 'bg-primary'
                        }`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            E mais: Design, Edição de Vídeos e Criação de Sites
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
