import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { podcastSearch, podcastGetEpisodes } from "./podcastindex-tool.js";

// L2 resilience contract for the Podcast Index connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("podcastindex connector resilience (L2)", () => {
  beforeEach(() => {
    vi.stubEnv("PODCASTINDEX_API_KEY", "key");
    vi.stubEnv("PODCASTINDEX_API_SECRET", "secret");
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(podcastSearch({ q: "tech" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(podcastSearch({ q: "tech" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(podcastSearch({})).rejects.toThrow(/q is required/i);
  });

  it("passes through successful searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ status: true, feeds: [{ id: 1, title: "Show" }], count: 1 }),
    })));
    const result = await podcastSearch({ q: "tech" }) as Record<string, unknown>;
    expect((result.feeds as unknown[]).length).toBe(1);
  });
});
