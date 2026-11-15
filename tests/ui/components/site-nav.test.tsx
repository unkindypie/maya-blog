import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { SiteNav } from "../../../ui/components/site-nav";

const { current } = vi.hoisted(() => ({ current: { pathname: "/" } }));
vi.mock("next/navigation", () => ({ usePathname: () => current.pathname }));

describe("SiteNav", () => {
  it.each(["/blog", "/blog/", "/blog/hello/"])(
    "marks blog active at %s",
    (pathname) => {
      current.pathname = pathname;
      const markup = renderToStaticMarkup(<SiteNav />);
      expect(markup).toMatch(/<a[^>]*aria-current="page"[^>]*href="\/blog"/);
      expect(markup.match(/aria-current="page"/g)).toHaveLength(1);
    },
  );
  it.each(["tabs", "explorer", "workspaces"] as const)(
    "links the dotfiles page in %s navigation",
    (variant) => {
      current.pathname = "/dotfiles/";
      const markup = renderToStaticMarkup(<SiteNav variant={variant} />);
      expect(markup).toMatch(
        /<a[^>]*aria-current="page"[^>]*href="\/dotfiles"/,
      );
      expect(markup.match(/aria-current="page"/g)).toHaveLength(1);
    },
  );
  it("marks About active on the /about alias", () => {
    current.pathname = "/about/";
    expect(renderToStaticMarkup(<SiteNav />)).toMatch(
      /<a[^>]*aria-current="page"[^>]*href="\/"/,
    );
  });
  it("does not mark home active on an unknown route", () => {
    current.pathname = "/missing";
    expect(renderToStaticMarkup(<SiteNav />)).not.toContain(
      'aria-current="page"',
    );
  });
  it("opens Blog on an article and marks the article as the current file", () => {
    current.pathname = "/blog/hello/";
    const markup = renderToStaticMarkup(
      <SiteNav
        variant="explorer"
        posts={[
          {
            route: "/blog/hello",
            title: "Hello world",
            date: "2026-11-15",
            description: "",
          },
        ]}
      />,
    );
    expect(markup).toMatch(/<details class="explorer-folder" open="">/);
    expect(markup).toMatch(
      /<a[^>]*aria-current="page"[^>]*href="\/blog\/hello"/,
    );
    expect(markup).toContain("hello.md");
    expect(markup).toContain('title="Hello world"');
    expect(markup.match(/aria-current="page"/g)).toHaveLength(1);
  });
  it("keeps folders closed away from their pages and handles an empty blog", () => {
    current.pathname = "/";
    const markup = renderToStaticMarkup(<SiteNav variant="explorer" />);
    expect(markup).not.toContain('open=""');
    expect(markup).toContain("no posts yet");
    expect(markup).toContain('href="/blog"');
  });
  it("expands Projects and links to the real project card anchors", () => {
    current.pathname = "/projects/";
    const markup = renderToStaticMarkup(<SiteNav variant="explorer" />);
    expect(markup.match(/open=""/g)).toHaveLength(1);
    for (const id of ["handheld-homebrew", "local-ai", "mvim"]) {
      expect(markup).toContain(`href="/projects#${id}"`);
    }
    expect(markup).toMatch(/<a[^>]*aria-current="page"[^>]*href="\/projects"/);
  });
});
