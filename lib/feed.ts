import type { Post } from "./posts";
import { absoluteUrl } from "./seo";

export function escapeXml(value: string): string {
  return value.replace(
    /[<>&"']/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );
}
export function buildRss(posts: readonly Post[]): string {
  const items = posts
    .map((post) => {
      const url = escapeXml(absoluteUrl(`${post.route.replace(/\/$/, "")}/`));
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.description)}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate></item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Maya · blog</title><link>${absoluteUrl("/blog/")}</link>
<description>Neovim, Linux dotfiles, local AI, and Vita homebrew. Notes from Maya's pet projects.</description>
<language>en</language><atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
${items}
</channel></rss>`;
}
