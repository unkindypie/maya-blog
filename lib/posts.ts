import type { PageMapItem } from "nextra";

export type Post = {
  route: string;
  title: string;
  description: string;
  date: string;
};

export function collectPosts(pages: PageMapItem[]): Post[] {
  return pages
    .flatMap((page) => {
      if ("children" in page) return collectPosts(page.children);
      if (!("frontMatter" in page) || !page.route.startsWith("/blog/"))
        return [];
      const { title, description, date } = page.frontMatter ?? {};
      if (
        typeof title !== "string" ||
        typeof date !== "string" ||
        !Number.isFinite(Date.parse(date))
      ) {
        throw new Error(
          `Post ${page.route} needs a title and a valid date in front matter.`,
        );
      }
      return [
        {
          route: page.route,
          title,
          description: typeof description === "string" ? description : "",
          date,
        },
      ];
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
