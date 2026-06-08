import { describe, it, expect, vi, afterEach } from "vitest";
import { openElevationLookup } from "./open-elevation-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("open-elevation-tool", () => {
  it("openElevationLookup returns elevation", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ results: [{ latitude: 41.16, longitude: -8.63, elevation: 117 }] }),
    }));
    const r = await openElevationLookup({ latitude: 41.16, longitude: -8.63 }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing coordinates", async () => {
    const r = await openElevationLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/latitude/i);
  });
});
