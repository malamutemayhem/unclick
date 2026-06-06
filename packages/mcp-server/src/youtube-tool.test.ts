import { afterEach, describe, expect, it, vi } from "vitest";
import { youtubeSearch } from "./youtube-tool.js";

// L2 resilience contract for the YouTube connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("youtube connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(youtubeSearch({ api_key: "k", query: "lofi" })).rejects.toThrow(/rate limit|quota/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(youtubeSearch({ api_key: "k", query: "lofi" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(youtubeSearch({ api_key: "k" })).rejects.toThrow(/query is required/i);
  });

  it("maps search responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({
        items: [{ id: { kind: "youtube#video", videoId: "v1" }, snippet: { title: "Lofi", channelId: "c", channelTitle: "ch", publishedAt: "", description: "", thumbnails: {}, liveBroadcastContent: "none" } }],
        pageInfo: { totalResults: 1, resultsPerPage: 1 },
      }),
    })));
    const result = await youtubeSearch({ api_key: "k", query: "lofi" }) as Record<string, unknown>;
    expect(result.total_results).toBe(1);
    expect((result.items as Array<Record<string, unknown>>)[0].id).toBe("v1");
  });
});
