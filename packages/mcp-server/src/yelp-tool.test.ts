import { afterEach, describe, expect, it, vi } from "vitest";

import { yelpSearchBusinesses } from "./yelp-tool.js";

describe("yelp connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await yelpSearchBusinesses({ api_key: "k", location: "SF" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await yelpSearchBusinesses({ api_key: "k", location: "SF" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when location is missing", async () => {
    const r = await yelpSearchBusinesses({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/location is required/i);
  });

  it("maps business search", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, text: async () => "", json: async () => ({ total: 1, businesses: [{ name: "Blue Bottle" }] }) })));
    const r = await yelpSearchBusinesses({ api_key: "k", location: "SF" }) as Record<string, any>;
    expect(r.total).toBe(1);
    expect(r.businesses[0].name).toBe("Blue Bottle");
  });
});
