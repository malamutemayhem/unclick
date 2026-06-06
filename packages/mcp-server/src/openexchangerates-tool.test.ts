import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { forexLatest, forexConvert } from "./openexchangerates-tool.js";

// L2 resilience contract for the Open Exchange Rates connector: request timeout,
// clean 429 handling, input validation, and stable response mapping.
describe("openexchangerates connector resilience (L2)", () => {
  beforeEach(() => { vi.stubEnv("OPENEXCHANGERATES_APP_ID", "app"); });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ({}),
    })));
    await expect(forexLatest({})).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(forexLatest({})).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(forexConvert({})).rejects.toThrow(/value is required/i);
  });

  it("maps latest-rate responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ base: "USD", timestamp: 1700000000, rates: { EUR: 0.92 } }),
    })));
    const result = await forexLatest({}) as Record<string, unknown>;
    expect(result.base).toBe("USD");
    expect((result.rates as Record<string, unknown>).EUR).toBe(0.92);
  });
});
