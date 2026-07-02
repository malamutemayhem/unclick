import { afterEach, describe, expect, it, vi } from "vitest";
import { lyricsGet } from "./lyrics-tool.js";

describe("lyrics connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await lyricsGet({ artist: "Queen", title: "Bohemian Rhapsody" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await lyricsGet({ artist: "Queen", title: "Bohemian Rhapsody" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns lyrics with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ lyrics: "Is this the real life? Is this just fantasy?" }),
    })));
    const r = await lyricsGet({ artist: "Queen", title: "Bohemian Rhapsody" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
