import { getSeoPages } from "@/lib/page-catalog";
import { buildLlmsText } from "@/lib/seo";

export const dynamic = "force-static";
export async function GET() {
  return new Response(buildLlmsText(await getSeoPages()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
