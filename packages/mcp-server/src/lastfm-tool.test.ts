import { afterEach, describe, expect, it, vi } from "vitest";

import { lastfmGetArtistInfo } from "./lastfm-tool.js";

// Colocated Last.fm connector tests. Functions catch and return { error }.

describe("lastfm connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: () => null },
      text: async () => "rate limited",
    })));
    const r = await lastfmGetArtistInfo({ api_key: "k", artist: "Radiohead" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit reached \(HTTP 429\)/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const r = await lastfmGetArtistInfo({ api_key: "k", artist: "Radiohead" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a clean network error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    const r = await lastfmGetArtistInfo({ api_key: "k", artist: "Radiohead" }) as Record<string, unknown>;
    expect(r.error).toMatch(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    const r = await lastfmGetArtistInfo({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/artist is required/i);
  });

  it("returns parsed artist info", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ artist: { name: "Radiohead" } }),
    })));
    const r = await lastfmGetArtistInfo({ api_key: "k", artist: "Radiohead" }) as Record<string, any>;
    expect(r.name).toBe("Radiohead");
  });
});
