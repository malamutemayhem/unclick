import { afterEach, describe, expect, it, vi } from "vitest";
import { holidaysByCountry } from "./holidays-tool.js";

describe("holidays connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await holidaysByCountry({ country_code: "US" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await holidaysByCountry({ country_code: "US" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required country_code param", async () => {
    const r = await holidaysByCountry({}) as Record<string, unknown>;
    expect(r.error).toMatch(/country_code is required/i);
  });

  it("maps holiday data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ date: "2026-01-01", localName: "New Year", name: "New Year's Day", countryCode: "US", fixed: true, global: true, counties: null, launchYear: null, types: ["Public"] }]),
    })));
    const r = await holidaysByCountry({ country_code: "US" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.holidays[0].name).toBe("New Year's Day");
  });
});
