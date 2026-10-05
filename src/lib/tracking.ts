// Eventos enviados ao dataLayer do GTM (carregado via Stape em ss.fintelmannd.com.br).
// O GTM web repassa ao container server-side, que envia ao Pixel e à API de Conversões da Meta.
// O event_id permite que a Meta deduplique o evento recebido pelo navegador e pelo servidor.

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const pushEvent = (payload: DataLayerEvent) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

const newEventId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const isWhatsappLink = (href: string) => /(?:wa\.me|api\.whatsapp\.com|whatsapp:\/\/)/i.test(href);

const getCtaLocation = (el: Element) =>
  el.closest("[data-cta-location]")?.getAttribute("data-cta-location") ||
  el.closest("section[id]")?.id ||
  el.closest("header, footer, nav")?.tagName.toLowerCase() ||
  "page";

// innerText ignora os textos ocultos (ex.: versões desktop/mobile do mesmo botão).
const getCtaText = (el: Element) =>
  ((el as HTMLElement).innerText || el.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 100);

export const trackPageView = (path: string) => {
  pushEvent({
    event: "virtual_page_view",
    event_id: newEventId(),
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

const trackWhatsappClick = (href: string, el: Element | null) => {
  pushEvent({
    event: "whatsapp_click",
    event_id: newEventId(),
    link_url: href,
    cta_text: el ? getCtaText(el) : "",
    cta_location: el ? getCtaLocation(el) : "page",
    page_path: window.location.pathname,
  });
};

let initialized = false;

export const initTracking = () => {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // Último elemento clicado, para dar contexto aos botões que abrem o WhatsApp via window.open.
  let lastClicked: Element | null = null;

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      lastClicked = target?.closest?.("a, button") ?? target;

      const anchor = target?.closest?.("a[href]");
      const href = anchor?.getAttribute("href") || "";
      if (anchor && isWhatsappLink(href)) trackWhatsappClick(href, anchor);
    },
    { capture: true },
  );

  const originalOpen = window.open.bind(window);
  window.open = (url?: string | URL, ...rest) => {
    const href = url ? String(url) : "";
    if (isWhatsappLink(href)) trackWhatsappClick(href, lastClicked);
    return originalOpen(url, ...rest);
  };
};
