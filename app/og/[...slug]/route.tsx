import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { z } from "zod";
import { getSeoPages } from "@/lib/page-catalog";
import { SocialCard } from "@/ui/components/social-card";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;
const slugSchema = z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1);
const font = readFile(
  join(process.cwd(), "public/fonts/jetbrains-mono-regular.ttf"),
);
export interface SocialImageRouteProps {
  readonly params: Promise<{ slug: string[] }>;
}
export async function generateStaticParams() {
  return (await getSeoPages())
    .filter((page) => page.path === page.canonicalPath)
    .map((page) => ({
      slug: page.path === "/" ? ["home"] : page.path.split("/").filter(Boolean),
    }));
}
export async function GET(
  _request: Request,
  { params }: Readonly<SocialImageRouteProps>,
) {
  const parsed = slugSchema.safeParse((await params).slug);
  if (!parsed.success) return new Response("Not found", { status: 404 });
  const path =
    parsed.data.length === 1 && parsed.data[0] === "home"
      ? "/"
      : `/${parsed.data.join("/")}/`;
  const page = (await getSeoPages()).find(
    (page) => page.path === path && page.canonicalPath === path,
  );
  if (!page) return new Response("Not found", { status: 404 });
  const fontData = new Uint8Array(await font).buffer;
  return new ImageResponse(<SocialCard page={page} />, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "JetBrains Mono", data: fontData, weight: 400, style: "normal" },
    ],
  });
}
