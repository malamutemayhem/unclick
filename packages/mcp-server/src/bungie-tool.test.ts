import { afterEach, describe, expect, it, vi } from "vitest";
import { bungieSearchPlayer } from "./bungie-tool.js";

// L2 resilience contract for the Bungie connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("bungie connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(bungieSearchPlayer({ api_key: "k", displayName: "Guardian" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(bungieSearchPlayer({ api_key: "k", displayName: "Guardian" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await bungieSearchPlayer({ api_key: "k" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/displayName/i);
  });

  it("maps player searches into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ ErrorCode: 1, Response: [{ membershipId: "1", membershipType: 3, displayName: "Guardian" }] }),
    })));
    const result = await bungieSearchPlayer({ api_key: "k", displayName: "Guardian" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.players as Array<Record<string, unknown>>)[0].membership_id).toBe("1");
  });
});
