import { afterEach, describe, expect, it, vi } from "vitest";
import { paypalOrders } from "./paypal-tool.js";

// L2 resilience contract for the PayPal connector: request timeout, clean 429
// handling, input validation, and stable response mapping. PayPal fetches an
// OAuth token first, so mocks are URL-aware (token hop succeeds, API hop varies).
const CREDS = { client_id: "id", client_secret: "secret" };

function tokenOk() {
  return { ok: true, status: 200, headers: { get: () => null }, json: async () => ({ access_token: "tok" }) };
}

describe("paypal connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("/v1/oauth2/token")) return tokenOk();
      return { ok: false, status: 429, headers: { get: () => null }, json: async () => ({}) };
    }));
    const result = await paypalOrders({ ...CREDS, action: "get", order_id: "O1" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("/v1/oauth2/token")) return tokenOk();
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await paypalOrders({ ...CREDS, action: "get", order_id: "O1" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await paypalOrders({ ...CREDS, action: "create" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/purchase_units/i);
  });

  it("passes through successful order responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("/v1/oauth2/token")) return tokenOk();
      return { ok: true, status: 200, headers: { get: () => null }, json: async () => ({ id: "O1", status: "COMPLETED" }) };
    }));
    const result = await paypalOrders({ ...CREDS, action: "get", order_id: "O1" }) as Record<string, unknown>;
    expect(result.id).toBe("O1");
  });
});
