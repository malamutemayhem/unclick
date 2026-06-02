import { afterEach, describe, expect, it, vi } from "vitest";
import { postmanAction } from "./postman-tool.js";

// L2 resilience contract for the Postman connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("postman connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await postmanAction("list_collections", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await postmanAction("list_collections", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await postmanAction("get_collection", { api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/collection_id/i);
  });

  it("passes through successful collection listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ collections: [{ id: "c1", name: "API" }] }),
    })));
    const result = await postmanAction("list_collections", { api_key: "k" }) as Record<string, unknown>;
    expect((result.collections as unknown[]).length).toBe(1);
  });
});
