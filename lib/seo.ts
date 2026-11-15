import type { Metadata, MetadataRoute } from "next";
import type { PageMapItem } from "nextra";
import { z } from "zod";

export const SITE_URL = "https://www.maya-is.engineer";
export const SITE_NAME = "Maya";
export const SITE_DESCRIPTION =
  "Maya's personal site: systems engineering, Neovim, Linux dotfiles, local AI, and Ocarina of Time modding on PS Vita.";
const frontMatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(SITE_DESCRIPTION),
  date: z.string().date().optional(),
  updated: z.string().date().optional(),
  category: z.string().optional(),
  socialTitle: z.string().optional(),
  socialDescription: z.string().optional(),
  images: z.array(z.string().startsWith("/")).default([]),
});
export interface SeoPage {
  readonly path: string;
  readonly canonicalPath: string;
  readonly title: string;
  readonly description: string;
  readonly date?: string;
  readonly updated?: string;
  readonly category?: string;
  readonly socialTitle?: string;
  readonly socialDescription?: string;
  readonly images: readonly string[];
}
export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).href;
}
export function createSeoPage(path: string, frontMatter: unknown): SeoPage {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return {
    ...frontMatterSchema.parse(frontMatter),
    path: normalized,
    canonicalPath: normalized === "/about/" ? "/" : normalized,
  };
}
export const blogPage = createSeoPage("/blog/", {
  title: "Blog",
  description:
    "Notes on maya-nvim, Linux dotfiles, local AI, and Vita homebrew.",
  category: "notes / pet projects",
});
export function collectSeoPages(pages: PageMapItem[]): SeoPage[] {
  const content = pages.flatMap((page): SeoPage[] => {
    if ("children" in page) return collectSeoPages(page.children);
    if (!("frontMatter" in page) || !page.frontMatter) return [];
    if (page.route.replace(/\/$/, "") === "/blog") return [blogPage];
    return [createSeoPage(page.route, page.frontMatter)];
  });
  return [
    ...new Map(
      [...content, blogPage].map((page) => [page.path, page]),
    ).values(),
  ];
}
export function socialImagePath(page: SeoPage): string {
  return `/og/${page.canonicalPath === "/" ? "home/" : page.canonicalPath.slice(1)}`;
}
export function pageMetadata(page: SeoPage): Metadata {
  const title =
    page.canonicalPath === "/" ? page.title : `${page.title} · ${SITE_NAME}`;
  const image = {
    url: absoluteUrl(socialImagePath(page)),
    width: 1200,
    height: 630,
    alt: `${page.socialTitle ?? page.title} — Maya`,
  };
  return {
    title: { absolute: title },
    description: page.description,
    alternates: {
      canonical: absoluteUrl(page.canonicalPath),
      types: { "application/rss+xml": absoluteUrl("/feed.xml") },
    },
    openGraph: {
      type: page.date ? "article" : "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: absoluteUrl(page.canonicalPath),
      title,
      description: page.description,
      images: [image],
      ...(page.date && {
        publishedTime: page.date,
        ...(page.updated && { modifiedTime: page.updated }),
        authors: [absoluteUrl("/")],
        section: page.category,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [image],
    },
  };
}
export function buildSitemap(pages: readonly SeoPage[]): MetadataRoute.Sitemap {
  return pages
    .filter((page) => page.path === page.canonicalPath)
    .map((page) => ({
      url: absoluteUrl(page.canonicalPath),
      ...(page.updated && { lastModified: page.updated }),
      ...(page.images.length && { images: page.images.map(absoluteUrl) }),
    }));
}
export function buildLlmsText(pages: readonly SeoPage[]): string {
  const canonical = pages.filter((page) => page.path === page.canonicalPath);
  const link = (page: SeoPage) => {
    const title = page.title.replace(/[\[\]\r\n]/g, "");
    const description = page.description.replace(/[\r\n]/g, " ");
    return `- [${title}](${absoluteUrl(page.canonicalPath)}): ${description}`;
  };
  return [
    "# Maya",
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "This is Maya's personal blog and portfolio. Posts describe her own projects and experiments. Article publication dates are in each page; the /now panel shows recent public GitHub commits. The homepage and /about/ contain the same profile; prefer the homepage.",
    "",
    "## Pages",
    ...canonical.filter((page) => !page.date).map(link),
    "",
    "## Articles",
    ...canonical.filter((page) => page.date).map(link),
    "",
    "## Project repositories",
    "- [maya-nvim](https://github.com/unkindypie/maya-nvim): Maya's Neovim configuration and local AI tooling.",
    "- [.maya-dotfiles](https://github.com/unkindypie/.maya-dotfiles): Hyprland, Kitty, tmux, zsh, and desktop themes.",
    "",
    "## Contact",
    "- [GitHub](https://github.com/unkindypie)",
    "- [Email](mailto:maya1.bondarenko@gmail.com)",
    "",
  ].join("\n");
}
export function pageStructuredData(page: SeoPage): Record<string, unknown> {
  const url = absoluteUrl(page.canonicalPath);
  const breadcrumb = [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    ...(page.date
      ? [
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog/"),
          },
        ]
      : []),
    ...(page.canonicalPath !== "/"
      ? [
          {
            "@type": "ListItem",
            position: page.date ? 3 : 2,
            name: page.title,
            item: url,
          },
        ]
      : []),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": page.date
          ? "BlogPosting"
          : page.canonicalPath === "/"
            ? "ProfilePage"
            : "WebPage",
        "@id": `${url}#page`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": absoluteUrl("/#website") },
        inLanguage: "en",
        ...(page.date
          ? {
              headline: page.title,
              datePublished: page.date,
              ...(page.updated && { dateModified: page.updated }),
              author: { "@id": absoluteUrl("/#maya") },
              mainEntityOfPage: url,
              image: absoluteUrl(socialImagePath(page)),
            }
          : page.canonicalPath === "/"
            ? { mainEntity: { "@id": absoluteUrl("/#maya") } }
            : {}),
      },
      ...(breadcrumb.length > 1
        ? [{ "@type": "BreadcrumbList", itemListElement: breadcrumb }]
        : []),
    ],
  };
}
export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#maya"),
      name: "Maya",
      url: absoluteUrl("/"),
      sameAs: ["https://github.com/unkindypie"],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      author: { "@id": absoluteUrl("/#maya") },
    },
  ],
};
