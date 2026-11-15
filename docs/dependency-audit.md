# Dependency audit — 2026-11-15

The initial full `pnpm audit --json` reported **two advisories: one low and one moderate**, with no high or critical findings. After the fixes below, both the full audit and `pnpm audit --prod` report **zero known vulnerabilities**.

## Security fixes

| Dependency | Locked before | Locked after | Advisory                                                                                                               |
| ---------- | ------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| KaTeX      | 0.16.47       | 0.18.2       | [Trust restrictions bypass after existing prototype pollution](https://github.com/advisories/GHSA-238p-pmpm-9mq7), low |
| minimatch  | 10.2.6        | 11.0.1       | [Pattern amplification denial of service](https://github.com/advisories/GHSA-g3hv-75wg-m249), moderate                 |

Nextra 4.6.1 and its math dependencies still request KaTeX 0.16. The vulnerable minimatch version is shared by typescript-eslint and Nextra's ts-morph dependency. `pnpm-workspace.yaml` overrides only the affected version ranges; older minimatch 3 releases outside this advisory remain unchanged. These cross-version overrides need review when upstream expands its supported ranges.

Compatibility coverage exercises Nextra's inline/display math rendering, typescript-eslint's default-project file matching, and ts-morph's source-file glob filtering. Ordinary lint, type checks, tests, and the production build remain required. CI now runs a full `pnpm audit`, without severity exclusions or swallowed failures.

## Install warnings that remain upstream

A frozen install succeeds without warnings because the lockfile is already resolved. Re-resolving the dependency graph still emits these two deprecation warnings; they have **not** been suppressed or claimed fixed:

- **ESLint 9.39.5:** the [9.x release line is end of life](https://eslint.org/version-support/). An ESLint 10.15.0 trial passed lint on the app, but installation produced unsupported peer conflicts in `eslint-plugin-react@7.37.5`, `eslint-plugin-jsx-a11y@6.10.2`, and `eslint-plugin-import@2.32.0`, which are used by `eslint-config-next@16.4.6`. The compatible ESLint 9 range is retained with a floor of 9.39.5. Upgrade once the framework's lint plugins declare ESLint 10 support; do not override their peer ranges merely to hide warnings.
- **mathjax-full 3.2.2:** Nextra depends on `better-react-mathjax@2.3.0`, which uses its MathJax 3 type declarations. Even `better-react-mathjax@3.0.3` still lists this dependency. [MathJax 4 uses a different package](https://docs.mathjax.org/en/stable/upgrading/v3.html), so substituting a package alias or removing the dependency would not be a supported drop-in fix. Wait for an upstream dependency change.

No deprecation filters, audit exceptions, disabled lint rules, or blanket peer allowances were added. The existing native-build-script policy was preserved.

## Recheck

```sh
pnpm install --frozen-lockfile
pnpm audit
pnpm audit --prod
pnpm check
pnpm build
```

Audit results describe the registry's known advisories at the time of the check and can change without source changes. Review current upstream releases and rerun the commands above when changing dependencies.
