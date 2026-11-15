import { afterEach, describe, expect, it, vi } from "vitest";
import { getPublicCommits, parsePublicCommits } from "@/lib/github-activity";

function commit(index: number, overrides = {}) {
  return {
    sha: index.toString(16).padStart(40, "0"),
    author: { login: "unkindypie" },
    repository: { full_name: "unkindypie/maya-nvim", private: false },
    commit: {
      message: `Change ${index}\n\nLong explanation`,
      committer: {
        date: `2026-11-${String(index).padStart(2, "0")}T10:00:00Z`,
      },
    },
    ...overrides,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("public GitHub commits", () => {
  it("shows five newest unique commits and only their first lines", () => {
    const items = [1, 2, 3, 4, 5, 6].map((index) => commit(index));
    const result = parsePublicCommits(
      { items: [...items, items[5]] },
      "unkindypie",
    );
    expect(result).toHaveLength(5);
    expect(result.map((item) => item.message)).toEqual([
      "Change 6",
      "Change 5",
      "Change 4",
      "Change 3",
      "Change 2",
    ]);
    expect(result[0].href).toBe(
      `https://github.com/unkindypie/maya-nvim/commit/${items[5].sha}`,
    );
  });
  it("excludes private repositories and other authors even with a token", () => {
    const items = [
      commit(1, {
        repository: { full_name: "unkindypie/private", private: true },
      }),
      commit(2, { author: { login: "someone-else" } }),
      commit(3, { author: null }),
      commit(4, { author: { login: "Unkindypie" } }),
    ];
    expect(
      parsePublicCommits({ items }, "unkindypie").map((item) => item.message),
    ).toEqual(["Change 4"]);
  });
  it("rejects malformed API data and accepts an empty feed", () => {
    expect(parsePublicCommits({ items: [] }, "unkindypie")).toEqual([]);
    expect(() =>
      parsePublicCommits({ message: "rate limited" }, "unkindypie"),
    ).toThrow();
    expect(() =>
      parsePublicCommits({ items: [commit(1, { sha: "bad" })] }, "unkindypie"),
    ).toThrow();
  });
  it("fetches public activity in date order with a 15-minute ISR cache", async () => {
    vi.stubEnv("GITHUB_ACTIVITY_TOKEN", "");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(Response.json({ items: [commit(1)] }));
    vi.stubGlobal("fetch", fetchMock);
    await getPublicCommits("unkindypie");
    const [url, options] = fetchMock.mock.calls[0];
    const params = new URL(url).searchParams;
    expect(params.get("q")).toBe("author:unkindypie is:public");
    expect(params.get("sort")).toBe("committer-date");
    expect(params.get("order")).toBe("desc");
    expect(options.next.revalidate).toBe(900);
    expect(options.headers.Authorization).toBeUndefined();
  });
  it("keeps optional authentication on the server and rejects invalid usernames", async () => {
    vi.stubEnv("GITHUB_ACTIVITY_TOKEN", "test-only-token");
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ items: [] }));
    vi.stubGlobal("fetch", fetchMock);
    await getPublicCommits("unkindypie");
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe(
      "Bearer test-only-token",
    );
    await expect(getPublicCommits("bad user is:private")).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it("surfaces rate limits and network failures to the fallback UI", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 403 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(getPublicCommits("unkindypie")).rejects.toThrow("403");
    fetchMock.mockRejectedValue(new Error("offline"));
    await expect(getPublicCommits("unkindypie")).rejects.toThrow("offline");
  });
});
