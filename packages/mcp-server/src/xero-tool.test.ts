import { afterEach, describe, expect, it, vi } from "vitest";
import { xeroInvoices } from "./xero-tool.js";

// L2 resilience contract for the Xero connector: request timeout, clean 429
// handling, input validation, and stable response mapping. Inline access_token +
// tenant_id let resolveCredentials short-circuit without a network hop.
const CREDS = { access_token: "t", tenant_id: "tenant-1" };

describe("xero connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "", statusText: "Too Many Requests",
    })));
    const result = await xeroInvoices({ ...CREDS }) as Record<string, unknown>;
    expect(String(result.message)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await xeroInvoices({ ...CREDS }) as Record<string, unknown>;
    expect(String(result.message)).toMatch(/timed out/i);
  });

  it("returns a setup error when credentials are missing", async () => {
    const result = await xeroInvoices({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/credentials|access_token|tenant/i);
  });

  it("passes through successful invoice fetches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      text: async () => JSON.stringify({ Invoices: [{ InvoiceID: "i1", Total: 100 }] }),
    })));
    const result = await xeroInvoices({ ...CREDS }) as Record<string, unknown>;
    expect(result.error).not.toBe(true);
  });
});
