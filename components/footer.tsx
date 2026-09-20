import Link from "next/link";
import Image from "next/image";

import { footerNav, site } from "@/lib/site";
import { WhatsAppLink, ExternalLink } from "@/components/cta";
import { Revelar } from "@/components/motion";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-rule bg-[var(--surface)]">
      {/* Brilho difuso: profundidade por gradiente, não por imagem. */}
      <div
        aria-hidden="true"
        className="glow left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="wrap-wide relative py-section">
        <div className="grid gap-11 lg:grid-cols-[1.15fr_2fr]">
          <Revelar>
            <Image
              src="/brand/logo-grafite.png"
              alt={site.name}
              width={898}
              height={390}
              sizes="260px"
              className="h-11 w-auto"
            />

            <p className="mt-5 max-w-measure-tight text-ink-soft">
              Estrutura digital para aquisição, autoridade e crescimento.
              Operação conduzida por {site.person}, em {site.region}, para
              clientes em todo o Brasil.
            </p>

            <dl className="mt-7 grid gap-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-ink-soft">WhatsApp</dt>
                <dd>
                  <WhatsAppLink origem="rodape">
                    {site.contact.whatsappDisplay}
                  </WhatsAppLink>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-ink-soft">E-mail</dt>
                <dd>
                  <a className="link" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              {site.contact.instagram && (
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-ink-soft">Instagram</dt>
                  <dd>
                    <ExternalLink href={site.contact.instagram} origem="rodape">
                      {site.contact.instagramHandle}
                    </ExternalLink>
                  </dd>
                </div>
              )}
            </dl>
          </Revelar>

          <nav aria-label="Rodapé" className="grid gap-9 sm:grid-cols-3">
            {footerNav.map((grupo, i) => (
              <Revelar key={grupo.title} atraso={80 + i * 70}>
                <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                  {grupo.title}
                </h2>
                <ul className="grid gap-2.5">
                  {grupo.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-soft transition-colors duration-200 hover:text-gold-bright"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Revelar>
            ))}
          </nav>
        </div>

        <div className="hairline mt-12 opacity-40" />

        <div className="mt-7 flex flex-col gap-4 text-sm text-ink-soft sm:flex-row sm:items-baseline sm:justify-between">
          <p>
            © {ano} {site.name}. Todos os direitos reservados.
          </p>
          <p className="max-w-measure-tight">
            Os resultados apresentados referem-se a projetos específicos e não
            constituem promessa de desempenho.
          </p>
        </div>
      </div>
    </footer>
  );
}
