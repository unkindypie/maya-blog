"use client";
import { contact } from "@/lib/site-content";
import type { Post } from "@/lib/posts";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SiteNav } from "./site-nav";
import { SystemIcon } from "./system-icon";
import { GitHubIcon } from "nextra/icons";
export interface DesktopShellProps {
  readonly children: ReactNode;
  readonly posts: readonly Post[];
}
export function DesktopShell({ children, posts }: Readonly<DesktopShellProps>) {
  const pathname = usePathname();
  return (
    <div className="desktop-shell">
      <header className="taskbar">
        <div className="workspace-switcher">
          <Link href="/" className="cat-logo not-prose" aria-label="Maya home">
            <Image src="/maya-cat.svg" alt="" width={28} height={28} />
          </Link>
          <SiteNav variant="workspaces" />
        </div>
        <SiteNav />
        <nav className="taskbar-actions" aria-label="Follow Maya">
          <a
            href="/feed.xml"
            className="taskbar-action feed-link"
            aria-label="RSS feed"
            title="RSS feed"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SystemIcon name="rss" />
          </a>
          <a
            href={contact.github}
            className="taskbar-action github-link"
            aria-label="Maya on GitHub"
            title="Maya on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon aria-hidden="true" focusable="false" />
          </a>
        </nav>
      </header>
      <aside className="explorer">
        <div className="explorer-label">
          <span>EXPLORER</span>
          <span>~/maya/</span>
        </div>
        <SiteNav variant="explorer" posts={posts} />
      </aside>
      <details className="mobile-explorer" key={pathname}>
        <summary>
          <span>☰ explorer</span>
          <span>~/maya/</span>
        </summary>
        <SiteNav variant="explorer" posts={posts} />
      </details>
      <div className="workspace">
        <main id="content" tabIndex={-1}>
          <div className="content-pane">{children}</div>
        </main>
        <footer className="system-footer">
          <span>© {new Date().getFullYear()} Maya</span>
          <span>
            <a href={contact.github}>GitHub / unkindypie</a> · maya-is.engineer{" "}
            <span className="status-dot">●</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
