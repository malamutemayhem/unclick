import { afterEach, describe, expect, it, vi } from "vitest";

import { getSleeperLeague } from "./sleeper-tool.js";

describe("sleeper connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null } })));
    await expect(getSleeperLeague({ league_id: "123" })).rejects.toThrow(/rate limit reached \(HTTP 429\)/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(getSleeperLeague({ league_id: "123" })).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when league_id is missing", async () => {
    const r = await getSleeperLeague({}) as Record<string, unknown>;
    expect(r.error).toMatch(/league_id is required/i);
  });

  it("maps a league", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ league_id: "123", name: "My League", season: "2026", total_rosters: 12 }) })));
    const r = await getSleeperLeague({ league_id: "123" }) as Record<string, any>;
    expect(r.league_id).toBe("123");
    expect(r.name).toBe("My League");
  });
});
