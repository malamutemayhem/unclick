import { describe, it, expect, vi, afterEach } from "vitest";
import { currencyApiRates, currencyApiList } from "./exchangerate3-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("exchangerate3-tool", () => {
  it("currencyApiRates returns rates", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ usd: { eur: 0.92, gbp: 0.79 } }),
    }));
    const r = await currencyApiRates({ base: "usd" }) as Record<string, unknown>;
    expect(r.rates).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("currencyApiList returns currencies", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ usd: "US Dollar", eur: "Euro" }),
    }));
    const r = await currencyApiList({}) as Record<string, unknown>;
    expect(r.currencies).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
