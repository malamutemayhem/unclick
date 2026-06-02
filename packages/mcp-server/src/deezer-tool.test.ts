import { afterEach, describe, expect, it, vi } from "vitest";

import { searchDeezer } from "./deezer-tool.js";

// Colocated Deezer connector tests. Exercise the L2 (resilience) behaviour.

describe("deezer connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "5" : null) },
      text: async () => "rate limited",
    })));
    await expect(searchDeezer({ query: "daft punk" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 5s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(searchDeezer({ query: "daft punk" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(searchDeezer({ query: "daft punk" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    const result = await searchDeezer({}) as Record<string, unknown>;
    expect(result.error).toMatch(/query is required/i);
  });

  it("normalizes returned tracks", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ total: 1, data: [{ id: 3135556, title: "Harder Better Faster Stronger", duration: 224, artist: { id: 27, name: "Daft Punk" } }] }),
    })));
    const result = await searchDeezer({ query: "daft punk" }) as Record<string, any>;
    expect(result.returned).toBe(1);
    expect(result.tracks[0].title).toBe("Harder Better Faster Stronger");
  });
});
