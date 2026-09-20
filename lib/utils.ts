import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Monta o link do WhatsApp com mensagem pré-preenchida por origem.
 *
 * O site antigo usava `wa.me/5515...` cru em seis botões diferentes. Era
 * impossível saber de qual página ou seção o lead tinha vindo. Aqui cada
 * chamada carrega a própria origem no texto da mensagem, e o evento de clique
 * carrega a mesma string para o GTM.
 */
export function whatsappUrl(phone: string, context: string) {
  const message = `Olá, Diego. Vim pelo site (${context}) e quero falar sobre a estrutura digital do meu negócio.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
