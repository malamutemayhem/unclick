import { afterEach, describe, expect, it, vi } from "vitest";
import { trelloAction } from "./trello-tool.js";

// L2 resilience contract for the Trello connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const CREDS = { api_key: "k", token: "t" };

describe("trello connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    const result = await trelloAction("get_boards", { ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await trelloAction("get_boards", { ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await trelloAction("get_lists", { ...CREDS }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/board_id/i);
  });

  it("passes through successful board listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      text: async () => JSON.stringify([{ id: "b1", name: "Board" }]),
    })));
    const result = await trelloAction("get_boards", { ...CREDS });
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBe(1);
  });
});
