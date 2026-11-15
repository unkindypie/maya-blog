import { describe, expect, it } from "vitest";
import type { PageMapItem } from "nextra";
import { collectPosts } from "../../lib/posts";

const post = (name: string, date: string): PageMapItem => ({
  name,
  route: `/blog/${name}`,
  frontMatter: { title: name, date },
});

describe("collectPosts", () => {
  it("collects nested posts newest first and ignores pages outside the blog", () => {
    const pages: PageMapItem[] = [
      post("older", "2026-01-01"),
      {
        name: "nested",
        route: "/blog/nested",
        children: [post("newer", "2026-10-01")],
      },
      { name: "about", route: "/about", frontMatter: { title: "About" } },
    ];
    expect(collectPosts(pages).map((post) => post.title)).toEqual([
      "newer",
      "older",
    ]);
  });
  it("handles an empty blog and optional descriptions", () => {
    expect(collectPosts([])).toEqual([]);
    expect(collectPosts([post("hello", "2026-01-01")])[0].description).toBe("");
  });
  it("rejects invalid post metadata instead of silently hiding posts", () => {
    expect(() => collectPosts([post("broken", "not-a-date")])).toThrow(
      "/blog/broken",
    );
    expect(() =>
      collectPosts([
        { name: "missing", route: "/blog/missing", frontMatter: {} },
      ]),
    ).toThrow("title and a valid date");
  });
});
