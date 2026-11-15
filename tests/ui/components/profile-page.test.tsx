import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProfilePage } from "../../../ui/components/profile-page";
import { ProjectGrid } from "../../../ui/components/project-grid";
import { projectLinks } from "../../../lib/site-content";
import { InfoCard } from "../../../ui/components/info-card";

describe("ProfilePage", () => {
  it("renders one page heading and real links to each content section", () => {
    const markup = renderToStaticMarkup(<ProfilePage />);
    expect(markup.match(/<h1>/g)).toHaveLength(1);
    for (const path of ["/blog", "/dotfiles", "/projects"]) {
      expect(markup).toContain(`href="${path}"`);
    }
    expect(markup).toContain('href="https://github.com/unkindypie"');
    expect(markup).toContain('href="mailto:maya1.bondarenko@gmail.com"');
    expect(markup).not.toContain('href="#"');
    expect(markup).toContain('aria-label="Quick system specs"');
  });
});
describe("InfoCard", () => {
  it("escapes content and renders every technology tag", () => {
    const markup = renderToStaticMarkup(
      <InfoCard
        label="editor"
        icon="terminal"
        title="<config>"
        description="A & B"
        tags={["Lua", "Neovim"]}
      />,
    );
    expect(markup).toContain("&lt;config&gt;");
    expect(markup).toContain("A &amp; B");
    expect(markup).toContain("Lua");
    expect(markup).toContain("Neovim");
  });
});

describe("ProjectGrid", () => {
  it("provides a target for every project explorer link", () => {
    const markup = renderToStaticMarkup(<ProjectGrid />);
    for (const project of projectLinks)
      expect(markup).toContain(`id="${project.id}"`);
    for (const repo of ["maya-nvim", ".maya-dotfiles"])
      expect(markup).toContain(`href="https://github.com/unkindypie/${repo}"`);
    for (const slug of ["maya-nvim", "maya-dotfiles", "local-ai-in-mvim"])
      expect(markup).toContain(`href="/blog/${slug}"`);
  });
});
