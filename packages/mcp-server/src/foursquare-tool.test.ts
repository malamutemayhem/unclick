import { afterEach, describe, expect, it, vi } from "vitest";

import { foursquareSearchPlaces } from "./foursquare-tool.js";

// Colocated Foursquare connector tests. fsFetch returns { error } objects.

describe("foursquare connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) } })));
    const r = await foursquareSearchPlaces({ api_key: "k", query: "coffee" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await foursquareSearchPlaces({ api_key: "k", query: "coffee" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a guided not-connected result when the key is missing", async () => {
    const r = await foursquareSearchPlaces({ query: "coffee" }) as Record<string, unknown>;
    expect(r.not_connected).toBe(true);
    expect(r.error).toMatch(/not connected to foursquare/i);
    expect(r.how_to_connect).toEqual(
      expect.arrayContaining([expect.stringMatching(/keychain_secure_connect/i)]),
    );
  });

  it("passes through search data", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ results: [{ name: "Blue Bottle" }] }) })));
    const r = await foursquareSearchPlaces({ api_key: "k", query: "coffee" }) as Record<string, any>;
    expect(r.results[0].name).toBe("Blue Bottle");
  });
});
