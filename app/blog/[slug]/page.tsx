import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { PageHeader } from "@/components/page-header";
import { Chapter } from "@/components/chapter";
import { Cta } from "@/components/cta";
import { BreadcrumbSchema, ArticleSchema } from "@/components/schema";
import { AdSlot } from "@/components/adsense";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      authors: [site.person],
    },
  };
}

/** Componentes do MDX, no mesmo sistema tipográfico do resto do site. */
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-11 text-h3 first:mt-0" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-9 text-h4" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-5 text-ink-soft" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-5 grid gap-2.5 text-ink-soft" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-5 grid list-decimal gap-2.5 pl-5 text-ink-soft" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-medium text-ink" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => <a className="link" {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-7 border-l-2 border-[var(--accent)] pl-5 text-lead"
      {...props}
    />
  ),
  hr: () => <hr className="mt-9 border-rule" />,
  code: (props: React.ComponentProps<"code">) => (
    <code className="bg-[var(--surface)] px-1.5 py-0.5 text-[0.9em]" {...props} />
  ),
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relacionados = getRelatedPosts(post.slug);

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description}
        slug={post.slug}
        published={post.published}
        updated={post.updated}
      />
      <BreadcrumbSchema
        trail={[
          { name: "Notas", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <PageHeader
        kicker={post.categoria}
        title={post.title}
        trail={[
          { name: "Notas", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
        standfirst={post.description}
      >
        <p className="text-sm text-ink-soft">
          Por {site.person} ·{" "}
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          {post.updated && post.updated !== post.published && (
            <>
              {" "}
              · atualizado em{" "}
              <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          )}{" "}
          · {post.minutos} min de leitura
        </p>
      </PageHeader>

      <article className="wrap pb-section">
        <div className="max-w-column">
          <MDXRemote source={post.body} components={mdxComponents} />

          {/* Espaço de anúncio ao FIM do artigo, nunca no meio: o leitor
              terminou o raciocínio antes de encontrar publicidade. Ver a nota
              em components/adsense.tsx sobre onde não usar. */}
          <AdSlot />
        </div>
      </article>

      <Chapter n="—" title="Diagnóstico" ground="graphite">
        <div className="grid gap-11 lg:grid-cols-[1fr_1fr] lg:gap-13">
          <div className="max-w-measure">
            <h2 className="text-h3">
              Isso acontecendo no seu negócio agora?
            </h2>
            <p className="mt-4 text-ink-soft">
              O diagnóstico é uma conversa de 30 a 40 minutos olhando o que já
              existe. Se o que você precisa não for o que eu faço, eu digo na
              própria conversa.
            </p>
            <div className="mt-7">
              <Cta origem={`post-${post.slug}`} />
            </div>
          </div>

          {relacionados.length > 0 && (
            <div>
              <p className="eyebrow mb-5">Leia também</p>
              <ul className="grid gap-0 border-t border-rule">
                {relacionados.map((r) => (
                  <li key={r.slug} className="border-b border-rule py-4">
                    <h3 className="font-medium">
                      <Link href={`/blog/${r.slug}`} className="link">
                        {r.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      {r.categoria} · {r.minutos} min
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Chapter>
    </>
  );
}
