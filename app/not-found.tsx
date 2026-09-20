import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { mainNav } from "@/lib/site";

/**
 * 404 de verdade.
 *
 * O site antigo era uma SPA com fallback para index.html: qualquer endereço
 * inexistente respondia HTTP 200 com uma tela de erro desenhada, o que o Google
 * trata como soft 404. Esta página responde 404 de fato.
 */
export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHeader
        kicker="Erro 404"
        title="Esta página não existe"
        standfirst={
          <>
            O endereço pode ter mudado, ou o link pode estar incompleto. As
            páginas principais estão listadas abaixo.
          </>
        }
      />

      <Chapter n="—" title="Navegação" ground="graphite">
        <div className="max-w-column">
          <h2 className="eyebrow mb-5">Talvez você procure</h2>
          <ul className="grid gap-0 border-t border-rule">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-rule py-4">
                <Link href={item.href} className="link text-h4">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-rule py-4">
              <Link href="/diagnostico" className="link text-h4 text-accent">
                Pedir diagnóstico
              </Link>
            </li>
          </ul>
        </div>
      </Chapter>
    </>
  );
}
