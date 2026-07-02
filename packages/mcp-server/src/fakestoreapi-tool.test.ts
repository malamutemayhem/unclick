import { afterEach, describe, expect, it, vi } from "vitest";
import { fakestoreProducts, fakestoreProduct, fakestoreCategories } from "./fakestoreapi-tool.js";

describe("fakestoreapi connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await fakestoreProducts({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await fakestoreProduct({ id: 1 }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns products with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, title: "Widget", price: 9.99, category: "electronics" }]),
    })));
    const r = await fakestoreProducts({}) as Record<string, unknown>;
    expect(r.products).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
