import { afterEach, describe, expect, it, vi } from "vitest";
import { esportsMatches, esportsGetMatch } from "./pandascore-tool.js";

// L2 resilience contract for the PandaScore connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("pandascore connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(esportsMatches({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(esportsMatches({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await esportsGetMatch({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/id is required/i);
  });

  it("maps match listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ([{ id: 1, name: "Match", status: "running" }]),
    })));
    const result = await esportsMatches({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.matches as Array<Record<string, unknown>>)[0].name).toBe("Match");
  });
});
