/**
 * Camada de mensuração.
 *
 * A auditoria encontrou um GTM server-side pago e bem configurado que, na
 * prática, media só pageview: não havia um único `dataLayer.push` no código.
 * Este arquivo é o contrato de eventos do site. Todo evento novo entra aqui
 * primeiro, com nome e payload tipados, e só depois num componente.
 *
 * Regras:
 *  - nome de evento em snake_case, no infinitivo do que aconteceu;
 *  - microconversão nunca compartilha nome com conversão principal;
 *  - todo evento carrega `origem`. A página/seção que o disparou;
 *  - pageview NÃO é conversão, exceto em /obrigado.
 *
 * A documentação legível fica em docs/MEDICAO.md.
 */

export type EventName =
  // --- Microconversões -----------------------------------------------------
  | "cta_whatsapp_click"
  | "cta_contact_click"
  | "cta_diagnostico_click"
  | "form_start"
  | "external_link_click"
  | "case_view"
  | "service_view"
  // --- Conversões principais ----------------------------------------------
  | "form_submit"
  | "diagnostico_submit"
  | "newsletter_subscribe";

export type EventPayload = {
  /** Página ou seção que originou o clique. Obrigatório. */
  origem: string;
  /** Rótulo visível do elemento clicado, quando houver. */
  rotulo?: string;
  /** Destino, para links externos. */
  destino?: string;
  /** Identificador do case ou serviço, quando aplicável. */
  item?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: EventName, payload: EventPayload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

/**
 * Lista legível dos eventos, usada para gerar a documentação e para conferir
 * no GTM se todo gatilho previsto existe. Manter em sincronia com EventName.
 */
export const eventCatalog: {
  name: EventName;
  tipo: "microconversão" | "conversão";
  quando: string;
}[] = [
  {
    name: "cta_whatsapp_click",
    tipo: "microconversão",
    quando: "Clique em qualquer link de WhatsApp, em qualquer página.",
  },
  {
    name: "cta_contact_click",
    tipo: "microconversão",
    quando: "Clique em e-mail ou telefone.",
  },
  {
    name: "cta_diagnostico_click",
    tipo: "microconversão",
    quando: "Clique no CTA principal que leva para /diagnostico.",
  },
  {
    name: "form_start",
    tipo: "microconversão",
    quando: "Primeiro foco em qualquer campo de um formulário. Dispara uma vez por sessão de formulário.",
  },
  {
    name: "external_link_click",
    tipo: "microconversão",
    quando: "Clique em link que sai do domínio — site de cliente, avaliação no Google.",
  },
  {
    name: "case_view",
    tipo: "microconversão",
    quando: "Abertura de uma página de case individual.",
  },
  {
    name: "service_view",
    tipo: "microconversão",
    quando: "Abertura de uma página de serviço individual.",
  },
  {
    name: "form_submit",
    tipo: "conversão",
    quando: "Envio validado do formulário de contato.",
  },
  {
    name: "diagnostico_submit",
    tipo: "conversão",
    quando: "Envio validado do formulário de diagnóstico. É a conversão principal do site.",
  },
  {
    name: "newsletter_subscribe",
    tipo: "conversão",
    quando: "Inscrição confirmada na newsletter.",
  },
];
