import { afterEach, describe, expect, it, vi } from "vitest";
import { ipifyGetIp } from "./ipify-tool.js";

describe("ipify connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await ipifyGetIp({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await ipifyGetIp({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("ipifyGetIp returns IP with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ ip: "203.0.113.42" }),
    })));
    const r = await ipifyGetIp({}) as Record<string, unknown>;
    expect(r.ip).toBe("203.0.113.42");
    expect(r.unclick_meta).toBeDefined();
  });
});
