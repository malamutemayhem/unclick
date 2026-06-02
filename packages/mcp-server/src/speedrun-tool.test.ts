import { afterEach, describe, expect, it, vi } from "vitest";

import { speedrunSearchGames } from "./speedrun-tool.js";

// Colocated Speedrun.com connector tests. Its functions catch and return { error }.

describe("speedrun connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: () => "30" },
      text: async () => "rate limited",
    })));
    const r = await speedrunSearchGames({ name: "mario" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await speedrunSearchGames({ name: "mario" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a clean network error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    const r = await speedrunSearchGames({ name: "mario" }) as Record<string, unknown>;
    expect(r.error).toMatch(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    const r = await speedrunSearchGames({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name is required/i);
  });

  it("maps returned games", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ data: [{ id: "g1", names: { international: "Mario" }, abbreviation: "smb" }] }),
    })));
    const r = await speedrunSearchGames({ name: "mario" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.games[0].id).toBe("g1");
  });
});
