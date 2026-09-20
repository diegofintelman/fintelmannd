# Auditoria Técnica — fintelmannd.com.br

**Data:** 19 de setembro de 2026
**Commit auditado:** `18513f6` ("Adicionou clínica Odontologia"), branch `main`
**Repositório:** https://github.com/diegofintelman/fintelmannd
**Método:** leitura do código real do repositório + inspeção da resposta HTTP de produção

> Este documento substitui suposições por verificação. Tudo abaixo foi confirmado lendo o
> código e/ou inspecionando a resposta HTTP do site no ar.

---

## 1. Stack atual (confirmada)

| Item | Valor |
|---|---|
| Framework | React 18.3 — **SPA pura** |
| Build tool | Vite 5.4 + `@vitejs/plugin-react-swc` |
| Linguagem | TypeScript 5.8 |
| Roteamento | `react-router-dom` 6.30 (`BrowserRouter`, client-side) |
| Estilo | Tailwind CSS 3.4 + `tailwindcss-animate` + `@tailwindcss/typography` |
| Componentes | shadcn/ui completo (~45 componentes Radix em `src/components/ui/`) |
| Origem | Gerado pelo Lovable (`.lovable/plan.md`, `lovable-tagger` em devDeps) |
| Hospedagem | Vercel, com Cloudflare na frente (`x-vercel-id: gru1`, `cf-ray`) |
| Deploy | `git push` → build automático na Vercel |
| Package manager | **Ambíguo:** existem `bun.lock`, `bun.lockb` *e* `package-lock.json` |
| Node local | v24.11.1 / npm 11.6.2 |
| Formulários | **Nenhum.** Toda conversão é link `wa.me` |
| Backend / API | Nenhum. Sem env vars, sem secrets no repo |
| CMS | Nenhum. Todo conteúdo hardcoded em `.tsx` |

**Não foi encontrado iframe.** A suspeita do relatório original estava errada na forma,
mas certa no efeito: o problema real é renderização 100% client-side. Ver seção 3.

---

## 2. Estrutura de rotas

Definida em `src/App.tsx`. Apenas 3 rotas reais:

| Rota | Componente | Conteúdo |
|---|---|---|
| `/` | `pages/Index.tsx` | Home: Hero, Sobre (Diego + Gabriela), Serviços, Nichos, Depoimentos, Links de portfólio, Contato, Agência, Footer |
| `/trafego` | `pages/Trafego.tsx` | Portfólio de tráfego pago — 4 estudos de caso com prints do gerenciador |
| `/site` | `pages/Site.tsx` | Portfólio de sites — 17 projetos em `src/data/sites.ts` |
| `*` | `pages/NotFound.tsx` | 404 client-side (responde **HTTP 200**, não 404) |

A navegação interna da home usa `scrollToSection()` com `scrollIntoView`. Os itens do menu
são `<button>`, **não `<a href>`** — nenhum crawler segue esses links, e não existe URL para
nenhuma seção.

`vercel.json` reescreve `/(.*)` → `/index.html` (SPA fallback clássico).

---

## 3. PROBLEMA CRÍTICO — o site não entrega conteúdo indexável

Requisição real, feita como Googlebot em 19/09/2026:

```
GET https://www.fintelmannd.com.br/
→ 2.721 bytes de HTML
→ <div id="root"></div>   (vazio)
```

O HTML servido contém **zero** conteúdo: nenhum `<h1>`, nenhum parágrafo, nenhum link
interno, nenhuma imagem. Todo o texto do site só existe depois que o React executa no
navegador do visitante.

Consequências práticas:

1. **As 3 rotas servem exatamente o mesmo `<title>`, a mesma `<meta description>` e a mesma
   OG image.** As tags estão fixas em `index.html` e nunca mudam. Para o Google e para
   qualquer LLM, `/trafego` e `/site` são páginas duplicadas.
2. **Nenhuma URL canônica** declarada em lugar nenhum.
3. **A OG image aponta para `https://lovable.dev/opengraph-image-p98pqg.png`.** Ao
   compartilhar o link no WhatsApp, LinkedIn ou Instagram, aparece a imagem genérica da
   plataforma Lovable — não a marca Fintelman. Isso é visível para todo prospect que
   recebe o link.
4. **Zero superfície para AI/LLM.** ChatGPT, Perplexity e Claude recebem um HTML vazio. O
   `llms.txt` e o `middleware.ts` com negociação de `text/markdown` foram uma boa tentativa
   de compensar, mas são remendo: quase nenhum crawler envia `Accept: text/markdown`.
5. **404 responde 200.** O servidor sempre devolve `index.html` com status 200. Google
   trata isso como soft 404.
6. **O `sitemap.xml` aponta para o domínio errado.** Declara `https://fintelmannd.com.br/`
   (sem `www`), mas o apex **redireciona 307 para `https://www.fintelmannd.com.br/`**. O
   sitemap aponta para URLs que não são as canônicas efetivas.

Este é o item nº 1. Nenhum trabalho de conteúdo, blog ou SEO tem retorno enquanto o HTML
servido estiver vazio.

---

## 4. SEO — estado atual, item a item

| Item | Status | Observação |
|---|---|---|
| Titles únicos por rota | ❌ Ausente | 1 title global em `index.html` |
| Meta description por rota | ❌ Ausente | 1 description global |
| Canonical | ❌ Ausente | Nenhum `<link rel="canonical">` |
| Open Graph | ⚠️ Quebrado | `og:image` aponta para `lovable.dev` |
| Twitter Card | ⚠️ Parcial | Sem `twitter:image` |
| `robots.txt` | ✅ Bom | Bem construído: `Content-Signal` + allow explícito para GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot |
| `sitemap.xml` | ⚠️ Desatualizado | 3 URLs, domínio errado, sem `lastmod` |
| `llms.txt` / `llms-full.txt` | ✅ Presente | Bem escrito |
| Hierarquia de headings | ✅ Razoável | Um `<h1>` por página, `<h2>`/`<h3>` coerentes |
| Alt text | ⚠️ Parcial | Faltam em alguns assets de portfólio |
| Dados estruturados (Schema) | ❌ Ausente | **Nenhum JSON-LD** em todo o repositório |
| Links internos | ⚠️ Fracos | Menu usa `<button>` + scroll, não `<a href>` |
| `meta keywords` | ⚠️ Obsoleto | Ignorada pelo Google desde 2009. Remover |
| Blog | ❌ Inexistente | Sem rota, template ou infraestrutura |
| URLs de case | ❌ Inexistentes | Os 4 cases vivem dentro de `/trafego`, sem URL própria |

---

## 5. Tracking e mensuração

**Já instalado — e bem feito:**

- **Google Tag Manager server-side**, servido por `https://ss.fintelmannd.com.br/` com
  script ofuscado (`5fjmkkhvd.js`). Setup avançado. **Deve ser preservado.**
- Container GTM `GTM-K3LD28KC` (visto no fallback `<noscript>`).
- Verificação de domínio da Meta: `jz5upzn3rbtc6te46lkfrd1ps9cv7v`.

**Ausente:**

- **Nenhum `dataLayer.push` em todo o código React.** Busca no repositório inteiro: zero
  ocorrências fora do snippet de inicialização do GTM.
- **Nenhum clique de WhatsApp é rastreado.** Os 6+ botões usam
  `window.open("https://wa.me/5515997820279")` direto, sem disparar evento.
- Nenhum evento de conversão. Nenhuma página `/obrigado`.
- Nenhuma mensagem pré-preenchida no link do WhatsApp — impossível saber de qual seção ou
  página o lead veio.
- Sendo SPA, mudanças de rota não geram pageview no GA4 sem History Change trigger
  configurado no container. Precisa ser verificado.

**Resumo:** um tracking server-side pago e bem configurado está, na prática, medindo
apenas pageviews.

---

## 6. Conteúdo e credibilidade — riscos encontrados

### 6.1 🔴 RISCO ALTO — `src/components/Results.tsx` contém métricas e depoimentos fabricados

O arquivo declara:

- "R$10M+ Investidos em Tráfego"
- "+100 Clientes Satisfeitos"
- "350% ROI Médio"
- "98% Taxa de Sucesso"
- 3 depoimentos com nomes que parecem placeholders de IA — "Maria Silva / Clínica de
  Estética", "João Santos / Infoprodutor", "Ana Costa / Restaurante" — com resultados
  específicos: "+300% leads", "R$20k → R$150k/mês", "+400% em reservas".

**Mitigação já existente:** o componente **não está importado** em nenhuma página. É código
morto e nunca foi ao ar.

**Recomendação: deletar o arquivo**, não apenas deixar sem uso.

### 6.2 🟡 RISCO MÉDIO — depoimentos a verificar

`src/components/Testimonials.tsx` traz 3 depoimentos do Google Maps. O primeiro (Thaís
Coelho) é longo, específico e tem link para a avaliação. Os outros dois ("Marcos Oliveira",
"Juliana Santos") são curtos, genéricos e seguem o mesmo padrão dos placeholders do item
6.1. **Confirmar um a um contra o perfil real do Google Meu Negócio antes de migrar.**

### 6.3 Inconsistência de domínio no e-mail

O site exibe `contato@fintelman.com.br` (Header, Footer, Contact, llms.txt), mas o domínio
é `fintelmannd.com.br` — com dois "n". Confirmar qual é válido.

### 6.4 Link de Instagram quebrado

`src/components/Footer.tsx` abre `https://instagram.com` — a home do Instagram, sem perfil.

### 6.5 Claims a revisar

- "Resposta em até 2 horas" (Contact) vs. "24h Resposta Máxima" (bloco logo abaixo, na
  mesma página). Contradição visível.
- "análise gratuita do seu negócio" — promessa sem página nem processo por trás.
- Footer: "© 2025" — desatualizado.

### 6.6 ✅ O que é bom e deve ser preservado

A página `/trafego` é, de longe, o melhor conteúdo do site. Os 4 estudos de caso (Clínica de
Estética, Mentoria de Carreiras, Low Ticket em Validação, RevisaLei) seguem a estrutura
**Contexto → Estratégia → Leitura de Resultados → Evidência Visual**, com prints reais do
gerenciador e **sem inventar uma única métrica**. O case Low Ticket chega a dizer: *"o projeto
ainda está em validação — os dados servem para refinar a próxima iteração, não para declarar
sucesso."*

Esse é exatamente o tom do reposicionamento pretendido. **É um ativo. Migrar integralmente.**

A página `/site` também tem valor real: 17 projetos entregues com URL pública verificável.

---

## 7. Design e experiência

Tokens em `src/index.css` (HSL via CSS custom properties), mapeados no `tailwind.config.ts`.
Fontes: Playfair Display (títulos) + Inter (corpo), via Google Fonts.

**Problemas:**

1. **Duas paletas de dourado conflitantes no mesmo arquivo.** Existem `--primary: 41 46% 58%`
   e, separadamente, `--gold: 43 74% 49%` / `--gold-light` / `--gold-dark`. Componentes usam
   ora `text-primary`, ora `text-gold`. São dourados diferentes coexistindo.
2. **Paleta rosé paralela** (`--rose-gold: 340 82% 62%`) usada para marcar visualmente os
   serviços da Gabriela. Cria um segundo sistema de cor dentro do mesmo site e destoa do
   posicionamento premium/sóbrio pretendido.
3. **A direção visual do relatório não está implementada.** O relatório pede marfim quente
   `#F4F0E7`, preto profundo `#111111`, grafite `#292724` e dourado champagne sutil. O site
   atual é preto puro (`0 0% 0%`) com dourado saturado — mais próximo da estética "guru de
   marketing" que o próprio relatório manda evitar.
4. **Fundo preto puro (#000) com texto branco puro (#FFF)** — contraste 21:1. Passa em
   acessibilidade, mas causa *halation* e cansaço em leitura longa. Para um site que vai ter
   blog, é escolha ruim.
5. `--border: 41 46% 58% / 0.2` usa alpha dentro da variável HSL, o que quebra o padrão
   `hsl(var(--border))` do shadcn em alguns contextos.
6. **Header sem sticky.** `src/components/Header.tsx` calcula `isScrolled` num listener de
   scroll, mas **a variável nunca é usada** — o `className` do header é estático. Código morto
   rodando a cada scroll.
7. `<html lang="pt-BR">` ✅ correto.
8. `darkMode: ["class"]` configurado e `next-themes` instalado, mas sem toggle e sem uso
   real. O site é dark-only.

---

## 8. Performance

Lighthouse não foi executado nesta auditoria. Riscos estruturais identificados por leitura
de código:

- **Bundle único, sem code splitting.** Todas as rotas são importadas estaticamente em
  `App.tsx`. Nenhum `React.lazy`.
- **Dependências pesadas no bundle de todos.** `recharts` (~400KB), `embla-carousel`,
  `react-day-picker`, `date-fns`, `input-otp`, `vaul`, `react-resizable-panels`.
  **`recharts` não é usado em nenhuma página** — entra só via `components/ui/chart.tsx`, que
  também não é usado.
- **~45 componentes shadcn presentes, a maioria nunca usada** (sidebar, menubar, command,
  drawer, calendar, pagination, resizable, input-otp, chart…).
- **Imagens PNG não otimizadas.** `src/assets/` tem PNGs grandes (prints de gerenciador,
  fotos). Sem `loading="lazy"`, sem `width`/`height` declarados (causa CLS).
  **`public/favicon.png` tem 145 KB** — para um favicon.
- Fontes via `<link>` bloqueante do Google Fonts (o `&display=swap` está correto).

---

## 9. Acessibilidade

- Menu mobile não declara `aria-expanded` nem `aria-controls`.
- Itens de navegação são `<button>` com `scrollIntoView` — não funcionam com Ctrl+clique,
  não são copiáveis, não aparecem na barra de status do navegador.
- O lightbox dos cases não declara `role="dialog"`, não faz focus trap e não fecha com `Esc`.
- Contraste geral OK. `text-muted-foreground` (`0 0% 70%`) sobre `--card` (`0 0% 5%`) fica em
  ~9:1 — passa. O mesmo cinza sobre fundos dourados translúcidos não foi validado.

---

## 10. Higiene do repositório

- **Três lockfiles simultâneos:** `bun.lock`, `bun.lockb` e `package-lock.json`. Builds
  locais e na Vercel podem resolver árvores de dependência diferentes. Escolher um.
- `package.json` ainda se chama `"vite_react_shadcn_ts"`, versão `0.0.0`.
- `lovable-tagger` e `.lovable/plan.md` amarram o projeto à plataforma de origem.
- **Sem `AGENTS.md`, sem `PROJECT_BRIEF.md`, sem `docs/`** antes desta auditoria.
- Sem CI, sem testes, sem typecheck no pipeline. O script `lint` existe mas não roda no build.
- ✅ **Nenhum secret ou credencial exposto no repositório.**
- ✅ `.gitignore` adequado.

---

## 11. Os 5 problemas mais graves, em ordem

1. **O HTML servido está vazio.** Sem SSR/SSG, o site não tem conteúdo indexável pelo Google
   nem legível por LLM. Tudo o que o projeto pede — blog, SEO, autoridade, cases com URL
   própria — é inviável sobre esta arquitetura.
2. **Metadados não existem por rota.** Um único title/description/OG para o site inteiro,
   sem canonical, com OG image apontando para o Lovable.
3. **Tracking server-side pago e configurado, medindo quase nada.** Zero eventos, zero
   `dataLayer.push`, nenhum clique de WhatsApp rastreado, nenhuma página de obrigado.
4. **Conteúdo fabricado no repositório** (`Results.tsx`) — hoje inerte, mas a um `import` de
   distância de ir ao ar. Mais 2 depoimentos que precisam de verificação.
5. **Sistema de design incoerente** — dois dourados, uma paleta rosé paralela e uma direção
   visual que contradiz o posicionamento premium e sóbrio que o projeto quer transmitir.

---

## 12. Recomendação técnica

**Migrar para Next.js (App Router), preservando Tailwind, os tokens e os componentes shadcn.**

| Necessidade do projeto | Vite SPA (hoje) | Next.js App Router |
|---|---|---|
| HTML indexável | ❌ | ✅ SSG/ISR por padrão |
| Metadata por rota | ❌ | ✅ Metadata API nativa |
| Blog com MDX | Montar do zero | ✅ Nativo |
| Cases com URL própria | Montar do zero | ✅ Rota dinâmica + `generateStaticParams` |
| Landing pages escaláveis | Possível | ✅ Com metadata correta |
| Sitemap / robots dinâmicos | Manual | ✅ `sitemap.ts` / `robots.ts` nativos |
| Otimização de imagem | Manual | ✅ `next/image` |
| Deploy na Vercel | Já funciona | ✅ Plataforma nativa |
| Reuso do código atual | — | ✅ shadcn/ui, Tailwind e tokens migram ~1:1 |

**Alternativa considerada e descartada — Astro:** SEO igualmente bom e menos JS, mas exigiria
reescrever os componentes shadcn/Radix já existentes, e a curva para manter LPs interativas é
maior.

**Alternativa considerada e descartada — manter Vite + pré-render** (`vite-plugin-ssr` /
`react-snap`): resolve parcialmente a indexação, mas não resolve metadata por rota de forma
limpa, nem blog, nem imagem otimizada. Seria dívida técnica desde o primeiro dia.

**Migra sem reescrita:** `tailwind.config.ts`, os tokens de `src/index.css`, os componentes
`ui/`, `src/data/sites.ts` e todo o conteúdo textual dos cases de `/trafego`.

**Descartar na migração:** `Results.tsx`, `lovable-tagger`, `.lovable/`, os componentes shadcn
não utilizados, `recharts` e demais dependências mortas, e dois dos três lockfiles.

**Preservar com cuidado:** o snippet de GTM server-side (`ss.fintelmannd.com.br`), a meta de
verificação de domínio da Meta, o `robots.txt` atual, o `llms.txt`, e as URLs `/trafego` e
`/site` — já indexadas; se mudarem, exigem redirect 301.

---

## 13. Pendências que dependem de informação externa

Não podem ser resolvidas só com o código:

1. E-mail correto: `contato@fintelman.com.br` ou `@fintelmannd.com.br`?
2. URL real do perfil do Instagram.
3. Confirmação dos 2 depoimentos do Google Maps não verificados.
4. Acesso ao container GTM `GTM-K3LD28KC` para configurar os eventos novos.
5. ID de medição do GA4 e ID do Pixel da Meta em uso.
6. Autorização dos clientes para uso dos nomes nos cases.
7. Definição do domínio canônico: `www` ou apex.
