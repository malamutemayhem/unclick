import { describe, it, expect, vi, afterEach } from "vitest";
import { opendotaHeroes, opendotaHeroStats, opendotaProMatches } from "./opendota-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("opendota-tool", () => {
  it("opendotaHeroes returns heroes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ id: 1, name: "npc_dota_hero_antimage", localized_name: "Anti-Mage" }]),
    }));
    const r = await opendotaHeroes({}) as Record<string, unknown>;
    expect(r.heroes).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("opendotaHeroStats returns stats", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ id: 1, localized_name: "Anti-Mage", pro_pick: 100, pro_win: 52 }]),
    }));
    const r = await opendotaHeroStats({}) as Record<string, unknown>;
    expect(r.hero_stats).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("opendotaProMatches returns matches", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ([{ match_id: 123, radiant_name: "Team A", dire_name: "Team B" }]),
    }));
    const r = await opendotaProMatches({}) as Record<string, unknown>;
    expect(r.matches).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
