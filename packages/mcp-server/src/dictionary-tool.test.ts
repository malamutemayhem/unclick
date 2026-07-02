import { afterEach, describe, expect, it, vi } from "vitest";
import { dictionaryLookup } from "./dictionary-tool.js";

describe("dictionary connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await dictionaryLookup({ word: "hello" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await dictionaryLookup({ word: "hello" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required word param", async () => {
    const r = await dictionaryLookup({}) as Record<string, unknown>;
    expect(r.error).toMatch(/word is required/i);
  });

  it("handles 404 for unknown words", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 404, headers: { get: () => null }, text: async () => "" })));
    const r = await dictionaryLookup({ word: "xyznotaword" }) as Record<string, unknown>;
    expect(r.error).toMatch(/no definition found/i);
  });

  it("maps word data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{
        word: "hello",
        phonetic: "/həˈloʊ/",
        phonetics: [{ text: "/həˈloʊ/", audio: "https://example.com/hello.mp3" }],
        meanings: [{ partOfSpeech: "noun", definitions: [{ definition: "A greeting", example: "Hello there!", synonyms: ["hi"], antonyms: [] }] }],
      }]),
    })));
    const r = await dictionaryLookup({ word: "hello" }) as Record<string, any>;
    expect(r.word).toBe("hello");
    expect(r.meanings[0].partOfSpeech).toBe("noun");
  });
});
