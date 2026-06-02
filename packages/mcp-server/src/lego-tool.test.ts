import { afterEach, describe, expect, it, vi } from "vitest";

import { legoGetSet } from "./lego-tool.js";

// Colocated LEGO (Rebrickable) connector tests. Exercise the L2 (resilience) behaviour.

describe("lego connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) } })));
    await expect(legoGetSet({ rebrickable_api_key: "k", set_num: "75192-1" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(legoGetSet({ rebrickable_api_key: "k", set_num: "75192-1" })).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when set_num is missing", async () => {
    const r = await legoGetSet({ rebrickable_api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/set_num is required/i);
  });

  it("maps a set", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ set_num: "75192-1", name: "Millennium Falcon", year: 2017, num_parts: 7541 }) })));
    const r = await legoGetSet({ rebrickable_api_key: "k", set_num: "75192-1" }) as Record<string, any>;
    expect(r.set_num).toBe("75192-1");
    expect(r.name).toBe("Millennium Falcon");
  });
});
