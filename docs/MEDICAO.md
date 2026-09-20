# Plano de medição

O que cada evento significa, quando dispara e o que pode ser configurado como
conversão. Esta tabela é o contrato: **evento que não está aqui não existe.**

O código correspondente está em `lib/analytics.ts`, tipado. Evento novo entra
lá primeiro, com entrada no `eventCatalog`, e só depois num componente.

---

## Estado atual

| Camada | Situação |
|---|---|
| GTM server-side (`ss.fintelmannd.com.br`) | ✅ Já existia e foi preservado sem alteração |
| Container `GTM-K3LD28KC` | ✅ Carrega |
| `dataLayer.push` no código | ✅ Implementado (antes não havia **nenhum**) |
| Gatilhos e tags no container | ❌ **Pendente.** Ver `docs/PENDENCIAS.md`, item 9 |
| Consent Mode v2 | ✅ Implementado no site; falta o container respeitar |

> O site antigo tinha tracking server-side pago e configurado medindo, na
> prática, apenas pageview: não havia um único `dataLayer.push` no código, e
> nenhum dos seis botões de WhatsApp era rastreado. Esse era o problema nº 3 da
> auditoria.

---

## Conversões principais

São as que podem ir para o Google Ads e para o Meta como conversão.

| Evento | Quando dispara | Onde |
|---|---|---|
| `diagnostico_submit` | Envio validado do formulário de diagnóstico. **É a conversão principal do site.** | `/diagnostico` |
| `form_submit` | Envio validado de qualquer formulário. Hoje só o de diagnóstico, então dispara junto com o acima | `/diagnostico` |
| `newsletter_subscribe` | Inscrição confirmada na newsletter | Ainda não implementado |

**Payload:** todo evento carrega `origem` (a página ou seção que disparou) e,
quando faz sentido, `rotulo`, `destino` ou `item`.

---

## Microconversões

Indicam interesse. **Nenhuma delas deve ser configurada como conversão** no
Google Ads ou no Meta — contá-las como conversão infla o número e faz o
algoritmo otimizar para clique em botão, não para negócio.

| Evento | Quando dispara |
|---|---|
| `cta_diagnostico_click` | Clique em qualquer CTA que leve para `/diagnostico`. Carrega `origem` distinguindo masthead, fólio, capítulo, menu móvel |
| `cta_whatsapp_click` | Clique em qualquer link de WhatsApp |
| `cta_contact_click` | Clique em e-mail ou telefone |
| `form_start` | Primeiro foco em qualquer campo do formulário. Dispara **uma vez** por sessão de formulário |
| `external_link_click` | Clique que sai do domínio: site de cliente no portfólio, avaliação no Google, Instagram |
| `case_view` | Abertura de uma página de case individual |
| `service_view` | Abertura de uma página de serviço individual |

`form_start` combinado com `form_submit` dá a taxa de abandono do formulário —
que é a métrica mais útil para saber se o formulário está longo demais.

---

## As regras

1. **Pageview não é conversão.** A única exceção possível é `/obrigado`, e
   mesmo lá a recomendação é usar `diagnostico_submit`, que é mais preciso —
   `/obrigado` pode ser acessada diretamente ou recarregada.
2. **Microconversão nunca compartilha nome com conversão.**
3. **Todo evento carrega `origem`.** Sem isso não dá para saber de onde veio o
   lead, que era exatamente o problema do site antigo.
4. **Nada de tag duplicada.** Antes de adicionar, procure se já existe.
5. **Nome novo entra em `lib/analytics.ts` antes de entrar no componente.**

---

## WhatsApp

Todo link de WhatsApp é montado por `whatsappUrl()` em `lib/utils.ts` e carrega
a origem em dois canais ao mesmo tempo:

- **na mensagem** que chega no celular: *"Vim pelo site (capitulo-06) e quero
  falar sobre a estrutura digital do meu negócio."*
- **no evento** `cta_whatsapp_click`, no campo `origem`.

Ou seja: dá para saber de qual página e de qual seção o contato partiu, mesmo
antes de abrir o GA4.

O site antigo usava `window.open("https://wa.me/5515997820279")` cru em seis
lugares: sem mensagem, sem origem, sem evento.

---

## Consent Mode v2

Implementado em duas partes, e a **ordem importa**:

1. `app/layout.tsx` define o estado padrão com `strategy="beforeInteractive"` —
   tudo negado, menos `functionality_storage` e `security_storage`. Isso roda
   **antes** do GTM.
2. `components/consent.tsx` transforma a escolha da pessoa num `consent update`
   e guarda no navegador.

Se o padrão fosse definido depois do GTM, as tags disparariam uma vez antes de
qualquer escolha e o consentimento seria decorativo.

O banner dá **o mesmo peso visual para "Recusar" e "Aceitar"**. Esconder a
recusa num link pequeno é padrão escuro e a LGPD não autoriza.

---

## Como conferir se está funcionando

1. Abra o site com o Preview do GTM ligado.
2. Confira que, **antes** de qualquer escolha de cookie, o estado de consent
   aparece como `denied`.
3. Aceite os cookies e confirme o `consent update`.
4. Clique num CTA de diagnóstico: deve aparecer `cta_diagnostico_click` com a
   `origem` correta.
5. Preencha um campo do formulário: `form_start`, uma vez só.
6. Envie: `form_submit` e `diagnostico_submit`, e o WhatsApp abre com a
   mensagem montada.
7. Abra um case: `case_view` com o slug em `item`.
