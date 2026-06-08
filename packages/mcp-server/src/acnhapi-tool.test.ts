import { describe, it, expect, vi, afterEach } from "vitest";
import { acnhVillagers, acnhFish, acnhBugs } from "./acnhapi-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("acnhapi-tool", () => {
  it("acnhVillagers returns villagers", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ 1: { id: 1, name: { "name-USen": "Cyrano" }, personality: "Cranky" } }),
    }));
    const r = await acnhVillagers({}) as Record<string, unknown>;
    expect(r.villagers).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("acnhFish returns fish", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ 1: { id: 1, name: { "name-USen": "Bitterling" }, availability: {} } }),
    }));
    const r = await acnhFish({}) as Record<string, unknown>;
    expect(r.fish).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("acnhBugs returns bugs", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ 1: { id: 1, name: { "name-USen": "Common butterfly" }, availability: {} } }),
    }));
    const r = await acnhBugs({}) as Record<string, unknown>;
    expect(r.bugs).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
