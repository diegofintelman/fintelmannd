# Pendências — o que depende de você

**Atualizado em:** 20 de setembro de 2026

---

## 🔴 Preciso de você para destravar

### 1. Pixel da Meta, GA4 e GTM — não consegui pegar

Tentei, e travou em dois pontos:

**As abas que você já tinha abertas eu não enxergo.** A extensão do Chrome
trabalha num grupo de abas próprio da sessão; as suas ficam fora dele. Eu
consigo navegar usando o seu login — foi assim que li as avaliações —, mas o
painel do GTM abriu em branco e não listou containers.

**O que eu preciso, e é rápido de copiar:**

| Onde | O que copiar |
|---|---|
| Events Manager da Meta | **ID do pixel** (15–16 dígitos) |
| GA4 → Admin → Fluxos de dados | **ID de medição** (`G-XXXXXXX`) |
| Google Ads → Ferramentas → Conversões | **ID de conversão** (`AW-XXXXXXX`) |

O container eu já sei: `GTM-K3LD28KC`, que estava no código do site antigo.

### ⚠️ Sobre o token da Meta: não me mande

Você citou "pixel e token". **ID de pixel pode vir** — é identificador público,
aparece no código-fonte de qualquer site que rode o pixel.

**Token de acesso da Conversions API é credencial, e eu não vou buscar nem
guardar.** Ele dá acesso de escrita à sua conta de anúncios. Se entrar no
repositório, entra no histórico do Git para sempre, mesmo apagado depois — e o
repositório é público.

O caminho certo: você cola o token direto nas **variáveis de ambiente do painel
da hospedagem**. Nunca em conversa, nunca em arquivo. O código lê de `process.env` e
eu não preciso ver o valor em momento nenhum.

### 2. Onde o site realmente roda

Você disse Cloudflare. Os cabeçalhos de produção, conferidos em 20/09/2026,
mostram **duas** camadas:

```
Server: cloudflare          CF-RAY: a3e2cbc8...     ← Cloudflare na frente
x-vercel-id: gru1::k6lzv    x-vercel-cache: HIT     ← Vercel servindo o app
```

Ou seja: o **domínio e o CDN estão na Cloudflare**, e a **aplicação roda na
Vercel**. As duas coisas são verdade ao mesmo tempo, e é um arranjo comum.

Isso importa por dois motivos:

1. **Política de privacidade.** Ambas veem o tráfego, então ambas entram na
   lista de compartilhamento. A Cloudflare estava faltando — foi acrescentada.
   Omitir processador real é infração da LGPD, não economia de texto.
2. **Deploy.** Se a ideia for *sair* da Vercel e rodar de fato na Cloudflare
   (Pages/Workers), é migração de verdade: adaptador `@opennextjs/cloudflare`,
   outra forma de otimizar imagem, e as duas rotas de API (`/api/diagnostico` e
   `/api/newsletter`) precisam rodar no runtime de Workers.

**Me diga qual é o caso** antes do push. Se for só "o domínio está na
Cloudflare", não muda nada e o deploy segue como está.

### 3. Confirmar o CNPJ

Encontrei em consulta pública, e **a sua correção de cidade confirmou**:

> **53.163.894/0001-05** — 53.163.894 Diego Fintelman de Souza
> Tatuí/SP · aberto em 11/12/2023 · ativo · Promoção de vendas

Havia um segundo CNPJ no seu nome, em Votorantim/SP (29.281.572/0001-78), que
descartei justamente por não bater com Tatuí.

Está em `lib/site.ts` → `cadastro`. Confirme antes de publicar as políticas: é
dado que entra em peça jurídica.

### 4. Cargo do Gilberto Júnior

A avaliação dele não diz o cargo. Está publicado como **"Head de Projetos, O
Novo Mercado"**, que foi o que você me passou. Confirme com ele antes de subir:
atribuir cargo e empresa a alguém sem checar gera constrangimento à toa.

### 5. Autorização dos cases

"RevisaLei" virou **"Material para concurso público"**, genérico, como você
pediu. Os outros três já eram genéricos.

Continua valendo: os 17 sites do portfólio aparecem com nome e URL pública.
Estão no ar e são acessíveis, então o risco é baixo — mas vale confirmar com os
que forem clientes diretos.

---

## 🟡 Antes de publicar as políticas

### 6. Revisão jurídica

Já entraram: CNPJ, razão social, cidade correta e **prazo de retenção de 6 meses
a 1 ano**, como você definiu.

Falta: confirmar o encarregado de dados (está com o `contato@`) e a leitura de
um advogado.

### 7. Conferir os cookies declarados

A tabela em `/politica-de-cookies` lista `_ga`, `_fbp`, `_gcl_*` e as durações.
Confira contra o que o container dispara de fato.

---

## 🟢 Quando você quiser

### 8. Ligar o e-mail (diagnóstico e newsletter)

As duas rotas — `/api/diagnostico` e `/api/newsletter` — estão construídas e
testadas. Hoje respondem sem entregar, porque não há chave, e **os formulários
avisam isso em vez de fingir sucesso**.

Para ligar: conta no Resend, domínio verificado, `RESEND_API_KEY` nas variáveis
de ambiente da hospedagem, redeploy. Zero código. Variáveis documentadas em `.env.example`.

### 9. Checkout do Presença Digital Lucrativa

A página está pronta com o conteúdo do seu PDF: método M.E.T.A. Local, os seis
módulos, os entregáveis e a FAQ.

Como o curso ainda está sendo gravado, ela **captura e-mail** em vez de vender,
e diz isso na cara. Quando subir na Hotmart, me passe o link de checkout que eu
troco a captura pelo botão de compra.

### 10. AdSense no blog

**Placeholder instalado**, como você pediu: `components/adsense.tsx`, já
posicionado no fim dos artigos. Não carrega script, não define cookie e não
aparece em produção enquanto não houver ID.

Antes de ativar, o que você precisa para decidir onde:

O AdSense põe **anúncios de concorrentes** nas suas páginas de autoridade, e
paga por volume — num blog de nicho B2B, poucos reais por mês. O custo não é o
dinheiro: é um decisor lendo o seu artigo sobre estrutura digital com um banner
de "agência de tráfego" do lado.

**Sugestão:** rodar AdSense só nos artigos de topo de funil (os que atraem dono
de negócio pesquisando "como aparecer no Google") e manter serviços, cases e
método limpos. Diga se concorda e eu implemento assim.

Preciso do seu **ID de editor** (`ca-pub-XXXXXXXX`).

### 11. Depoimentos em vídeo

Os dois vídeos em `SITE/Testimonials/` continuam sem uso. De quem são, e há
autorização? Valem mais que texto.

### 12. O logo novo

Quando vier, substitua `public/brand/logo-papel.png` e
`public/brand/logo-grafite.png`. Nada mais precisa ser tocado.

---

## ✅ Resolvido nesta rodada

- **Cidade corrigida** para Tatuí, SP, em oito lugares: schema, `llms.txt`,
  contato, FAQ da landing page e os links das avaliações.
- **Depoimentos reais capturados** direto do seu perfil do Google: Gilberto
  Júnior, Thaís Coelho e Jean Sbrissa, com texto integral. As genéricas
  ("Excelente profissional, recomendo") ficaram de fora, como você pediu.
- **Fictícios confirmados como inexistentes.** "Marcos Oliveira" e "Juliana
  Santos", do site antigo, **não existem** no perfil real — eram fabricadas,
  como as do `Results.tsx`. Nunca chegaram a ser migradas.
- **RevisaLei** → "Material para concurso público".
- **Retenção** ajustada para 6 meses a 1 ano.
- **Identidade visual original restaurada**: preto e dourado, Playfair Display e
  Inter, recuperados do commit `18513f6`.
- **Portfólio de sites ganhou rota própria** (`/portfolio`), com filtro por
  segmento e os 17 projetos.
- **Presença Digital Lucrativa** e **newsletter** construídos.
- **Instagram** religado com `@diego.fintelman`.
- **Snippet do GTM trocado** pelo do Stape que você mandou: agora usa
  `gtm.js?id=GTM-K3LD28KC`, em vez do carregador ofuscado `5fjmkkhvd.js`.
  Mais fácil de auditar e de trocar.
- **Rastros de Lovable apagados** do código e do HTML gerado. Permanecem só
  em `docs/AUDIT.md`, que é o registro do que o site era — apagar de lá
  deixaria a auditoria sem sentido.
- **`vercel.json` removido.** Era config da SPA antiga (reescrevia tudo para
  `index.html`) e já estava errada para o Next.
