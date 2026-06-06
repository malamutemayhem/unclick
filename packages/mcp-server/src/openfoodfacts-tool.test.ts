import { afterEach, describe, expect, it, vi } from "vitest";

import { searchFoodProducts } from "./openfoodfacts-tool.js";

// Colocated Open Food Facts connector tests. Exercise the L2 (resilience) behaviour.

describe("open food facts connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "12" : null) },
      text: async () => "rate limited",
    })));
    await expect(searchFoodProducts({ query: "nutella" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 12s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(searchFoodProducts({ query: "nutella" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNRESET"); }));
    await expect(searchFoodProducts({ query: "nutella" })).rejects.toThrow(/network error: ECONNRESET/i);
  });

  it("validates input before any network call", async () => {
    await expect(searchFoodProducts({})).rejects.toThrow(/query is required/i);
  });

  it("maps returned products", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ count: 1, products: [{ code: "3017620422003", product_name: "Nutella", brands: "Ferrero" }] }),
    })));
    const result = await searchFoodProducts({ query: "nutella" }) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.products[0].product_name).toBe("Nutella");
  });
});
