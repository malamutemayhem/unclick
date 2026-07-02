import { afterEach, describe, expect, it, vi } from "vitest";
import { dogApiRandomImage, dogApiBreeds } from "./dogapi-tool.js";

describe("dogapi connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await dogApiRandomImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await dogApiBreeds({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("dogApiRandomImage returns image data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: "abc", url: "https://cdn2.thedogapi.com/images/abc.jpg", width: 800, height: 600 }]),
    })));
    const r = await dogApiRandomImage({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });

  it("dogApiBreeds returns breed list with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, name: "Labrador Retriever", life_span: "10 - 12 years" }]),
    })));
    const r = await dogApiBreeds({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
