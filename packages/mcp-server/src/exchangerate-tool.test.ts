import { afterEach, describe, expect, it, vi } from "vitest";

import { exchangerateLatest, exchangerateConvert } from "./exchangerate-tool.js";

// Colocated ExchangeRate-API connector tests. Functions catch and return { error }.

describe("exchangerate connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: () => null },
      text: async () => "rate limited",
    })));
    const r = await exchangerateLatest({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await exchangerateLatest({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a clean network error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    const r = await exchangerateLatest({}) as Record<string, unknown>;
    expect(r.error).toMatch(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    const r = await exchangerateConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/from is required/i);
  });

  it("returns parsed latest rates", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ result: "success", base_code: "USD", conversion_rates: { EUR: 0.9, AUD: 1.5 } }),
    })));
    const r = await exchangerateLatest({}) as Record<string, any>;
    expect(r.base_code).toBe("USD");
    expect(r.rates.EUR).toBe(0.9);
  });
});
