import { afterEach, describe, expect, it, vi } from "vitest";
import { readwiseAction } from "./readwise-tool.js";

// L2 resilience contract for the Readwise connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("readwise connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await readwiseAction("get_readwise_books", { token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await readwiseAction("get_readwise_books", { token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await readwiseAction("search_highlights", { token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/query is required/i);
  });

  it("passes through successful book responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ count: 1, results: [{ id: 1, title: "Book" }] }),
    })));
    const result = await readwiseAction("get_readwise_books", { token: "t" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.results as unknown[]).length).toBe(1);
  });
});
