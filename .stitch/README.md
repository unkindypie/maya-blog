# Stitch reference

Source: [Maya Y2K Nextra Blog](https://stitch.google.com/projects/14342074697850917181?node-id=9213bdbb122d4bd19f36d46db08e8572).

The About screen `9213bdbb122d4bd19f36d46db08e8572` is the primary visual reference. Blog, article, and Dotfiles screens on the same canvas row informed the remaining pages.

- `metadata.json` records the screen IDs, dimensions, and sync time. It omits account and sharing details.
- `designs/` contains local downloaded HTML and screenshots; these large reference assets are ignored by Git.
- `.agents/skills/react-components/resources/style-guide.json` contains the tokens extracted from the primary screen's HTML, including colors, font sizes, spacing, and radii.
- `app/globals.css` maps the reference tokens into CSS variables and responsive layouts.
- `lib/site-content.ts` holds profile copy from the reference, navigation, and card data.

## Implementation choices

Use the existing Next.js App Router, Nextra MDX, pnpm tooling, and `ui/components/` conventions. The skill's generic Vite, React Router, `src/`, and Tailwind examples are adapted to this repository.

The current Stitch MCP requires `download_file` for authenticated assets. Direct download URLs return JSON wrappers, so the native downloader replaces the skill's older curl instructions. All project screens were retrieved and visually audited before implementation.

Desktop retains the 56px taskbar, 256px Explorer, inset reading panel, and compact spec cards. At narrower desktop/tablet widths the spec cards reflow. Below 768px, the Explorer becomes a native collapsible drawer, and content uses the full width. Small phones stack the hardware cards as needed. The drawer resets after navigation, and all routes use real Next.js links.

The connect panel links to existing site pages instead of publishing unverified contact addresses from the mockup. Blog entries continue to come from MDX rather than the mockup's example article list. The Dotfiles page documents the actual mvim configuration paths in this project.
