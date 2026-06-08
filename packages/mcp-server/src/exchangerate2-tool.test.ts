import { afterEach, describe, expect, it, vi } from "vitest";
import { erLatestRates } from "./exchangerate2-tool.js";

describe("exchangerate2 connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await erLatestRates({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await erLatestRates({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("erLatestRates returns exchange rates with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ result: "success", base_code: "USD", rates: { EUR: 0.92, GBP: 0.79 } }),
    })));
    const r = await erLatestRates({}) as Record<string, unknown>;
    expect(r.base_code).toBe("USD");
    expect(r.unclick_meta).toBeDefined();
  });
});
