import { afterEach, describe, expect, it, vi } from "vitest";
import { dogRandomImage, dogListBreeds } from "./dogceo-tool.js";

describe("dogceo connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await dogRandomImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await dogRandomImage({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("maps random image response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ message: "https://images.dog.ceo/breeds/hound/n02089973_1.jpg", status: "success" }),
    })));
    const r = await dogRandomImage({}) as Record<string, any>;
    expect(r.image_url).toBe("https://images.dog.ceo/breeds/hound/n02089973_1.jpg");
  });

  it("maps breed list response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ message: { bulldog: ["boston", "french"], husky: [] }, status: "success" }),
    })));
    const r = await dogListBreeds({}) as Record<string, any>;
    expect(r.count).toBe(2);
    expect(r.breeds[0].name).toBe("bulldog");
    expect(r.breeds[0].sub_breeds).toEqual(["boston", "french"]);
  });
});
