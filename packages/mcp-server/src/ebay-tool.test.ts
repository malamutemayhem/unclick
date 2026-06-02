import { afterEach, describe, expect, it, vi } from "vitest";
import { ebaySearch } from "./ebay-tool.js";

// L2 resilience contract for the eBay connector: request timeout, clean 429
// handling, input validation, and stable response mapping. eBay fetches an OAuth
// token first, so mocks are URL-aware (token hop succeeds, Browse hop varies).
const CREDS = { client_id: "id", client_secret: "secret" };

function tokenOk() {
  return { ok: true, status: 200, headers: { get: (): string | null => null }, json: async () => ({ access_token: "tok", expires_in: 7200 }) };
}

describe("ebay connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("oauth2/token")) return tokenOk();
      return { ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}) };
    }));
    const result = await ebaySearch({ ...CREDS, q: "phone" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("oauth2/token")) return tokenOk();
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await ebaySearch({ ...CREDS, q: "phone" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await ebaySearch({ ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/q .*required|search query/i);
  });

  it("passes through successful searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("oauth2/token")) return tokenOk();
      return { ok: true, status: 200, headers: { get: (): string | null => null }, json: async () => ({ itemSummaries: [{ itemId: "v1" }], total: 1 }) };
    }));
    const result = await ebaySearch({ ...CREDS, q: "phone" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
