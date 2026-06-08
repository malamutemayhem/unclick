import { afterEach, describe, expect, it, vi } from "vitest";
import { adviceRandom, adviceSearch, adviceById } from "./adviceslip-tool.js";

describe("adviceslip connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await adviceRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await adviceSearch({ query: "life" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required query for search", async () => {
    const r = await adviceSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("validates required id for adviceById", async () => {
    const r = await adviceById({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("adviceRandom returns a slip with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ slip: { id: 42, advice: "Be kind." } }),
    })));
    const r = await adviceRandom({}) as Record<string, unknown>;
    expect(r.advice).toBe("Be kind.");
    expect(r.unclick_meta).toBeDefined();
  });

  it("adviceSearch returns results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ total_results: "2", slips: [{ id: 1 }, { id: 2 }] }),
    })));
    const r = await adviceSearch({ query: "love" }) as Record<string, unknown>;
    expect(r.total_results).toBe("2");
  });
});
