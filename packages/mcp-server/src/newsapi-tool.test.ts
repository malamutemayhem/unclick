import { afterEach, describe, expect, it, vi } from "vitest";
import { newsGetTopHeadlines, newsSearchNews } from "./newsapi-tool.js";

// L2 resilience contract for the NewsAPI connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("newsapi connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await newsGetTopHeadlines({ api_key: "k", country: "us" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await newsGetTopHeadlines({ api_key: "k", country: "us" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await newsSearchNews({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/query is required/i);
  });

  it("maps headline responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ status: "ok", totalResults: 2, articles: [{ title: "a" }, { title: "b" }] }),
    })));
    const result = await newsGetTopHeadlines({ api_key: "k", country: "us" }) as Record<string, unknown>;
    expect(result.total_results).toBe(2);
    expect((result.articles as unknown[]).length).toBe(2);
  });
});
