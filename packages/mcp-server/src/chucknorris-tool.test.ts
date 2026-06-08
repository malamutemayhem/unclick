import { afterEach, describe, expect, it, vi } from "vitest";
import { chuckRandom, chuckSearch } from "./chucknorris-tool.js";

describe("chucknorris connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await chuckRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await chuckRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates query length for search", async () => {
    const r = await chuckSearch({ query: "ab" }) as Record<string, unknown>;
    expect(r.error).toMatch(/at least 3/i);
  });

  it("maps joke data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({
        categories: ["dev"], id: "abc123", url: "https://api.chucknorris.io/jokes/abc123",
        value: "Chuck Norris can divide by zero.",
      }),
    })));
    const r = await chuckRandom({}) as Record<string, any>;
    expect(r.id).toBe("abc123");
    expect(r.joke).toBe("Chuck Norris can divide by zero.");
    expect(r.categories).toEqual(["dev"]);
  });
});
