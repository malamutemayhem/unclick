import { afterEach, describe, expect, it, vi } from "vitest";

import { weatherCurrent } from "./openmeteo-tool.js";

// Colocated Open-Meteo connector tests. Exercise the L2 (resilience) behaviour.
// Pass explicit lat/lon so only the single forecast fetch runs (no geocoding hop).

describe("open-meteo connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
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
});
