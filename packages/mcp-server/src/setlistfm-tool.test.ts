import { afterEach, describe, expect, it, vi } from "vitest";
import { setlistfmSearchArtist, setlistfmArtistSetlists } from "./setlistfm-tool.js";

// L2 resilience contract for the Setlist.fm connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("setlistfm connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    const result = await setlistfmSearchArtist({ api_key: "k", artistName: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await setlistfmSearchArtist({ api_key: "k", artistName: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await setlistfmArtistSetlists({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/mbid/i);
  });

  it("passes through successful artist searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ artist: [{ mbid: "m1", name: "Radiohead" }] }),
    })));
    const result = await setlistfmSearchArtist({ api_key: "k", artistName: "Radiohead" }) as Record<string, unknown>;
    expect((result.artist as unknown[]).length).toBe(1);
  });
});
