/**
 * Conteúdo das páginas de serviço.
 *
 * Um serviço nunca é apresentado como item de cardápio: cada página diz a qual
 * etapa do método ele pertence, o que entra, o que NÃO entra, e para quem não
 * serve. Dizer para quem não serve é o que faz a página filtrar em vez de
 * apenas atrair.
 */

export type Servico = {
  slug: string;
  nome: string;
  /** Etapa(s) do método a que pertence. */
  etapas: string[];
  metaTitle: string;
  metaDescription: string;
  headline: string;
  standfirst: string;
  /** O problema que este serviço resolve, em prosa. */
  problema: { titulo: string; paragrafos: string[] };
  /** O que está incluído. Fato, não benefício inflado. */
  entregaveis: { titulo: string; texto: string }[];
  /** O que explicitamente não está incluído. */
  naoIncluso: string[];
  /** Para quem este serviço não serve. */
  naoServe: string[];
  /** Nota do praticante, para a margem. */
  nota: string;
  /** Slugs de cases relacionados. */
  casesRelacionados: string[];
  faq: { p: string; r: string }[];
};

export const servicos: Servico[] = [
  {
    slug: "trafego-pago",
    nome: "Tráfego pago",
    etapas: ["04"],
    metaTitle: "Gestão de tráfego pago: Meta Ads e Google Ads",
    metaDescription:
      "Campanhas conectadas a oferta, página de destino e medição. Com critério de corte definido antes de ligar a verba, e leitura de funil inteiro.",
    headline: "Tráfego pago conectado ao que acontece depois do clique",
    standfirst:
      "Meta Ads e Google Ads, com hipótese escrita antes de ligar a verba e critério de corte definido antes do primeiro resultado ruim.",
    problema: {
      titulo: "Por que a maior parte da verba de mídia é desperdiçada",
      paragrafos: [
        "Não é por segmentação ruim. É porque a campanha foi tratada como um sistema fechado: alguém otimiza CPC e CTR dentro da plataforma enquanto a conversão real acontece, ou deixa de acontecer — três passos depois, numa página que ninguém olhou e num WhatsApp que ninguém cronometrou.",
        "O resultado é um relatório que melhora mês a mês enquanto o comercial continua reclamando da qualidade do lead. Os dois estão certos: as métricas de mídia melhoraram mesmo, e o negócio não mudou.",
        "Gerenciar tráfego sem poder mexer na página de destino e sem ver a medição é operar com as duas alavancas mais baratas amarradas.",
      ],
    },
    entregaveis: [
      {
        titulo: "Estruturação de campanha",
        texto:
          "Arquitetura de campanha, conjunto e anúncio, com nomenclatura padronizada. Nomenclatura parece detalhe até o terceiro mês, quando ninguém mais consegue ler o relatório.",
      },
      {
        titulo: "Hipótese e critério de corte por campanha",
        texto:
          "O que se está testando, qual resultado confirma e qual resultado encerra. Escrito antes, para a decisão de cortar não virar discussão.",
      },
      {
        titulo: "Gestão e otimização contínua",
        texto:
          "Ajuste de verba, público e criativo com base na leitura do funil inteiro, não só das métricas da plataforma.",
      },
      {
        titulo: "Leitura mensal com recomendação",
        texto:
          "O que aconteceu, por que, e o que muda no ciclo seguinte. Inclusive quando a recomendação é reduzir investimento.",
      },
    ],
    naoIncluso: [
      "Produção de criativo. É contratada à parte, ou executada pelo seu time",
      "Construção da página de destino — idem",
      "Atendimento comercial aos leads gerados",
      "Gestão de redes sociais orgânicas",
    ],
    naoServe: [
      "Quem quer começar com verba muito baixa e retorno imediato: abaixo de um certo volume, o que se lê é ruído, e o aprendizado não paga o custo da gestão",
      "Quem não pode ou não quer instalar medição. Sem isso, não há como defender nenhuma decisão de otimização",
      "Quem procura garantia de resultado em número: não trabalho com promessa de performance",
    ],
    nota: "O pedido mais comum é “melhora o CPL”. Em boa parte dos casos dá para melhorar o CPL e piorar o negócio, é só afrouxar a qualificação. Por isso a leitura mensal olha o que o comercial recebeu, não só o que a plataforma contou.",
    casesRelacionados: ["clinica-de-estetica", "mentoria-de-carreiras", "material-para-concurso"],
    faq: [
      {
        p: "Qual o investimento mínimo em mídia?",
        r: "Depende do ticket e do ciclo de venda, não de uma tabela. O que importa é ter volume suficiente para as decisões saírem de dado e não de impressão, e isso é diferente para cada negócio. É uma das coisas que o diagnóstico responde.",
      },
      {
        p: "Vocês trabalham com contrato de fidelidade?",
        r: "Trabalho com prazo mínimo inicial, porque os primeiros 30 a 60 dias são de estruturação e aprendizado, e encerrar no meio significa jogar fora exatamente a parte que ainda não gerou retorno. Depois disso, mensal.",
      },
      {
        p: "Quem fica com a conta de anúncio?",
        r: "Você. Sempre. Eu entro como usuário na sua conta e no seu Business Manager. Conta de anúncio no nome do fornecedor é um risco que não vale a conveniência.",
      },
      {
        p: "E se eu já tenho campanhas rodando?",
        r: "Melhor: o histórico é informação. O trabalho começa por uma auditoria do que está no ar antes de qualquer mudança — pausar tudo e recomeçar do zero costuma descartar aprendizado que foi pago.",
      },
    ],
  },

  {
    slug: "sites-e-landing-pages",
    nome: "Sites e landing pages",
    etapas: ["03", "05"],
    metaTitle: "Criação de sites e landing pages que convertem",
    metaDescription:
      "Sites institucionais e páginas de campanha com SEO técnico, medição instalada e conteúdo indexável. A página cumpre uma função no processo de aquisição.",
    headline: "A página não existe para parecer bonita",
    standfirst:
      "Ela cumpre uma função no processo de aquisição: responder à promessa que trouxe a pessoa até ali, e registrar que ela chegou.",
    problema: {
      titulo: "Dois tipos de site que não funcionam",
      paragrafos: [
        "O primeiro é o folheto: bonito, institucional, três parágrafos sobre a missão da empresa e um formulário de contato no rodapé. Ele não converte porque nunca foi feito para converter. Foi feito para existir.",
        "O segundo é mais caro: o site moderno, feito numa plataforma visual, que entrega HTML vazio para o Google. O conteúdo só aparece depois que o JavaScript roda, e para o buscador a página é uma casca. A empresa paga por um site que existe apenas para quem já sabia o endereço.",
        "Os dois têm o mesmo sintoma final: a empresa depende de anúncio para qualquer pessoa chegar, porque não há nada que a encontre sozinha.",
      ],
    },
    entregaveis: [
      {
        titulo: "Arquitetura de informação",
        texto:
          "Quais páginas existem, o que cada uma resolve e como elas se ligam. Antes do design, porque design de uma estrutura errada é retrabalho caro.",
      },
      {
        titulo: "Construção com conteúdo indexável",
        texto:
          "HTML servido pronto, com título, descrição e URL canônica próprios por página. É o que permite ser encontrado por busca e citado por assistente de IA.",
      },
      {
        titulo: "SEO técnico de fábrica",
        texto:
          "Hierarquia de títulos, dados estruturados, sitemap, robots, texto alternativo em imagem e desempenho medido. Não adicionados depois.",
      },
      {
        titulo: "Medição instalada junto",
        texto:
          "Eventos de clique, início e envio de formulário nomeados e documentados no dia em que a página entra no ar.",
      },
      {
        titulo: "Landing pages de campanha",
        texto:
          "Páginas de campanha construídas sobre blocos reutilizáveis, para uma LP nova sair em dias e não em semanas.",
      },
    ],
    naoIncluso: [
      "Produção de fotografia e vídeo",
      "Redação de blog em volume. A estrutura fica pronta, a produção editorial é contratada à parte",
      "Loja virtual e integração de pagamento",
      "Manutenção de sistema de terceiros já existente",
    ],
    naoServe: [
      "Quem precisa de um site no ar em 48 horas: nesse prazo, um construtor de site pronto entrega melhor custo-benefício",
      "Quem quer replicar um layout visto em outro lugar sem discutir qual função cada página cumpre",
      "Quem não tem clareza sobre a própria oferta — nesse caso a página vai expor a falta de clareza, não resolvê-la",
    ],
    nota: "A pergunta que eu faço primeiro não é “quantas páginas”. É “o que precisa acontecer para você considerar essa página um sucesso”. Em metade das conversas, é a primeira vez que alguém pergunta isso.",
    casesRelacionados: ["material-para-concurso"],
    faq: [
      {
        p: "O site fica em qual plataforma?",
        r: "Depende do caso. Para site institucional com conteúdo que muda pouco, construção própria com publicação estática dá o melhor desempenho e o menor custo de manutenção. Quando há necessidade real de publicação frequente por quem não mexe em código, avalio um gerenciador de conteúdo, mas só quando a necessidade é real, não por precaução.",
      },
      {
        p: "Quem fica com o domínio e a hospedagem?",
        r: "Você, no seu nome. Eu configuro e entrego o acesso. Domínio no nome do fornecedor é o tipo de coisa que só vira problema no dia em que a relação acaba.",
      },
      {
        p: "Dá para mexer no conteúdo depois sem depender de você?",
        r: "Texto e imagem, sim. A estrutura é preparada para isso e a entrega inclui como fazer. Mudança de estrutura de página é desenvolvimento.",
      },
      {
        p: "Quanto tempo leva?",
        r: "Uma landing page de campanha, poucos dias. Um site institucional com várias páginas de serviço, algumas semanas. A maior parte do prazo é definição de conteúdo, não construção.",
      },
    ],
  },

  {
    slug: "trackeamento-e-dados",
    nome: "Trackeamento e dados",
    etapas: ["07", "08"],
    metaTitle: "Trackeamento: GTM, GA4, Pixel e conversões",
    metaDescription:
      "Plano de medição escrito antes do código. Eventos nomeados, conversão separada de microconversão e documentação que fica com você.",
    headline: "Se a conversão não está no relatório, ela não existe na decisão",
    standfirst:
      "Implantação e auditoria de medição: Google Tag Manager, GA4, Pixel da Meta e conversões de Google Ads, com plano escrito antes de qualquer tag entrar no ar.",
    problema: {
      titulo: "O relatório bonito que não serve para decidir",
      paragrafos: [
        "A medição quebrada quase nunca se apresenta como erro. Ela se apresenta como um número grande e otimista que ninguém questiona, porque questionar dá trabalho e o número está subindo.",
        "Os três modos de falha mais comuns: contar como conversão qualquer coisa que se mexa, de modo que clique em WhatsApp, visita à página de preço e envio de formulário virem o mesmo número; contar a mesma conversão duas vezes, por tag duplicada; e medir corretamente uma coisa que ninguém sabe mais o que significa, porque quem montou o container saiu da empresa sem documentar.",
        "O custo disso não aparece no mês. Aparece na decisão de alocação do mês seguinte, que vai ser tomada em cima de um número errado.",
      ],
    },
    entregaveis: [
      {
        titulo: "Auditoria do que já existe",
        texto:
          "Antes de instalar qualquer coisa nova. Tag duplicada, disparo em pageview indevido e evento órfão são mais comuns que evento faltando.",
      },
      {
        titulo: "Plano de medição escrito",
        texto:
          "Cada evento com nome, condição de disparo e classificação: microconversão ou conversão principal. O plano vem antes do código, e é o que permite auditar depois.",
      },
      {
        titulo: "Implantação",
        texto:
          "GTM, GA4, Pixel da Meta e conversões de Google Ads. Medição server-side quando o caso justifica o custo de infraestrutura.",
      },
      {
        titulo: "Validação com disparo real",
        texto:
          "Cada evento testado disparando de verdade, em navegador real, não apenas no modo de prévia.",
      },
      {
        titulo: "Documentação entregue",
        texto:
          "O que cada evento significa, onde dispara e o que conta como conversão. Fica com você. É o que permite trocar de fornecedor sem arqueologia.",
      },
    ],
    naoIncluso: [
      "Construção de painel de BI",
      "Integração com CRM que não exponha API",
      "Análise estatística avançada e modelagem de atribuição",
    ],
    naoServe: [
      "Quem quer instalar tag rápido sem discutir o que vai ser medido: metade do trabalho aqui é decidir o que conta como conversão",
      "Quem não tem tráfego nenhum ainda — nesse caso a ordem é construir a página primeiro, com medição já embutida",
    ],
    nota: "A pergunta que abre quase toda auditoria: “me mostra uma conversão do mês passado e me diz de onde ela veio”. Se ninguém na sala conseguir responder em dois minutos, o problema não é de relatório.",
    casesRelacionados: ["material-para-concurso"],
    faq: [
      {
        p: "Preciso migrar para server-side?",
        r: "Só se o caso justificar. Server-side recupera sinal perdido por bloqueio de navegador e dá mais controle sobre o dado enviado, mas tem custo de infraestrutura e de manutenção. Para quem investe pouco em mídia, não se paga.",
      },
      {
        p: "Vocês mexem no meu container atual?",
        r: "Se houver estrutura aproveitável, sim. Recriar do zero só quando reorganizar custar mais que refazer, e nesse caso eu mostro o porquê antes de fazer.",
      },
      {
        p: "Isso resolve a diferença entre o número da Meta e o do Analytics?",
        r: "Reduz e explica. Os dois sistemas contam de formas diferentes, com janelas de atribuição diferentes, e sempre vão divergir um pouco. O que a implantação correta faz é transformar a divergência de um mistério em uma diferença conhecida e explicável.",
      },
    ],
  },

  {
    slug: "criativos",
    nome: "Criativos",
    etapas: ["04"],
    metaTitle: "Criativos para anúncios: ângulos, ganchos e variações",
    metaDescription:
      "Criativos desenhados por etapa de funil, com ângulo definido antes da peça. Teste estruturado em vez de variação aleatória.",
    headline: "Criativo é hipótese, não decoração",
    standfirst:
      "Peças para anúncio desenhadas a partir de um ângulo definido, organizadas para que o teste produza aprendizado e não apenas variedade.",
    problema: {
      titulo: "Testar dez peças não é testar",
      paragrafos: [
        "O padrão do mercado é produzir dez variações, subir todas e ver qual performa. Quando uma ganha, ninguém consegue dizer por quê, porque as dez variavam em tudo ao mesmo tempo: imagem, headline, oferta e formato.",
        "O resultado é que o aprendizado não acumula. No mês seguinte produzem-se mais dez, do zero, e a conta recomeça.",
        "Criativo bom é criativo que responde a uma pergunta. Qual dor abre mais conversa: a financeira ou a de tempo? Prova visual funciona melhor que depoimento falado para este público? São perguntas testáveis, e a resposta vale para todas as campanhas seguintes.",
      ],
    },
    entregaveis: [
      {
        titulo: "Mapa de ângulos",
        texto:
          "Os eixos de comunicação possíveis para a oferta, com a hipótese de qual deve funcionar para cada etapa de funil.",
      },
      {
        titulo: "Peças estáticas para anúncio",
        texto:
          "Nos formatos de cada posicionamento, com a variação isolada por eixo, para o teste produzir resposta.",
      },
      {
        titulo: "Ganchos e variações de headline",
        texto:
          "Texto principal e título organizados por ângulo, não por inspiração.",
      },
      {
        titulo: "Leitura do teste",
        texto:
          "O que a rodada respondeu, o que segue em aberto e qual é a próxima pergunta.",
      },
    ],
    naoIncluso: [
      "Produção de vídeo e gravação em estúdio",
      "Ensaio fotográfico",
      "Identidade visual e construção de marca",
      "Gestão de conteúdo orgânico para redes sociais",
    ],
    naoServe: [
      "Quem precisa de volume alto de peças por mês sem estrutura de teste: nesse caso um fornecedor de produção em escala atende melhor",
      "Quem não tem campanha rodando com volume para ler resultado. Sem dado, a escolha do criativo volta a ser gosto",
    ],
    nota: "O criativo que mais performou em todos os projetos que já rodei foi, quase sempre, o mais literal. Mostrar o que a pessoa vai receber costuma vencer a metáfora bem produzida.",
    casesRelacionados: ["clinica-de-estetica", "low-ticket-em-validacao"],
    faq: [
      {
        p: "Vocês produzem vídeo?",
        r: "Edição de material existente, sim. Produção e gravação, não. Para isso indico quem faz.",
      },
      {
        p: "Quantas peças por mês?",
        r: "Depende do volume de verba: com pouco investimento, muitas peças significa nenhuma com dado suficiente para concluir alguma coisa. O número sai do cálculo de quanto tempo cada variação precisa para juntar volume, não de um pacote.",
      },
      {
        p: "Posso usar as peças fora do anúncio?",
        r: "Pode. Os arquivos editáveis são entregues junto.",
      },
    ],
  },

  {
    slug: "google-meu-negocio",
    nome: "Google Meu Negócio",
    etapas: ["03"],
    metaTitle: "Google Meu Negócio: otimização de perfil para busca local",
    metaDescription:
      "Perfil estruturado para aparecer na busca local e no mapa, com categorias corretas, gestão de avaliações e conteúdo conectado ao site.",
    headline: "O canal mais barato para quem depende de ser encontrado na região",
    standfirst:
      "Estruturação e manutenção do perfil que aparece no mapa e no bloco local da busca. Normalmente antes de qualquer resultado orgânico.",
    problema: {
      titulo: "Um ativo gratuito que quase ninguém opera",
      paragrafos: [
        "Para negócio local, o perfil do Google costuma receber mais visualizações que o site inteiro, e é o único canal em que a empresa aparece exatamente no momento em que alguém procura o que ela vende, perto de onde ela está.",
        "Mesmo assim, o padrão é um perfil criado uma vez, com categoria genérica, horário desatualizado, três fotos de 2019 e avaliações sem resposta.",
        "Não é falta de importância. É que ninguém é dono da tarefa.",
      ],
    },
    entregaveis: [
      {
        titulo: "Estruturação do perfil",
        texto:
          "Categoria principal e secundárias, serviços, área de atendimento, horário e atributos. A escolha de categoria é a decisão de maior impacto e a mais negligenciada.",
      },
      {
        titulo: "Conteúdo e publicações",
        texto:
          "Publicações e fotos em cadência, que também alimentam o sinal de atividade do perfil.",
      },
      {
        titulo: "Gestão de avaliações",
        texto:
          "Processo para pedir avaliação sem constranger o cliente, e resposta a todas — inclusive, e principalmente, às negativas.",
      },
      {
        titulo: "Ligação com o site",
        texto:
          "Perfil e páginas de serviço apontando um para o outro, com informação consistente. Divergência de endereço ou telefone entre os dois enfraquece os dois.",
      },
    ],
    naoIncluso: [
      "Remoção de avaliação negativa — só o Google remove, e apenas quando viola a política dele",
      "Criação de avaliação: não compro nem fabrico avaliação, em nenhuma circunstância",
      "Gestão de perfis em outros diretórios",
    ],
    naoServe: [
      "Negócio 100% online sem atendimento local e sem endereço: o perfil não se aplica",
      "Quem espera resultado em dias — busca local responde em semanas",
    ],
    nota: "Responder avaliação negativa em público converte mais que dez avaliações positivas sem resposta. Quem está lendo não está julgando o problema: está julgando como a empresa reage a ele.",
    casesRelacionados: ["clinica-de-estetica"],
    faq: [
      {
        p: "Preciso ter endereço comercial?",
        r: "Não necessariamente. Negócios que atendem no endereço do cliente podem operar como área de atendimento, sem exibir endereço. O que não funciona é não ter nem endereço nem área definida.",
      },
      {
        p: "Dá para aparecer em primeiro no mapa?",
        r: "Não existe garantia. O resultado local depende de proximidade, relevância e destaque, e proximidade ninguém controla. O que dá para fazer é garantir que relevância e destaque estejam corretos, que é onde a maior parte dos perfis perde.",
      },
      {
        p: "Isso substitui o site?",
        r: "Não. O perfil traz o contato; o site é o que sustenta a decisão de quem pesquisa antes de ligar. Os dois se reforçam.",
      },
    ],
  },
];

export function getServico(slug: string) {
  return servicos.find((s) => s.slug === slug);
}
