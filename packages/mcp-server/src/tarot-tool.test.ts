import { afterEach, describe, expect, it, vi } from "vitest";
import { tarotAllCards, tarotDraw, tarotSearch } from "./tarot-tool.js";

describe("tarot connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await tarotDraw({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await tarotSearch({ query: "The Fool" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required query for search", async () => {
    const r = await tarotSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("tarotDraw returns cards with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ nhits: 3, cards: [{ name: "The Fool" }] }),
    })));
    const r = await tarotDraw({ count: 3 }) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });

  it("tarotAllCards returns summary", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ nhits: 78, cards: [{ name: "The Fool", value: "0", suit: "major" }] }),
    })));
    const r = await tarotAllCards({}) as Record<string, unknown>;
    expect(r.count).toBe(1);
  });
});
