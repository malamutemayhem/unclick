import { describe, it, expect, vi, afterEach } from "vitest";
import { itisSearchByName, itisGetFullRecord } from "./itis-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("itis-tool", () => {
  it("itisSearchByName returns species matches", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ commonNames: [{ commonName: "Lion", tsn: "183803" }] }),
    }));
    const r = await itisSearchByName({ name: "lion" }) as Record<string, unknown>;
    expect(r.commonNames).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("itisGetFullRecord returns taxonomy", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ scientificName: { combinedName: "Panthera leo" }, kingdom: { kingdomName: "Animalia" } }),
    }));
    const r = await itisGetFullRecord({ tsn: "183803" }) as Record<string, unknown>;
    expect(r.scientificName).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing name", async () => {
    const r = await itisSearchByName({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name/i);
  });
});
