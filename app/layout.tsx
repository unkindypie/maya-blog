import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Layout } from "nextra-theme-blog";
import { getPageMap } from "nextra/page-map";
import { collectPosts } from "@/lib/posts";
import { Head } from "nextra/components";
import { DesktopShell } from "@/ui/components/desktop-shell";
import "nextra-theme-blog/style.css";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Maya", template: "%s · Maya" },
  description:
    "Maya's little corner of the internet. Handhelds, local AI, Neovim, and things I'm figuring out.",
};
export interface RootLayoutProps {
  readonly children: ReactNode;
}
export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head backgroundColor={{ dark: "#161215", light: "#161215" }} />
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Layout nextThemes={{ forcedTheme: "dark" }}>
          <DesktopShell posts={collectPosts(await getPageMap())}>
            {children}
          </DesktopShell>
        </Layout>
      </body>
    </html>
  );
}
