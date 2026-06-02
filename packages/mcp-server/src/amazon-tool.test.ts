import { afterEach, describe, expect, it, vi } from "vitest";
import { amazonSearch } from "./amazon-tool.js";

// L2 resilience contract for the Amazon PA-API connector: request timeout, clean
// 429/throttle handling, input validation, and stable response mapping.
const CREDS = { access_key: "AKIAEXAMPLE", secret_key: "secret", partner_tag: "tag-20" };

describe("amazon connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(amazonSearch({ ...CREDS, keywords: "phone" })).rejects.toThrow(/rate limit|throttle/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(amazonSearch({ ...CREDS, keywords: "phone" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await amazonSearch({ ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/keywords or browse_node/i);
  });

  it("maps search responses without surfacing an error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ SearchResult: { Items: [{ ASIN: "B01", ItemInfo: { Title: { DisplayValue: "Phone" } } }] } }),
    })));
    const result = await amazonSearch({ ...CREDS, keywords: "phone" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
