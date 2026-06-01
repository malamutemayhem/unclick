import { afterEach, describe, expect, it, vi } from "vitest";

import { trackAuspostParcel } from "./australiapost-tool.js";

describe("australia post connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await trackAuspostParcel({ api_key: "k", tracking_id: "ABC123" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await trackAuspostParcel({ api_key: "k", tracking_id: "ABC123" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when tracking_id is missing", async () => {
    const r = await trackAuspostParcel({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/tracking_id is required/i);
  });

  it("maps tracking results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ tracking_results: [{ tracking_id: "ABC123", status: "Delivered", events: [] }] }) })));
    const r = await trackAuspostParcel({ api_key: "k", tracking_id: "ABC123" }) as Record<string, any>;
    expect(r.results[0].status).toBe("Delivered");
  });
});
