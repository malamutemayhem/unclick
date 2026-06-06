import { afterEach, describe, expect, it, vi } from "vitest";

import { fplManager } from "./fpl-tool.js";

// Colocated FPL connector tests. Exercise the L2 (resilience) behaviour.

describe("fpl connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) },
      text: async () => "rate limited",
    })));
    await expect(fplManager({ team_id: "123" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(fplManager({ team_id: "123" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(fplManager({ team_id: "123" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    await expect(fplManager({})).rejects.toThrow(/team_id is required/i);
  });

  it("maps a manager entry", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ player_first_name: "Alex", player_last_name: "Smith", name: "The Team", summary_overall_rank: 1000, summary_overall_points: 500 }),
    })));
    const result = await fplManager({ team_id: "123" }) as Record<string, any>;
    expect(result.manager_name).toBe("Alex Smith");
    expect(result.team_name).toBe("The Team");
    expect(result.overall_rank).toBe(1000);
  });
});
