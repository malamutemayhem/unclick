import { afterEach, describe, expect, it, vi } from "vitest";
import { kanyeQuote } from "./kanye-tool.js";

describe("kanye connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await kanyeQuote({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await kanyeQuote({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("kanyeQuote returns a quote with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ quote: "I am a god." }),
    })));
    const r = await kanyeQuote({}) as Record<string, unknown>;
    expect(r.quote).toBe("I am a god.");
    expect(r.unclick_meta).toBeDefined();
  });
});
