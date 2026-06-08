import { afterEach, describe, expect, it, vi } from "vitest";
import { httpbinGet, httpbinHeaders, httpbinIp, httpbinUserAgent, httpbinUuid } from "./httpbin-tool.js";

describe("httpbin connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await httpbinGet({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await httpbinIp({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("httpbinGet returns request info with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ args: {}, headers: { Host: "httpbin.org" }, origin: "1.2.3.4", url: "https://httpbin.org/get" }),
    })));
    const r = await httpbinGet({}) as Record<string, unknown>;
    expect(r.origin).toBe("1.2.3.4");
    expect(r.unclick_meta).toBeDefined();
  });

  it("httpbinUuid returns a uuid with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }),
    })));
    const r = await httpbinUuid({}) as Record<string, unknown>;
    expect(r.uuid).toContain("a1b2c3d4");
    expect(r.unclick_meta).toBeDefined();
  });
});
