import { afterEach, describe, expect, it, vi } from "vitest";
import { etsySearchListings } from "./etsy-tool.js";

// L2 resilience contract for the Etsy connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("etsy connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    const result = await etsySearchListings({ api_key: "k", keywords: "ring" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await etsySearchListings({ api_key: "k", keywords: "ring" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await etsySearchListings({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/keywords is required/i);
  });

  it("passes through successful listing searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ count: 1, results: [{ listing_id: 1, title: "Ring" }] }),
    })));
    const result = await etsySearchListings({ api_key: "k", keywords: "ring" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
