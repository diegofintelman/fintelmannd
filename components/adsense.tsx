import { cn } from "@/lib/utils";

/**
 * Espaço de anúncio do Google AdSense.
 *
 * ESTADO ATUAL: placeholder. Não carrega script nenhum, não define cookie e
 * não aparece para o visitante — só no modo de desenvolvimento, para você ver
 * onde o bloco cairia.
 *
 * COMO ATIVAR, quando tiver o ID de editor:
 *
 *   1. preencher `ADSENSE_CLIENTE` abaixo com o `ca-pub-XXXXXXXXXXXXXXXX`;
 *   2. criar o bloco no painel do AdSense e anotar o `data-ad-slot`;
 *   3. carregar o script do AdSense no `app/layout.tsx`, com
 *      `strategy="afterInteractive"` e **condicionado ao consentimento**:
 *      anúncio personalizado depende de `ad_storage`, e o Consent Mode já
 *      está implementado neste site. Carregar antes da escolha derruba a
 *      conformidade que o resto do site mantém.
 *
 * ONDE USAR — e onde não usar:
 *
 * O AdSense coloca anúncio de concorrente ao lado do seu conteúdo. Numa página
 * de serviço, de case ou no método, isso trabalha contra a venda: o decisor lê
 * o seu argumento com um banner de "agência de tráfego" do lado, e paga alguns
 * centavos por isso.
 *
 * A recomendação é usar só em artigo de topo de funil, e manter serviços,
 * cases, método e páginas comerciais limpos. Ver docs/PENDENCIAS.md, item 9.
 */

const ADSENSE_CLIENTE = "" as string; // ex.: "ca-pub-0000000000000000"

export function AdSlot({
  slot,
  formato = "auto",
  className,
  rotulo = "Publicidade",
}: {
  /** `data-ad-slot` do bloco criado no painel do AdSense. */
  slot?: string;
  formato?: "auto" | "horizontal" | "retangulo";
  className?: string;
  rotulo?: string;
}) {
  const ativo = Boolean(ADSENSE_CLIENTE && slot);

  if (!ativo) {
    // Em produção o placeholder não existe: melhor um espaço em branco do que
    // uma caixa tracejada escrita "anúncio aqui" num site que vende
    // credibilidade.
    if (process.env.NODE_ENV === "production") return null;

    return (
      <div
        aria-hidden="true"
        className={cn(
          "my-9 grid min-h-[120px] place-items-center rounded-lg border border-dashed border-rule text-sm text-ink-soft",
          className
        )}
      >
        Espaço de anúncio (placeholder — só aparece em desenvolvimento)
      </div>
    );
  }

  return (
    <aside
      className={cn("my-9", className)}
      // Rótulo obrigatório: publicidade precisa ser identificável como tal,
      // e o leitor precisa saber que aquilo não é conteúdo editorial.
      aria-label={rotulo}
    >
      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-ink-soft">
        {rotulo}
      </p>
      <ins
        className="adsbygoogle block"
        data-ad-client={ADSENSE_CLIENTE}
        data-ad-slot={slot}
        data-ad-format={formato === "auto" ? "auto" : formato}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
