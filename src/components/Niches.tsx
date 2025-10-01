import { Store, Laptop } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const niches = [
  {
    icon: Store,
    title: "Negócios Locais",
    description: "Estratégias especializadas para empresas locais que querem dominar sua região e atrair mais clientes.",
    examples: [
      "Restaurantes e Cafés",
      "Clínicas e Consultórios",
      "Escolas e Cursos Presenciais",
      "Lojas e Comércios Locais",
      "Prestadores de Serviços",
      "Academias e Estúdios",
    ],
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Laptop,
    title: "Infoprodutos Perpétuos",
    description: "Campanhas otimizadas para escalar vendas de produtos digitais com funis de alta conversão e automação.",
    examples: [
      "Cursos Online",
      "Ebooks e Materiais Digitais",
      "Mentorias e Consultorias",
      "Comunidades e Assinaturas",
      "Softwares e Ferramentas",
      "Programas de Treinamento",
    ],
    color: "from-primary/20 to-primary/5",
  },
];

const Niches = () => {
  return (
    <section id="nichos" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient-gold">Nichos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Especializados em dois mercados estratégicos com alta demanda
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {niches.map((niche, index) => (
            <Card
              key={index}
              className="bg-background border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--shadow-gold)] overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${niche.color}`}></div>
              
              <CardContent className="p-8 space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <niche.icon className="w-10 h-10 text-primary" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold">{niche.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {niche.description}
                  </p>
                </div>
                
                <div className="space-y-3 pt-4">
                  <p className="font-semibold text-primary">Clientes Ideais:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {niche.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-sm">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground">
            Trabalhamos com nichos que entendemos profundamente, garantindo estratégias 
            personalizadas e resultados consistentes para seu tipo de negócio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Niches;
