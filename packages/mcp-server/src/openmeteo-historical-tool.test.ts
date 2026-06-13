import { describe, it, expect, vi, afterEach } from "vitest";
import { historicalWeather } from "./openmeteo-historical-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("openmeteo-historical-tool", () => {
  it("historicalWeather returns daily data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ daily: { temperature_2m_max: [22.5], temperature_2m_min: [11.3] } }),
    }));
    const r = await historicalWeather({ latitude: 52.52, longitude: 13.41, start_date: "2024-01-01", end_date: "2024-01-02" }) as Record<string, unknown>;
    expect(r.daily).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing coordinates", async () => {
    const r = await historicalWeather({}) as Record<string, unknown>;
    expect(r.error).toMatch(/latitude/i);
  });

  it("rejects missing dates", async () => {
    const r = await historicalWeather({ latitude: 52, longitude: 13 }) as Record<string, unknown>;
    expect(r.error).toMatch(/start_date/i);
  });
});
