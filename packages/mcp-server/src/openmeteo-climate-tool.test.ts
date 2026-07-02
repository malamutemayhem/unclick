import { describe, it, expect, vi, afterEach } from "vitest";
import { climateNormals } from "./openmeteo-climate-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("openmeteo-climate-tool", () => {
  it("climateNormals returns climate data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ daily: { temperature_2m_max_mean: [25.0], temperature_2m_min_mean: [14.0] } }),
    }));
    const r = await climateNormals({ latitude: 52.52, longitude: 13.41 }) as Record<string, unknown>;
    expect(r.daily).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing coordinates", async () => {
    const r = await climateNormals({}) as Record<string, unknown>;
    expect(r.error).toMatch(/latitude/i);
  });
});
