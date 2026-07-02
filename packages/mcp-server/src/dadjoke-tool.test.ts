import { afterEach, describe, expect, it, vi } from "vitest";
import { dadJokeRandom, dadJokeSearch, dadJokeById } from "./dadjoke-tool.js";

describe("dadjoke connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await dadJokeRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await dadJokeSearch({ term: "cat" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required term for dadJokeSearch", async () => {
    const r = await dadJokeSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/term is required/i);
  });

  it("validates required id for dadJokeById", async () => {
    const r = await dadJokeById({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("dadJokeRandom returns a joke with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ id: "abc123", joke: "Why did the scarecrow win an award? He was outstanding in his field.", status: 200 }),
    })));
    const r = await dadJokeRandom({}) as Record<string, unknown>;
    expect(r.joke).toContain("scarecrow");
    expect(r.unclick_meta).toBeDefined();
  });
});
