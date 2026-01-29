import { Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Thaís Coelho",
    text: "Tive uma ótima experiência; Diego é especialista em tráfego e fez um excelente trabalho com meu projeto de low-ticket. Além disso, foi sempre prestativo e criou uma página de vendas para mim, oferecendo várias sugestões de copy para anúncios que não faziam parte do serviço contratado. Recomendo a empresa dele para quem está começando seu projeto digital.",
    source: "Google Maps",
    link: "https://maps.app.goo.gl/iJypjKxrWtD9Nywg9",
  },
  {
    name: "Marcos Oliveira",
    text: "Profissional atencioso e que entende do que faz. Conseguiu melhorar os resultados das minhas campanhas em pouco tempo. Comunicação clara e sempre disponível para tirar dúvidas.",
    source: "Google Maps",
    link: "https://maps.app.goo.gl/e7GMUwEBToYtCoHD8",
  },
  {
    name: "Juliana Santos",
    text: "Contratei para gerenciar o tráfego da minha loja e fiquei satisfeita com o trabalho. Organizado, pontual e com boas ideias para os criativos. Recomendo.",
    source: "Google Maps",
    link: "https://maps.app.goo.gl/Mj3yndvkTFGDBiwc9",
  },
];

const Testimonials = () => {
  const [plugin] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

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

        <div className="max-w-4xl mx-auto">
          <Carousel
            plugins={[plugin]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
