import { Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Thaís Coelho",
    text: "Tive uma ótima experiência; Diego é especialista em tráfego e fez um excelente trabalho com meu projeto de low-ticket. Além disso, foi sempre prestativo e criou uma página de vendas para mim, oferecendo várias sugestões de copy para anúncios que não faziam parte do serviço contratado. Recomendo a empresa dele para quem está começando seu projeto digital.",
    source: "Google Maps",
    link: "https://maps.app.goo.gl/iJypjKxrWtD9Nywg9",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que dizem sobre o <span className="text-gradient-gold">meu trabalho</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedback real de clientes que confiaram no meu trabalho
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.source}</p>
                  </div>
                  <a
                    href={testimonial.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Ver avaliação
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
