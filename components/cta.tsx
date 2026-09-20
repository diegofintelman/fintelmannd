"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { site } from "@/lib/site";
import { cn, whatsappUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";

/**
 * NOTA SOBRE O CTA MAGNÉTICO
 *
 * Foi avaliado e não entra. Três razões, na ordem do peso:
 *
 * 1. O alvo se mover sob o cursor aumenta o erro de clique. É um botão que
 *    pune quem mira, e o botão em questão é a conversão principal do site.
 * 2. Só existe em ponteiro fino. A maior parte do tráfego pago chega em
 *    telefone, onde o efeito é um no-op, ou seja, o público que mais importa
 *    nunca veria aquilo pelo qual se pagou em complexidade.
 * 3. Para o público de agência, magnetismo é um truque de 2021. O que
 *    impressiona uma agência que avalia contratar é HTML indexável, Core Web
 *    Vitals limpo, schema correto e tracking que de fato dispara.
 *
 * O que entra no lugar, e serve ao mesmo desejo, que o CTA pareça vivo e
 * deliberado: o fio de latão sob o rótulo cresce a partir do ponto em que o
 * ponteiro entrou. O alvo não se move, a mão não é punida, e em toque a regra
 * simplesmente já está lá.
 */
export function Cta({
  href = site.cta.href,
  label = site.cta.label,
  origem,
  tone = "ink",
  className,
}: {
  href?: string;
  label?: string;
  /** De onde partiu o clique. Vai para o dataLayer. */
  origem: string;
  tone?: "ink" | "accent";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [origin, setOrigin] = useState(50);

  return (
    <Link
      ref={ref}
      href={href}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setOrigin(((e.clientX - rect.left) / rect.width) * 100);
      }}
      onClick={() =>
        track("cta_diagnostico_click", { origem, rotulo: label })
      }
      style={{ ["--fill-origin" as string]: `${origin}%` }}
      className={cn("cta", tone === "accent" && "cta--accent", className)}
    >
      <span className="cta__label">{label}</span>
      <span aria-hidden="true" className="cta__rule" />
    </Link>
  );
}

/**
 * WhatsApp com mensagem pré-preenchida por origem e clique rastreado.
 *
 * O site antigo tinha seis botões abrindo `wa.me` cru: nenhum rastreado e
 * nenhum identificável. Aqui a origem viaja nos dois canais — no texto que
 * chega no celular do Diego e no evento que chega no GTM.
 */
export function WhatsAppLink({
  origem,
  children,
  className,
}: {
  origem: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(site.contact.whatsapp, origem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("cta_whatsapp_click", {
          origem,
          rotulo: typeof children === "string" ? children : "WhatsApp",
          destino: "wa.me",
        })
      }
      className={cn("link font-medium", className)}
    >
      {children ?? `WhatsApp ${site.contact.whatsappDisplay}`}
    </a>
  );
}

export function ExternalLink({
  href,
  origem,
  children,
  className,
}: {
  href: string;
  origem: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("external_link_click", { origem, destino: href })
      }
      className={cn("link", className)}
    >
      {children}
    </a>
  );
}
