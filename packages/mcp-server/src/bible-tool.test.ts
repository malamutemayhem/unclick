import { afterEach, describe, expect, it, vi } from "vitest";
import { bibleVerse, bibleRandom } from "./bible-tool.js";

describe("bible connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await bibleVerse({ reference: "John 3:16" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await bibleRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required reference for bibleVerse", async () => {
    const r = await bibleVerse({}) as Record<string, unknown>;
    expect(r.error).toMatch(/reference is required/i);
  });

  it("bibleVerse returns verse with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ reference: "John 3:16", text: "For God so loved the world...", translation_id: "web" }),
    })));
    const r = await bibleVerse({ reference: "John 3:16" }) as Record<string, unknown>;
    expect(r.reference).toBe("John 3:16");
    expect(r.unclick_meta).toBeDefined();
  });
});
