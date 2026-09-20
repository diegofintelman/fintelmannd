import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { Cta } from "@/components/cta";
import { BreadcrumbSchema } from "@/components/schema";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notas",
  description:
    "Notas sobre estrutura digital, tráfego pago, mensuração e páginas que convertem. Escritas a partir de trabalho real, não de pesquisa de palavra-chave.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbSchema trail={[{ name: "Notas", href: "/blog" }]} />

      <PageHeader
        kicker="Notas"
        title="Notas sobre o trabalho"
        trail={[{ name: "Notas", href: "/blog" }]}
        standfirst={
          <>
            O que eu aprendo operando. Sem calendário editorial e sem produção em
            volume: uma nota entra quando há uma coisa concreta a dizer.
          </>
        }
      />

      <Chapter n="01" title="Notas">
        {posts.length === 0 ? (
          <p className="max-w-measure text-lead text-ink-soft">
            A primeira nota está sendo escrita.
          </p>
        ) : (
          <ul className="grid gap-0 border-t border-rule">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="grid gap-x-11 gap-y-3 border-b border-rule py-7 lg:grid-cols-[14rem_1fr]">
                  <div className="text-label text-ink-soft">
                    <time dateTime={post.published} className="block">
                      {formatDate(post.published)}
                    </time>
                    <p className="mt-1.5 text-accent">{post.categoria}</p>
                  </div>

                  <div className="max-w-measure">
                    <h2 className="text-h3">
                      <Link href={`/blog/${post.slug}`} className="link">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-ink-soft">{post.description}</p>
                    <p className="mt-3 text-sm text-ink-soft">
                      {post.minutos} min de leitura
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Chapter>

      <Chapter n="02" title="Diagnóstico" ground="graphite">
        <div className="max-w-column">
          <p className="text-lead">
            Ler sobre estrutura ajuda. Olhar a sua ajuda mais.
          </p>
          <div className="mt-6">
            <Cta origem="blog-index-fim" />
          </div>
        </div>
      </Chapter>
    </>
  );
}
