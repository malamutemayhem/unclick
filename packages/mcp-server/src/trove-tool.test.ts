import { afterEach, describe, expect, it, vi } from "vitest";
import { searchTrove } from "./trove-tool.js";

// L2 resilience contract for the Trove connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("trove connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await searchTrove({ api_key: "k", query: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await searchTrove({ api_key: "k", query: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await searchTrove({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/query is required/i);
  });

  it("maps search responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ response: { zone: [{ records: { total: 5, article: [{ id: "1" }] } }] } }),
    })));
    const result = await searchTrove({ api_key: "k", query: "x" }) as Record<string, unknown>;
    expect(result.total).toBe(5);
  });
});
