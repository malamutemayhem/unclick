import { afterEach, describe, expect, it, vi } from "vitest";
import { zenQuoteRandom, zenQuoteToday, zenQuotes } from "./zenquotes-tool.js";

describe("zenquotes connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await zenQuoteRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await zenQuoteToday({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("zenQuoteRandom returns quotes with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ q: "Be yourself.", a: "Oscar Wilde", h: "<blockquote>Be yourself.</blockquote>" }]),
    })));
    const r = await zenQuoteRandom({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });

  it("zenQuotes returns a capped list", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => (Array.from({ length: 50 }, (_, i) => ({ q: `Quote ${i}`, a: "Author" }))),
    })));
    const r = await zenQuotes({}) as Record<string, unknown>;
    expect(r.count).toBe(50);
    expect((r.quotes as unknown[]).length).toBe(20);
  });
});
