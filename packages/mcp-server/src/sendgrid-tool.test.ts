import { afterEach, describe, expect, it, vi } from "vitest";

import { sendgridSendEmail } from "./sendgrid-tool.js";

const ok = { to: "a@b.com", from: "c@d.com", subject: "Hi", text: "body" };

describe("sendgrid connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(sendgridSendEmail({ api_key: "k", ...ok })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(sendgridSendEmail({ api_key: "k", ...ok })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(sendgridSendEmail({ api_key: "k" })).rejects.toThrow(/to is required/i);
  });

  it("reports a successful send (HTTP 202)", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 202 })));
    const r = await sendgridSendEmail({ api_key: "k", ...ok }) as Record<string, any>;
    expect(r.success).toBe(true);
  });
});
