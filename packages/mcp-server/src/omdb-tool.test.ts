import { afterEach, describe, expect, it, vi } from "vitest";

import { omdbSearch } from "./omdb-tool.js";

// Colocated OMDB connector tests. Exercise the L2 (resilience) behaviour.

describe("omdb connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubEnv("OMDB_API_KEY", "testkey");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) },
      text: async () => "rate limited",
    })));
    await expect(omdbSearch({ s: "batman" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubEnv("OMDB_API_KEY", "testkey");
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(omdbSearch({ s: "batman" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubEnv("OMDB_API_KEY", "testkey");
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(omdbSearch({ s: "batman" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    vi.stubEnv("OMDB_API_KEY", "testkey");
    await expect(omdbSearch({})).rejects.toThrow(/search query.*required/i);
  });

  it("returns parsed results", async () => {
    vi.stubEnv("OMDB_API_KEY", "testkey");
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ Response: "True", Search: [{ Title: "Batman", Year: "1989" }], totalResults: "1" }),
    })));
    const result = await omdbSearch({ s: "batman" }) as Record<string, any>;
    expect(result.Search[0].Title).toBe("Batman");
  });
});
