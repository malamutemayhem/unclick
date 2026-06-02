import { afterEach, describe, expect, it, vi } from "vitest";

import { tmdbSearchMovies } from "./tmdb-tool.js";

// Colocated TMDB connector tests. Exercise the L2 (resilience) behaviour.

describe("tmdb connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "5" : null) },
    })));
    await expect(tmdbSearchMovies({ api_key: "k", query: "batman" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 5s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(tmdbSearchMovies({ api_key: "k", query: "batman" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(tmdbSearchMovies({ api_key: "k" })).rejects.toThrow(/query is required/i);
  });

  it("normalizes search results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ results: [{ id: 268, title: "Batman" }], total_results: 1, total_pages: 1 }),
    })));
    const r = await tmdbSearchMovies({ api_key: "k", query: "batman" }) as Record<string, any>;
    expect(r.results[0].title).toBe("Batman");
  });
});
