import diegoOnm from "@/assets/diego-onm.png";

const AgencySection = () => {
  return (
    <section className="section-light py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
              Atuação com Agências
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="text-foreground font-medium">Integração simples</span> com 
                times internos. Entendo que cada agência tem seus processos, ferramentas e 
                forma de trabalhar — meu papel é somar, não complicar.
              </p>
              
              <p>
                <span className="text-foreground font-medium">Comunicação objetiva</span> e 
                focada em dados. Sem enrolação, sem relatórios extensos que ninguém lê. 
                Informação clara sobre o que está funcionando e o que precisa de ajuste.
              </p>
              
              <p>
                <span className="text-foreground font-medium">Apoio operacional e analítico</span>. 
                Execução de campanhas, análise de métricas, estruturação de testes — 
                o trabalho técnico que libera tempo do time estratégico.
              </p>
              
              <p>
                Respeito a hierarquias, prazos e processos já estabelecidos. 
                Facilidade de adaptação a diferentes contextos e demandas.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <div className="w-64 md:w-80 border border-border overflow-hidden">
              <img 
                src={diegoOnm} 
                alt="Diego Fintelman no O Novo Mercado" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencySection;
