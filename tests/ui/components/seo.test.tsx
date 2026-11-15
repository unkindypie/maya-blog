import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StructuredData } from "@/ui/components/structured-data";
import { SocialCard } from "@/ui/components/social-card";
import { createSeoPage } from "@/lib/seo";
describe("SEO components", () => {
  it("escapes script boundaries in structured data", () => {
    const html = renderToStaticMarkup(
      <StructuredData data={{ name: "</script><script>alert(1)</script>" }} />,
    );
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("\\u003c/script>");
    expect(html).toContain('type="application/ld+json"');
  });
  it("uses the homepage's custom preview copy and each article's own details", () => {
    const home = createSeoPage("/", {
      title: "Maya",
      socialTitle: "hey, i'm maya",
      socialDescription: "My tools and projects",
    });
    const article = createSeoPage("/blog/test", {
      title: "My post",
      description: "My description",
      date: "2026-11-15",
      category: "Neovim",
    });
    expect(renderToStaticMarkup(<SocialCard page={home} />)).toContain(
      "hey, i&#x27;m maya",
    );
    const html = renderToStaticMarkup(<SocialCard page={article} />);
    for (const text of [
      "My post",
      "My description",
      "Neovim",
      "2026-11-15",
      "maya-is.engineer",
    ])
      expect(html).toContain(text);
  });
});
