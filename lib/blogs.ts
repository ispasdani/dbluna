// lib/blogs.ts
import { promises as fs } from "fs";
import path from "path";

export type FrontMatter = {
  title: string;
  description: string;
  date: string;
  image: string;
  authorName?: string;
  authorSrc?: string;
};

export type BlogMeta = FrontMatter & { slug: string };

const DATA_DIR = path.join(process.cwd(), "data");

// Import a single MDX module by slug
async function importBlog(slug: string) {
  // NOTE: path is relative to /src (or your alias root)
  // adjust "@/data" if your alias differs
  return import(`@/data/${slug}.mdx`);
}

export async function getSingleBlog(slug: string) {
  try {
    const mod = await importBlog(slug);

    return {
      // React component for the post
      content: mod.default,
      // metadata object exported from the mdx file
      frontmatter: (mod.frontmatter ?? {}) as FrontMatter,
      slug,
    };
  } catch (error) {
    console.error(`Error importing blog for slug "${slug}":`, error);
    return null;
  }
}

export async function getBlogs(): Promise<BlogMeta[]> {
  const files = await fs.readdir(DATA_DIR);

  const slugs = files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const allBlogs = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await importBlog(slug);
      return {
        slug,
        ...(mod.frontmatter ?? {}),
      } as BlogMeta;
    })
  );

  // optional: sort newest first
  allBlogs.sort((a, b) => +new Date(b.date ?? 0) - +new Date(a.date ?? 0));

  return allBlogs;
}

// If you still want this helper:
export async function getBlogFrontMatterBySlug(slug: string) {
  try {
    const mod = await importBlog(slug);
    return (mod.frontmatter ?? null) as FrontMatter | null;
  } catch {
    return null;
  }
}
