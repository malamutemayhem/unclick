import { afterEach, describe, expect, it, vi } from "vitest";

import { scanIpVirustotal } from "./virustotal-tool.js";

describe("virustotal connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, text: async () => "" })));
    const r = await scanIpVirustotal({ api_key: "k", ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit exceeded/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await scanIpVirustotal({ api_key: "k", ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a structured error when ip is missing", async () => {
    const r = await scanIpVirustotal({ api_key: "k" }) as Record<string, unknown>;
    expect(r.error).toMatch(/ip is required/i);
  });

  it("maps an IP report", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ data: { attributes: { country: "US", reputation: 0, last_analysis_stats: { malicious: 0 } } } }) })));
    const r = await scanIpVirustotal({ api_key: "k", ip: "8.8.8.8" }) as Record<string, any>;
    expect(r.ip).toBe("8.8.8.8");
    expect(r.country).toBe("US");
  });
});
