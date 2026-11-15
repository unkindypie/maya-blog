"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/", "maya"],
  ["/blog", "blog"],
  ["/projects", "projects"],
  ["/about", "about"],
] as const;

export function SiteNav() {
  const pathname = usePathname().replace(/\/$/, "") || "/";

  return (
    <nav aria-label="Main navigation">
      {links.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href ||
            (href !== "/" && pathname.startsWith(`${href}/`))
              ? "page"
              : undefined
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
