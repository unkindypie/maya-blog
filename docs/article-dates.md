# Article date notes

Maya requested publishing dates taken from commits near the middle of each project's history lifetime. These editorial dates are not dates when these blog files were first committed.

Selection uses commits reachable from the local repository's `HEAD` on 2026-11-15. Find the earliest and latest committer timestamps (`%cI`), calculate their elapsed-time midpoint, and choose the actual commit nearest it. Retain that commit's calendar date. This is the midpoint in time, rather than the middle entry by commit count.

| Project                 | History range            | Selected commit                            | Commit timestamp            | Publication date |
| ----------------------- | ------------------------ | ------------------------------------------ | --------------------------- | ---------------- |
| `~/maya-nvim`           | 2026-10-14 to 2026-11-12 | `5f74720cafde3e956a1817309de03f66a4bf028f` | `2026-10-29T20:10:12-01:00` | 2026-10-29       |
| `~/.maya-dotfiles`      | 2026-10-17 to 2026-11-06 | `c281134f49674e1f6e8c7ef35f25dad1dc6ce038` | `2026-10-25T20:46:10-01:00` | 2026-10-25       |
| `/mnt/ml/vita/oot-mods` | 2026-11-09 to 2026-11-15 | `f62f9f6f10112942a1675a09f389a5bf136cdd09` | `2026-11-13T21:26:41-01:00` | 2026-11-13       |

## Article mapping

- `maya-nvim.mdx` and `local-ai-in-mvim.mdx`: maya-nvim date.
- `maya-dotfiles.mdx`: dotfiles date.
- `hello.mdx`: the shared introduction uses the maya-nvim date, since it has no independent project history.
- `oot-vita-modding.mdx`: oot-mods date. Its later runtime status is explicitly labeled as a November 15 update in the article.

Dates are fixed content, not recalculated during builds. Repository histories can keep growing without moving existing publication dates.

## Vita article evidence

The motivation comes from Maya's description: the Switch 2 OoT remake prompted a wish to use better models and textures from Djipi's 3DS Experience on Vita. Implementation and current limits were checked against the local project's `docs/FINAL_REPORT.md`, `docs/ROOM_MESH_DEDUP.md`, `docs/SOURCE_FORK.md`, and `docs/RUNTIME_PROGRESS.md`. The older root README describes earlier experiments and is not the current runtime status.

The article separates the hardware-tested converted baseline from the newer original-archive runtime. No game/mod assets, screenshots, private device logs, addresses, or release packages are copied into this website. There is no public project remote configured for oot-mods; the site links to the article, the mod author's page, and the existing upstream Vita port instead of inventing a hosted fork.
