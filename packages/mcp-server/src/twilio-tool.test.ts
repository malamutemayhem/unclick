import { afterEach, describe, expect, it, vi } from "vitest";
import { twilioListMessages, twilioSendSms } from "./twilio-tool.js";

// L2 resilience contract for the Twilio connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const AUTH = { account_sid: "AC123", auth_token: "tok" };

describe("twilio connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(twilioListMessages({ ...AUTH })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(twilioListMessages({ ...AUTH })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(twilioSendSms({ ...AUTH })).rejects.toThrow(/to is required/i);
  });

  it("maps message listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ messages: [{ sid: "M1", status: "delivered", from: "+1", to: "+2", body: "hi" }], next_page_uri: null }),
    })));
    const result = await twilioListMessages({ ...AUTH }) as Record<string, unknown>;
    expect(result.count).toBe(1);
    expect((result.messages as Array<Record<string, unknown>>)[0].sid).toBe("M1");
  });
});
