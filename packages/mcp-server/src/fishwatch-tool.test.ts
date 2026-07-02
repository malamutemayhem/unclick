import { describe, it, expect, vi, afterEach } from "vitest";
import { fishwatchSpecies, fishwatchSpeciesDetail } from "./fishwatch-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("fishwatch-tool", () => {
  it("fishwatchSpecies returns species list", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ "Species Name": "Atlantic Salmon", "Scientific Name": "Salmo salar" }]),
    }));
    const r = await fishwatchSpecies({}) as Record<string, unknown>;
    expect(r.species).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("fishwatchSpeciesDetail returns species info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ "Species Name": "Atlantic Salmon", "Population Status": "Above target" }]),
    }));
    const r = await fishwatchSpeciesDetail({ name: "atlantic-salmon" }) as Record<string, unknown>;
    expect(r.species).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("fishwatchSpeciesDetail requires name", async () => {
    const r = await fishwatchSpeciesDetail({}) as Record<string, unknown>;
    expect(r.error).toBeDefined();
  });
});
