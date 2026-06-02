import { afterEach, describe, expect, it, vi } from "vitest";
import { quickbooksCustomers, quickbooksInvoices } from "./quickbooks-tool.js";

// L2 resilience contract for the QuickBooks connector: request timeout, clean
// 429 handling, input validation, and stable response mapping. quickbooksCustomers
// routes through qbQuery; quickbooksInvoices(action:get) routes through qbFetch.
const CFG = { access_token: "t", realm_id: "r" };

describe("quickbooks connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    const result = await quickbooksCustomers(CFG) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await quickbooksCustomers(CFG) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await quickbooksInvoices({ ...CFG, action: "get" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/invoice_id/i);
  });

  it("passes through successful query responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ QueryResponse: { Customer: [{ Id: "1" }] } }),
    })));
    const result = await quickbooksCustomers(CFG) as Record<string, unknown>;
    expect(result.QueryResponse).toBeDefined();
  });
});
