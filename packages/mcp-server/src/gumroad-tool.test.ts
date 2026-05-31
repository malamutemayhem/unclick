import { afterEach, describe, expect, it, vi } from "vitest";

import { gumroad_list_products, gumroad_get_product } from "./gumroad-tool.js";

// Colocated Gumroad connector tests. Exercise the L2 (resilience) behaviour.

describe("gumroad connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) } })));
    await expect(gumroad_list_products({ api_key: "k" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(gumroad_list_products({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(gumroad_get_product({ api_key: "k" })).rejects.toThrow(/product_id is required/i);
  });

  it("maps the product list", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ success: true, products: [{ id: "p1", name: "Ebook" }] }) })));
    const r = await gumroad_list_products({ api_key: "k" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.products[0].id).toBe("p1");
  });
});
