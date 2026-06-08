import { describe, it, expect, vi, afterEach } from "vitest";
import { abstractCountryInfo, abstractLongWeekends } from "./abstract-holidays-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("abstract-holidays-tool", () => {
  it("returns country info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ commonName: "Australia", officialName: "Commonwealth of Australia", countryCode: "AU" }),
    }));
    const r = await abstractCountryInfo({ country_code: "AU" }) as Record<string, unknown>;
    expect(r.commonName).toBe("Australia");
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns long weekends", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ startDate: "2026-01-24", endDate: "2026-01-26", dayCount: 3, needBridgeDay: false }]),
    }));
    const r = await abstractLongWeekends({ country_code: "AU", year: "2026" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing country_code", async () => {
    const r = await abstractCountryInfo({}) as Record<string, unknown>;
    expect(r.error).toMatch(/country_code/i);
  });
});
