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
  it("does not mark home active on an unknown route", () => {
    current.pathname = "/missing";
    expect(renderToStaticMarkup(<SiteNav />)).not.toContain(
      'aria-current="page"',
    );
  });
});
