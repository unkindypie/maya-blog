export const navigation = [
  { href: "/", label: "about.md", icon: "file" },
  { href: "/blog", label: "blog/", icon: "folder" },
  { href: "/dotfiles", label: "dotfiles/", icon: "terminal" },
  { href: "/projects", label: "projects/", icon: "code" },
] as const;

export const profile = {
  title: "hey, i'm maya",
  face: "(◕‿◕✿)",
  badges: [
    "she/her 🏳️‍⚧️",
    "8+ yrs exp :: sr systems architect",
    "B.S. in Software Engineering",
    "● status: hacking / alive",
  ],
  intro:
    "I spent the last 8+ years designing high-scale distributed infra and architecting backends from zero to millions of requests per second across seed to Series B tech teams.",
  detail:
    "Now splitting time between private systems consulting, low-level retro handheld homebrew in C/Rust, and tailoring ultra-minimal keyboard-driven Linux environments. Unapologetic linux rice fanatic, lover of clean mathematical abstractions, and cozy terminal aesthetics.",
};
export const specs = [
  ["OS", "Fedora Silverblue 40"],
  ["Compositor", "Hyprland / Wayland"],
  ["Shell / Term", "zsh + kitty (ligatures)"],
  ["Editor", "neovim (lazy.nvim)"],
  ["Theme", "Catppuccin Mocha Mauve"],
] as const;
export const hardware = [
  {
    label: "01 / rig",
    icon: "laptop",
    title: "Lenovo Legion S7",
    description:
      "Fedora 40 + Hyprland. Dedicated Wayland workspace with custom eww widgets and sub-50ms render pipeline.",
    tags: ["AMD 6800H + 32G", "165Hz"],
  },
  {
    label: "02 / cluster",
    icon: "chip",
    title: "M2 Mac Mini Headless",
    description:
      "Dedicated local compute running custom Metal Performance Shaders, quantized inference, and private Tailscale exit.",
    tags: ["MPS Unified Mem", "WireGuard"],
  },
  {
    label: "03 / editor",
    icon: "terminal",
    title: "Neovim (Lua Rice)",
    description:
      "Strict minimal setup via lazy.nvim. Telescope fuzzy pickers, Treesitter highlighting, LSP with zero bloat (<18ms cold start).",
    tags: ["init.lua", "<18ms boot"],
  },
  {
    label: "04 / keeb",
    icon: "keyboard",
    title: "36-key Corne Split",
    description:
      "Choc low-profile Robin tactile switches, Miryoku ergonomic layers, thumb clusters configured in ZMK.",
    tags: ["Bluetooth ZMK", "Col-stagger"],
  },
];
export const interests = [
  {
    label: "distributed_systems",
    icon: "network",
    title: "High-Throughput APIs & Consensus",
    description:
      "8+ years orchestrating distributed event loops, Kafka partitions, Raft state machines, and zero-downtime database migrations under continuous multi-million request burdens. Specialized in Rust, Go, and PostgreSQL internals.",
    tags: ["Rust", "Go", "Kafka", "Postgres", "Raft"],
  },
  {
    label: "embedded_retro",
    icon: "gamepad",
    title: "Low-Level & Handheld Homebrew",
    description:
      "Porting indie engines and writing custom audio pipeline drivers for PlayStation Vita (ARM Cortex-A9) and Game Boy Advance. Bare-metal reverse engineering, cycle-accurate timing, and DMA buffer hacking.",
    tags: ["C / C++", "ARM ASM", "VitaSDK", "DMA", "GBA"],
  },
  {
    label: "local_ml_eng",
    icon: "chip",
    title: "Local AI & Metal Compute",
    description:
      "Running fine-tuned 8B/14B parameter LLMs locally without cloud dependencies. Writing custom Metal Performance Shaders (MPS), quantized 4-bit tensor kernels, and private context retrieval mechanisms.",
    tags: ["Metal (MPS)", "llama.cpp", "MLX", "PyTorch"],
  },
];
export const now = [
  "Debugging dual-framebuffer tearing on a custom PS Vita homebrew audio visualizer.",
  "Sipping iced oat vanilla lattes and listening to ’90s ambient jungle / intelligent DnB.",
  "Refining personal Neovim autocommands for zero-lag markdown previews.",
  "Cuddling my 100cm giant Blåhaj shark while running test suites.",
];
export const projectCards = [
  interests[1],
  interests[2],
  { ...hardware[2], label: "editor_tools", tags: ["Lua", "Neovim", "mvim"] },
];
