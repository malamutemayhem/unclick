import { afterEach, describe, expect, it, vi } from "vitest";
import { urlhausLookupUrl, urlhausRecent } from "./urlhaus-tool.js";

describe("urlhaus connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await urlhausLookupUrl({ url: "http://example.com" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await urlhausRecent({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns URL data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ query_status: "no_results", url_count: 0, urls: [] }),
    })));
    const r = await urlhausLookupUrl({ url: "http://example.com" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
