import { afterEach, describe, expect, it, vi } from "vitest";

import { stockQuote } from "./alphavantage-tool.js";

// Colocated Alpha Vantage connector tests. Exercise the L2 (resilience) behaviour.

describe("alphavantage connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubEnv("ALPHAVANTAGE_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) } })));
    await expect(stockQuote({ symbol: "AAPL" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubEnv("ALPHAVANTAGE_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(stockQuote({ symbol: "AAPL" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    vi.stubEnv("ALPHAVANTAGE_API_KEY", "k");
    await expect(stockQuote({})).rejects.toThrow(/symbol is required/i);
  });

  it("maps a global quote", async () => {
    vi.stubEnv("ALPHAVANTAGE_API_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ "Global Quote": { "01. symbol": "AAPL", "05. price": "150.00" } }) })));
    const r = await stockQuote({ symbol: "AAPL" }) as Record<string, any>;
    expect(r.symbol).toBe("AAPL");
    expect(r.price).toBe("150.00");
  });
});
