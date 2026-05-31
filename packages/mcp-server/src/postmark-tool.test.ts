import { afterEach, describe, expect, it, vi } from "vitest";

import { postmark_send_email } from "./postmark-tool.js";

const ok = { from: "c@d.com", to: "a@b.com", subject: "Hi", text_body: "body" };

describe("postmark connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(postmark_send_email({ api_key: "k", ...ok })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(postmark_send_email({ api_key: "k", ...ok })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(postmark_send_email({ api_key: "k" })).rejects.toThrow(/from is required/i);
  });

  it("maps a send result", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ MessageID: "m1", SubmittedAt: "2026-01-01", To: "a@b.com", ErrorCode: 0 }) })));
    const r = await postmark_send_email({ api_key: "k", ...ok }) as Record<string, any>;
    expect(r.message_id).toBe("m1");
  });
});
