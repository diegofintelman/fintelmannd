"use client";

import { useEffect, useRef } from "react";
import { track, type EventName, type EventPayload } from "@/lib/analytics";

/**
 * Dispara um evento de visualização uma vez por montagem.
 *
 * `case_view` e `service_view` são microconversões: dizem que a página foi
 * aberta, não que houve conversão. A separação está documentada em
 * lib/analytics.ts e em docs/MEDICAO.md. Ela existe para que ninguém configure
 * uma dessas como conversão no Google Ads por engano.
 */
export function ViewTracker({
  event,
  payload,
}: {
  event: Extract<EventName, "case_view" | "service_view">;
  payload: EventPayload;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(event, payload);
    // As dependências são estáveis por rota; a trava garante disparo único.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
