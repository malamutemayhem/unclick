import { describe, it, expect, vi, afterEach } from "vitest";
import { vatcomplyRates, vatcomplyCountries } from "./vatcomply-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("vatcomply-tool", () => {
  it("vatcomplyRates returns EU VAT rates", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ DE: { standard_rate: 19, reduced_rate: 7 } }),
    }));
    const r = await vatcomplyRates({}) as Record<string, unknown>;
    expect(r.DE).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("vatcomplyCountries returns EU countries", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ DE: { name: "Germany", code: "DE" } }),
    }));
    const r = await vatcomplyCountries({}) as Record<string, unknown>;
    expect(r.DE).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
