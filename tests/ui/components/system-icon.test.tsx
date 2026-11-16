import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { SystemIcon } from "@/ui/components/system-icon";

it("renders a distinct RSS glyph and keeps icons decorative", () => {
  const rss = renderToStaticMarkup(<SystemIcon name="rss" />);
  const file = renderToStaticMarkup(<SystemIcon name="file" />);
  expect(rss).not.toBe(file);
  expect(rss).toContain('aria-hidden="true"');
  expect(rss).toContain('viewBox="0 0 24 24"');
});
it("preserves the fallback icon and caller-supplied SVG sizing", () => {
  expect(renderToStaticMarkup(<SystemIcon name="unknown" />)).toBe(
    renderToStaticMarkup(<SystemIcon name="file" />),
  );
  expect(renderToStaticMarkup(<SystemIcon name="rss" width={24} />)).toContain(
    'width="24"',
  );
});
