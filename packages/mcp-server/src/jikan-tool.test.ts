import { afterEach, describe, expect, it, vi } from "vitest";
import { jikanSearchAnime } from "./jikan-tool.js";

describe("jikan connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await jikanSearchAnime({ query: "naruto" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await jikanSearchAnime({ query: "naruto" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required query param", async () => {
    const r = await jikanSearchAnime({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("maps anime data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({
        data: [{
          mal_id: 20, title: "Naruto", title_english: "Naruto", type: "TV",
          episodes: 220, status: "Finished Airing", score: 8.0, scored_by: 1000000,
          rank: 500, popularity: 10, synopsis: "A ninja story.",
          genres: [{ name: "Action" }, { name: "Adventure" }],
          year: 2002, season: "fall",
          images: { jpg: { image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg" } },
        }],
        pagination: { last_visible_page: 1, has_next_page: false },
      }),
    })));
    const r = await jikanSearchAnime({ query: "naruto" }) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.anime[0].title).toBe("Naruto");
    expect(r.anime[0].genres).toEqual(["Action", "Adventure"]);
    expect(r.anime[0].score).toBe(8.0);
  });
});
