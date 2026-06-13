import { afterEach, describe, expect, it, vi } from "vitest";
import { catApiRandomImage, catApiBreeds } from "./catapi-tool.js";

describe("catapi connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await catApiRandomImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await catApiBreeds({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("catApiRandomImage returns image data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: "abc", url: "https://cdn2.thecatapi.com/images/abc.jpg", width: 800, height: 600 }]),
    })));
    const r = await catApiRandomImage({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
