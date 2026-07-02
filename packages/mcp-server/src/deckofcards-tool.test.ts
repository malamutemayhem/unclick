import { afterEach, describe, expect, it, vi } from "vitest";
import { deckNew, deckDraw, deckShuffle } from "./deckofcards-tool.js";

describe("deckofcards connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await deckNew({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await deckShuffle({ deck_id: "abc" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required deck_id for draw", async () => {
    const r = await deckDraw({}) as Record<string, unknown>;
    expect(r.error).toMatch(/deck_id is required/i);
  });

  it("validates required deck_id for shuffle", async () => {
    const r = await deckShuffle({}) as Record<string, unknown>;
    expect(r.error).toMatch(/deck_id is required/i);
  });

  it("deckNew returns a deck with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ success: true, deck_id: "abc123", remaining: 52 }),
    })));
    const r = await deckNew({}) as Record<string, unknown>;
    expect(r.deck_id).toBe("abc123");
    expect(r.unclick_meta).toBeDefined();
  });

  it("deckDraw returns cards", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ success: true, cards: [{ code: "AS" }], remaining: 51 }),
    })));
    const r = await deckDraw({ deck_id: "abc123", count: 1 }) as Record<string, unknown>;
    expect(r.cards).toBeDefined();
  });
});
