import { describe, it, expect, vi, afterEach } from "vitest";
import { geojsLookup } from "./geojs-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("geojs-tool", () => {
  it("returns geolocation for an IP", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ ip: "8.8.8.8", country: "United States", latitude: "37.751", longitude: "-97.822" }),
    }));
    const r = await geojsLookup({ ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.country).toBe("United States");
    expect(r.unclick_meta).toBeDefined();
  });

  it("works without IP (self-lookup)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ ip: "1.2.3.4", country: "Australia" }),
    }));
    const r = await geojsLookup({}) as Record<string, unknown>;
    expect(r.ip).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
