import { afterEach, describe, expect, it, vi } from "vitest";
import { pushoverSendNotification } from "./pushover-tool.js";

// L2 resilience contract for the Pushover connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const AUTH = { app_token: "t", user_key: "u" };

describe("pushover connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(pushoverSendNotification({ ...AUTH, message: "hi" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(pushoverSendNotification({ ...AUTH, message: "hi" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(pushoverSendNotification({ ...AUTH })).rejects.toThrow(/message is required/i);
  });

  it("maps a successful send into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ status: 1, request: "req1" }),
    })));
    const result = await pushoverSendNotification({ ...AUTH, message: "hi" }) as Record<string, unknown>;
    expect(result.success).toBe(true);
    expect(result.request_id).toBe("req1");
  });
});
