import { afterEach, describe, expect, it, vi } from "vitest";
import { pineconeListIndexes, pineconeDescribeIndex } from "./pinecone-tool.js";

// L2 resilience contract for the Pinecone connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("pinecone connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(pineconeListIndexes({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(pineconeListIndexes({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(pineconeDescribeIndex({ api_key: "k" })).rejects.toThrow(/index_name is required/i);
  });

  it("maps index listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ indexes: [{ name: "i1", dimension: 1536, metric: "cosine" }] }),
    })));
    const result = await pineconeListIndexes({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.indexes as Array<Record<string, unknown>>)[0].name).toBe("i1");
  });
});
