---
name: dependency-audit
description: Investigate pnpm install warnings and dependency vulnerabilities, apply compatible fixes, and verify the resulting dependency tree. Use for dependency audits, security updates, and package-install warning cleanup.
---

# Dependency audit

Work in this repository with its pinned pnpm version. Keep the skill project-local under `.agents/skills/`; do not modify global tools or the developer's editor configuration.

## Establish the baseline

- Read `AGENTS.md`, `package.json`, `pnpm-workspace.yaml`, the lockfile, and CI configuration. Preserve pending user changes.
- Run `pnpm install --frozen-lockfile`, `pnpm audit --json`, and `pnpm audit --prod --json`. Capture audit exit statuses as well as reports. An unavailable registry or malformed response is not a clean audit.
- A frozen install can skip resolution and print no deprecation warnings. Check the exact locked versions with `pnpm view <package>@<version> deprecated --json` when investigating earlier warnings.
- Trace each advisory or warning with `pnpm why <package>`. Separate production and development paths, security advisories, deprecations, peer conflicts, engine mismatches, and intentionally blocked build scripts.

## Choose fixes

Prefer a compatible parent-package update. Read current primary-source advisories and release notes, and check Node engines and peer dependencies before changing major versions.

When no parent release includes a security fix, consider a narrowly scoped `overrides` entry in `pnpm-workspace.yaml`. Link the advisory in a comment and test the affected consumer, especially Nextra's math rendering or ESLint's TypeScript parser. Remove the override when upstream's declared range includes the fix.

Do not hide findings with audit exceptions, raised severity thresholds, ignored deprecations, disabled lint rules, or blanket peer allowances. Do not remove a dependency that still provides types or optional framework functionality just to silence its warning. If an upstream dependency has no supported replacement in the current stack, retain it and report the warning and upgrade blocker explicitly.

A trial with another ESLint version can pass on the app while its plugins still declare incompatible peers. A successful trial alone does not establish upstream support or justify suppressing that conflict.

Do not reuse Git credentials for registry authentication, print environment secrets, delete unrelated files, or replace the framework to resolve a transitive warning.

## Verify and report

- Regenerate the lockfile through pnpm, then confirm `pnpm install --frozen-lockfile` succeeds. Keep native-build approvals deliberate; do not enable every install script.
- Run full and production audits again. Default `pnpm audit` includes development dependencies; do not report only the production result as the whole project's status.
- Run repository-required formatting, lint, type checks, tests, and the production build. Add meaningful compatibility coverage for dependency overrides when ordinary checks would not exercise the changed API.
- If CI is meant to enforce dependency security, use `pnpm audit` without swallowing errors or excluding low-severity findings unless the user requests another policy.
- Report before/after severity counts, versions changed, remaining warnings or advisories, and validation results. Follow `AGENTS.md` for commits and pushes when changes were made.

Current override rationale and known upstream limitations belong in `docs/dependency-audit.md`; recheck them rather than assuming that a previous clean audit or warning blocker is still current.

Primary references: [pnpm audit](https://pnpm.io/cli/audit), [pnpm dependency settings](https://pnpm.io/settings), [GitHub Advisory Database](https://github.com/advisories).
