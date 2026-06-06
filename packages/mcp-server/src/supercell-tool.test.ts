import { afterEach, describe, expect, it, vi } from "vitest";
import { cocPlayer } from "./supercell-tool.js";

// L2 resilience contract for the Supercell connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("supercell connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(cocPlayer({ api_key: "k", tag: "#ABC123" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(cocPlayer({ api_key: "k", tag: "#ABC123" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await cocPlayer({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/tag is required/i);
  });

  it("maps player responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ tag: "#ABC123", name: "Chief", townHallLevel: 14, troops: [] }),
    })));
    const result = await cocPlayer({ api_key: "k", tag: "#ABC123" }) as Record<string, unknown>;
    expect(result.name).toBe("Chief");
    expect(result.town_hall_level).toBe(14);
  });
});
