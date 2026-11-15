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
// Explorer targets; page copy and cards are authored in content/projects.mdx.
export const projectLinks = [
  {
    id: "mvim",
    label: "maya-nvim",
  },
  {
    id: "dotfiles",
    label: "maya-dotfiles",
  },
  {
    id: "local-ai",
    label: "local-ai",
  },
  {
    id: "oot-mods",
    label: "oot-mods",
  },
] as const;
