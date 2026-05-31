import { afterEach, describe, expect, it, vi } from "vitest";
import { plaidAccounts } from "./plaid-tool.js";

// L2 resilience contract for the Plaid connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const CREDS = { client_id: "c", secret: "s", environment: "sandbox", access_token: "access-sandbox-x" };

describe("plaid connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    const result = await plaidAccounts({ ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await plaidAccounts({ ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await plaidAccounts({ client_id: "c", secret: "s" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/access_token is required/i);
  });

  it("passes through successful account fetches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ accounts: [{ account_id: "a1" }], item: { item_id: "i1" } }),
    })));
    const result = await plaidAccounts({ ...CREDS }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
