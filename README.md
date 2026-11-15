# Maya Blog

A small personal site built with Next.js 16 and Nextra 4. MDX for writing, a dark default theme, and server-side regeneration for public GitHub activity.

## Local development

Use Node.js 22.12+ and pnpm 10.33.0 (pinned in `package.json`).

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). MDX edits reload automatically.

## Writing

Page content lives in MDX. Edit `content/about.mdx` for the profile text, badges, specs, tool cards, interests, GitHub activity settings, and contact-panel links. The introduction is ordinary Markdown inside `ProfileIntro`; card and spec text is passed as props. The `/now` panel uses `GitHubActivity` with its username, link label, and fallback copy authored in MDX. The homepage imports that same About MDX, so one edit updates both `/` and `/about/`.

Edit `content/projects.mdx` for project cards and prose, and `content/dotfiles.mdx` for the setup guide and screenshots. `ProfileHero`, `ProfileIntro`, `ProfileSection`, `ProfilePanel`, `QuickSpecs`, `SpecRow`, `InfoCard`, and `ProjectGrid` in `ui/components/` own the markup and styling, not the page copy. Shared navigation and footer contact links remain in `lib/site-content.ts`. The Explorer links directly to Projects; only Blog expands into individual article links.

For example, a spec row in About is editable directly:

```mdx
<SpecRow
  label="Editor"
  value="mvim"
  detail="Neovim"
  href="https://github.com/unkindypie/maya-nvim"
/>
```

Blog posts cover maya-nvim, .maya-dotfiles, local AI in mvim, and OoT mod compatibility on Vita. Publication dates use actual commits near each project's elapsed-history midpoint; [article date notes](docs/article-dates.md) record the selection. Update the profile when your setup changes.

Add a file such as `content/blog/my-post.mdx`:

```mdx
---
title: a thing I figured out
date: "2026-11-15"
description: A short description for the blog index.
---

Write here. Markdown, fenced code blocks, and React components work.
```

The filename becomes `/blog/my-post/`. The blog index picks up new posts automatically, newest first. Title and a valid quoted date are required. Every file under `content/blog/` is published; keep unfinished drafts outside that folder. No CMS or database is needed.

Global metadata lives in `app/layout.tsx`, navigation in `ui/components/site-nav.tsx`, and the colors/layout in `app/globals.css`. JetBrains Mono is served locally from `public/fonts/` (OFL license included). Shared components belong in `ui/components/`. The site uses the dark pink/lilac theme from the linked Stitch reference. The desktop taskbar and Explorer become compact navigation and a collapsible drawer on mobile.

## Development checks

| Command             | Purpose                                                       |
| ------------------- | ------------------------------------------------------------- |
| `pnpm format`       | Format project files with Prettier                            |
| `pnpm format:md`    | Format Markdown and MDX                                       |
| `pnpm format:check` | Check formatting without writing                              |
| `pnpm lint`         | Lint with no warnings allowed                                 |
| `pnpm lint:changed` | Lint staged, unstaged, and untracked JS/TS files against HEAD |
| `pnpm typecheck`    | Generate Next route types and run strict TypeScript           |
| `pnpm test`         | Run Vitest tests                                              |
| `pnpm test:watch`   | Watch tests while editing                                     |
| `pnpm check`        | Run formatting, lint, types, and tests                        |

`pnpm audit` checks all installed dependency paths, including development tools; `pnpm audit --prod` checks the production subset. CI runs the full audit. See [the dependency audit report](docs/dependency-audit.md) for security overrides and the two upstream deprecation warnings that remain during dependency resolution.

The project uses the same Prettier, ESLint, and TypeScript tools as mvim. Repository configs apply in the editor and CLI; no editor configuration changes are required. Generated output is ignored by formatters and linters. CI runs all checks and the production build on pushes and pull requests.

## Build and preview

```sh
pnpm build
pnpm start
```

`pnpm build` creates the Next.js production application in `.next/`; `pnpm start` runs it on port 3000. Deploy using Vercel's Next.js preset or a Node.js host running these commands. Static-only hosting and uploading `out/` are no longer supported because ISR needs a server. If the Vercel project has a custom Output Directory of `out`, clear that override so Next.js output is detected automatically. Images remain unoptimized. Search is not configured. RSS is available at `/feed.xml`.

## Public GitHub activity

The `/now` panel on `/` and `/about/` server-renders the five most recent public commits authored by the configured GitHub username. It uses [GitHub commit search](https://docs.github.com/en/rest/search/search#search-commits), sorted by committer date. Search follows GitHub's index, so newly pushed commits can take time to appear; it is not limited to repositories owned by the account.

Next.js caches the GitHub fetch and regenerates the affected pages after 15 minutes when they are requested. Visitors receive the cached page while revalidation happens in the background. Other MDX pages stay prerendered. The request has an eight-second timeout; an empty account or unavailable API gets an editable fallback with a GitHub profile link.

Public data works without a token. On a busy shared host, optionally set `GITHUB_ACTIVITY_TOKEN` in the server/build environment to raise GitHub's API limits. It is never sent to the browser. The query explicitly requests public repositories and results are checked again to exclude private repositories and other authors. No Git authentication credentials are reused. No client-side API request, database, or scheduled job is needed.

Nextra's routing follows its [App Router content API](https://nextra.site/api/importpage). The blog index uses Nextra's generated page map. Unit tests cover post discovery, ordering, and front matter validation; the production build checks that MDX routes can be prerendered. Activity tests cover filtering, sorting, caching options, links, and API failure states.

## Search and sharing metadata

`lib/seo.ts` uses the production origin `https://www.maya-is.engineer`. Each MDX page gets a canonical URL, Open Graph metadata, a large Twitter/X card, and structured data. `/about/` mirrors `/`, so it points to the homepage as its canonical URL and is excluded from the sitemap. Articles include publication dates and breadcrumbs. No modification date is invented: set `updated: "YYYY-MM-DD"` in front matter when a meaningful content update needs to be recorded.

- `/sitemap.xml` discovers published MDX pages and the blog index automatically. An optional `images` front-matter list adds article screenshots to the sitemap.
- `/robots.txt` allows crawling and advertises the sitemap.
- `/llms.txt` lists the canonical pages, article descriptions, and project links for AI assistants, following the [llms.txt proposal](https://llmstxt.org/). It is a discovery aid, not a ranking guarantee or a permissions policy. The HTTP `Link` header points to it.
- `/feed.xml` is an RSS feed of published articles and is advertised in page metadata.
- `/og/home/`, `/og/blog/`, and `/og/blog/<article>/` generate 1200×630 PNG sharing cards from the same page metadata, using the bundled OFL-licensed JetBrains Mono font. They are prerendered and cached by Next.js, and regenerate on deployment when page copy changes. Optional `socialTitle` and `socialDescription` front matter customize a preview without changing the page title or description.

Use a Next.js host for generated previews as well as ISR. Submit `https://www.maya-is.engineer/sitemap.xml` in Google Search Console or Bing Webmaster Tools when those accounts are connected. Sharing platforms may retain an earlier preview until their cache refreshes.
