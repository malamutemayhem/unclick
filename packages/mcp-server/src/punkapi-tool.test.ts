import { afterEach, describe, expect, it, vi } from "vitest";
import { punkApiRandomBeer, punkApiSearchBeers, punkApiGetBeer } from "./punkapi-tool.js";

describe("punkapi connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await punkApiRandomBeer({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await punkApiSearchBeers({ query: "ipa" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates id is required for getBeer", async () => {
    const r = await punkApiGetBeer({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("returns beer with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, name: "Buzz", tagline: "A Real Bitter Experience." }]),
    })));
    const r = await punkApiRandomBeer({}) as Record<string, unknown>;
    const beer = r.beer as Record<string, unknown>;
    expect(beer.name).toBe("Buzz");
    expect(r.unclick_meta).toBeDefined();
  });
});
