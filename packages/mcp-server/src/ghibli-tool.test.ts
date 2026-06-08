import { afterEach, describe, expect, it, vi } from "vitest";
import { ghibliFilms, ghibliPeople } from "./ghibli-tool.js";

describe("ghibli connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await ghibliFilms({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await ghibliPeople({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns films with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: "1", title: "My Neighbor Totoro", director: "Hayao Miyazaki" }]),
    })));
    const r = await ghibliFilms({}) as Record<string, unknown>;
    expect(r.films).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
