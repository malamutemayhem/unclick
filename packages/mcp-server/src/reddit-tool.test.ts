import { afterEach, describe, expect, it, vi } from "vitest";
import { redditSearch } from "./reddit-tool.js";

// L2 resilience contract for the Reddit connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("reddit connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}), text: async () => "",
    })));
    const result = await redditSearch({ access_token: "t", query: "x" }) as Record<string, unknown>;
    expect(`${result.error} ${result.message}`).toMatch(/rate.?limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await redditSearch({ access_token: "t", query: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await redditSearch({ access_token: "t", query: "" }) as Record<string, unknown>;
    expect(String(result.message)).toMatch(/query is required/i);
  });

  it("passes through successful searches", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ data: { children: [], after: null } }),
    })));
    const result = await redditSearch({ access_token: "t", query: "x" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
