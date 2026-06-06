import { afterEach, describe, expect, it, vi } from "vitest";
import { heygen_list_avatars, heygen_create_avatar_video } from "./heygen-tool.js";

// L2 resilience contract for the HeyGen connector: request timeout (longer for
// inference), clean 429 handling, input validation, and stable mapping.
describe("heygen connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(heygen_list_avatars({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(heygen_list_avatars({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(heygen_create_avatar_video({ api_key: "k" })).rejects.toThrow(/avatar_id is required/i);
  });

  it("maps avatar listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ data: { avatars: [{ avatar_id: "a1", avatar_name: "Avatar One" }] } }),
    })));
    const result = await heygen_list_avatars({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.avatars as Array<Record<string, unknown>>)[0].avatar_id).toBe("a1");
  });
});
