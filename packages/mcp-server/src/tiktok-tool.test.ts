import { afterEach, describe, expect, it, vi } from "vitest";
import { getTiktokUser } from "./tiktok-tool.js";

// L2 resilience contract for the TikTok connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("tiktok connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "", json: async () => ({}),
    })));
    const result = await getTiktokUser({ access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await getTiktokUser({ access_token: "t" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await getTiktokUser({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/access_token is required/i);
  });

  it("passes through successful user lookups", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ data: { user: { display_name: "Creator", follower_count: 100 } } }),
    })));
    const result = await getTiktokUser({ access_token: "t" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
