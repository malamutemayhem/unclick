import { afterEach, describe, expect, it, vi } from "vitest";

import { getNflScores, getTeamInfo } from "./espn-tool.js";

// Colocated ESPN connector tests. Scoreboards throw; get_team_info returns { error } on bad input.

describe("espn connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
    })));
    await expect(getNflScores({})).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(getNflScores({})).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when team args are missing", async () => {
    const r = await getTeamInfo({}) as Record<string, unknown>;
    expect(r.error).toMatch(/required/i);
  });

  it("normalizes scoreboard events", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ season: { year: 2026 }, week: { number: 5 }, events: [{ id: "401", name: "A vs B", date: "2026-01-01", competitions: [{ competitors: [] }] }] }),
    })));
    const r = await getNflScores({}) as Record<string, any>;
    expect(r.sport).toBe("NFL");
    expect(r.events[0].name).toBe("A vs B");
  });
});
