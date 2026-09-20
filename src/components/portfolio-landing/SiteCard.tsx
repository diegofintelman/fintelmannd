import { useState } from "react";
import { ExternalLink, Monitor } from "lucide-react";
import type { SiteProject } from "@/data/sites";

interface SiteCardProps {
  site: SiteProject;
}

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const getPreviewUrl = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(
    url,
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`;

const SiteCard = ({ site }: SiteCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <article
      className="group relative flex flex-col bg-[hsl(var(--dark-card))] border border-[hsl(var(--dark-border))] rounded-xl overflow-hidden transition-all duration-300 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_hsl(var(--gold)/0.25)]"
    >
      {/* Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[hsl(var(--dark-card))] to-[hsl(0,0%,14%)]">
        {!failed ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[hsl(0,0%,12%)] to-[hsl(0,0%,16%)]" />
            )}
            <img
              src={getPreviewUrl(site.url)}
              alt={`Prévia do site ${site.nome}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[hsl(0,0%,10%)] via-[hsl(0,0%,12%)] to-[hsl(43,30%,12%)]">
            <Monitor className="w-10 h-10 text-gold/70" aria-hidden="true" />
            <span className="text-sm font-medium text-[hsl(0,0%,80%)] text-center px-4">
              {site.nome}
            </span>
          </div>
        )}

        {/* Category pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-full bg-[hsl(var(--dark-bg))]/85 backdrop-blur border border-gold/30 text-gold">
          {site.categoria}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="text-base md:text-lg font-medium text-[hsl(0,0%,95%)] leading-tight">
            {site.nome}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 break-all">
            {getDomain(site.url)}
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {site.descricao}
        </p>

        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver site de ${site.nome} (abre em nova aba)`}
          className="inline-flex items-center justify-center gap-2 mt-1 px-4 py-2.5 text-sm font-medium border border-gold/50 text-gold rounded-md hover:bg-gold hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--dark-bg))]"
        >
          Ver site
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

export default SiteCard;
