import { afterEach, describe, expect, it, vi } from "vitest";
import { wiktionaryLookup } from "./mediawiki-tool.js";

describe("mediawiki connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await wiktionaryLookup({ word: "hello" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("validates word is required", async () => {
    const r = await wiktionaryLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/word is required/i);
  });

  it("returns definitions with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ en: [{ partOfSpeech: "Interjection", definitions: [{ definition: "A greeting." }] }] }),
    })));
    const r = await wiktionaryLookup({ word: "hello" }) as Record<string, unknown>;
    expect(r.en).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
