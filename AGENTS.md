# Regras deste repositório

Site da Fintelman Negócios Digitais. Leia `PROJECT_BRIEF.md` antes de qualquer
decisão relevante de conteúdo ou arquitetura, e `docs/AUDIT.md` antes de mexer
em algo que já existia.

---

## As cinco regras que não se negociam

### 1. Nenhum número inventado. Nunca.

Não existe métrica neste site sem um print que a sustente. Não existe
depoimento sem link para a avaliação original. Não existe "+300% de leads",
"R$ 10M investidos", "98% de satisfação".

Isto não é preferência de tom: é o diferencial comercial do projeto. O site
inteiro é construído sobre a premissa de que quem publica a leitura honesta dos
dados é o único que parece ter dados. Um contador com número plausível destrói
essa premissa de uma vez.

Se não há número real e autorizado, **não existe contador**. Se o case não
fechou conclusão, o case diz que não fechou.

O arquivo `src/components/Results.tsx` do site antigo continha exatamente esse
tipo de conteúdo fabricado. Foi deletado. Não recrie nada parecido.

### 2. Todo conteúdo crítico chega em HTML.

O site anterior era uma SPA que entregava `<div id="root"></div>` vazio: 2.721
bytes, zero conteúdo indexável, o mesmo título em todas as rotas. Esse foi o
problema nº 1 da auditoria e a razão da migração para Next.js.

Nunca mova conteúdo de venda, de prova ou de método para dentro de um componente
que só renderiza no cliente. Interatividade pode ser cliente; **argumento é
servidor**.

Depois de qualquer mudança estrutural, rode o build e procure o `<h1>` dentro de
`.next/server/app/<rota>.html`. Se ele não estiver lá, a mudança está errada.

### 3. Um rótulo por intenção.

O CTA principal é **"Pedir diagnóstico"** e leva para `/diagnostico`. Em todo
lugar. Não existe "Fale conosco" numa seção e "Solicite um orçamento" na outra.

O rótulo vive em `lib/site.ts`. Para mudar, mude lá.

### 4. Todo evento novo passa por `lib/analytics.ts` primeiro.

Nome tipado, payload tipado, e uma entrada em `eventCatalog` explicando quando
dispara e se é conversão ou microconversão. Só depois vai para um componente.

O GTM server-side em `ss.fintelmannd.com.br` é pago e já configurado.
**Não troque esse endpoint.** Derrubá-lo derruba toda a medição.

### 5. Nenhum segredo no repositório.

Não há variável de ambiente hoje. Se passar a haver, nada de token, chave ou
credencial commitada, nem em comentário, nem em arquivo de exemplo com valor
real.

---

## Direção de design

O sistema está em `app/globals.css` e `tailwind.config.ts`. Duas superfícies
(papel `#f4f0e7` e grafite `#211f1b`), um acento em dois pontos de luminosidade
da mesma matiz.

**Nenhuma cor literal dentro de componente.** Se você escreveu `#` num `.tsx`,
o token está faltando.

⚠️ **A escala de espaçamento SUBSTITUI a do Tailwind.** Os números não valem o
que valem num projeto padrão: aqui `11` é `6rem`, não `2.75rem`. Antes de
escrever `h-11`, `gap-7` ou `py-9`, confira a tabela em `tailwind.config.ts`.

E o efeito colateral que morde: **um valor fora da escala não gera CSS e não
avisa.** `mt-1.5` num projeto sem meio-passo declarado simplesmente não existe,
o build passa e a margem some. Os meios-passos usados estão declarados; se
precisar de um novo, declare antes de usar.

A grammar é **chaptered editorial** (ver `docs/BRIEF.md`, seção 14). O que ela
proíbe vale como regra do projeto:

- ❌ hero com vídeo full-bleed
- ❌ CTA magnético (a nota em `components/cta.tsx` explica por quê)
- ❌ gradiente contínuo entre capítulos: a troca papel/grafite é **corte seco**
- ❌ copy centralizada no hero
- ❌ grade de cards idênticos como estrutura de página
- ❌ gradiente em texto, brilho neon, sombra colorida sem deslocamento
- ❌ olho (eyebrow) acima de toda seção: no máximo um a cada três
- ❌ contador de seção "01 / 06" como decoração
- ❌ "role para descobrir" e ícone de mouse animado

**Ao inverter o fundo de um trecho, reafirme `color`.** Redefinir `--ink` numa
subárvore não retinge texto cujo `color` já computou no `<body>`. É o que a
classe `.on-graphite` faz, e é por isso que ela declara `color` explicitamente.

---

## Ao mexer em conteúdo

- Travessão é legítimo em português, mas em excesso vira tique de texto gerado.
  Mantenha a densidade baixa.
- Nada de "potencialize", "alavanque", "solução inovadora", "escale seu
  negócio". A régua é: um consultor sênior escreveria isso num e-mail?
- Toda página de serviço declara **o que não inclui** e **para quem não serve**.
  É o que faz a página filtrar em vez de só atrair.
- Schema só para o que aparece na tela. Sem `FAQPage` onde não há FAQ visível,
  sem `aggregateRating` sem base de avaliação verificada.

---

## Antes de considerar qualquer trabalho pronto

Rode `npm run typecheck` e `npm run build`. Os dois passam, ou não está pronto.
Depois, confira no HTML gerado que a rota nova tem `<h1>`, `<title>` próprio e
`<link rel="canonical">`.

Atualize `docs/IMPLEMENTATION_STATUS.md` com o que mudou, e
`docs/PENDENCIAS.md` se a mudança depender de algo externo.

---

## Deploy

O projeto foi criado como SPA em Vite e migrado para Next.js. Isso deixou uma
armadilha que já custou um deploy quebrado:

> `Error: No Output Directory named "dist" found after the Build completed.`

O build passa inteiro — rotas geradas, TypeScript limpo — e só a entrega
falha, porque a plataforma continuava procurando a pasta `dist` do Vite
enquanto o Next.js escreve em `.next`.

Por isso existe um `vercel.json` na raiz declarando `"framework": "nextjs"`.
**Não apague esse arquivo.** Ele não é resquício da plataforma anterior: é a
configuração de build, e está versionada de propósito, para que o deploy seja
reproduzível por quem clonar o repositório sem depender de um ajuste feito à
mão em painel.

Ao diagnosticar um deploy que falhou, leia o log antes de mexer em qualquer
coisa. O build e a entrega falham por motivos diferentes, e ficar recarregando
a página não distingue um do outro.

---

## Rotas que não podem quebrar

`/trafego` e `/site` eram as rotas do site antigo e estão indexadas. Hoje elas
respondem 301 para `/servicos/trafego-pago` e `/servicos/sites-e-landing-pages`
(ver `next.config.mjs`). **Não remova esses redirects.**

O domínio canônico é `https://www.fintelmannd.com.br`; o apex responde 307 para
o `www`. Está em `lib/site.ts` e alimenta sitemap, canonical e schema.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
