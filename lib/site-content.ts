export const navigation = [
  { href: "/", label: "about.md", icon: "file" },
  { href: "/blog", label: "blog/", icon: "folder" },
  { href: "/dotfiles", label: "dotfiles/", icon: "terminal" },
  { href: "/projects", label: "projects/", icon: "code" },
] as const;

export const contact = {
  github: "https://github.com/unkindypie",
  email: "maya1.bondarenko@gmail.com",
};
export const repositories = {
  nvim: "https://github.com/unkindypie/maya-nvim",
  dotfiles: "https://github.com/unkindypie/.maya-dotfiles",
};
export const profile = {
  title: "hey, i'm maya",
  face: "(◕‿◕✿)",
  badges: [
    "she/her 🏳️‍⚧️",
    "8+ yrs exp :: sr systems architect",
    "B.S. in Software Engineering",
    "● status: hacking / alive",
  ],
  experience:
    "I've spent the last 8+ years designing distributed infrastructure and building backends from zero to millions of requests per second, across seed to Series B tech teams. These days I split my time between private systems consulting and my own projects.",
  intro:
    "I like making my tools feel like mine. Most of that ends up in my Neovim config, my Linux desktop, and little scripts that make the two get along.",
  detail:
    "I use Fedora 44 with Hyprland, Kitty, zsh, and tmux. My editor is mvim, my own Neovim setup. Lately I've been working on local AI suggestions, keeping desktop themes in sync, and writing down the bits I don't want to figure out twice. I'm also working on the Vita port of Ship of Harkinian: bringing desktop-style mod support to Ocarina of Time so I can use nicer models and textures, starting with Djipi's 3DS Experience.",
};
export interface SystemSpec {
  readonly label: string;
  readonly value: string;
  readonly detail?: string;
  readonly href?: string;
}
export const specs: readonly SystemSpec[] = [
  { label: "OS", value: "Fedora Linux 44" },
  { label: "Desktop", value: "Hyprland", detail: "Waybar" },
  { label: "Shell", value: "zsh", detail: "tmux" },
  { label: "Terminal", value: "Kitty", detail: "Fantasque Sans Mono" },
  { label: "Editor", value: "mvim", detail: "Neovim", href: repositories.nvim },
  { label: "Theme", value: "Melange", detail: "Maya Light/Dark" },
];
export const tools = [
  {
    label: "01 / desktop",
    icon: "laptop",
    title: "Fedora + Hyprland",
    description:
      "Waybar, a Rofi launcher, and paper/pastel colors. Maya Light and Dark share the same layout, so switching modes doesn't rearrange my desktop.",
    tags: ["Fedora 44", "Wayland"],
  },
  {
    label: "02 / terminal",
    icon: "terminal",
    title: "Kitty, zsh & tmux",
    description:
      "Fantasque Sans Mono in Kitty, a notebook background, and tmux for keeping terminal work together. The shell and status bar follow the desktop palette.",
    tags: ["Kitty", "tmux"],
  },
  {
    label: "03 / editor",
    icon: "code",
    title: "mvim / maya-nvim",
    description:
      "My Lua-based Neovim setup. Language tools, formatting, folder sessions, Git diffs, and a Pokémon greeting. Personal tweaks live outside the core config.",
    tags: ["Lua", "lazy.nvim"],
  },
  {
    label: "04 / colors",
    icon: "folder",
    title: "Melange + Maya",
    description:
      "Melange in the editor, with a transparent background. A small personal watcher follows the desktop's Light/Dark selector without replacing the editor's colors.",
    tags: ["Melange", "maya-theme"],
  },
];
export const interests = [
  {
    label: "editor_tools",
    icon: "terminal",
    title: "An editor I can live in",
    description:
      "maya-nvim started as a place for my editor config. It now has its own installer, optional local AI, and a separate place for personal settings. I still want it to feel familiar when I open a file.",
    tags: ["Neovim", "Lua", "LSP"],
  },
  {
    label: "desktop_dots",
    icon: "laptop",
    title: "A desktop that matches",
    description:
      "My dotfiles connect Hyprland, Waybar, Kitty, launchers, and the shell. The palette is shared, but each app keeps its own layout. Cream paper in Light, warm charcoal in Dark, pink in both.",
    tags: ["Hyprland", "Python", "CSS"],
  },
  {
    label: "local_ai",
    icon: "chip",
    title: "Small models, useful context",
    description:
      "I'm working on local completions and next-edit suggestions in mvim. Cursortab and Ollama do the inference; my Lua code gathers nearby type information from the language server.",
    tags: ["Ollama", "Cursortab", "LSP"],
  },
  {
    label: "vita_homebrew",
    icon: "gamepad",
    title: "Ocarina of Time, on my Vita",
    description:
      "The Switch 2 remake got me wanting prettier OoT models and textures on my Vita too. I'm updating the older Ship of Harkinian port toward desktop-style mod support, using Djipi's 3DS Experience as the starting point.",
    tags: ["PS Vita", "C++", "Ship of Harkinian"],
    links: [{ href: "/blog/oot-vita-modding", label: "Read the story" }],
  },
];
export const now = [
  "Working on original-mod loading in the Vita Ship of Harkinian port.",
  "Working on type-aware local AI suggestions in mvim.",
  "Keeping Maya Light/Dark consistent across the desktop and editor.",
  "Making the configs easier to install, update, and make your own.",
  "Writing notes about the small things that took longer than expected.",
];
export const projectCards = [
  {
    id: "mvim",
    label: "maya-nvim",
    icon: "terminal",
    title: "maya-nvim / mvim",
    description:
      "My standalone Neovim setup for Linux and macOS. An installer, language tooling, local AI, folder sessions, and personal overrides in ~/.config/mvim/.",
    tags: ["Lua", "Neovim", "Ollama"],
    links: [
      { href: repositories.nvim, label: "GitHub" },
      { href: "/blog/maya-nvim", label: "Read the article" },
    ],
  },
  {
    id: "dotfiles",
    label: "maya-dotfiles",
    icon: "laptop",
    title: ".maya-dotfiles",
    description:
      "My Hyprland desktop and terminal configs. Paper colors, pastels, a shared Light/Dark palette, symlinked configs, and scripts for applying and repairing the setup.",
    tags: ["Hyprland", "Kitty", "Python"],
    links: [
      { href: repositories.dotfiles, label: "GitHub" },
      { href: "/blog/maya-dotfiles", label: "Read the article" },
    ],
  },
  {
    id: "local-ai",
    label: "local-ai",
    icon: "chip",
    title: "Local AI in mvim",
    description:
      "The AI side of maya-nvim: Cursortab, Ollama, and a bounded cache of LSP hints. One local model handles completions and next edits; cloud providers stay opt-in.",
    tags: ["Cursortab", "Ollama", "Lua"],
    links: [
      {
        href: repositories.nvim + "/blob/master/lua/maya/ai_context.lua",
        label: "Context collector",
      },
      { href: "/blog/local-ai-in-mvim", label: "Read the article" },
    ],
  },
  {
    id: "oot-mods",
    label: "oot-mods",
    icon: "gamepad",
    title: "Ship of Harkinian Mods / Vita",
    description:
      "Updating the older Vita OoT port toward the mod support I wanted from desktop SoH. Work on textures, models, resource loading, and memory use, inspired by Djipi's 3DS Experience. Original-archive compatibility is still in progress.",
    tags: ["PS Vita", "C++", "Ocarina of Time"],
    links: [
      { href: "/blog/oot-vita-modding", label: "Read the article" },
      { href: "https://gamebanana.com/mods/477979", label: "Mod inspiration" },
    ],
  },
];
export const projectLinks = projectCards.map(({ id, label }) => ({
  id,
  label,
}));
