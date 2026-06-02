import { afterEach, describe, expect, it, vi } from "vitest";
import { slackAction } from "./slack-tool.js";

// L2 resilience contract for the Slack connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("slack connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  // slackAction returns the action promise without awaiting it, so async
  // rejections (429, timeout) surface to the caller rather than its try/catch.
  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, statusText: "Too Many Requests", json: async () => ({}),
    })));
    await expect(slackAction("slack_channels", { bot_token: "xoxb-test" })).rejects.toThrow(/rate limit/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(slackAction("slack_channels", { bot_token: "xoxb-test" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await slackAction("slack_channels", { bot_token: "badtoken" }) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/xoxb/i);
  });

  it("passes through successful channel listings", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ ok: true, channels: [{ id: "C1", name: "general" }] }),
    })));
    const result = await slackAction("slack_channels", { bot_token: "xoxb-test" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
