import { afterEach, describe, expect, it, vi } from "vitest";
import { telegramSend } from "./telegram-tool.js";

// L2 resilience contract for the Telegram connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
describe("telegram connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(telegramSend({ bot_token: "t", chat_id: "c", text: "hi" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(telegramSend({ bot_token: "t", chat_id: "c", text: "hi" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(telegramSend({ bot_token: "t", chat_id: "c" })).rejects.toThrow(/text is required/i);
  });

  it("maps a successful send into a defined result", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ ok: true, result: { message_id: 42, chat: { id: "c" }, date: 0 } }),
    })));
    const result = await telegramSend({ bot_token: "t", chat_id: "c", text: "hi" }) as Record<string, unknown>;
    expect(result).toBeDefined();
    expect(result.error).toBeUndefined();
  });
});
