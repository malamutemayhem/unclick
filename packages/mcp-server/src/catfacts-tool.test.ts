import { afterEach, describe, expect, it, vi } from "vitest";
import { catFact, catBreeds } from "./catfacts-tool.js";

describe("catfacts connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await catFact({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await catFact({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("maps fact data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ fact: "Cats sleep 70% of their lives.", length: 32 }),
    })));
    const r = await catFact({}) as Record<string, any>;
    expect(r.fact).toBe("Cats sleep 70% of their lives.");
    expect(r.length).toBe(32);
  });

  it("maps breed data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({
        data: [{ breed: "Abyssinian", country: "Ethiopia", origin: "Natural", coat: "Short", pattern: "Ticked" }],
        current_page: 1, last_page: 10,
      }),
    })));
    const r = await catBreeds({}) as Record<string, any>;
    expect(r.count).toBe(1);
    expect(r.breeds[0].breed).toBe("Abyssinian");
  });
});
