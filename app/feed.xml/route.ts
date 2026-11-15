import { getPageMap } from "nextra/page-map";
import { collectPosts } from "@/lib/posts";
import { buildRss } from "@/lib/feed";

export const dynamic = "force-static";
export async function GET() {
  return new Response(buildRss(collectPosts(await getPageMap())), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
