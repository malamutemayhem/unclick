import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { wiseExchangeRates } from "./wise-tool.js";

// L2 resilience contract for the Wise connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("wise connector resilience (L2)", () => {
  beforeEach(() => { vi.stubEnv("WISE_API_TOKEN", "test-token"); });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
      text: async () => "rate limited",
      json: async () => ({}),
    })));
    await expect(wiseExchangeRates({ source: "USD", target: "EUR" }))
      .rejects.toThrow(/rate limit/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(wiseExchangeRates({ source: "USD", target: "EUR" }))
      .rejects.toThrow(/timed out/i);
  });

  it("validates required currency params before calling the API", async () => {
    await expect(wiseExchangeRates({ target: "EUR" })).rejects.toThrow(/source/i);
  });

  it("maps exchange-rate responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => ([{ rate: 0.92, source: "USD", target: "EUR", time: "2026-01-01T00:00:00Z" }]),
    })));
    const result = await wiseExchangeRates({ source: "usd", target: "eur" }) as Record<string, unknown>;
    expect(result.source).toBe("USD");
    expect(result.target).toBe("EUR");
    expect((result.rates as unknown[]).length).toBe(1);
    expect((result.rates as Array<Record<string, unknown>>)[0].rate).toBe(0.92);
  });
});
