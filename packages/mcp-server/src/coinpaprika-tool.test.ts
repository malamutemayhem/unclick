import { afterEach, describe, expect, it, vi } from "vitest";
import { coinpaprikaGlobal, coinpaprikaCoin, coinpaprikaTicker } from "./coinpaprika-tool.js";

describe("coinpaprika connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await coinpaprikaGlobal({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await coinpaprikaCoin({ id: "btc-bitcoin" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns global data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ market_cap_usd: 1000000000, volume_24h_usd: 50000000, cryptocurrencies_number: 5000 }),
    })));
    const r = await coinpaprikaGlobal({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns ticker data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: "btc-bitcoin", name: "Bitcoin", rank: 1 }]),
    })));
    const r = await coinpaprikaTicker({}) as Record<string, unknown>;
    expect(r.tickers).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
