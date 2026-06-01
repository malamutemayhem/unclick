import { afterEach, describe, expect, it, vi } from "vitest";

import { getRecentEarthquakes, getEarthquakeDetail } from "./usgs-tool.js";

// Colocated USGS connector tests. Exercise the L2 (resilience) behaviour.

describe("usgs connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "20" : null) },
      text: async () => "rate limited",
    })));
    await expect(getRecentEarthquakes({})).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 20s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(getRecentEarthquakes({})).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNREFUSED"); }));
    await expect(getRecentEarthquakes({})).rejects.toThrow(/network error: ECONNREFUSED/i);
  });

  it("validates input before any network call", async () => {
    await expect(getEarthquakeDetail({})).rejects.toThrow(/event_id is required/i);
  });

  it("maps earthquake features", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        metadata: { generated: 1700000000000 },
        features: [{ id: "us123", properties: { mag: 5.5, place: "Off coast" }, geometry: { coordinates: [1, 2, 10] } }],
      }),
    })));
    const result = await getRecentEarthquakes({}) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.earthquakes[0]).toMatchObject({ id: "us123", magnitude: 5.5, lat: 2, lon: 1, depth_km: 10 });
  });
});
