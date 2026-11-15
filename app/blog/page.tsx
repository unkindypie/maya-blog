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
    <>
      <h1>blog</h1>
      <p>
        Things I&apos;ve tried. Things I&apos;ve learned. Mostly notes to future
        me.
      </p>
      {posts.length ? (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.route}>
              <time dateTime={post.date}>{post.date.slice(0, 10)}</time>
              <h2>
                <Link href={post.route}>{post.title}</Link>
              </h2>
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts yet. Check back soon.</p>
      )}
    </>
  );
}
