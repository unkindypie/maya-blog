import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Layout, ThemeSwitch } from "nextra-theme-blog";
import { Head } from "nextra/components";
import { SiteNav } from "@/ui/components/site-nav";
import "nextra-theme-blog/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Maya", template: "%s · Maya" },
  description:
    "Maya's little corner of the internet. Handhelds, local AI, Neovim, and things I'm figuring out.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head backgroundColor={{ dark: "#19171c", light: "#f5f1f3" }} />
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Layout nextThemes={{ defaultTheme: "dark" }}>
          <div className="window-bar" aria-hidden="true">
            <span>maya / personal website</span>
            <span>− □ ×</span>
          </div>
          <header className="site-header">
            <SiteNav />
            <ThemeSwitch />
          </header>
          <main id="content" tabIndex={-1}>
            {children}
          </main>
          <Footer>© {new Date().getFullYear()} Maya · made with Nextra</Footer>
        </Layout>
      </body>
    </html>
  );
}
