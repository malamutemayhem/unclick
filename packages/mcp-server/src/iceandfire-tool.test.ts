import { afterEach, describe, expect, it, vi } from "vitest";
import { iceandfireCharacters, iceandfireBooks, iceandfireHouses } from "./iceandfire-tool.js";

describe("iceandfire connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await iceandfireCharacters({ name: "Jon Snow" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await iceandfireBooks({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns characters with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ name: "Jon Snow", aliases: ["Lord Snow"] }]),
    })));
    const r = await iceandfireCharacters({ name: "Jon" }) as Record<string, unknown>;
    expect(r.characters).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns houses with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ name: "House Stark of Winterfell", region: "The North" }]),
    })));
    const r = await iceandfireHouses({ name: "Stark" }) as Record<string, unknown>;
    expect(r.houses).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
