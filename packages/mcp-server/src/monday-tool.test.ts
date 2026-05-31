import { afterEach, describe, expect, it, vi } from "vitest";
import { listMondayBoards } from "./monday-tool.js";

// L2 resilience contract for the Monday.com connector: request timeout, clean
// 429 handling, input validation, and stable response mapping.
describe("monday connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await listMondayBoards({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await listMondayBoards({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await listMondayBoards({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/api_key is required/i);
  });

  it("passes through successful board listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ data: { boards: [{ id: "1", name: "Sprint" }] } }),
    })));
    const result = await listMondayBoards({ api_key: "k" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
