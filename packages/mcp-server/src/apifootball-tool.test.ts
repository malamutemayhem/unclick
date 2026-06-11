import { afterEach, describe, expect, it, vi } from "vitest";
import { sportsdbSearchTeam, sportsdbSearchPlayer, sportsdbTeamEvents, sportsdbLeagues } from "./apifootball-tool.js";

describe("sportsdb connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await sportsdbLeagues({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await sportsdbSearchTeam({ team: "Arsenal" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required team name", async () => {
    const r = await sportsdbSearchTeam({}) as Record<string, unknown>;
    expect(r.error).toMatch(/team name is required/i);
  });

  it("validates required player name", async () => {
    const r = await sportsdbSearchPlayer({}) as Record<string, unknown>;
    expect(r.error).toMatch(/player name is required/i);
  });

  it("sportsdbSearchTeam returns data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ teams: [{ idTeam: "133604", strTeam: "Arsenal" }] }),
    })));
    const r = await sportsdbSearchTeam({ team: "Arsenal" }) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
