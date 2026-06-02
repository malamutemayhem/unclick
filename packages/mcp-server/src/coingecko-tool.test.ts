import { afterEach, describe, expect, it, vi } from "vitest";

import { cryptoPrice, cryptoCoin } from "./coingecko-tool.js";

// Colocated CoinGecko connector tests. Exercise the L2 (resilience) behaviour.

describe("coingecko connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) },
      text: async () => "rate limited",
    })));
    await expect(cryptoPrice({ ids: "bitcoin" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(cryptoPrice({ ids: "bitcoin" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(cryptoPrice({ ids: "bitcoin" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    await expect(cryptoCoin({})).rejects.toThrow(/id is required/i);
  });

  it("returns parsed prices", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ bitcoin: { usd: 50000 } }),
    })));
    const result = await cryptoPrice({ ids: "bitcoin" }) as Record<string, any>;
    expect(result.prices.bitcoin.usd).toBe(50000);
  });
});
