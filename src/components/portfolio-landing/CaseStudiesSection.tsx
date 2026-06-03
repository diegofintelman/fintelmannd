import { useState } from "react";
import { X } from "lucide-react";
import caseClinica from "@/assets/case-clinica.png";
import caseMentoria from "@/assets/case-mentoria.png";
import caseLowticket1 from "@/assets/case-lowticket-1.png";
import caseLowticket2 from "@/assets/case-lowticket-2.png";
import caseRevisalei1 from "@/assets/case-revisalei-1.png";
import caseRevisalei2 from "@/assets/case-revisalei-2.png";

interface CaseStudyProps {
  title: string;
  context: string;
  strategy: string;
  results: string;
  images: string[];
  onImageClick: (img: string) => void;
}

const CaseStudyCard = ({ title, context, strategy, results, images, onImageClick }: CaseStudyProps) => (
  <div className="bg-card border border-border p-6 md:p-8">
    <h3 className="font-display text-xl md:text-2xl font-semibold mb-6 text-primary">
      {title}
    </h3>
    
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Contexto
        </h4>
        <p className="text-foreground leading-relaxed">{context}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Estratégia
        </h4>
        <p className="text-foreground leading-relaxed">{strategy}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Leitura de Resultados
        </h4>
        <p className="text-foreground leading-relaxed">{results}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Evidência Visual
        </h4>
        <div className={`grid gap-4 ${images.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => onImageClick(img)}
              className="border border-border overflow-hidden rounded-sm cursor-pointer hover:border-primary/50 transition-colors group"
            >
              <img 
                src={img} 
                alt={`Print do Gerenciador de Anúncios - ${title}`}
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
              />
              <span className="block text-xs text-muted-foreground py-2 bg-muted/30">
                Clique para ampliar
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

interface CaseStudyData {
  title: string;
  context: string;
  strategy: string;
  results: string;
  images: string[];
}

const caseStudies: CaseStudyData[] = [
  {
    title: "Clínica de Estética — Negócio Local",
    context: "Clínica de estética com foco em procedimentos locais. Objetivo principal: aumentar visibilidade e gerar contatos via WhatsApp. Orçamento limitado e necessidade de retorno rápido em agendamentos.",
    strategy: "Campanhas de engajamento e mensagens para WhatsApp com segmentação geográfica. Criativos focados em resultados visuais dos procedimentos e ofertas sazonais. Testes de públicos por interesse e lookalike de clientes.",
    results: "A campanha de mensagens mostrou melhor performance que engajamento puro. Públicos por interesse específico (estética, beleza) performaram melhor que segmentação ampla. O principal aprendizado foi a importância de criativos que mostram transformação real.",
    images: [caseClinica],
  },
  {
    title: "Mentoria de Carreiras — Infoproduto",
    context: "Mentoria individual para profissionais em transição de carreira. Produto de ticket médio, vendido via call de vendas. Objetivo: geração de leads qualificados para conversão posterior.",
    strategy: "Campanhas de leads com formulário nativo da Meta. Tráfego para perfil do Instagram para aquecimento. Criativos baseados em dores específicas do público-alvo (insatisfação profissional, busca por propósito).",
    results: "Leads do formulário nativo tiveram custo menor, mas qualificação variável. Tráfego para perfil ajudou no aquecimento, mas demanda acompanhamento de conteúdo orgânico. Principal insight: a qualificação do lead depende muito da clareza da oferta no criativo.",
    images: [caseMentoria],
  },
  {
    title: "Low Ticket em Validação — Infoproduto",
    context: "Produto digital de baixo valor em fase de teste. Projeto em validação, buscando entender product-market fit através de tráfego pago. Múltiplas variações de criativos e públicos sendo testadas simultaneamente.",
    strategy: "Estrutura de testes A/B com variações de headlines, formatos de criativo e públicos. Análise de métricas intermediárias (CTR, CPC, Hook Rate) para identificar padrões antes de olhar conversão final.",
    results: "Criativos com gancho emocional tiveram CTR superior. Públicos mais nichados mostraram CPC mais alto, mas potencial de conversão maior. O projeto ainda está em validação — os dados servem para refinar a próxima iteração, não para declarar sucesso.",
    images: [caseLowticket1, caseLowticket2],
  },
  {
    title: "RevisaLei — Material para Concurso Público",
    context: "Produto digital focado em materiais de estudo para concursos públicos. Objetivo: vendas diretas via página de vendas. Foco secundário em crescimento de base e visibilidade.",
    strategy: "Campanhas de purchase com otimização para conversão. Análise completa de funil: visualização de página, início de checkout, compra. Criativos que comunicam autoridade e resultados de aprovados.",
    results: "A análise de funil revelou gargalo no checkout — ajustes na página de vendas foram necessários além do tráfego. Públicos de retargeting (visitantes do site) tiveram ROAS significativamente superior. Principal aprendizado: tráfego e página de vendas precisam trabalhar juntos.",
    images: [caseRevisalei1, caseRevisalei2],
  },
];

const CaseStudiesSection = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <section className="section-light py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-center">
            Estudos de Caso
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Exemplos reais de execução com leitura de dados e aprendizados. 
            Não são promessas de resultado — são demonstrações de processo.
          </p>

          <div className="space-y-8">
            {caseStudies.map((study) => (
              <CaseStudyCard 
                key={study.title} 
                {...study} 
                onImageClick={setLightboxImage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Print ampliado"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default CaseStudiesSection;
