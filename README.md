# fintelmannd.com.br

Site da Fintelman Negócios Digitais.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · MDX
**Domínio e CDN:** Cloudflare
**Domínio canônico:** `https://www.fintelmannd.com.br` (o apex responde 307 para o `www`)

---

## Rodando local

```bash
npm install
```

```bash
npm run dev
```

Outros comandos:

```bash
npm run build
```

```bash
npm run typecheck
```

O build e o typecheck precisam passar antes de qualquer merge.

---

## Estrutura

```
app/                 rotas (App Router)
  page.tsx           home, em sete capítulos
  estrutura-digital/ o método em oito etapas
  servicos/[slug]/   páginas de serviço
  cases/[slug]/      cases, cada um com URL própria
  blog/[slug]/       artigos, renderizados de content/blog/*.mdx
  lp/[slug]/         landing pages montadas a partir de dados
  sitemap.ts         gerado das mesmas fontes que criam as páginas
  robots.ts
components/          componentes de UI e de medição
content/blog/        artigos em MDX, com frontmatter validado
lib/                 conteúdo estruturado e utilidades
  site.ts            contatos, navegação, rótulo do CTA
  analytics.ts       contrato de eventos
  cases.ts           os cases
  servicos.ts        o conteúdo das páginas de serviço
  metodo.ts          as oito etapas
  landing-pages.ts   as LPs
docs/                auditoria, brief, medição, pendências, status
```

---

## Onde mexer para cada coisa

| Quero... | Vá em |
|---|---|
| Trocar telefone, e-mail ou rótulo do CTA | `lib/site.ts` |
| Publicar um artigo | criar `content/blog/<slug>.mdx` |
| Adicionar um case | `lib/cases.ts` + imagem em `public/cases/` |
| Criar uma landing page | acrescentar um objeto em `lib/landing-pages.ts` |
| Adicionar um site ao portfólio | `lib/sites.ts` |
| Adicionar um evento de medição | `lib/analytics.ts` primeiro, depois o componente |
| Mudar cor, espaçamento ou tipo | `app/globals.css` e `tailwind.config.ts` |

Nenhuma dessas mudanças exige tocar em componente de layout.

---

## Antes de contribuir

Leia, nesta ordem:

1. **`AGENTS.md`** — as regras que não se negociam.
2. **`PROJECT_BRIEF.md`** — posicionamento, público, arquitetura comercial.
3. **`docs/AUDIT.md`** — o estado anterior, e por que as decisões foram tomadas.

A mais importante delas, resumida: **nenhum número entra neste site sem prova
que o sustente.** Sem print, sem contador. Sem link para a avaliação original,
sem depoimento.

---

## Documentação

| Arquivo | O que é |
|---|---|
| `docs/AUDIT.md` | Auditoria técnica do site anterior |
| `docs/BRIEF.md` | Direção de design, grammar, curva de sentimento |
| `docs/MEDICAO.md` | Plano de medição: cada evento, quando dispara, se é conversão |
| `docs/PENDENCIAS.md` | O que depende de decisão ou informação externa |
| `docs/IMPLEMENTATION_STATUS.md` | O que foi feito, o que falta, o que foi corrigido |
