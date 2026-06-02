import { afterEach, describe, expect, it, vi } from "vitest";
import { listPinterestBoards } from "./pinterest-tool.js";

// L2 resilience contract for the Pinterest connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("pinterest connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await listPinterestBoards({ access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await listPinterestBoards({ access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await listPinterestBoards({}) as Record<string, unknown>;
    expect(result.not_connected).toBe(true);
  });

  it("passes through successful board listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ items: [{ id: "b1", name: "Recipes" }] }),
    })));
    const result = await listPinterestBoards({ access_token: "t" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
