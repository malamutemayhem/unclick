import { afterEach, describe, expect, it, vi } from "vitest";

import { searchTrademarks } from "./ipaustralia-tool.js";

describe("ipaustralia connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await searchTrademarks({ api_key: "k", keyword: "acme" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await searchTrademarks({ api_key: "k", keyword: "acme" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when keyword is missing", async () => {
    const r = await searchTrademarks({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/keyword is required/i);
  });

  it("maps trademark results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ total: 1, results: [{ applicationNumber: "123456", status: "Registered", mark: "ACME" }] }) })));
    const r = await searchTrademarks({ api_key: "k", keyword: "acme" }) as Record<string, any>;
    expect(r.total).toBe(1);
    expect(r.results[0].number).toBe("123456");
  });
});
