import { afterEach, describe, expect, it, vi } from "vitest";

import { cmcQuotes } from "./coinmarketcap-tool.js";

// Colocated CoinMarketCap connector tests. Exercise the L2 (resilience) behaviour.

describe("coinmarketcap connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubEnv("COINMARKETCAP_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) }, text: async () => "" })));
    await expect(cmcQuotes({ symbol: "BTC" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubEnv("COINMARKETCAP_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(cmcQuotes({ symbol: "BTC" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    vi.stubEnv("COINMARKETCAP_API_KEY", "k");
    await expect(cmcQuotes({})).rejects.toThrow(/symbol or id is required/i);
  });

  it("maps quotes", async () => {
    vi.stubEnv("COINMARKETCAP_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ status: { error_code: 0 }, data: { BTC: { id: 1, name: "Bitcoin", symbol: "BTC", quote: { USD: { price: 50000 } } } } }) })));
    const r = await cmcQuotes({ symbol: "BTC" }) as Record<string, any>;
    expect(r.quotes[0].symbol).toBe("BTC");
    expect(r.quotes[0].price).toBe(50000);
  });
});
