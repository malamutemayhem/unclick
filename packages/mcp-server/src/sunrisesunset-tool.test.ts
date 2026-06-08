import { afterEach, describe, expect, it, vi } from "vitest";
import { sunriseSunsetTimes } from "./sunrisesunset-tool.js";

describe("sunrisesunset connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await sunriseSunsetTimes({ lat: 40.7, lng: -74 }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await sunriseSunsetTimes({ lat: 40.7, lng: -74 }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required coordinates", async () => {
    const r = await sunriseSunsetTimes({}) as Record<string, unknown>;
    expect(r.error).toMatch(/lat and lng are required/i);
  });

  it("sunriseSunsetTimes returns data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ results: { sunrise: "2026-06-08T10:00:00+00:00", sunset: "2026-06-09T00:30:00+00:00" }, status: "OK" }),
    })));
    const r = await sunriseSunsetTimes({ lat: 40.7128, lng: -74.006 }) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
