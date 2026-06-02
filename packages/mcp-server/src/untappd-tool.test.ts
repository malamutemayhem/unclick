import { afterEach, describe, expect, it, vi } from "vitest";

import { untappdSearchBeer } from "./untappd-tool.js";

// Colocated Untappd connector tests. Exercise the L2 (resilience) behaviour.

const creds = { client_id: "a", client_secret: "b" };

describe("untappd connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "60" : null) },
    })));
    await expect(untappdSearchBeer({ ...creds, q: "ipa" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 60s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(untappdSearchBeer({ ...creds, q: "ipa" })).rejects.toThrow(/timed out/i);
  });

  it("returns a structured error when q is missing", async () => {
    const r = await untappdSearchBeer({ ...creds }) as Record<string, unknown>;
    expect(r.error).toMatch(/q is required/i);
  });

  it("maps search results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ response: { beers: { count: 1, items: [{ beer: { bid: 3839, beer_name: "Pliny the Elder" }, brewery: { brewery_name: "Russian River" } }] } } }),
    })));
    const r = await untappdSearchBeer({ ...creds, q: "pliny" }) as Record<string, any>;
    expect(r.found).toBe(1);
    expect(r.results[0].beer_name).toBe("Pliny the Elder");
  });
});
