# Status da implementação

**Atualizado em:** 19 de setembro de 2026
**Branch:** `reformulacao-2026`
**Estado:** construído e verificado localmente. **Nada publicado.**

---

## O que mudou, em uma linha

O site deixou de ser uma SPA que entregava HTML vazio e passou a ser um site
Next.js com 32 rotas estáticas, cada uma com conteúdo indexável, metadados
próprios e medição instalada.

---

## O antes e o depois, medido

| | Antes (`18513f6`) | Depois |
|---|---|---|
| HTML servido na home | 2.721 bytes, `<div id="root">` vazio | 106.379 bytes com `<h1>` e ~4.500 palavras |
| Rotas | 3 | 32, sendo 31 estáticas |
| Títulos únicos por rota | ❌ 1 global | ✅ um por rota |
| URL canônica | ❌ nenhuma | ✅ todas, no domínio `www` correto |
| Imagem de compartilhamento | ❌ apontava para `lovable.dev` | ✅ gerada no build, com a marca |
| JSON-LD | ❌ nenhum | ✅ Organization, Person, WebSite, Breadcrumb, Service, Article, FAQ |
| `dataLayer.push` no código | ❌ nenhum | ✅ 10 eventos tipados |
| Cliques de WhatsApp rastreados | ❌ nenhum | ✅ todos, com origem |
| Formulários | ❌ nenhum | ✅ diagnóstico, validado |
| Consentimento de cookies | ❌ nenhum | ✅ Consent Mode v2 |
| Página 404 | ⚠️ respondia 200 | ✅ responde 404 |
| Sitemap | ⚠️ 3 URLs, domínio errado | ✅ gerado, domínio correto, com `lastmod` |
| Conteúdo fabricado no repo | ⚠️ `Results.tsx` | ✅ deletado |

---

## Fases

### Fase 0 · Governança ✅
`AGENTS.md`, `PROJECT_BRIEF.md`, `docs/BRIEF.md`.

### Fase 1 · Auditoria ✅
`docs/AUDIT.md`, feito sobre o código real e sobre a resposta HTTP de produção.
Confirmou que não havia iframe: o problema era renderização client-side.

### Fase 2 · Fundação ✅
- Migração Vite SPA → Next.js 16 App Router
- Sistema de design com dois grounds e acento em dois pontos de luminosidade,
  com todos os contrastes medidos
- Fontes auto-hospedadas (Fraunces + Geist), sem requisição ao Google Fonts
- Descartados: `lovable-tagger`, `.lovable/`, `recharts`, ~45 componentes
  shadcn não usados, dois dos três lockfiles
- Preservados: GTM server-side, verificação de domínio da Meta, `robots`

### Fase 3 · Páginas ✅
Home (7 capítulos), `/estrutura-digital`, `/servicos` + 5 serviços, `/sobre`,
`/para-agencias`, `/contato`, `/diagnostico`, `/obrigado`.

### Fase 4 · Blog e SEO ✅
`/blog` com MDX, frontmatter validado por Zod (build falha se um post estiver
malformado), 2 artigos escritos. `sitemap.ts` e `robots.ts` gerados a partir das
mesmas fontes que criam as páginas.

### Fase 5 · Cases ✅
4 cases migrados integralmente, cada um com URL própria. Grammar de catálogo.

### Fase 6 · Landing pages ✅
Sistema orientado a dados em `lib/landing-pages.ts` + rota `/lp/[slug]`. Criar
uma LP é acrescentar um objeto, não copiar uma página. Duas LPs montadas.

### Fase 7 · Formulário e WhatsApp ✅
Formulário de diagnóstico validado, com armadilha para robô e foco automático
no primeiro campo com erro. Todo link de WhatsApp carrega a origem na mensagem
e no evento. A rota de envio por e-mail está pronta; ver pendência 7.

### Fase 8 · Analytics ✅ no código
10 eventos tipados em `lib/analytics.ts`, documentados em `docs/MEDICAO.md`.
**Falta configurar os gatilhos no container**: pendência 3.

### Fase 9 · LGPD ⚠️
Políticas de privacidade e cookies escritas a partir do que o site faz de fato,
com banner de consentimento e Consent Mode v2. **São rascunhos: falta revisão
jurídica**: pendências 5 e 6.

### Fase 10 · QA ⏳
Feito: build limpo, typecheck limpo, zero vulnerabilidade em dependência de
produção, conferência do HTML gerado, teste em 1440px e em 375px, teste do
formulário de ponta a ponta.

**Não feito: deploy.** Por decisão sua.

---

## Verificado nesta sessão

- `npm run build` → 32 rotas; todas estáticas, menos `/api/diagnostico`
- `npm run typecheck` → limpo
- `npm audit --omit=dev` → 0 vulnerabilidades
- HTML gerado contém `<h1>`, `<title>` único e canônica por rota
- Formulário: valida, dispara `form_submit` e `diagnostico_submit`, monta a
  mensagem do WhatsApp com todos os campos e redireciona para `/obrigado`
- Nota de margem: na margem em ≥1180px, em fluxo como nota numerada no telefone

## Segunda rodada — pendências resolvidas (19/09/2026)

| Item | Antes | Depois |
|---|---|---|
| E-mail | `@fintelman.com.br` (domínio inexistente) | `@fintelmannd.com.br` |
| Logo na masthead | Sumia sobre marfim (wordmark em creme) | Variante de tinta + latão, legível |
| Logo no colofão | Ausente | Variante champagne + osso sobre grafite |
| Margem do arquivo do logo | 73% transparente | Aparada |
| Favicon | Lockup inteiro, 145 KB, ilegível a 32px | Só o cavalo, 12 KB + apple-icon 180px |
| `diego.png` | 1,6 MB, alfa 100% opaco e inútil | JPEG de 133 KB (−92%) |
| `diego-palestra.png` | 1,2 MB, não referenciada | Removida |
| Pasta `public/brand` | 3,8 MB | 0,5 MB |
| Instagram | Link para perfil privado | Removido, com motivo registrado |
| Envio por e-mail | Inexistente | `/api/diagnostico` pronta, aguardando chave |
| Meios-passos da escala | 15 utilitários sem CSS, falhando em silêncio | Declarados e funcionando |

---

## Corrigido durante o QA

1. **Next 16 exige `data-scroll-behavior="smooth"`** no `<html>`. Sem isso, cada
   troca de rota fazia um scroll animado até o topo.
2. **Nota de margem sobrepunha o texto no telefone** — a âncora estava com
   `height: 0` também abaixo de 1180px.
3. **Hero quebrava em quatro linhas a 375px** — o piso da escala estava dimensionado
   para desktop.
4. **Dois campos do formulário mostravam "Required" em inglês** — faltava
   `required_error` nos grupos de rádio.
5. **Travessões em excesso** — reduzidos de 146 para 49 ocorrências.
6. **Next.js 15.1.6 tinha CVE aberta** e `next-mdx-remote` v5 tinha
   vulnerabilidade alta. Ambos atualizados.

---

## Não implementado, e por quê

- **Newsletter.** O evento `newsletter_subscribe` existe no catálogo, mas não há
  formulário: exige escolher a ferramenta de e-mail primeiro.
- **CMS.** Ver `docs/PENDENCIAS.md` — decisão justificada, não esquecimento.
- **Depoimentos.** Nenhum migrado até a verificação (pendência 1).
- **Chave do serviço de e-mail.** A rota `/api/diagnostico` está pronta e
  testada; falta só a variável de ambiente. Ver pendência 7.

---

## Próximo passo

Ler `docs/PENDENCIAS.md`. Os itens 1 a 4 valem a pena resolver antes de rodar
tráfego para o site novo. Depois disso, `git push` e configurar o deploy.
