import { afterEach, describe, expect, it, vi } from "vitest";
import { shopifyProducts } from "./shopify-tool.js";

// L2 resilience contract for the Shopify connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const CFG = { store: "my-store", access_token: "shpat_x" };

describe("shopify connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    const result = await shopifyProducts({ ...CFG, action: "list" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await shopifyProducts({ ...CFG, action: "list" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required config before calling the API", async () => {
    const result = await shopifyProducts({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/store is required/i);
  });

  it("passes through successful product listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ products: [{ id: 1, title: "Widget" }] }),
    })));
    const result = await shopifyProducts({ ...CFG, action: "list" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
