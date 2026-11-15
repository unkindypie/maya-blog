# Maya Blog Nextra Website

## Purpose

To serve as an about page, portfolio and blog for Maya.
Maya is a blog website built with Nextra and Next.js. It is a simple, fast, and easy-to-use static site generator that allows you to create and deploy a blog in minutes.
Maya writes her articles and about info in her own style, simple not very AI'ish way of talking. Prefer to write like her. Be like Maya.

## Website look style:

- Modern, simplistic, utilitary but Y2K styled.
- Imagine Windows 95 UI, old Macintosh UI. Feel it.
- A bit girly. Maya is a girl after all.
- Geeky. Maya gonna put her expiriences on porting Nintendo games to PS Vita, her messing around with her local AI and Neovim tooling.
- Darker, more minimalistic, less visual.

## Project Structure

- `app/`: root layout, blog index, not-found page, and Nextra catch-all route.
- `content/`: MDX home, about, projects, and `blog/` posts.
- `ui/components/`: shared UI components.
- `lib/`: shared content helpers.
- `tests/`: Vitest tests, mirroring source directories.
- `scripts/`: development tooling.
- `out/`: generated static site (ignored by Git).

## Git Usage:

- After completing each task, run the required checks and create a local Git commit before reporting completion, unless the user explicitly asks not to commit.
- Commit the user’s pending changes together with your own changes. Never skip or leave user changes uncommitted unless the user explicitly asks you to exclude them.
- Use separate commits for independently completed tasks (for example, project setup and skill installation), while including any pending user changes in the next commit.
- After every commit, push the current branch to this project’s existing remote before reporting completion, unless the user explicitly asks not to push. Never force-push unless explicitly authorized.
- Never commit secrets or generated build output.
- If a required check, commit, or push fails, fix it when possible and report any remaining blocker rather than claiming completion.

### Use prefixes for commit messages:

- Use `git commit -m "feat: <message>"` for new features
- Use `git commit -m "fix: <message>"` for bugfixes
- Use `git commit -m "docs: <message>"` for documentation changes
- Use `git commit -m "style: <message>"` for formatting, code style, and build system changes
- Use `git commit -m "refactor: <message>"` for refactors
- Use `git commit -m "test: <message>"` for tests
- Use `git commit -m "chore: <message>"` for other changes

## Static Analysis & Tooling:

### Match developer IDE tools:

- Make sure linters, typecheckers and formaters setting match developer's. Developer uses mvim (~/maya-nvim/ has core nvim configuration, ~/.config/mvim/init.lua has personal configuration. If changes to developer's configs are required stop the task and ask for approval of developer).

* Feel free to configure project's linters, typescript errors.

### Usage:

- Run `pnpm format` before finishing code changes unless the user says otherwise. If command not present configure it.
- Run `pnpm format:md` before finishing Markdown changes unless the user says otherwise. If command not present configure it.
- Run `pnpm lint` before finishing code changes unless the user says otherwise.
- Use `pnpm lint:changed` for quick checks on touched JS/TS files (must be warning-free). If command not present configure it.
- Run `pnpm typecheck` when you change types or shared libs.
- Do not introduce new lint warnings in files you touch. Fix existing warnings in touched files when feasible (Boy Scout).
- If a warning in a touched file is too risky to fix now, call it out explicitly in the final response.
- Prefer `unknown` + narrowing over `any`; prefix intentionally unused variables with `_`.
- Use inline `eslint-disable` only with a short reason; do not weaken rules globally without agreement.

## Testing

- Framework: Vitest (`vitest.config.mts`)
- Tests directory: `tests/` (mirrors source structure — `tests/server-actions/` for `server-actions/`, `tests/lib/` for `lib/`, etc.)
- Unit/component tests: `pnpm test` (all), `pnpm test:watch` (watch mode) — no DB required
- Boy Scout rule: when touching a module that lacks tests, add basic coverage for the changed logic.

## Preferred ways:

### Backend:

- Unless required by a library, use server-actions for any backend operations.
- Wrap server action functions into high order functions (e.g. withValidation, withLogging, withErrorReturnMapping).
- Handle validation for any endpoint/server function input data via zod schemas.
  w

### Frontend:

- Shared UI library: keep `ui/components` directory for shared UI components.
- Keep page prose and page-specific card/spec content in `content/*.mdx`. Shared components receive that content through props or children; do not hide page copy in component implementations or a global TypeScript content file.
- Responsive layout: Ensure site looks good on all devices - Desktop, Portait, Mobile.
- React Query: If you developed a new API (API route or a server-action) and need to use it (get something, create something) - wrap into React Query query or mutation.
- Track loading states of react queries via toast notifications (install any library if needed). If it was called by button, show spinner loading indicator inside that button title to track isLoading state.
- Track and show validation errors. If needed a form use formik for validation and implement formik compatible ui library (input components which can use state of formik to show related field info, show errors and get its value and on change handlers).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
