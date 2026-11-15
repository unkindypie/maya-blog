import { describe, expect, it } from "vitest";
import type { PageMapItem } from "nextra";
import {
  buildLlmsText,
  buildSitemap,
  collectSeoPages,
  createSeoPage,
  pageMetadata,
  pageStructuredData,
  socialImagePath,
  SITE_URL,
} from "@/lib/seo";
const home = createSeoPage("/", {
  title: "Maya",
  description: "Hello",
  socialTitle: "hey, i'm maya",
});
const about = createSeoPage("/about", { title: "Maya", description: "Hello" });
const post = createSeoPage("/blog/example", {
  title: "My article",
  description: "A & B",
  date: "2026-11-15",
  category: "Neovim",
  images: ["/images/example.png"],
});
describe("SEO metadata", () => {
  it("canonicalizes the duplicate About profile to the homepage", () => {
    expect(about.canonicalPath).toBe("/");
    expect(pageMetadata(about).alternates?.canonical).toBe(`${SITE_URL}/`);
    expect(socialImagePath(about)).toBe(socialImagePath(home));
  });
  it("generates absolute, page-specific social metadata and article dates", () => {
    const metadata = pageMetadata(post);
    expect(metadata.title).toEqual({ absolute: "My article · Maya" });
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/blog/example/`);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-11-15",
      title: "My article · Maya",
      images: [
        { url: `${SITE_URL}/og/blog/example/`, width: 1200, height: 630 },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      description: "A & B",
    });
    expect(pageMetadata(home).openGraph).toMatchObject({
      type: "website",
      images: [{ url: `${SITE_URL}/og/home/` }],
    });
    expect(metadata.alternates?.types).toHaveProperty(
      "application/rss+xml",
      `${SITE_URL}/feed.xml`,
    );
  });
  it("discovers nested MDX pages and adds the custom blog index once", () => {
    const pages: PageMapItem[] = [
      { name: "index", route: "/", frontMatter: { title: "Maya" } },
      {
        name: "blog",
        route: "/blog",
        children: [
          {
            name: "example",
            route: "/blog/example",
            frontMatter: { title: "Post", date: "2026-11-15" },
          },
        ],
      },
    ];
    pages.push({
      name: "blog-index",
      route: "/blog",
      frontMatter: { title: { absolute: "Blog · Maya" } },
    });
    expect(
      collectSeoPages(pages)
        .map((page) => page.path)
        .sort(),
    ).toEqual(["/", "/blog/", "/blog/example/"]);
  });
  it("omits duplicate URLs and fabricated modification dates from the sitemap", () => {
    const sitemap = buildSitemap([home, about, post]);
    expect(sitemap.map((item) => item.url)).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/blog/example/`,
    ]);
    expect(sitemap[1]).toEqual({
      url: `${SITE_URL}/blog/example/`,
      images: [`${SITE_URL}/images/example.png`],
    });
    expect(
      buildSitemap([
        createSeoPage("/updated", { title: "Updated", updated: "2026-11-15" }),
      ])[0].lastModified,
    ).toBe("2026-11-15");
  });
  it("generates a discovery file from the same canonical page catalog", () => {
    const text = buildLlmsText([home, about, post]);
    expect(text.startsWith("# Maya\n")).toBe(true);
    expect(text).toContain(`[My article](${SITE_URL}/blog/example/): A & B`);
    expect(text).not.toContain(`](${SITE_URL}/about/)`);
    expect(text).toContain("## Articles");
  });
  it("describes articles, breadcrumbs, and the homepage without inventing dates", () => {
    const json = JSON.stringify(pageStructuredData(post));
    expect(json).toContain('"@type":"BlogPosting"');
    expect(json).toContain('"datePublished":"2026-11-15"');
    expect(json).toContain('"@type":"BreadcrumbList"');
    expect(json).not.toContain("dateModified");
    expect(JSON.stringify(pageStructuredData(home))).toContain(
      '"@type":"ProfilePage"',
    );
  });
});
