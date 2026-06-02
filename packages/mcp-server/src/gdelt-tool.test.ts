import { afterEach, describe, expect, it, vi } from "vitest";

import { gdeltNewsSearch } from "./gdelt-tool.js";

// Colocated GDELT connector tests. Exercise the L2 (resilience) behaviour.

describe("gdelt connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
      text: async () => "rate limited",
    })));
    await expect(gdeltNewsSearch({ query: "climate" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(gdeltNewsSearch({ query: "climate" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNRESET"); }));
    await expect(gdeltNewsSearch({ query: "climate" })).rejects.toThrow(/network error: ECONNRESET/i);
  });

  it("validates input before any network call", async () => {
    const result = await gdeltNewsSearch({}) as Record<string, unknown>;
    expect(result.error).toMatch(/query is required/i);
  });

  it("maps returned articles", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ articles: [{ title: "Heatwave", url: "https://x", domain: "x.com", seendate: "20260101", language: "English", sourcecountry: "US" }] }),
    })));
    const result = await gdeltNewsSearch({ query: "climate" }) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.articles[0].title).toBe("Heatwave");
  });
});
