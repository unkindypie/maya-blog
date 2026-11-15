import type { ReactNode } from "react";
import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";
export interface PageContentProps {
  readonly children: ReactNode;
  readonly metadata: {
    title?: string;
    date?: string;
    fullWidth?: boolean;
    description?: string | null;
    category?: string | null;
  };
}
function PageContent({ children, metadata }: Readonly<PageContentProps>) {
  if (metadata.fullWidth) return children;
  const isArticle = Boolean(metadata.date);
  return (
    <article className={`document-page${isArticle ? " article-page" : ""}`}>
      <header className="document-header">
        <p className="document-eyebrow">
          <span aria-hidden="true">#</span>{" "}
          {metadata.category ?? (isArticle ? "notes / maya" : "~/maya/")}
        </p>
        <h1>{metadata.title}</h1>
        {metadata.description && (
          <p className="document-description">{metadata.description}</p>
        )}
      </header>
      {metadata.date && (
        <div className="frontmatter article-meta">
          <time dateTime={metadata.date}>{metadata.date.slice(0, 10)}</time>
          <span>by Maya</span>
        </div>
      )}
      <div className="markdown-body">{children}</div>
    </article>
  );
}
const components = getThemeComponents({ wrapper: PageContent });
export function useMDXComponents(overrides: MDXComponents = {}) {
  return { ...components, ...overrides, wrapper: PageContent };
}
