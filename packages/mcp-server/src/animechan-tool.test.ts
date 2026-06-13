import { afterEach, describe, expect, it, vi } from "vitest";
import { animechanRandom, animechanSearch } from "./animechan-tool.js";

describe("animechan connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await animechanRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await animechanSearch({ anime: "Naruto" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns random quote with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ data: { content: "Believe it!", anime: { name: "Naruto" }, character: { name: "Naruto Uzumaki" } } }),
    })));
    const r = await animechanRandom({}) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
