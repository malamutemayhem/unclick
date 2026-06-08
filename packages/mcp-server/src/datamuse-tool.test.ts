import { afterEach, describe, expect, it, vi } from "vitest";
import { datamuseWords, datamuseSuggestions } from "./datamuse-tool.js";

describe("datamuse connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await datamuseWords({ means_like: "happy" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await datamuseSuggestions({ prefix: "hap" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns words with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ word: "joyful", score: 95000 }, { word: "glad", score: 90000 }]),
    })));
    const r = await datamuseWords({ means_like: "happy" }) as Record<string, unknown>;
    expect(r.words).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
