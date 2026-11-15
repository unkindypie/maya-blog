"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site-content";
import { SystemIcon } from "./system-icon";
export interface SiteNavProps {
  readonly variant?: "tabs" | "explorer" | "workspaces";
}
export function SiteNav({ variant = "tabs" }: Readonly<SiteNavProps>) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  return (
    <nav
      className={`site-nav ${variant}`}
      aria-label={
        variant === "explorer"
          ? "File explorer"
          : variant === "workspaces"
            ? "Workspace shortcuts"
            : "Main navigation"
      }
    >
      {navigation.map(({ href, label, icon }, index) => {
        const active =
          href === "/"
            ? pathname === "/" || pathname === "/about"
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            aria-label={variant === "workspaces" ? label : undefined}
          >
            {variant === "explorer" && <SystemIcon name={icon} />}
            {variant === "workspaces" ? index + 1 : label}
          </Link>
        );
      })}
    </nav>
  );
}
