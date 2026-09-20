import { TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    icon: DollarSign,
    value: "R$10M+",
    label: "Investidos em Tráfego",
    description: "Gerenciamos milhões em investimento publicitário com ROI positivo",
  },
  {
    icon: Users,
    value: "+100",
    label: "Clientes Satisfeitos",
    description: "Empresas e empreendedores que confiam em nosso trabalho",
  },
  {
    icon: TrendingUp,
    value: "350%",
    label: "ROI Médio",
    description: "Retorno sobre investimento médio das nossas campanhas",
  },
  {
    icon: Target,
    value: "98%",
    label: "Taxa de Sucesso",
    description: "Clientes que atingiram ou superaram suas metas",
  },
];

const testimonials = [
  {
    name: "Maria Silva",
    business: "Clínica de Estética",
    text: "Aumentamos em 300% o número de agendamentos em apenas 3 meses. O investimento voltou multiplicado!",
    result: "+300% leads qualificados",
  },
  {
    name: "João Santos",
    business: "Infoprodutor",
    text: "Escalamos de R$20k para R$150k/mês em vendas. A estratégia de tráfego foi fundamental.",
    result: "R$20k → R$150k/mês",
  },
  {
    name: "Ana Costa",
    business: "Restaurante",
    text: "Nossa reserva online aumentou 400% e o delivery cresceu exponencialmente. Vale cada centavo!",
    result: "+400% em reservas",
  },
];

const Results = () => {
  return (
    <section id="casos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient-gold">Resultados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Números que comprovam a efetividade das nossas estratégias
          </p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <metric.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary">{metric.value}</div>
                <div className="font-semibold">{metric.label}</div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            O que nossos <span className="text-gradient-gold">clientes dizem</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-card border-primary/20 hover:shadow-[var(--shadow-gold)] transition-all duration-300"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="pt-4 border-t border-primary/20">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                    <p className="text-primary font-bold mt-2">{testimonial.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
