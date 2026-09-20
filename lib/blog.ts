import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

/**
 * Blog — "Notas".
 *
 * Conteúdo em MDX no próprio repositório, compilado em build. Não há CMS, e
 * essa foi uma decisão: o volume previsto é de alguns posts por mês, escritos
 * por uma pessoa só. Um CMS headless aqui adicionaria um ponto de falha, um
 * custo mensal e um passo de deploy para resolver um problema que ainda não
 * existe. Quando passar a existir — mais de um autor, ou publicação sem acesso
 * ao repositório. O `frontmatter` abaixo já é o contrato que um CMS teria que
 * preencher.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(200),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  /** Categoria única. Serve para o leitor, não para SEO. */
  categoria: z.enum([
    "Tráfego pago",
    "Mensuração",
    "Sites e páginas",
    "Estrutura digital",
    "Criativos",
  ]),
  /** Marca rascunho: não entra na listagem nem no sitemap. */
  draft: z.boolean().optional().default(false),
});

export type PostMeta = z.infer<typeof frontmatterSchema> & {
  slug: string;
  minutos: number;
};

export type Post = PostMeta & { body: string };

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    // Falhar no build é o comportamento certo: um post com frontmatter quebrado
    // geraria metadata e schema inválidos em produção sem ninguém perceber.
    throw new Error(
      `Frontmatter inválido em content/blog/${filename}:\n${parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")}`
    );
  }

  return {
    ...parsed.data,
    slug,
    body: content,
    minutos: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .filter((p) => !p.draft)
    .sort((a, b) => b.published.localeCompare(a.published));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Posts relacionados: mesma categoria primeiro, completando com os mais recentes. */
export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const sameCategory = all.filter(
    (p) => p.slug !== slug && p.categoria === current.categoria
  );
  const rest = all.filter(
    (p) => p.slug !== slug && p.categoria !== current.categoria
  );

  return [...sameCategory, ...rest].slice(0, limit);
}
