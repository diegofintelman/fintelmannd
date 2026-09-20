const AgencySection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
          Você é dono de agência e está em busca de um subido?
        </h2>
        
        <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
          Se você precisa de alguém para somar na operação de tráfego, com leitura realista de dados, 
          respeito a processos e foco em execução, meu portfólio mostra como eu trabalho na prática.
        </p>
        
        <a
          href="https://portifolio.fintelmannd.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors duration-300"
        >
          Ver portfólio de tráfego pago
        </a>
      </div>
    </section>
  );
};

export default AgencySection;
