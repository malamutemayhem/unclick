import { afterEach, describe, expect, it, vi } from "vitest";
import { raindropAction } from "./raindrop-tool.js";

// L2 resilience contract for the Raindrop connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("raindrop connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await raindropAction("get_raindrop_collections", { token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await raindropAction("get_raindrop_collections", { token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await raindropAction("search_raindrops", { token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/query is required/i);
  });

  it("passes through successful collection responses", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify({ items: [{ _id: 1, title: "Collection" }] }),
    })));
    const result = await raindropAction("get_raindrop_collections", { token: "t" }) as Record<string, unknown>;
    expect((result.items as unknown[]).length).toBe(1);
  });
});
