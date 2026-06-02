import { afterEach, describe, expect, it, vi } from "vitest";

import { discogsSearchArtists } from "./discogs-tool.js";

// Colocated Discogs connector tests. Functions catch and return { error }.

describe("discogs connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await discogsSearchArtists({ token: "t", query: "radiohead" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await discogsSearchArtists({ token: "t", query: "radiohead" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when query is missing", async () => {
    const r = await discogsSearchArtists({ token: "t" }) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("maps search results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ pagination: { items: 1 }, results: [{ id: 1, title: "Radiohead" }] }) })));
    const r = await discogsSearchArtists({ token: "t", query: "radiohead" }) as Record<string, any>;
    expect(r.total).toBe(1);
    expect(r.results[0].id).toBe(1);
  });
});
