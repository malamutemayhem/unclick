import { afterEach, describe, expect, it, vi } from "vitest";
import { stripeCustomers } from "./stripe-tool.js";

// L2 resilience contract for the Stripe connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("stripe connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    const result = await stripeCustomers({ secret_key: "sk_test_x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await stripeCustomers({ secret_key: "sk_test_x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("returns a guided not-connected result when the secret key is missing", async () => {
    const result = await stripeCustomers({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
    expect(String(result.error)).toMatch(/not connected to stripe/i);
    expect(result.how_to_connect).toEqual(
      expect.arrayContaining([expect.stringMatching(/keychain_secure_connect/i)]),
    );
  });

  it("passes through successful customer listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ object: "list", data: [{ id: "cus_1" }] }),
    })));
    const result = await stripeCustomers({ secret_key: "sk_test_x" }) as Record<string, unknown>;
    expect((result.data as unknown[]).length).toBe(1);
  });
});
