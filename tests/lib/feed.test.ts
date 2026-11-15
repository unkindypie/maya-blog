import { describe, expect, it } from "vitest";
import { buildRss, escapeXml } from "@/lib/feed";
describe("RSS", () => {
  it("escapes text and publishes canonical article links and real dates", () => {
    const xml = buildRss([
      {
        route: "/blog/example",
        title: 'A < B & "C"',
        description: "It's a test",
        date: "2026-11-15",
      },
    ]);
    expect(xml).toContain("A &lt; B &amp; &quot;C&quot;");
    expect(xml).toContain("It&apos;s a test");
    expect(xml).toContain(
      '<guid isPermaLink="true">https://www.maya-is.engineer/blog/example/</guid>',
    );
    expect(xml).toContain("Sun, 15 Nov 2026 00:00:00 GMT");
  });
  it("supports empty feeds and escapes every XML delimiter", () => {
    expect(buildRss([])).not.toContain("<item>");
    expect(escapeXml("<>&\"'")).toBe("&lt;&gt;&amp;&quot;&apos;");
  });
});
