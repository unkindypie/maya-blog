import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { useMDXComponents as getMDXComponents } from "../mdx-components";

vi.mock("nextra-theme-blog", () => ({
  useMDXComponents: (components: unknown) => components,
}));
const Wrapper = getMDXComponents().wrapper;
describe("MDX document layout", () => {
  it("renders the article category, description, publication date, and reading body", () => {
    const markup = renderToStaticMarkup(
      <Wrapper
        metadata={{
          title: "Vita notes",
          category: "PS Vita / homebrew",
          description: "Notes from the port.",
          date: "2026-11-13",
        }}
      >
        <p>Article text.</p>
      </Wrapper>,
    );
    expect(markup).toContain('class="document-page article-page"');
    expect(markup).toContain("PS Vita / homebrew");
    expect(markup).toContain("<h1>Vita notes</h1>");
    expect(markup).toContain(
      '<p class="document-description">Notes from the port.</p>',
    );
    expect(markup).toContain('dateTime="2026-11-13"');
    expect(markup).toContain(
      '<div class="markdown-body"><p>Article text.</p></div>',
    );
    expect(markup).not.toContain("cat ~/maya");
  });
  it("accepts missing descriptions and leaves full-width profiles in control of their own markup", () => {
    expect(
      renderToStaticMarkup(
        <Wrapper metadata={{ title: "Document", description: null }}>
          <p>Body</p>
        </Wrapper>,
      ),
    ).not.toContain('class="document-description"');
    expect(
      renderToStaticMarkup(
        <Wrapper metadata={{ fullWidth: true }}>
          <h1>Profile</h1>
        </Wrapper>,
      ),
    ).toBe("<h1>Profile</h1>");
  });
});
