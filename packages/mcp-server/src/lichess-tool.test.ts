import { afterEach, describe, expect, it, vi } from "vitest";

import { lichessUser } from "./lichess-tool.js";

// Colocated Lichess connector tests. Exercise the L2 (resilience) behaviour.

describe("lichess connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) },
      text: async () => "rate limited",
    })));
    await expect(lichessUser({ username: "magnus" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(lichessUser({ username: "magnus" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(lichessUser({ username: "magnus" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    await expect(lichessUser({})).rejects.toThrow(/username is required/i);
  });

  it("maps a user profile", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ id: "magnus", username: "Magnus", perfs: { blitz: { rating: 2800 } } }),
    })));
    const r = await lichessUser({ username: "magnus" }) as Record<string, any>;
    expect(r.username).toBe("Magnus");
    expect(r.ratings.blitz).toBe(2800);
  });
});
