import { afterEach, describe, expect, it, vi } from "vitest";
import { lsListStores, lsGetOrder } from "./lemonsqueezy-tool.js";

// L2 resilience contract for the Lemon Squeezy connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("lemonsqueezy connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    const result = await lsListStores({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await lsListStores({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await lsGetOrder({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/order_id/i);
  });

  it("maps store listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ data: [{ id: "1", attributes: { name: "Store", slug: "s", domain: "d", url: "u", plan: "p", country: "US", currency: "USD", created_at: "t" } }], meta: {} }),
    })));
    const result = await lsListStores({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.data as Array<Record<string, unknown>>)[0].name).toBe("Store");
  });
});
