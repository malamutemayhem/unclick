import { afterEach, describe, expect, it, vi } from "vitest";

import { weatherCurrent } from "./openmeteo-tool.js";

// Colocated Open-Meteo connector tests. Exercise the L2 (resilience) behaviour.
// Pass explicit lat/lon so only the single forecast fetch runs (no geocoding hop).

describe("open-meteo connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) },
      text: async () => "rate limited",
    })));
    await expect(weatherCurrent({ latitude: -37.8, longitude: 144.9 })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(weatherCurrent({ latitude: -37.8, longitude: 144.9 })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(weatherCurrent({ latitude: -37.8, longitude: 144.9 })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("returns a structured error when no location is given", async () => {
    const result = await weatherCurrent({}) as Record<string, unknown>;
    expect(result.error).toMatch(/provide either/i);
  });

  it("maps current weather", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ current_weather: { temperature: 18, windspeed: 10, winddirection: 180, weathercode: 0, time: "2026-01-01T00:00", is_day: 1 } }),
    })));
    const result = await weatherCurrent({ latitude: -37.8, longitude: 144.9 }) as Record<string, any>;
    expect(result.temperature_c).toBe(18);
    expect(result.weather_description).toBe("Clear sky");
  });

  // ─── L5 smart layer: source/freshness stamp + next-step hint ─────────────────

  it("stamps source, freshness, and a next step", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ current_weather: { temperature: 18, weathercode: 0 } }),
    })));
    const r = await weatherCurrent({ latitude: -37.8, longitude: 144.9 }) as Record<string, any>;
    expect(r.unclick_meta.source).toBe("Open-Meteo");
    expect(typeof r.unclick_meta.fetched_at).toBe("string");
    expect(r.unclick_meta.next_steps[0]).toMatch(/weather_forecast/);
    expect(r.unclick_meta.defaults_used).toEqual([]);
  });

  // ─── L3 memory-aware: fill location from the WEATHER_HOME_CITY default ────────

  it("fills a missing location from the WEATHER_HOME_CITY memory default", async () => {
    vi.stubEnv("WEATHER_HOME_CITY", "Melbourne");
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (String(url).includes("geocoding-api")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ results: [{ id: 1, name: "Melbourne", latitude: -37.8, longitude: 144.9, country: "Australia", country_code: "AU", admin1: "Victoria" }] }),
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({ current_weather: { temperature: 20, weathercode: 1, time: "t", is_day: 1 } }),
      };
    }));
    const r = await weatherCurrent({}) as Record<string, any>;
    expect(r.location).toMatch(/Melbourne/);
    expect(r.unclick_meta.defaults_used).toContain("WEATHER_HOME_CITY");
  });
});
