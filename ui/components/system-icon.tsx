import type { SVGProps } from "react";
export interface SystemIconProps extends Readonly<SVGProps<SVGSVGElement>> {
  readonly name: string;
}
const paths: Record<string, string> = {
  rss: "M4 11a9 9 0 0 1 9 9 M4 4a16 16 0 0 1 16 16 M5 19h.01",
  file: "M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6",
  folder: "M3 6h7l2 3h9v11H3z",
  terminal: "M3 5h18v14H3z M6 9l3 3-3 3 M12 15h5",
  code: "M8 6l-6 6 6 6 M16 6l6 6-6 6",
  laptop: "M5 3h14v14H5z M2 20h20",
  chip: "M6 6h12v12H6z M9 9h6v6H9z M9 2v4 M15 2v4 M9 18v4 M15 18v4 M2 9h4 M2 15h4 M18 9h4 M18 15h4",
  keyboard:
    "M2 6h20v13H2z M5 9h1 M9 9h1 M13 9h1 M17 9h1 M5 12h1 M9 12h1 M13 12h1 M17 12h1 M6 16h12",
  network: "M12 3v7 M5 17l7-7 7 7 M9 2h6v4H9z M2 17h6v4H2z M16 17h6v4h-6z",
  gamepad: "M5 7h14l3 12h-6l-2-3h-4l-2 3H2z M6 10v5 M4 12h5 M16 11h1 M18 14h1",
  person: "M8 6a4 4 0 1 0 8 0a4 4 0 1 0-8 0 M4 21v-3c0-6 16-6 16 0v3z",
};
export function SystemIcon({ name, ...props }: SystemIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] ?? paths.file} />
    </svg>
  );
}
