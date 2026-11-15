# Maya Blog

A small personal site built with Next.js 16 and Nextra 4. MDX for writing, a dark default theme, and a static export for hosting anywhere.

## Local development

Use Node.js 22.12+ and pnpm 10.33.0 (pinned in `package.json`).

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). MDX edits reload automatically.

## Writing

Edit `content/index.mdx`, `content/about.mdx`, and `content/projects.mdx` for the main pages. The initial copy and first post are starter text to make your own before publishing.

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

Global metadata lives in `app/layout.tsx`, navigation in `ui/components/site-nav.tsx`, and the colors/layout in `app/globals.css`. Shared components belong in `ui/components/`. The site starts in dark mode; the theme switch remembers your light or dark preference.

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

The project uses the same Prettier, ESLint, and TypeScript tools as mvim. Repository configs apply in the editor and CLI; no editor configuration changes are required. Generated output is ignored by formatters and linters. CI runs all checks and the production build on pushes and pull requests.

## Build and preview

```sh
pnpm build
pnpm start
```

`pnpm build` writes the static site to `out/`; `pnpm start` serves it on port 3000. Upload `out/` to a static host that supports directory index files and configure `404.html` as its error page. There is no production Node server. Images are served without Next's server-side optimizer. Search and RSS are not configured.

Nextra's routing follows its [App Router content API](https://nextra.site/api/importpage). The blog index uses Nextra's generated page map. Unit tests cover post discovery, ordering, and front matter validation; the production build checks that MDX routes can be exported.
