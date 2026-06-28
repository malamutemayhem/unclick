import { describe, it, expect, vi, afterEach } from "vitest";
import { airQualityCurrent, airQualityForecast } from "./openmeteo-airquality-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("openmeteo-airquality-tool", () => {
  it("airQualityCurrent returns AQI data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ current: { pm2_5: 12, us_aqi: 50 } }),
    }));
    const r = await airQualityCurrent({ latitude: 40.71, longitude: -74.01 }) as Record<string, unknown>;
    expect(r.current).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("airQualityCurrent requires coordinates", async () => {
    const r = await airQualityCurrent({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });

  it("airQualityForecast returns hourly forecast", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ hourly: { time: ["2026-06-08T00:00"], pm2_5: [15], us_aqi: [55] } }),
    }));
    const r = await airQualityForecast({ latitude: 40.71, longitude: -74.01, days: 2 }) as Record<string, unknown>;
    expect(r.hourly).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
