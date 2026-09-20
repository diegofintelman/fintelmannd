import { Target, TrendingUp, FlaskConical, BarChart3, Layout, Tags } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Gestão de Tráfego Pago",
    description: "Meta Ads e Google Ads",
  },
  {
    icon: TrendingUp,
    title: "Campanhas de Vendas e Leads",
    description: "Estruturas focadas em conversão",
  },
  {
    icon: FlaskConical,
    title: "Testes e Validação",
    description: "Criativos, públicos e estruturas",
  },
  {
    icon: BarChart3,
    title: "Otimização Contínua",
    description: "Decisões baseadas em métricas",
  },
  {
    icon: Layout,
    title: "Landing Pages",
    description: "Criação na Lovable como apoio ao tráfego",
  },
  {
    icon: Tags,
    title: "Traqueamento",
    description: "Eventos via Google Tag Manager",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-dark py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 text-center text-gold">
          Áreas de Atuação
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.title}
              className="p-6 border border-[hsl(var(--dark-border))] bg-[hsl(var(--dark-card))] hover:border-gold/30 transition-colors"
            >
              <service.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="text-lg font-medium mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
