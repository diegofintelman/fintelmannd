# PROJECT_BRIEF — Fintelman Negócios Digitais

Briefing estratégico e comercial do site. Este arquivo responde "por quê";
`AGENTS.md` responde "como"; `docs/BRIEF.md` guarda a decisão de direção de
design e a justificativa dela.

---

## 1. O reposicionamento

**De:** "gestor de tráfego pago" — categoria comoditizada, comparada por preço,
vendida por CPL.

**Para:** quem constrói a estrutura digital que decide o que acontece depois do
clique.

A frase que o site existe para instalar:

> Tráfego não conserta estrutura fraca. Ele amplifica o que já existe.

Tráfego pago continua sendo uma frente importante. Passa a ser comunicado como
**uma etapa de oito**, não como o produto.

---

## 2. Público

**Primário — empresas B2B.** Compram sites, tráfego pago e trackeamento. Ciclo
de decisão real, ticket que justifica estrutura, alguém responsável por avaliar
fornecedor. A linguagem mira o decisor do negócio, não outro profissional de
marketing.

**Secundário — agências de marketing.** Não como clientes de consultoria: como
contratantes. Diego é o parceiro de execução delas, sob a marca delas. Isso tem
página própria (`/para-agencias`), e o conteúdo dela é construído sobre o medo
legítimo de toda agência ao terceirizar — perder a conta para o fornecedor.

**Também atendido:** negócio local de ticket alto (clínica, consultório,
serviço especializado) e infoproduto com operação séria.

---

## 3. Marca

Diego Fintelman é a autoridade central. A percepção de critério e confiança está
ligada à pessoa, e a proximidade estratégica com ele é vantagem competitiva, não
limitação a ser disfarçada.

Gabriela Fintelman integra a estrutura de entrega (social media, copywriting,
design, edição) e aparece em `/sobre`, sem sistema visual separado. A paleta rosé
paralela do site antigo foi removida.

**O site não finge ser agência grande.** "Não é uma agência, e não finge ser"
está escrito em `/sobre`, de propósito.

---

## 4. Tom

Estratégico, maduro, direto, sóbrio. Educativo sem parecer aula. Comercial sem
exagero. Premium sem estética de guru.

A régua prática: *um consultor sênior escreveria isso num e-mail para um
diretor?*

**Evitar:** promessa irreal, linguagem agressiva, excesso de jargão, claim sem
prova, métrica inventada, depoimento não autorizado, falsa ideia de agência
grande.

---

## 5. O diferencial competitivo do site

**Publicar a leitura honesta dos resultados, inclusive dos inconclusivos.**

O case "Low ticket em validação" diz, na própria página, que o projeto ainda
está em validação e que os dados não sustentam declarar sucesso. Num mercado em
que todo fornecedor publica "+300%", quem publica a leitura real é o único que
parece ter dados.

Esse é o pico da homepage e o ativo mais forte do projeto. Toda decisão de
conteúdo deve preservá-lo.

---

## 6. Arquitetura do site

| Rota | Papel comercial |
|---|---|
| `/` | Instala o posicionamento em sete capítulos e conduz ao diagnóstico |
| `/estrutura-digital` | O método em oito etapas, com o que dá errado em cada uma. A página mais importante comercialmente |
| `/servicos` | Organiza as capacidades e mapeia cada serviço a uma etapa |
| `/servicos/[slug]` | 5 serviços, cada um com escopo, o que não inclui e para quem não serve |
| `/cases` + `/cases/[slug]` | Prova. Grammar de catálogo, rótulo de fato, print ao lado |
| `/para-agencias` | Parceria white-label. As regras que tiram o medo de terceirizar |
| `/sobre` | Como ele trabalha e o que recusa fazer. Sem biografia genérica |
| `/blog` + `/blog/[slug]` | Autoridade e demanda orgânica. Chamado de "Notas" |
| `/diagnostico` | Conversão principal |
| `/contato` | Canais, e o que esperar de cada um |
| `/obrigado` | Confirmação. `noindex` |
| `/lp/[slug]` | Sistema de LPs para campanha, montadas a partir de dados |
| Políticas | Privacidade e cookies |

---

## 7. Conversão

**Uma ação, um rótulo: "Pedir diagnóstico".**

O diagnóstico é uma conversa de 30 a 40 minutos, sem custo, que entrega a ordem
do que fazer primeiro — tenha ou não contratação. A página diz explicitamente
que, se o problema não for do escopo dele, ele fala isso na conversa.

Isso é filtro, não generosidade: qualifica melhor e reduz proposta perdida.

O WhatsApp existe como meio, não como CTA concorrente. Todo link carrega a
origem na mensagem e no evento.

---

## 8. O que não se faz

Escrito para que nenhuma decisão futura reabra a discussão:

- métrica agregada inventada (investimento total, nº de clientes, ROI médio);
- depoimento sem link para a avaliação original;
- garantia de resultado em número;
- conta de anúncio, domínio ou hospedagem no nome do fornecedor;
- compra ou produção de avaliação;
- schema para conteúdo que não aparece na página.

---

## 9. Fases

| Fase | Estado |
|---|---|
| 0 · Acesso e governança | ✅ |
| 1 · Auditoria técnica | ✅ `docs/AUDIT.md` |
| 2 · Arquitetura e fundação | ✅ Next.js, design system, layout |
| 3 · Páginas institucionais e comerciais | ✅ |
| 4 · Blog e SEO | ✅ estrutura + 2 artigos |
| 5 · Cases | ✅ 4 cases com URL própria |
| 6 · Landing pages | ✅ sistema + 2 LPs |
| 7 · Formulário e WhatsApp | ✅ ver pendência 8 |
| 8 · Analytics | ✅ no código; falta configurar o container |
| 9 · LGPD | ⚠️ rascunhos escritos, revisão jurídica pendente |
| 10 · QA e deploy | ⏳ build e QA local feitos; deploy não realizado |

Detalhe em `docs/IMPLEMENTATION_STATUS.md`. O que depende de terceiros está em
`docs/PENDENCIAS.md`.
