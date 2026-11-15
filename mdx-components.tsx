import type { ReactNode } from "react";
import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";
export interface PageContentProps {
  readonly children: ReactNode;
  readonly metadata: {
    title?: string;
    date?: string;
    fullWidth?: boolean;
  };
}
function PageContent({ children, metadata }: Readonly<PageContentProps>) {
  if (metadata.fullWidth) return children;
  return (
    <div className="document-page">
      <div className="command-line">
        <span>
          cat ~/maya/{metadata.date ? "blog/" : ""}
          {metadata.title?.replaceAll(" ", "-")}.md
        </span>
        <small>{metadata.date ? "published" : "read-only"}</small>
      </div>
      <h1>{metadata.title}</h1>
      {metadata.date && (
        <div className="frontmatter">
          <span>date:</span>{" "}
          <time dateTime={metadata.date}>{metadata.date.slice(0, 10)}</time>
          <span>author:</span> Maya
        </div>
      )}
      <div className="markdown-body">{children}</div>
    </div>
  );
}
const components = getThemeComponents({ wrapper: PageContent });
export function useMDXComponents(overrides: MDXComponents = {}) {
  return { ...components, ...overrides, wrapper: PageContent };
}
