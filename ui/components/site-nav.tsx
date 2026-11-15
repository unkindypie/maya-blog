"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Post } from "@/lib/posts";
import { navigation, projectLinks } from "@/lib/site-content";
import { SystemIcon } from "./system-icon";
export interface SiteNavProps {
  readonly posts?: readonly Post[];
  readonly variant?: "tabs" | "explorer" | "workspaces";
}
export function SiteNav({
  variant = "tabs",
  posts = [],
}: Readonly<SiteNavProps>) {
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
        if (
          variant === "explorer" &&
          (href === "/blog" || href === "/projects")
        ) {
          const entries =
            href === "/blog"
              ? posts.map((post) => ({
                  href: post.route,
                  label: `${post.route.split("/").pop()}.md`,
                  title: post.title,
                }))
              : projectLinks.map((project) => ({
                  href: `/projects#${project.id}`,
                  label: project.label,
                  title: project.label,
                }));
          return (
            <details
              className="explorer-folder"
              key={`${href}:${pathname}`}
              open={active}
            >
              <summary className={active ? "folder-active" : undefined}>
                <SystemIcon name={icon} />
                <span>{label}</span>
                <span className="folder-caret" aria-hidden="true">
                  ›
                </span>
              </summary>
              <div className="explorer-children">
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  <SystemIcon name="file" />
                  index.md
                </Link>
                {entries.map((entry) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    title={entry.title}
                    aria-current={pathname === entry.href ? "page" : undefined}
                  >
                    <SystemIcon name="file" />
                    <span>{entry.label}</span>
                  </Link>
                ))}
                {href === "/blog" && !entries.length && (
                  <span className="explorer-empty">no posts yet</span>
                )}
              </div>
            </details>
          );
        }
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
