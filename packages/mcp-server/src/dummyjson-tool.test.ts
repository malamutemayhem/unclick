import { afterEach, describe, expect, it, vi } from "vitest";
import { dummyjsonProducts, dummyjsonSearchProducts, dummyjsonQuotes, dummyjsonRandomQuote } from "./dummyjson-tool.js";

describe("dummyjson connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await dummyjsonProducts({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await dummyjsonSearchProducts({ query: "phone" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates query for search", async () => {
    const r = await dummyjsonSearchProducts({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("returns products with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ products: [{ id: 1, title: "iPhone" }], total: 1 }),
    })));
    const r = await dummyjsonProducts({}) as Record<string, unknown>;
    expect(r.products).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns a random quote with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ id: 1, quote: "Life is beautiful.", author: "Unknown" }),
    })));
    const r = await dummyjsonRandomQuote({}) as Record<string, unknown>;
    expect(r.quote).toBe("Life is beautiful.");
    expect(r.unclick_meta).toBeDefined();
  });
});
