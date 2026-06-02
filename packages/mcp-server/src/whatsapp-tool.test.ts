import { afterEach, describe, expect, it, vi } from "vitest";
import { whatsappSendText } from "./whatsapp-tool.js";

// L2 resilience contract for the WhatsApp connector: request timeout, clean 429
// handling, input validation, and stable response mapping.
const AUTH = { bearer_token: "t", phone_number_id: "123" };

describe("whatsapp connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: (): string | null => null }, json: async () => ({}),
    })));
    await expect(whatsappSendText({ ...AUTH, to: "+15551234567", body: "hi" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(whatsappSendText({ ...AUTH, to: "+15551234567", body: "hi" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(whatsappSendText({ ...AUTH })).rejects.toThrow(/to is required/i);
  });

  it("maps a successful send without surfacing an error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: (): string | null => null },
      json: async () => ({ messaging_product: "whatsapp", messages: [{ id: "wamid.x" }], contacts: [{ wa_id: "15551234567" }] }),
    })));
    const result = await whatsappSendText({ ...AUTH, to: "+15551234567", body: "hi" }) as Record<string, unknown>;
    expect(result.error).toBeUndefined();
  });
});
