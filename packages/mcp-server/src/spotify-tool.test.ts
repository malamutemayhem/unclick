import { afterEach, describe, expect, it, vi } from "vitest";
import { spotifySearch } from "./spotify-tool.js";

// L2 resilience contract for the Spotify connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("spotify connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(spotifySearch({ bearer_token: "t", query: "jazz" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(spotifySearch({ bearer_token: "t", query: "jazz" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(spotifySearch({ bearer_token: "t" })).rejects.toThrow(/query is required/i);
  });

  it("maps track searches into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({
        tracks: { total: 1, next: null, items: [{ id: "t1", name: "Blue", artists: [{ name: "Miles" }], album: { name: "Kind" }, duration_ms: 1000, external_urls: { spotify: "u" } }] },
      }),
    })));
    const result = await spotifySearch({ bearer_token: "t", query: "jazz" }) as Record<string, unknown>;
    const tracks = result.tracks as Record<string, unknown>;
    expect(tracks.total).toBe(1);
    expect((tracks.items as unknown[]).length).toBe(1);
  });
});
