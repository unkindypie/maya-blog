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
