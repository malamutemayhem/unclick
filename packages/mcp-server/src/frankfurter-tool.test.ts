import { afterEach, describe, expect, it, vi } from "vitest";
import { frankfurterLatest, frankfurterConvert, frankfurterHistorical, frankfurterCurrencies } from "./frankfurter-tool.js";

describe("frankfurter connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await frankfurterLatest({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await frankfurterCurrencies({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required params for convert", async () => {
    const r = await frankfurterConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/amount.*from.*to/i);
  });

  it("validates required date for historical", async () => {
    const r = await frankfurterHistorical({}) as Record<string, unknown>;
    expect(r.error).toMatch(/date is required/i);
  });

  it("frankfurterLatest returns rates with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ amount: 1, base: "EUR", date: "2026-06-07", rates: { USD: 1.08 } }),
    })));
    const r = await frankfurterLatest({ from: "EUR" }) as Record<string, unknown>;
    expect(r.base).toBe("EUR");
    expect(r.unclick_meta).toBeDefined();
  });
});
