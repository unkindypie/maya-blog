"use client";
import type { Post } from "@/lib/posts";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteNav } from "./site-nav";
import { SystemIcon } from "./system-icon";
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
          <Link href="/" className="cat-logo" aria-label="Maya home">
            ฅ
          </Link>
          <SiteNav variant="workspaces" />
        </div>
        <SiteNav />
        <Link href="/about" className="profile-link" aria-label="About Maya">
          <SystemIcon name="person" />
        </Link>
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
            maya.os / written in MDX <span className="status-dot">●</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
