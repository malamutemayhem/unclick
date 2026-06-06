import { afterEach, describe, expect, it, vi } from "vitest";

import { mailchimpListAudiences, mailchimpGetCampaign } from "./mailchimp-tool.js";

describe("mailchimp connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: (h: string) => (h === "Retry-After" ? "30" : null) }, json: async () => ({}) })));
    await expect(mailchimpListAudiences({ api_key: "abc-us21" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 30s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    await expect(mailchimpListAudiences({ api_key: "abc-us21" })).rejects.toThrow(/timed out/i);
  });

  it("validates input before any network call", async () => {
    await expect(mailchimpGetCampaign({ api_key: "abc-us21" })).rejects.toThrow(/campaign_id is required/i);
  });

  it("maps audiences", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ lists: [{ id: "l1", name: "Main List" }], total_items: 1 }) })));
    const r = await mailchimpListAudiences({ api_key: "abc-us21" }) as Record<string, any>;
    expect(r.total).toBe(1);
    expect(r.audiences[0].id).toBe("l1");
  });
});
