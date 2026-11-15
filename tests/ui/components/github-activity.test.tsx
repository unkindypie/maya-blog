import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GitHubActivity } from "@/ui/components/github-activity";
import { getPublicCommits } from "@/lib/github-activity";

vi.mock("@/lib/github-activity", () => ({ getPublicCommits: vi.fn() }));
const props = {
  username: "unkindypie",
  emptyText: "No commits yet.",
  unavailableText: "Check GitHub for my latest work.",
  linkLabel: "More on GitHub",
};
afterEach(() => vi.restoreAllMocks());

describe("GitHubActivity", () => {
  it("server-renders commit messages, repositories, dates, and new-tab links", async () => {
    vi.mocked(getPublicCommits).mockResolvedValue([
      {
        sha: "abc",
        repository: "unkindypie/maya-nvim",
        message: "fix: <completion>",
        date: "2026-11-15T10:00:00Z",
        href: "https://github.com/unkindypie/maya-nvim/commit/abc",
      },
    ]);
    const html = renderToStaticMarkup(await GitHubActivity(props));
    expect(html).toContain("fix: &lt;completion&gt;");
    expect(html).toContain("unkindypie/maya-nvim");
    expect(html).toContain(
      '<time dateTime="2026-11-15T10:00:00Z">15 Nov 2026</time>',
    );
    expect(html).toContain('target="_blank" rel="noopener noreferrer"');
    expect(html).toContain(
      'href="https://github.com/unkindypie/maya-nvim/commit/abc"',
    );
  });
  it("shows an editable empty state and profile link", async () => {
    vi.mocked(getPublicCommits).mockResolvedValue([]);
    const html = renderToStaticMarkup(await GitHubActivity(props));
    expect(html).toContain(props.emptyText);
    expect(html).toContain(props.linkLabel);
    expect(html).toContain("https://github.com/unkindypie?tab=overview");
  });
  it("keeps the profile available when GitHub fails", async () => {
    vi.mocked(getPublicCommits).mockRejectedValue(new Error("offline"));
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const html = renderToStaticMarkup(await GitHubActivity(props));
    expect(html).toContain(props.unavailableText);
    expect(html).toContain(props.linkLabel);
    expect(html).not.toContain("offline");
  });
});
