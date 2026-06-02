import { afterEach, describe, expect, it, vi } from "vitest";
import { notionAction } from "./notion-tool.js";

// L2 resilience contract for the Notion connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("notion connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await notionAction("search_notion", { api_key: "k", query: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await notionAction("search_notion", { api_key: "k", query: "x" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await notionAction("search_notion", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/query is required/i);
  });

  it("passes through successful search responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ results: [{ id: "p1" }], has_more: false }),
    })));
    const result = await notionAction("search_notion", { api_key: "k", query: "x" }) as Record<string, unknown>;
    expect((result.results as unknown[]).length).toBe(1);
  });
});
