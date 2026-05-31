import { afterEach, describe, expect, it, vi } from "vitest";

import { geniusSearch } from "./genius-tool.js";

// Colocated Genius connector tests. Exercise the L2 (resilience) behaviour.

describe("genius connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubEnv("GENIUS_ACCESS_TOKEN", "t");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "5" : null) },
      text: async () => "rate limited",
    })));
    await expect(geniusSearch({ q: "radiohead" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 5s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubEnv("GENIUS_ACCESS_TOKEN", "t");
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(geniusSearch({ q: "radiohead" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubEnv("GENIUS_ACCESS_TOKEN", "t");
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(geniusSearch({ q: "radiohead" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    vi.stubEnv("GENIUS_ACCESS_TOKEN", "t");
    await expect(geniusSearch({})).rejects.toThrow(/q is required/i);
  });

  it("returns the parsed response payload", async () => {
    vi.stubEnv("GENIUS_ACCESS_TOKEN", "t");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ meta: { status: 200 }, response: { hits: [{ type: "song" }] } }),
    })));
    const r = await geniusSearch({ q: "radiohead" }) as Record<string, any>;
    expect(Array.isArray(r.hits)).toBe(true);
  });
});
