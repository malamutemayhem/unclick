import { afterEach, describe, expect, it, vi } from "vitest";

import { sendEmailResend } from "./resend-tool.js";

const ok = { from: "c@d.com", to: "a@b.com", subject: "Hi", text: "body" };

describe("resend connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await sendEmailResend({ api_key: "k", ...ok }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await sendEmailResend({ api_key: "k", ...ok }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when from is missing", async () => {
    const r = await sendEmailResend({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/from is required/i);
  });

  it("maps a send result", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, text: async () => "", json: async () => ({ id: "e1" }) })));
    const r = await sendEmailResend({ api_key: "k", ...ok }) as Record<string, any>;
    expect(r.id).toBe("e1");
    expect(r.sent).toBe(true);
  });
});
