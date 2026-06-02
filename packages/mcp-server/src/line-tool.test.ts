import { afterEach, describe, expect, it, vi } from "vitest";
import { lineGetProfile } from "./line-tool.js";

// L2 resilience contract for the LINE connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("line connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, text: async () => "{}",
    })));
    await expect(lineGetProfile({ channel_access_token: "t", user_id: "u" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(lineGetProfile({ channel_access_token: "t", user_id: "u" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(lineGetProfile({ channel_access_token: "t" })).rejects.toThrow(/user_id is required/i);
  });

  it("maps profile responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      text: async () => JSON.stringify({ userId: "u1", displayName: "Bob" }),
    })));
    const result = await lineGetProfile({ channel_access_token: "t", user_id: "u1" }) as Record<string, unknown>;
    expect(result.user_id).toBe("u1");
    expect(result.display_name).toBe("Bob");
  });
});
