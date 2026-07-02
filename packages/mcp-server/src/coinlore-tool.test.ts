import { describe, it, expect, vi, afterEach } from "vitest";
import { coinloreGlobal, coinloreTickers, coinloreCoin } from "./coinlore-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("coinlore-tool", () => {
  it("coinloreGlobal returns market overview", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ coins_count: 10000, total_mcap: 2500000000000 }]),
    }));
    const r = await coinloreGlobal({}) as Record<string, unknown>;
    expect(r.global).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("coinloreTickers returns coin list", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ data: [{ id: "90", symbol: "BTC", name: "Bitcoin", price_usd: "50000" }] }),
    }));
    const r = await coinloreTickers({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("coinloreCoin returns single coin", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ id: "90", symbol: "BTC", name: "Bitcoin", price_usd: "50000" }]),
    }));
    const r = await coinloreCoin({ id: "90" }) as Record<string, unknown>;
    expect(r.coin).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("coinloreCoin requires id", async () => {
    const r = await coinloreCoin({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
