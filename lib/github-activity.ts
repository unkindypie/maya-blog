import { z } from "zod";

const usernameSchema = z.string().regex(/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i);
const commitSchema = z.object({
  sha: z.string().regex(/^[a-f\d]{40}$/i),
  author: z.object({ login: z.string() }).nullable(),
  repository: z.object({
    full_name: z.string().regex(/^[\w.-]+\/[\w.-]+$/),
    private: z.boolean(),
  }),
  commit: z.object({
    message: z.string(),
    committer: z.object({ date: z.iso.datetime({ offset: true }) }),
  }),
});
const searchSchema = z.object({ items: z.array(commitSchema) });

export interface PublicCommit {
  readonly sha: string;
  readonly repository: string;
  readonly message: string;
  readonly date: string;
  readonly href: string;
}

export function parsePublicCommits(
  data: unknown,
  username: string,
): PublicCommit[] {
  const seen = new Set<string>();
  return searchSchema
    .parse(data)
    .items.filter((item) => {
      const key = `${item.repository.full_name}:${item.sha}`;
      if (
        item.repository.private ||
        item.author?.login.toLowerCase() !== username.toLowerCase() ||
        seen.has(key)
      )
        return false;
      seen.add(key);
      return true;
    })
    .sort(
      (a, b) =>
        Date.parse(b.commit.committer.date) -
        Date.parse(a.commit.committer.date),
    )
    .slice(0, 5)
    .map((item) => ({
      sha: item.sha,
      repository: item.repository.full_name,
      message:
        item.commit.message.split(/\r?\n/)[0].trim() || item.sha.slice(0, 7),
      date: item.commit.committer.date,
      href: `https://github.com/${item.repository.full_name}/commit/${item.sha}`,
    }));
}

export async function getPublicCommits(
  username: string,
): Promise<PublicCommit[]> {
  usernameSchema.parse(username);
  const query = new URLSearchParams({
    q: `author:${username} is:public`,
    sort: "committer-date",
    order: "desc",
    per_page: "10",
  });
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "maya-blog",
  };
  if (process.env.GITHUB_ACTIVITY_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_ACTIVITY_TOKEN}`;
  const response = await fetch(
    `https://api.github.com/search/commits?${query}`,
    {
      headers,
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!response.ok)
    throw new Error(`GitHub activity request failed (${response.status})`);
  const data: unknown = await response.json();
  return parsePublicCommits(data, username);
}
