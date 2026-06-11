import { describe, it, expect, vi, afterEach } from "vitest";
import { floodForecast } from "./openmeteo-flood-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("openmeteo-flood-tool", () => {
  it("floodForecast returns river discharge data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ daily: { time: ["2026-06-08"], river_discharge: [150.5] } }),
    }));
    const r = await floodForecast({ latitude: 48.85, longitude: 2.35 }) as Record<string, unknown>;
    expect(r.daily).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("floodForecast requires coordinates", async () => {
    const r = await floodForecast({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
