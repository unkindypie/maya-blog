import Image from "next/image";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProfilePage } from "../../../ui/components/profile-page";
import { ProfileHero, ProfileIntro } from "../../../ui/components/profile-hero";
import { ProfileSection } from "../../../ui/components/profile-section";
import {
  ProfilePanels,
  ProfilePanel,
  ProfileLink,
} from "../../../ui/components/profile-panels";
import { QuickSpecs, SpecRow } from "../../../ui/components/quick-specs";
import { ProjectGrid } from "../../../ui/components/project-grid";
import { InfoCard } from "../../../ui/components/info-card";

describe("MDX profile components", () => {
  it("renders author-supplied headings, prose, badges, cards, lists, and links", () => {
    const markup = renderToStaticMarkup(
      <ProfilePage>
        <ProfileHero>
          <ProfileIntro
            title="An editable profile"
            face=":)"
            badges={["My badge"]}
            command="my command"
            workspace="my workspace"
          >
            <p>My experience, written in Markdown.</p>
            <p>My current setup.</p>
          </ProfileIntro>
          <aside>My specs</aside>
        </ProfileHero>
        <ProfileSection title="My section" detail="My caption" grid="hardware">
          <InfoCard
            label="my-card"
            title="My tool"
            icon="terminal"
            description="My description"
            tags={["Lua"]}
          />
        </ProfileSection>
        <ProfilePanels>
          <ProfilePanel
            variant="now"
            title="My updates"
            icon="◷"
            note="My note"
          >
            <ul>
              <li>My current project.</li>
            </ul>
            <ProfileLink href="/blog" label="My notes" />
          </ProfilePanel>
          <ProfilePanel
            variant="connect"
            title="My contacts"
            icon="@"
            note="Say hi"
            prompt="$"
            footer="My footer"
          >
            <ProfileLink href="mailto:author@example.com" label="Email me" />
          </ProfilePanel>
        </ProfilePanels>
      </ProfilePage>,
    );
    expect(markup.match(/<h1>/g)).toHaveLength(1);
    for (const text of [
      "An editable profile",
      "My badge",
      "My experience, written in Markdown.",
      "My specs",
      "My tool",
      "My caption",
      "My current project.",
      "My footer",
    ])
      expect(markup).toContain(text);
    expect(markup).toContain('href="/blog"');
    expect(markup).toContain('href="mailto:author@example.com"');
    expect(markup).not.toContain("Fedora");
  });
  it("accepts an optional author portrait while preserving Markdown prose", () => {
    const markup = renderToStaticMarkup(
      <ProfileIntro
        title="My profile"
        badges={[]}
        command="about me"
        workspace="home"
        portrait={
          <Image
            src="/portrait.png"
            alt="Author portrait"
            width={144}
            height={144}
          />
        }
      >
        <p>Editable biography.</p>
      </ProfileIntro>,
    );
    expect(markup).toContain('class="profile-portrait"');
    expect(markup).toMatch(
      /<svg[^>]*class="portrait-flourish"[^>]*aria-hidden="true"/,
    );
    expect(markup).toContain('alt="Author portrait"');
    expect(markup).toContain("Editable biography.");
    const withoutPortrait = renderToStaticMarkup(
      <ProfileIntro
        title="Text only"
        badges={[]}
        command="about"
        workspace="home"
      >
        <p>No photo supplied.</p>
      </ProfileIntro>,
    );
    expect(withoutPortrait).not.toContain('class="profile-portrait"');
    expect(withoutPortrait).not.toContain("portrait-flourish");
  });
  it("keeps specification labels, values, detail text, and links editable", () => {
    const markup = renderToStaticMarkup(
      <QuickSpecs title="MY_SPECS" footer="My machine" status="available">
        <SpecRow
          label="Editor"
          value="My editor"
          detail="My version"
          alongside={["Codex", "OpenCode"]}
          href="https://example.com/repo"
        />
        <SpecRow
          label="Email"
          value="author@example.com"
          href="mailto:author@example.com"
          wide
        />
      </QuickSpecs>,
    );
    expect(markup).toContain("<dt>Editor</dt>");
    expect(markup).toContain('href="https://example.com/repo"');
    expect(markup).toContain('href="mailto:author@example.com"');
    expect(markup).toContain(
      'href="https://example.com/repo" target="_blank" rel="noopener noreferrer"',
    );
    expect(markup).toContain('href="mailto:author@example.com">');
    expect(markup).toContain("My version");
    expect(markup).toContain("Codex");
    expect(markup).toContain("OpenCode");
    expect(markup).toMatch(/aria-hidden="true">\/<\/span>/);
    expect(markup.match(/<dt>/g)).toHaveLength(2);
    expect(markup.match(/<dd(?:\s|>)/g)).toHaveLength(2);
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
  it("renders cards authored by its caller with their anchors and links intact", () => {
    const markup = renderToStaticMarkup(
      <ProjectGrid>
        <InfoCard
          id="my-project"
          label="my-project"
          icon="code"
          title="My project"
          description="Authored in MDX"
          tags={[]}
          links={[{ href: "/blog/my-project", label: "Read more" }]}
        />
      </ProjectGrid>,
    );
    expect(markup).toContain('id="my-project"');
    expect(markup).toContain('href="/blog/my-project"');
    expect(markup).toContain("Authored in MDX");
    expect(markup.match(/class="info-card"/g)).toHaveLength(1);
  });
});
