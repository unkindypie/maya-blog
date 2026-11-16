import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vitest";
import { DesktopShell } from "../../../ui/components/desktop-shell";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

it("keeps the cat logo as an accessible home link with a decorative local image", () => {
  const markup = renderToStaticMarkup(
    <DesktopShell posts={[]}>
      <h1>Home</h1>
    </DesktopShell>,
  );
  const homeLink = markup.match(
    /<a[^>]*aria-label="Maya home"[\s\S]*?<\/a>/,
  )?.[0];
  expect(homeLink).toContain('href="/"');
  expect(homeLink).toContain('src="/maya-cat.svg"');
  expect(homeLink).toContain('alt=""');
  expect(homeLink).not.toContain("ฅ");
});

it("replaces the About shortcut with accessible RSS and GitHub links", () => {
  const markup = renderToStaticMarkup(
    <DesktopShell posts={[]}>
      <h1>Home</h1>
    </DesktopShell>,
  );
  const rss = markup.match(/<a[^>]*aria-label="RSS feed"[\s\S]*?<\/a>/)?.[0];
  const github = markup.match(
    /<a[^>]*aria-label="Maya on GitHub"[\s\S]*?<\/a>/,
  )?.[0];
  expect(rss).toContain('href="/feed.xml"');
  expect(github).toContain('href="https://github.com/unkindypie"');
  for (const link of [rss, github]) {
    expect(link).toContain('target="_blank"');
    expect(link).toContain('rel="noopener noreferrer"');
    expect(link).toContain('aria-hidden="true"');
  }
  expect(markup).not.toContain('aria-label="About Maya"');
});
