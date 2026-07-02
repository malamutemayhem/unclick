import { describe, it, expect, vi, afterEach } from "vitest";
import { gbifSearchSpecies, gbifSpeciesDetail, gbifOccurrences } from "./gbif-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("gbif-tool", () => {
  it("gbifSearchSpecies returns species results", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ results: [{ key: 5231190, scientificName: "Panthera leo" }] }),
    }));
    const r = await gbifSearchSpecies({ query: "lion" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("gbifSpeciesDetail returns taxonomy", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ key: 5231190, kingdom: "Animalia", species: "Panthera leo" }),
    }));
    const r = await gbifSpeciesDetail({ species_key: "5231190" }) as Record<string, unknown>;
    expect(r.kingdom).toBe("Animalia");
    expect(r.unclick_meta).toBeDefined();
  });

  it("gbifOccurrences returns records", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ results: [{ species: "Panthera leo", country: "KE" }] }),
    }));
    const r = await gbifOccurrences({ species_key: "5231190", country: "KE" }) as Record<string, unknown>;
    expect(r.results).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing query", async () => {
    const r = await gbifSearchSpecies({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query/i);
  });
});
