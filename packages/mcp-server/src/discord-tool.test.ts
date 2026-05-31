import { afterEach, describe, expect, it, vi } from "vitest";
import { discordSend } from "./discord-tool.js";

// L2 resilience contract for the Discord connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("discord connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    const result = await discordSend({ bot_token: "t", channel_id: "c", content: "hi" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/rate limit/i);
    expect(result.status).toBe(429);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const result = await discordSend({ bot_token: "t", channel_id: "c", content: "hi" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await discordSend({ bot_token: "t", channel_id: "c" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/content is required/i);
  });

  it("passes through successful message sends", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ id: "m1", content: "hi" }),
    })));
    const result = await discordSend({ bot_token: "t", channel_id: "c", content: "hi" }) as Record<string, unknown>;
    expect(result.id).toBe("m1");
  });
});
