import { afterEach, describe, expect, it, vi } from "vitest";
import { algoliaSearch } from "./algolia-tool.js";

// L2 resilience contract for the Algolia connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const CREDS = { app_id: "APP", api_key: "key" };

describe("algolia connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(algoliaSearch({ ...CREDS, index: "products", query: "x" }))
      .rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(algoliaSearch({ ...CREDS, index: "products", query: "x" }))
      .rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(algoliaSearch({ ...CREDS, query: "x" })).rejects.toThrow(/index is required/i);
  });

  it("maps search responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ hits: [{ objectID: "1" }], nbHits: 1, page: 0, nbPages: 1, processingTimeMS: 3 }),
    })));
    const result = await algoliaSearch({ ...CREDS, index: "products", query: "x" }) as Record<string, unknown>;
    expect(result.total_hits).toBe(1);
    expect((result.hits as unknown[]).length).toBe(1);
  });
});
