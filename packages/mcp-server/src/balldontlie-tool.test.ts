import { afterEach, describe, expect, it, vi } from "vitest";
import { nbaPlayers, nbaTeams, nbaGames } from "./balldontlie-tool.js";

describe("balldontlie connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await nbaPlayers({ search: "LeBron" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await nbaTeams({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns player data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ data: [{ id: 237, first_name: "LeBron", last_name: "James", team: { full_name: "Los Angeles Lakers" } }], meta: { total_count: 1 } }),
    })));
    const r = await nbaPlayers({ search: "LeBron" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
