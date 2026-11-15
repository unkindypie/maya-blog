import type { ReactNode } from "react";
import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";

function PageContent({
  children,
  metadata,
}: {
  children: ReactNode;
  metadata: { title?: string; date?: string };
}) {
  return (
    <>
      <h1>{metadata.title}</h1>
      {metadata.date && (
        <time dateTime={metadata.date}>{metadata.date.slice(0, 10)}</time>
      )}
      {children}
    </>
  );
}

const components = getThemeComponents({ wrapper: PageContent });
export function useMDXComponents(overrides: MDXComponents = {}) {
  return { ...components, ...overrides, wrapper: PageContent };
}
