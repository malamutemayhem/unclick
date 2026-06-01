import { afterEach, describe, expect, it, vi } from "vitest";

import { mbSearchArtists, mbGetArtist } from "./musicbrainz-tool.js";

// Colocated MusicBrainz connector tests. Exercise the L2 (resilience) behaviour.

describe("musicbrainz connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "1" : null) },
      text: async () => "rate limited",
    })));
    await expect(mbSearchArtists({ query: "radiohead" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 1s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(mbSearchArtists({ query: "radiohead" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ETIMEDOUT"); }));
    await expect(mbSearchArtists({ query: "radiohead" })).rejects.toThrow(/network error: ETIMEDOUT/i);
  });

  it("validates input before any network call", async () => {
    await expect(mbGetArtist({})).rejects.toThrow(/mbid is required/i);
  });

  it("returns parsed results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ count: 1, artists: [{ name: "Radiohead" }] }),
    })));
    const result = await mbSearchArtists({ query: "radiohead" }) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.artists[0].name).toBe("Radiohead");
  });
});
