import { describe, it, expect, vi, afterEach } from "vitest";
import { nhtsaDecodeVin, nhtsaRecalls } from "./nhtsa-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("nhtsa-tool", () => {
  it("decodes a VIN", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ Results: [{ Variable: "Make", Value: "Toyota" }], Count: 1 }),
    }));
    const r = await nhtsaDecodeVin({ vin: "1HGBH41JXMN109186" }) as Record<string, unknown>;
    expect(r.Results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("looks up recalls", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ results: [{ Manufacturer: "Toyota", Component: "BRAKES" }], Count: 1 }),
    }));
    const r = await nhtsaRecalls({ make: "Toyota", model: "Camry", year: "2020" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing vin", async () => {
    const r = await nhtsaDecodeVin({}) as Record<string, unknown>;
    expect(r.error).toMatch(/vin/i);
  });
});
