import { afterEach, describe, expect, it, vi } from "vitest";

import { getWillyweatherForecast } from "./willyweather-tool.js";

// Colocated WillyWeather tests: L2 resilience + L3 home-location memory + L4 stamp.

const searchThenWeather = () =>
  vi.fn(async (..._a: unknown[]) => ({
    ok: true,
    status: 200,
    json: async () => ({ locations: [{ id: 99, name: "Brighton", state: { abbreviation: "VIC" } }], forecasts: {} }),
  }));

describe("willyweather resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubEnv("WILLYWEATHER_KEY", "k");
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; }));
    const res = await getWillyweatherForecast({ location: "Brighton" }) as Record<string, any>;
    expect(res.error).toMatch(/timed out/i);
  });
});

describe("willyweather home-location memory + stamp (L3/L4)", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

  it("falls back to WILLYWEATHER_HOME_LOCATION and records the default", async () => {
    vi.stubEnv("WILLYWEATHER_KEY", "k");
    vi.stubEnv("WILLYWEATHER_HOME_LOCATION", "Brighton");
    const fetchMock = searchThenWeather();
    vi.stubGlobal("fetch", fetchMock);

    const res = await getWillyweatherForecast({}) as Record<string, any>;

    expect(String(fetchMock.mock.calls[0][0])).toContain("/search.json");
    expect(res.unclick_meta.source).toBe("WillyWeather API v2");
    expect(res.unclick_meta.defaults_used).toContain("WILLYWEATHER_HOME_LOCATION");
  });

  it("requires a location when none is supplied or remembered", async () => {
    vi.stubEnv("WILLYWEATHER_KEY", "k");
    const res = await getWillyweatherForecast({}) as Record<string, any>;
    expect(res.error).toMatch(/location is required/i);
  });
});
