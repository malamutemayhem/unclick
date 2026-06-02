import { afterEach, describe, expect, it, vi } from "vitest";

import { rawgSearchGames } from "./rawg-tool.js";

// Colocated RAWG connector tests. Exercise the L2 (resilience) behaviour.

describe("rawg connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
    })));
    await expect(rawgSearchGames({ api_key: "k", search: "zelda" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(rawgSearchGames({ api_key: "k", search: "zelda" })).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when search is missing", async () => {
    const r = await rawgSearchGames({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/search is required/i);
  });

  it("normalizes search results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ count: 1, results: [{ id: 1, name: "Zelda" }] }),
    })));
    const r = await rawgSearchGames({ api_key: "k", search: "zelda" }) as Record<string, any>;
    expect(r.results[0].name).toBe("Zelda");
  });
});
