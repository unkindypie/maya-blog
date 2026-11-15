import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Layout } from "nextra-theme-blog";
import { getPageMap } from "nextra/page-map";
import { collectPosts } from "@/lib/posts";
import { Head } from "nextra/components";
import { DesktopShell } from "@/ui/components/desktop-shell";
import { SITE_URL, SITE_DESCRIPTION, siteStructuredData } from "@/lib/seo";
import { StructuredData } from "@/ui/components/structured-data";
import "nextra-theme-blog/style.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Maya", template: "%s · Maya" },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Maya", url: SITE_URL }],
  creator: "Maya",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
        <StructuredData data={siteStructuredData} />
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
