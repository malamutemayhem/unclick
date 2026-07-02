import { afterEach, describe, expect, it, vi } from "vitest";

import { getLottResults } from "./thelott-tool.js";

// Colocated The Lott connector tests. Functions catch and return { error }.

describe("the lott connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await getLottResults({ game: "powerball" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await getLottResults({ game: "powerball" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a clean network error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    const r = await getLottResults({ game: "powerball" }) as Record<string, unknown>;
    expect(r.error).toMatch(/network error: ENOTFOUND/i);
  });

  it("maps the latest draw", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ DrawResults: [{ DrawNumber: 1234, DrawDate: "2026-01-01", PrimaryNumbers: [1, 2, 3, 4, 5, 6] }] }),
    })));
    const r = await getLottResults({ game: "powerball" }) as Record<string, any>;
    expect(r.draw_number).toBe(1234);
    expect(r.winning_numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
