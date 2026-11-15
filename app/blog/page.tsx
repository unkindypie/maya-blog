import Link from "next/link";
import { getPageMap } from "nextra/page-map";
import { collectPosts } from "@/lib/posts";
export const metadata = {
  title: "blog",
  description: "Notes on handhelds, local AI, Neovim, and whatever comes next.",
};
export default async function BlogPage() {
  const posts = collectPosts(await getPageMap());
  return (
    <div className="document-page blog-page">
      <div className="command-line">
        <span>ls -la ~/maya/blog/</span>
        <small>
          {posts.length} {posts.length === 1 ? "entry" : "entries"}
        </small>
      </div>
      <h1>
        blog<span className="cursor">_</span>
      </h1>
      <p className="page-intro">
        Notes on homebrew, low-level shenanigans, and things I spent way too
        long debugging.
      </p>
      <div className="blog-layout">
        <aside className="blog-directory">
          <span className="muted-label">DIRECTORY</span>
          <strong>▤ all notes</strong>
          <p>
            Handhelds &amp; homebrew
            <br />
            Local AI
            <br />
            Editor tooling
            <br />
            Whatever comes next
          </p>
        </aside>
        <div className="post-list">
          {posts.length ? (
            posts.map((post) => (
              <article className="post-card" key={post.route}>
                <div className="post-meta">
                  <time dateTime={post.date}>{post.date.slice(0, 10)}</time>
                  <span>markdown</span>
                </div>
                <h2>
                  <Link href={post.route}>{post.title}</Link>
                </h2>
                <p>{post.description}</p>
                <Link className="read-link" href={post.route}>
                  read_buffer() <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))
          ) : (
            <p>No posts yet. Check back soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
